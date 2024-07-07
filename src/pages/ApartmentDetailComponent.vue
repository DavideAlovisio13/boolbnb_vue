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
            <div class="row">
                <div class="col-6">
                    <MapComponent :apartment="apartment" />
                </div>
                <div class="col-6">
                    <form @submit.prevent="sendMessage" method="POST">
                        <div>
                            <label for="name">Nome:</label>
                            <input type="text" id="name" v-model="message.name" required>
                        </div>
                        <div>
                            <label for="surname">Cognome:</label>
                            <input type="text" id="name" v-model="message.surname" required>
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
            </div>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import axios from 'axios';
import { store } from '@/store';

export default {
    name: 'ApartmentDetailComponent',
    components: {
        MapComponent
    },
    props: ['id'],
    data() {
        return {
            store,
            apartment: {},
            message: {
                name: '',
                surname: '',
                email: '',
                body: ''
            }
        };
    },
    computed: {
        imageUrl() {
            return this.apartment.cover_image ? `http://127.0.0.1:8000/storage/${this.apartment.cover_image}` : 'https://via.placeholder.com/320x240';
        }
    },
    mounted() {
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
        sendMessage() {
            // Invia il messaggio al back end (Laravel)
            console.log(this.message);
            axios.post(`${this.store.apiBaseUrl}/apartments/${this.id}/send-message`, this.message)
                .then(response => {
                    console.log(response);
                    alert('Messaggio inviato con successo!');
                    this.message = { name: '',surname: '', email: '', body: '' }; // Pulisce il form dopo l'invio
                })
                .catch(error => {
                    console.error('Errore durante l\'invio del messaggio:', error);
                    
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
