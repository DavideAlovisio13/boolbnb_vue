<template>
    <div>
        <div class="input-container d-flex">
            <input class="input" name="text" type="text" placeholder="Cerca..." v-model="searchQuery"
                @input="performSearch" @keyup.enter="performSearch" />
            <span class="ms-3 d-flex justify-content-center align-items-center">
                <button @click="navigateToSearch" class="nav-link pt-3">{{ 'Search' }}</button>
            </span>
        </div>
        <div v-if="searchQuery" class="search-results">
            <ul v-if="filteredItems.length" class="list-unstyled">
                <li v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
                    {{ item.address }}
                </li>
            </ul>
            <p  :class="{ 'not-found': filteredItems.length}"v-else>{{ notFound }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SearchComponent',
    data() {
        return {
            searchQuery: '',
            items: [],
            filteredItems: [],
            notFound: 'Nessun risultato trovato',
            lat: null,
            lon: null
        }
    },
    methods: {
        async performSearch() {
            if (this.searchQuery.length < 2) {
                this.filteredItems = [];
                return;
            }

            try {
                const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchQuery}.json`, {
                    params: {
                        key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI',
                        radius: 20000,  // 20 km in metri
                        limit: 1,
                        countrySet: 'IT',
                    }
                });
                this.filteredItems = response.data.results.map(item => ({
                    id: item.id,
                    address: item.address.freeformAddress,
                    lat: item.position.lat,
                    lon: item.position.lon
                }));

                // Emmetti l'evento per aggiornare i risultati
                if (this.filteredItems.length > 0) {
                    this.$emit('search-performed', {
                        query: this.searchQuery,
                        latitude: this.filteredItems[0].lat,
                        longitude: this.filteredItems[0].lon
                    });
                }

            } catch (error) {
                console.error('Errore durante la ricerca:', error);
            }
        },
        selectItem(item) {
            this.searchQuery = item.address;
            this.lat = item.lat;
            this.lon = item.lon;
            this.filteredItems = [];
            this.$emit('search-performed', {
                query: this.searchQuery,
                latitude: this.lat,
                longitude: this.lon
            });
        },
        navigateToSearch() {
            this.$emit('search-performed', {
                query: this.searchQuery,
                latitude: this.lat,
                longitude: this.lon
            });
            this.$router.push({ name: 'search', params: { query: this.searchQuery, lat: this.lat, lon: this.lon } });
        }
    },
    mounted() {
        this.filteredItems = this.items;
    }
}
</script>

<style lang="scss" scoped>
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
