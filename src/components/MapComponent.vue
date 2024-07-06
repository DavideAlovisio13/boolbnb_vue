<template>
    <div id="map" class="map-container"></div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'MapComponent',
    props: {
        apartment: Object,
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            const map = tt.map({
                key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI', // Sostituisci con la tua API Key
                container: 'map',
                center: [this.apartment.longitude, this.apartment.latitude], // Coordinate per il centro della mappa
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