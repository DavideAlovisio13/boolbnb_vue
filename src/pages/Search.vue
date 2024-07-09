<template>
    <div class="container text-center mt-5">
        <SearchComponent @search-performed="getApartments" />
        <p>Numero di risultati: {{ this.allApartments.length }}</p>
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <div class="col m-5" v-for="(item, index) in allApartments" :key="index">
                <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                    :num_rooms="item.num_rooms" :num_beds="item.num_beds" :class="['bg-warning', 'sponsored']"
                    :distance="item.distance" />
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { store } from '../store';
import CardApComponent from '../components/CardApComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';

export default {
    name: 'Search',
    components: {
        CardApComponent,
        SearchComponent
    },
    data() {
        return {
            store,
            apartmentsBase: [],
            apartmentsSponsored: [],
            services: [],
            searchAddress: '',
            latitude: null,
            longitude: null,
            filteredApartmentsBase: [],
            filteredApartmentsSponsored: [],
            allApartments: [],
            selectedServiceId: []
        }
    },

    methods: {
        getApartments({ query, latitude, longitude }) {
            this.searchAddress = query;
            const url = `${this.store.apiBaseUrl}apartments/search/${encodeURIComponent(query)}/${latitude}/${longitude}`;
            axios.get(url).then((response) => {
                this.apartmentsBase = response.data.results.base;
                this.apartmentsSponsored = response.data.results.sponsored;
                this.services = response.data.results.services;
                this.filteredApartmentsBase = [...this.apartmentsBase];
                this.filteredApartmentsSponsored = [...this.apartmentsSponsored];
                this.allApartments = [...this.apartmentsSponsored, ...this.apartmentsBase];
            }).catch((error) => {
                console.error('API error:', error);
            });
        },

        extractParamsFromUrl(url) {
            const parts = url.split('/');
            const query = decodeURIComponent(parts[parts.indexOf('search') + 1]);
            const latitude = parseFloat(parts[parts.indexOf(query) + 1]);
            const longitude = parseFloat(parts[parts.indexOf(query) + 2]);
            return { query, latitude, longitude };
        }
    },
    mounted() {
        const fullUrl = window.location.href;
        const { query, latitude, longitude } = this.extractParamsFromUrl(fullUrl);
        this.latitude = latitude;
        this.longitude = longitude;
        this.getApartments({ query, latitude, longitude });
    },
}
</script>

<style scoped>
.list-unstyled {
    padding-left: 0;
    list-style: none;
}

.card {
    width: 400px;
    padding: 20px;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    margin: 20px 80px;
}

.card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
}

.card__title {
    font-size: 32px;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 15px;
    display: block;
    position: relative;
    overflow: hidden;
}

.card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
}

.card:hover .card__title::after {
    transform: translateX(0);
}

.service-item {
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border 0.3s;
}

.selected-service {
    background-color: #FFC107;
    border: 2px solid #a9a9a9;
    border-radius: 5px;
}
</style>
