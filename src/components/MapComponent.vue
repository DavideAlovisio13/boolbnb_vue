<template>
    <div class="position-relative">
        <div class="map-container" ref="map"></div>
        <div class="zoombtn">
            <button class="d-block" @click="zoomIn">+</button>
            <button class="d-block" @click="zoomOut">-</button>
        </div>
    </div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {
    name: 'MapComponent',
    props: {
        apartment: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            // Verifica i dati dell'appartamento
            if (this.apartment && this.apartment.latitude && this.apartment.longitude) {
                const latitude = parseFloat(this.apartment.latitude);
                const longitude = parseFloat(this.apartment.longitude);

                // Controllo se le coordinate sono numeri validi
                if (isNaN(latitude) || isNaN(longitude)) {
                    console.error('Invalid latitude or longitude');
                    return;
                }

                // Inizializza la mappa con TomTom
                this.map = tt.map({
                    key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI', // Sostituisci con la tua API Key
                    container: this.$refs.map,
                    center: [longitude, latitude], // Coordinate per il centro della mappa
                    zoom: 10
                });

                // Aggiungi un marker
                new tt.Marker().setLngLat([longitude, latitude]).addTo(this.map);
            }
        },
        zoomIn() {
            if (this.map) {
                const zoom = this.map.getZoom();
                this.map.setZoom(zoom + 1);
            }
        },
        zoomOut() {
            if (this.map) {
                const zoom = this.map.getZoom();
                this.map.setZoom(zoom - 1);
            }
        }
    }
}
</script>

<style scoped>
@import '@tomtom-international/web-sdk-maps/dist/maps.css';

.map-container {
    width: 90%;
    height: 400px;
    margin: 0 auto;
    border: 2px solid #000;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
}

.zoombtn {
    position: absolute;
    top: 0;
    right: 50px;
    z-index: 1;
    margin: 10px;
}
</style>
