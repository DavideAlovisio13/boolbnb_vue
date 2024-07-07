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
            <div class="row my-4">
                <div class="col-12 col-xl-6 col-md-12  col-sm-12 col-xxs-12 mt-md-4 mt-sm-4 custom-col container-fluid ">
                    <MapComponent :apartment="apartment" />
                </div>
                <div class="col-12 col-xl-6 col-md-12 col-sm-12 col-xxs-12 mt-md-4 mt-sm-4 custom-col container-fluid">
                    <form @submit.prevent="sendMessage" method="POST" class="form-control container-fluid">
                        <div class="form-floating mb-3">
                            <input type="text" id="floatingInput" v-model="message.name" required class="form-control border-0 border-bottom">
                            <label for="floatingInput">Nome</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" id="name" v-model="message.surname" required class="form-control border-0 border-bottom">
                            <label for="floatingInput">Cognome</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" id="email" v-model="message.email" required class="form-control border-0 border-bottom">
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea id="floatingTextarea" v-model="message.body" required class="form-control border-0 border-bottom" @input="adjustHeight">{{  this.message.body }}</textarea>
                            <label for="floatingTextarea">Messaggio</label>
                        </div>
                        <button type="submit" class="my-4 btn btn-primary">Invia Messaggio</button>
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
        },
        adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Resetta l'altezza per calcolare correttamente il nuovo scrollHeight
      textarea.style.height = textarea.scrollHeight + 'px'; // Imposta l'altezza al nuovo scrollHeight
    },
    }
}
</script>

<style scoped>
.apartment-image {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
}
textarea {
    overflow: hidden;
    resize: none; /* Disabilita il ridimensionamento manuale da parte dell'utente */
}
</style>
