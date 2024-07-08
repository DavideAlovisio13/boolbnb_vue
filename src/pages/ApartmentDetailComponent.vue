<template>
  <div class="container">
    <div class="apartment-details">
      <h1 v-if="apartment.name" class="apartment-title">{{ apartment.name }}</h1>
      <img v-if="apartment.cover_image" :src="imageUrl" :alt="apartment.name" class="apartment-image">
      <div v-if="apartment.name" class="apartment-message">
        <p>{{ apartment.description }}</p>
        <p>Stanze: {{ apartment.num_rooms }}</p>
        <p>Letti: {{ apartment.num_beds }}</p>
        <p>Bagni: {{ apartment.num_bathrooms }}</p>
        <p>Metri quadrati: {{ apartment.square_meters }}</p>
        <p>Indirizzo: {{ apartment.address }}</p>
        <div class="row my-4">
          <div class="col-12 mt-md-4 mt-sm-4 custom-col container-fluid">
            <MapComponent :apartment="apartment" />
          </div>
          <div class="col-12 mt-md-4 mt-sm-4 custom-col container-fluid">
            <b-button variant="primary" @click="showModal = true">Apri Modale</b-button>
          </div>
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>

    <b-modal v-model="showModal" title="Invia un messaggio" modal-class="custom-modal" dialog-class="slide-in-right">
      <form @submit.prevent="sendMessage" method="POST" class="form-control container-fluid">
        <div class="form-floating mb-3">
          <input type="text" id="floatingInput" v-model="message.name" required
            class="form-control border-0 border-bottom">
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
          <textarea id="floatingTextarea" v-model="message.body" required class="form-control border-0 border-bottom"
            @input="adjustHeight">{{ message.body }}</textarea>
          <label for="floatingTextarea">Messaggio</label>
        </div>
        <b-button type="submit" variant="primary" class="my-4">Invia Messaggio</b-button>
      </form>
    </b-modal>
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
      },
      showModal: false
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
          this.message = { name: '', surname: '', email: '', body: '' }; // Pulisce il form dopo l'invio
        })
        .catch(error => {
          console.error('Errore durante l\'invio del messaggio:', error);
        });
    },
    adjustHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Resetta l'altezza per calcolare correttamente il nuovo scrollHeight
      textarea.style.height = textarea.scrollHeight + 'px'; // Imposta l'altezza al nuovo scrollHeight
    }
  }
}
</script>

<style scoped>

.apartment-details {
  width: 700px;
  margin: o auto;
  border: 4px solid #000;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 10px 10px 0 #000;
  font-family: "Arial", sans-serif;
}

.apartment-title {
  font-weight: 900;
  color: #000;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.apartment-message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
    font-weight: 600;
}

.apartment-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

textarea {
  overflow: hidden;
  resize: none;
  /* Disabilita il ridimensionamento manuale da parte dell'utente */
}

/* Custom styles for the modal */
.custom-modal .modal-dialog {
  max-width: 50%;
  margin: 0;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.custom-modal.show .modal-dialog {
  transform: translateX(0);
}

/* Add transition class */
.slide-in-right {
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
}

.slide-in-right.modal-open .modal-dialog {
  transform: translateX(0);
}
</style>