<template>
    <div>
        <h1>{{ apartment.name }}</h1>
        <img :src="imageUrl" :alt="apartment.name" class="apartment-image">
        <p>{{ apartment.description }}</p>
        <p>Stanze: {{ apartment.num_rooms }}</p>
        <p>Letti: {{ apartment.num_beds }}</p>
        <p>Bagni: {{ apartment.num_bathrooms }}</p>
        <p>Metri quadrati: {{ apartment.square_meters }}</p>
        <p>Indirizzo: {{ apartment.address }}</p>
    </div>
</template>

<script>
export default {
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