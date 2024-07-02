<template>
    <div>
        <JumboComponent />
        <div class="container text-center mt-5">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col" v-for="(item, index) in store.apartments" :key="index">
                    <CardApComponent :apartments="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '@/store';
import JumboComponent from '@/components/JumboComponent.vue';
import CardApComponent from '@/components/CardApComponent.vue';
export default {
    name: 'Home',
    components: {
        JumboComponent,
        CardApComponent
    },
    data() {
        return {
            store
        }
    },
    computed: {
        async getApartments() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/apartments');
                this.store.apartments = response.data.results;
                console.log(this.store.apartments);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        }

    },
    mounted() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped></style>