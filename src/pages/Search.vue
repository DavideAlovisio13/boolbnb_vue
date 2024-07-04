<template>
    <div class="container text-center mt-5">
        <SearchComponent @search-performed="getApartments"/>
        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            <div class="col m-5" v-for="(item, index) in apartments" :key="index">
                <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                    :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
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
            apartments: [],
        }
    },
    methods: {
        getApartments({ query, latitude, longitude }) {
            const url = `http://127.0.0.1:8000/api/apartments/search/${encodeURIComponent(query)}/${latitude}/${longitude}`;
            console.log(url);
            axios.get(url).then((response) => {
                console.log('API Response:', response.data);
                this.apartments = response.data.results;
                console.log('Apartments Array:', this.apartments);
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
        this.getApartments({ query, latitude, longitude });
    },
}
</script>

<style scoped>
.list-unstyled {
    padding-left: 0;
    list-style: none;
}
</style>
