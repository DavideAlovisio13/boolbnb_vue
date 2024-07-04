<template>

    <div class="container text-center mt-5">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in apartments" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image" :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import CardApComponent from '../components/CardApComponent.vue';
export default {
    name: 'Search',
    components: {
        CardApComponent
    },
    data() {
        return {
            apartments: [],
        }
    },
    methods: {
        getApartments(query, latitude, longitude) {
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

            // La query di ricerca è l'elemento dopo 'search/'
            const query = decodeURIComponent(parts[parts.indexOf('search') + 1]);

            // La latitudine è l'elemento dopo la query
            const latitude = parseFloat(parts[parts.indexOf(query) + 1]);

            // La longitudine è l'elemento dopo la latitudine
            const longitude = parseFloat(parts[parts.indexOf(query) + 2]);

            return { query, latitude, longitude };
        }
    },
    mounted() {
        // Ottieni l'URL completo
        const fullUrl = window.location.href;

        // Esegui la funzione per estrarre query, latitudine e longitudine
        const { query, latitude, longitude } = this.extractParamsFromUrl(fullUrl);

        this.getApartments(query, latitude, longitude);
        
        }
    }


</script>

<style scoped>
.list-unstyled {
    padding-left: 0;
    list-style: none;
}
</style>

