<template>
    <div>
        <div class="input-container">
            <input class="input" name="text" type="text" placeholder="Cerca..." v-model="searchQuery"
                @input="performSearch" @keyup.enter="performSearch" />
        </div>
        <div v-if="searchQuery" class="search-results">
            <ul v-if="filteredItems.length" class="list-unstyled">
                <li v-for="item in filteredItems" :key="item.id">{{ item.address }}</li>
            </ul>
            <p v-else>{{ notFound }}</p>
        </div>
        <router-link :to="{ name: 'search' }" class="nav-link pt-3">{{ 'Search' }}</router-link>
    </div>
</template>

<script>
import { store } from '@/store';
export default {
    name: 'Search',
    data() {
        return {
            searchQuery: '',
            items: store.apartments,
            filteredItems: [],
            notFound: 'Nessun risultato trovato'
        }
    },
    methods: {
        performSearch() {
            this.filteredItems = this.items.filter(item =>
                item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        this.filteredItems = this.items;
    }
}
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
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
}

.list-unstyled {
    padding-left: 0;
    list-style: none;
}
</style>
