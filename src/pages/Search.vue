<template>
    <div class="container text-center mt-5">
        <SearchComponent @search-performed="getApartments" />
        <h3 v-if="searchAddress">Ultima ricerca: {{ searchAddress }}</h3>

        <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-light p-4">
                <h5 class="text-body-emphasis h4">Filtri</h5>
                <span class="text-body-secondary">
                    <div class="d-flex justify-content-between align-items-center">
                        <div v-for="(service, index) in services" :key="index" @click="filterByService(service.id)"
                            :class="{ 'selected-service': selectedServiceId === service.id }" class="service-item w-25">
                            <img :src="getServiceIconUrl(service.icon)" :alt="service.name" class="w-25" />
                            <p>{{ service.name }}</p>
                        </div>
                    </div>
                </span>
            </div>
        </div>
        <nav class="navbar navbar ">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
        <div v-if="!selectedServiceId">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in apartmentsSponsored" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" :class="['bg-warning', 'sponsored']" />
                </div>
                <div class="col m-5" v-for="(item, index) in apartmentsBase" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in filteredApartmentsSponsored" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" :class="['bg-warning', 'sponsored']" />
                </div>
                <div class="col m-5" v-for="(item, index) in filteredApartmentsBase" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
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
            apartmentsBase: [],
            apartmentsSponsored: [],
            services: [],
            searchAddress: '',
            latitude: null,
            longitude: null,
            filteredApartmentsBase: [],
            filteredApartmentsSponsored: [],
            selectedServiceId: null
        }
    },

    methods: {
        getApartments({ query, latitude, longitude }) {
            this.searchAddress = query;
            const url = `http://127.0.0.1:8000/api/apartments/search/${encodeURIComponent(query)}/${latitude}/${longitude}`;
            console.log(url);
            axios.get(url).then((response) => {
                console.log('API Response:', response.data.results);
                this.apartmentsBase = response.data.results.base;
                this.apartmentsSponsored = response.data.results.sponsored;
                this.services = response.data.results.services;
                this.filteredApartmentsBase = [...this.apartmentsBase];
                this.filteredApartmentsSponsored = [...this.apartmentsSponsored];

                //console.log('Apartments Array:', this.apartmentsBase, this.apartmentsSponsored);
            }).catch((error) => {
                console.error('API error:', error);
            });
        },
        filterByService(serviceId) {
            this.selectedServiceId = serviceId;
            const fullUrl = window.location.href;
            const { query, latitude, longitude } = this.extractParamsFromUrl(fullUrl);
            this.latitude = latitude;
            this.longitude = longitude;
            const url = `http://127.0.0.1:8000/api/apartments/filter-by-service/${serviceId}/${this.latitude}/${this.longitude}`;
            axios.get(url).then((response) => {
                this.filteredApartmentsBase = response.data.base;
                this.filteredApartmentsSponsored = response.data.sponsored;
            }).catch((error) => {
                console.error('API error:', error);
            });
        },
        getServiceIconUrl(iconPath) {
            return `http://127.0.0.1:8000/${iconPath}`;
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
    border: 2px solid #007bff;
    border-radius: 5px;
}
</style>
