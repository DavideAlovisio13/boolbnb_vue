<template>
  <div class="container">
    <div class="apartment-details brutalist-card mt-2">
      <div class="top d-flex justify-content-between w-100">
        <div class="left " v-if="apartment.name">
          <h1 class="apartment-title brutalist-card__alert border-bottom border-black border-1 mb-5 pb-2">{{
            apartment.name }}</h1>
          <p class="fs-4"><strong>Descrizione:</strong> {{ apartment.description }}</p>
          <p class="fs-4"><strong><i class="fa-solid fa-house-user"></i>:
            </strong> {{ apartment.num_rooms }}</p>
          <p class="fs-4"><strong><i class="fa-solid fa-bed"></i>:</strong> {{ apartment.num_beds }}</p>
          <p class="fs-4"><strong><i class="fa-solid fa-bath"></i>:</strong> {{ apartment.num_bathrooms }}</p>
          <p class="fs-4"><strong><i class="fa-solid fa-ruler"></i>:</strong> {{ apartment.square_meters }} m²</p>
          <p class="fs-4"><strong><i class="fa-solid fa-location-dot"></i>:</strong> {{ apartment.address }}</p>
        </div>
        <div class="right" v-if="apartment.cover_image">
          <img v-if="apartment.cover_image" :src="imageUrl" :alt="apartment.name" class="apartment-image">
        </div>
      </div>
      <div v-if="apartment.name" class="apartment-message">
        <h2 class="apartment-title brutalist-card__alert border-bottom border-black border-1 mb-5 pb-2">Mappa</h2>
        <div class="row my-4">
          <div class="col-12 mt-md-4 mt-sm-4 custom-col container-fluid">
            <h3>Servizi</h3>
            <p class="fs-4 text-black" v-for="(apartment, index) in apartment.services" :key="index">
              <span><img :src="`http://127.0.0.1:8000/storage/${apartment.icon}`" alt=""></span>
              : {{ apartment.name }}
            </p>
          </div>
          <div class="col-12 mt-md-4 mt-sm-4 custom-col container-fluid">
            <MapComponent :apartment="apartment" />
          </div>
          <div class="col-12 mt-md-4 mt-sm-4 custom-col container-fluid ">
            <b-button class="brutalist-card__button" variant="danger" @click="showModal = true">Invia un messaggio al proprietario</b-button>
          </div>
        </div>
      </div>
      <div class="dot-spinner d-flex align-items-center mx-auto" v-else>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
      </div>

      <b-modal v-model="showModal" :title="modalTitle" modal-class="custom-modal myModal" dialog-class="slide-in-right"
        hide-footer>
        <form @submit.prevent="sendMessage" method="POST" class="form-control container-fluid">
          <div class="form-floating mb-3">
            <input type="text" id="floatingInput" pattern="[A-Za-z' ]+" title="Solo lettere ammesse"
              v-model="message.name" minlength="3" required class="form-control border-0 border-bottom">
            <label for="floatingInput">Nome</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" id="name" v-model="message.surname" pattern="[A-Za-z' ]+" title="Solo lettere ammesse"
              minlength="4" required class="form-control border-0 border-bottom">
            <label for="floatingInput">Cognome</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" id="email" v-model="message.email" required
              title="rispetta il formato richiesto: esempio@example.com" class="form-control border-0 border-bottom"
              @blur="validateEmail">
            <label for="floatingInput">Email</label>
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
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
      showModal: false,
      emailError: null
    };
  },
  computed: {
    imageUrl() {
      return this.apartment.cover_image ? `http://127.0.0.1:8000/storage/${this.apartment.cover_image}` : 'https://via.placeholder.com/320x240';
    },
    modalTitle() {
      return this.apartment.name ? `Chiedi informazioni per la casa: ${this.apartment.name}` : 'Chiedi informazioni all\'host';
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
      if (this.emailError) {
        alert('Correggi gli errori nel modulo.');
        return;
      }
      // Invia il messaggio al back end (Laravel)
      console.log(this.message);
      axios.post(`${this.store.apiBaseUrl}/apartments/${this.id}/send-message`, this.message)
        .then(response => {
          console.log(response);
          alert('Messaggio inviato con successo!');
          this.message = { name: '', surname: '', email: '', body: '' }; // Pulisce il form dopo l'invio
          this.showModal = false;
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
    validateEmail() {
      const emailPattern = /^[^\s@]+@[a-z]{2,}\.[a-z]{2,}$/;
      if (!emailPattern.test(this.message.email)) {
        this.emailError = 'rispetta il formato richiesto: esempio@email.com ';
      } else {
        this.emailError = null;
      }
    }
  }
}
</script>

<style scoped>
.brutalist-card {
  width: 75%;
  margin: 0 auto;
  border: 4px solid #000;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 10px 10px 0 #000;
  font-family: "Arial", sans-serif;
}

.brutalist-card__alert {
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
}

.brutalist-card__button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 3px solid #000;
  background-color: #fff;
  color: #000;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 5px 5px 0 #000;
  overflow: hidden;
  text-decoration: none;
  margin-bottom: 1rem;
}

.brutalist-card__button--read {
  background-color: #000;
  color: #fff;
}

.brutalist-card__button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
  transition: all 0.6s;
}

