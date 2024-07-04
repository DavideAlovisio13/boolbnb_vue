<template>
    <div>
      <h2>Nearby Places</h2>
      <ul>
        <li v-for="place in nearbyPlaces" :key="place.id">
          {{ place.poi.name }} - {{ place.address.freeformAddress }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nearbyPlaces: []
      };
    },
    mounted() {
      // Ottieni l'URL completo
      const fullUrl = window.location.href;
      
      // Esegui la funzione per estrarre query, latitudine e longitudine
      const { query, latitude, longitude } = this.extractParamsFromUrl(fullUrl);
      
      // Chiamata API
      this.fetchNearbyPlaces(query, latitude, longitude);
    },
    methods: {
      async fetchNearbyPlaces(query, latitude, longitude) {
        try {
          // Esegui la chiamata API a TomTom
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json`, {
            params: {
              key: '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI',
              limit: 10, // Limite massimo di risultati
              radius: 20000, // Raggio in metri (20 km)
              lat: latitude, // Latitudine
              lon: longitude, // Longitudine
              idxSet: 'POI'
            }
          });
  
          // Salva i risultati nella variabile nearbyPlaces
          this.nearbyPlaces = response.data.results;
          console.log('Nearby Places:', this.nearbyPlaces);
        } catch (error) {
          console.error('Error fetching nearby places:', error);
        }
      },
      extractParamsFromUrl(url) {
        // Esempio di URL: http://localhost:5174/search/Via%20Napo%20della%20Torre,%2020029%20Turbigo/45.536234/8.738512
        const parts = url.split('/');
        
        // La query di ricerca è l'elemento dopo 'search/'
        const query = decodeURIComponent(parts[parts.indexOf('search') + 1]);
        
        // La latitudine è l'elemento dopo la query
        const latitude = parseFloat(parts[parts.indexOf(query) + 1]);
        
        // La longitudine è l'elemento dopo la latitudine
        const longitude = parseFloat(parts[parts.indexOf(query) + 2]);
        
        return { query, latitude, longitude };
      }
    }
  };
  </script>
  