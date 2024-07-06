<template>
    <div class="container">
        <h1>{{ apartment.name }}</h1>
        <img :src="imageUrl" :alt="apartment.name" class="apartment-image">
        <p>{{ apartment.description }}</p>
        <p>Stanze: {{ apartment.num_rooms }}</p>
        <p>Letti: {{ apartment.num_beds }}</p>
        <p>Bagni: {{ apartment.num_bathrooms }}</p>
        <p>Metri quadrati: {{ apartment.square_meters }}</p>
        <p>Indirizzo: {{ apartment.address }}</p>
    </div>
    <div>
     <!-- Form per inviare messaggi -->
     <form @submit.prevent="sendMessage">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="message.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="message.email" required>
      </div>
      <div>
        <label for="content">Messaggio:</label>
        <textarea id="content" v-model="message.body" required></textarea>
      </div>
      <button type="submit">Invia Messaggio</button>
    </form>
</div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            apartment: {},
            name:'',
            email:'',
            body:''
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
        },
        sendMessage(){
            console.log(this.sendMessage);
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