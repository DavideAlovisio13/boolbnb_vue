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
    <div class="container pt-6">
        <h4 class="mt-4 mb-3">Contatta l'host</h4>
     <!-- Form per inviare messaggi -->
     <form @submit.prevent="sendMessage()">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name"  class="form-control" v-model="messages.name" required>
      </div>
    
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email"  class="form-control" v-model="messages.email" required>
      </div>
      <div>
        <label for="content">Messaggio:</label>
        <textarea id="content" v-model="messages.body"  class="form-control" required>{{ body }}</textarea>
      </div>
      <button type="submit">Invia Messaggio</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';
import { store } from '@/store';
export default {
    props: ['id'],
    data() {
        return {
            store,
            apartment: {},
            messages:{ 
                 name:'',
                 surname:'',
                 email:'',
                 body:''
                }
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
            const data = {
                ...this.messages,
                apartment_id: this.apartment?.id || null,
            };
            //console.log(data)
            //posto in axios 
            axios.post(`${this.store.apiBaseUrl}/message`, data).then((res)=>{
                console.log(res)
            }).catch((error) =>{

            }).finally((error)=>{
                
            })
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