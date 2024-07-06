<template>
    <div id="map" class="map-container"></div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'MapComponent',
    props: {
        apartment: {
            type: Object,
            required: true,
            default: () => ({ latitude: '0', longitude: '0' }) // Coordinate di default
        },
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            console.log(this.apartment);
            // Log per verificare i valori delle coordinate
            console.log('Latitude:', this.apartment.latitude);
            console.log('Longitude:', this.apartment.longitude);

            const latitude = parseFloat(this.apartment.latitude);
            const longitude = parseFloat(this.apartment.longitude);

            // Controllo se le coordinate sono numeri validi
            if (isNaN(latitude) || isNaN(longitude)) {
                console.error('Invalid latitude or longitude');
                return;
            }

            const map = tt.map({
                key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI', // Sostituisci con la tua API Key
                container: 'map',
                center: [longitude, latitude], // Coordinate per il centro della mappa
                zoom: 10
            });
        }
    }
};
</script>

<style>
.map-container {
    width: 400px;
    height: 400px;
    margin: 0 auto;
}
</style>
