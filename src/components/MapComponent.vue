<template>
    <div class="map-container" ref="map"></div>
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
                const map = tt.map({
                    key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI', // Sostituisci con la tua API Key
                    container: this.$refs.map,
                    center: [longitude, latitude], // Coordinate per il centro della mappa
                    zoom: 10
                });

                // Aggiungi un marker
                const marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
            }
        }
    }
}
</script>

<style scoped>
@import '@tomtom-international/web-sdk-maps/dist/maps.css';

.map-container {
    width: 100%;
    height: 400px;
}
</style>
