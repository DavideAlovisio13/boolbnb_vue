<template>
    <!-- Contenitore principale della mappa -->
    <div class="position-relative">
        <!-- Elemento che conterrà la mappa, referenziato -->
        <div class="map-container" ref="map"></div>

        <!-- Pulsanti per il controllo dello zoom della mappa -->
        <div class="zoombtn">
            <button class="d-block" @click="zoomIn">+</button>
            <button class="d-block" @click="zoomOut">-</button>
        </div>
    </div>
</template>

<script>
// Importa la libreria TomTom per le mappe
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {
    name: 'MapComponent',
    props: {
        // Proprietà passata al componente: i dettagli dell'appartamento
        apartment: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // Quando il componente è montato, inizializza la mappa
        this.initializeMap();
    },
    methods: {
        // Metodo per inizializzare la mappa TomTom
        initializeMap() {
            // Verifica che i dati dell'appartamento siano presenti e validi
            if (this.apartment && this.apartment.latitude && this.apartment.longitude) {
                // Ottieni le coordinate dall'oggetto dell'appartamento
                const latitude = parseFloat(this.apartment.latitude);
                const longitude = parseFloat(this.apartment.longitude);

                // Verifica che le coordinate siano numeri validi
                if (isNaN(latitude) || isNaN(longitude)) {
                    console.error('Invalid latitude or longitude');
                    return;
                }

                // Inizializza la mappa TomTom
                this.map = tt.map({
                    key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI', // Sostituisci con la tua API Key TomTom
                    container: this.$refs.map, // Utilizza il riferimento al div della mappa
                    center: [longitude, latitude], // Imposta il centro della mappa sulle coordinate date
                    zoom: 1 // Livello di zoom iniziale della mappa
                });

                // Aggiungi un marker alla posizione dell'appartamento
                new tt.Marker().setLngLat([longitude, latitude]).addTo(this.map);
            }
        },
        // Metodo per aumentare lo zoom della mappa
        zoomIn() {
            if (this.map) {
                const zoom = this.map.getZoom(); // Ottieni il livello di zoom corrente
                this.map.setZoom(zoom + 1); // Imposta uno zoom superiore di 1
            }
        },
        // Metodo per diminuire lo zoom della mappa
        zoomOut() {
            if (this.map) {
                const zoom = this.map.getZoom(); // Ottieni il livello di zoom corrente
                this.map.setZoom(zoom - 1); // Imposta uno zoom inferiore di 1
            }
        }
    }
}
</script>

<style scoped>
/* Importa lo stile base delle mappe TomTom */
@import '@tomtom-international/web-sdk-maps/dist/maps.css';

/* Stile per il contenitore della mappa */
.map-container {
    width: 90%;
    height: 400px;
    margin: 0 auto;
    border: 2px solid #000;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}

/* Stile per i pulsanti di zoom */
button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
}

/* Stile per il contenitore dei pulsanti di zoom */
.zoombtn {
    position: absolute;
    top: 0;
    right: 50px;
    z-index: 1;
    margin: 10px;
}
</style>
