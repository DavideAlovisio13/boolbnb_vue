<template>
    <!-- Contenitore principale del componente di ricerca -->
    <div>
        <!-- Input di ricerca con pulsante -->
        <div class="input-container d-flex">
            <input class="input" name="text" type="text" placeholder="Inserisci località" v-model="searchQuery"
                @input="debouncedPerformSearch" @keyup.enter="performSearch" />
            <span class="ms-3 d-flex justify-content-center align-items-center">
                <button @click="performSearch" class="nav-link pt-3">{{ 'Cerca...' }}</button>
            </span>
        </div>

        <!-- Risultati della ricerca -->
        <div v-if="searchQuery" :class="{ 'd-none': filteredItems.length === 0 }" class="search-results">
            <ul v-if="filteredItems.length" class="list-unstyled">
                <li v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
                    {{ item.address }}
                </li>
            </ul>
            <p v-if="filteredItems.length === 0">{{ notFound }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';

export default {
    name: 'SearchComponent',
    data() {
        return {
            searchQuery: '', // Query di ricerca dell'utente
            filteredItems: [], // Elementi filtrati per suggerimenti
            notFound: 'Nessun risultato trovato', // Messaggio mostrato se non ci sono risultati
            lat: null, // Latitudine selezionata
            lon: null, // Longitudine selezionata
            routeName: '' // Nome della rotta attuale
        }
    },
    methods: {
        // Esegue la ricerca quando l'utente preme il pulsante "Cerca"
        async performSearch() {
            if (this.filteredItems.length > 0) {
                // Imposta la query di ricerca con il primo risultato trovato
                this.searchQuery = this.filteredItems[0].address;
                this.lat = this.filteredItems[0].lat;
                this.lon = this.filteredItems[0].lon;

                // Emessa dell'evento di ricerca con latitudine e longitudine
                this.$emit('search-performed', {
                    query: this.searchQuery,
                    latitude: this.lat,
                    longitude: this.lon
                });

                // Aggiorna l'URL nella barra degli indirizzi del browser
                this.updateUrl();

                // Salva la query di ricerca nell'archiviazione locale
                this.saveSearchQuery();
            }
        },
        // Ottiene i suggerimenti di ricerca usando l'API TomTom Maps
        async fetchSuggestions() {
            // Effettua la richiesta solo se la lunghezza della query è maggiore di 2 caratteri
            if (this.searchQuery.length < 2) {
                this.filteredItems = [];
                return;
            }

            // Esegui la chiamata API per ottenere i suggerimenti di ricerca
            await axios.get(`https://api.tomtom.com/search/2/search/${this.searchQuery}.json`, {
                params: {
                    key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI',
                    radius: 20000,  // Raggio di ricerca (20 km in metri)
                    limit: 5, // Limite massimo di risultati
                    countrySet: 'IT', // Set di paesi (Italia)
                }
            }).then(response => {
                // Mappa i risultati ricevuti dalla risposta API ai dati necessari
                this.filteredItems = response.data.results.map(item => ({
                    id: item.id,
                    address: item.address.freeformAddress,
                    lat: item.position.lat,
                    lon: item.position.lon,
                }));
            }).catch((error) => console.error('API error:', error));
        },
        // Selezione di un elemento dai suggerimenti di ricerca
        selectItem(item) {
            this.searchQuery = item.address; // Imposta la query di ricerca con l'indirizzo selezionato
            this.lat = item.lat; // Imposta la latitudine con quella dell'indirizzo selezionato
            this.lon = item.lon; // Imposta la longitudine con quella dell'indirizzo selezionato
            this.filteredItems = []; // Svuota l'array dei risultati filtrati

            // Emessa dell'evento di ricerca con latitudine e longitudine
            this.$emit('search-performed', {
                query: this.searchQuery,
                latitude: this.lat,
                longitude: this.lon
            });

            // Aggiorna l'URL nella barra degli indirizzi del browser
            this.updateUrl();

            // Salva la query di ricerca nell'archiviazione locale
            this.saveSearchQuery();
        },
        // Aggiorna l'URL nella barra degli indirizzi del browser
        updateUrl() {
            this.$router.push({ name: 'search', params: { query: this.searchQuery, lat: this.lat, lon: this.lon } });
        },
        // Salva la query di ricerca nell'archiviazione locale
        saveSearchQuery() {
            localStorage.setItem('lastSearchQuery', this.searchQuery);
        },
        // Carica la query di ricerca salvata dall'archiviazione locale
        loadSearchQuery() {
            // Controlla se l'utente è sulla pagina di ricerca attuale
            if (this.$route.name === 'search') {
                const savedQuery = localStorage.getItem('lastSearchQuery');
                if (savedQuery) {
                    this.searchQuery = savedQuery; // Carica la query di ricerca salvata
                }
            }
        }
    },
    created() {
        this.debouncedPerformSearch = debounce(this.fetchSuggestions, 500); // Utilizza debounce per migliorare le prestazioni durante la digitazione
        this.routeName = this.$route.name; // Ottiene il nome della rotta attuale

        this.loadSearchQuery(); // Carica la query di ricerca salvata solo se l'utente è ancora sulla pagina di ricerca
    },
    watch: {
        // Osserva il cambio della rotta per gestire la pulizia della query di ricerca
        '$route.name'(newVal, oldVal) {
            if (newVal !== this.routeName) {
                this.searchQuery = ''; // Svuota la query di ricerca se la rotta cambia
            } else {
                this.loadSearchQuery(); // Carica la query di ricerca salvata se l'utente è sulla stessa pagina di ricerca
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/* Stili per l'input di ricerca */
.input {
    width: 500px;
    max-width: 270px;
    height: 60px;
    padding: 12px;
    font-size: 18px;
    font-family: "Courier New", monospace;
    color: #000;
    background-color: #fff;
    border: 4px solid #000;
    border-radius: 0;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 8px 8px 0 #000;
}

.input::placeholder {
    color: #888;
}

.input:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #000;
}

.input:focus {
    background-color: #e9b50b;
    color: #000;
    border-color: #ffffff;
}

.input:focus::placeholder {
    color: #fff;
}

.input-container {
    position: relative;
    width: 100%;
    max-width: 270px;
}

/* Stili per i risultati della ricerca */
.search-results {
    background-color: #ffffff;
    color: black;
    text-align: start;
    padding: 1rem;
    position: absolute;
    width: 100%;
    max-width: 270px;
    border: 3px solid #000;
    border-top: none;
    box-shadow: 5px 5px 0 #000;

    li {
        padding: 0.5rem;
        cursor: pointer;
    }
}

.list-unstyled {
    padding-left: 0;
    list-style: none;
}
</style>