.brutalist-card__button:hover::before {
  left: 100%;
}

.brutalist-card__button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #000;
}

.brutalist-card__button--mark:hover {
  background-color: black;
  border-color: white;
  color: #fff;
  box-shadow: 7px 7px 0 black;
}

.brutalist-card__button--read:hover {
  background-color: #ff0000;
  border-color: #ff0000;
  color: #fff;
  box-shadow: 7px 7px 0 #800000;
}

.brutalist-card__button:active {
  transform: translate(5px, 5px);
  box-shadow: none;
}

.apartment-image {
  width: 350px;
  height: 450px;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 10px 10px 0 #000;
}

textarea {
  overflow: hidden;
  resize: none;
  /* Disabilita il ridimensionamento manuale da parte dell'utente */
}

.myModal {
  width: 800px !important;
}

/* Custom style per la modale */
.custom-modal .modal-dialog {
  width: 100%;
  /* Imposta la larghezza al 100% */
  max-width: 100%;
  /* Assicurati che la larghezza massima sia al 100% se necessario */
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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.dot-spinner {
  --uib-size: 2.8rem;
  --uib-speed: .9s;
  --uib-color: #183153;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
  font-family: "Arial", sans-serif;
}

.dot-spinner__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.dot-spinner__dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: var(--uib-color);
  transform: scale(0);
  opacity: 0.5;
  animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
  box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
}

.dot-spinner__dot:nth-child(2) {
  transform: rotate(45deg);
}

.dot-spinner__dot:nth-child(2)::before {
  animation-delay: calc(var(--uib-speed) * -0.875);
}

.dot-spinner__dot:nth-child(3) {
  transform: rotate(90deg);
}

.dot-spinner__dot:nth-child(3)::before {
  animation-delay: calc(var(--uib-speed) * -0.75);
}

.dot-spinner__dot:nth-child(4) {
  transform: rotate(135deg);
}

.dot-spinner__dot:nth-child(4)::before {
  animation-delay: calc(var(--uib-speed) * -0.625);
}

.dot-spinner__dot:nth-child(5) {
  transform: rotate(180deg);
}

.dot-spinner__dot:nth-child(5)::before {
  animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot-spinner__dot:nth-child(6) {
  transform: rotate(225deg);
}

.dot-spinner__dot:nth-child(6)::before {
  animation-delay: calc(var(--uib-speed) * -0.375);
}

.dot-spinner__dot:nth-child(7) {
  transform: rotate(270deg);
}

.dot-spinner__dot:nth-child(7)::before {
  animation-delay: calc(var(--uib-speed) * -0.25);
}

.dot-spinner__dot:nth-child(8) {
  transform: rotate(315deg);
}

.dot-spinner__dot:nth-child(8)::before {
  animation-delay: calc(var(--uib-speed) * -0.125);
}

@keyframes pulse0112 {

  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
