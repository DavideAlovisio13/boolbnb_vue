<template>
    <div>
        <div class="input-container d-flex">
            <input class="input" name="text" type="text" placeholder="Cerca..." v-model="searchQuery"
                @input="debouncedPerformSearch" @keyup.enter="performSearch" />
            <span class="ms-3 d-flex justify-content-center align-items-center">
                <button @click="performSearch" class="nav-link pt-3">{{ 'Search' }}</button>
            </span>
        </div>
        <div v-if="searchQuery" :class="{ 'd-none': filteredItems.length === 0 }" class="search-results">
            <ul v-if="filteredItems.length" class="list-unstyled">
                <li v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
                    {{ item.address }}
                </li>
            </ul>
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
            if (this.filteredItems.length > 0) {
                this.searchQuery = this.filteredItems[0].address;
                this.lat = this.filteredItems[0].lat;
                this.lon = this.filteredItems[0].lon;

                this.$emit('search-performed', {
                    query: this.searchQuery,
                    latitude: this.lat,
                    longitude: this.lon
                });

                // Aggiorna l'URL
                this.updateUrl();
            }
        },
        async fetchSuggestions() {
            if (this.searchQuery.length < 2) {
                this.filteredItems = [];
                return;
            }

            try {
                const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchQuery}.json`, {
                    params: {
                        key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI',
                        radius: 20000,  // 20 km in metri
                        limit: 5,
                        countrySet: 'IT',
                    }
                });
                this.filteredItems = response.data.results.map(item => ({
                    id: item.id,
                    address: item.address.freeformAddress,
                    lat: item.position.lat,
                    lon: item.position.lon
                }));

            } catch (error) {
                console.error('Errore durante la ricerca:', error);
            }
        },
        selectItem(item) {
            this.searchQuery = item.address;
            this.lat = item.lat;
            this.lon = item.lon;
            this.filteredItems = [];
            this.address = item.address;
            this.$emit('search-performed', {
                query: this.searchQuery,
                latitude: this.lat,
                longitude: this.lon
            });
            this.updateUrl();
        },
        updateUrl() {
            this.$router.push({ name: 'search', params: { query: this.searchQuery, lat: this.lat, lon: this.lon } });
        }
    },
    created() {
        this.debouncedPerformSearch = debounce(this.fetchSuggestions, 500);
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

.button {
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #252525;
    overflow: hidden;
    border-radius: 30px;
    color: #333;
    transition: all 0.5s ease-in-out;
}

.btn-txt {
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
}

.type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s ease-in-out;
    background-color: #333;
    border-radius: 30px;
    visibility: hidden;
    height: 10px;
    width: 10px;
    z-index: -1;
}

.button:hover {
    box-shadow: 1px 1px 200px #252525;
    color: #fff;
    border: none;
}

.type1:hover::after {
    visibility: visible;
    transform: scale(100) translateX(2px);
}
</style>
