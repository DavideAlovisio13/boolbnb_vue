<template>
    <div>
        <div class="card">
            <span class="card__title">Risultati</span>
        </div>
        <div class="container text-center mt-5">
            <SearchComponent @search-performed="getApartments" />
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in apartments" :key="index">
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
            apartments: [],
            latitude: null,
            longitude: null
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
</style>
