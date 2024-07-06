<template>
    <div class="container">
        <h1 v-if="apartment.name">{{ apartment.name }}</h1>
        <img v-if="apartment.cover_image" :src="imageUrl" :alt="apartment.name" class="apartment-image">
        <div v-if="apartment.name">
            <p>{{ apartment.description }}</p>
            <p>Stanze: {{ apartment.num_rooms }}</p>
            <p>Letti: {{ apartment.num_beds }}</p>
            <p>Bagni: {{ apartment.num_bathrooms }}</p>
            <p>Metri quadrati: {{ apartment.square_meters }}</p>
            <p>Indirizzo: {{ apartment.address }}</p>
            <MapComponent :apartment="apartment"/>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';

export default {
    name: 'ApartmentDetailComponent',
    components: {
        MapComponent
    },
    props: ['id'],
    data() {
        return {
            apartment: {}
        };
    },
    computed: {
        imageUrl() {
            return this.apartment.cover_image ? `http://127.0.0.1:8000/storage/${this.apartment.cover_image}` : 'https://via.placeholder.com/320x240';
        }
    },
    created() {
        this.fetchApartmentDetails();
    },
    methods: {
        fetchApartmentDetails() {
            fetch(`http://127.0.0.1:8000/api/apartments/${this.id}`)
                .then(response => response.json())
                .then(data => {
                    this.apartment = data.results;
                });
        }
    }
}
</script>

<style scoped>
.apartment-image {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
}
</style>
