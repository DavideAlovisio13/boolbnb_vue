<template>
    <div class="container-fluid">
    </div>
</template>


<script>
import axios from 'axios';
import CardApComponent from '@/components/CardApComponent.vue';
export default {
    name: 'Structures',
    components: {
        CardApComponent,
        apartments: {}
    },
    methods: {
        getApartments() {
            axios.get('http://127.0.0.1:8000/api/apartments').then((response) => {
                this.apartments = response.data.results;
                //console.log('Apartments:', this.store.apartments);
            })
        },
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    /* Centers the carousel if needed */
    align-items: center;
    /* Centers the carousel vertically */
    justify-content: center;
    /* Centers the carousel horizontally */
}
</style>
