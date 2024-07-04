<template>
    <div>
        <JumboComponent />
        <div class="container text-center mt-5">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in store.sponsored" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image" :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
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
    methods: {
        getApartments() {
            axios.get('http://127.0.0.1:8000/api/apartments').then((response) => {
                this.store.apartment = response.data.results;
                console.log('Apartments:', this.store.apartment);
            })
        },
        getSponsored() {
            axios.get('http://127.0.0.1:8000/api/apartments/sponsored').then((response) => {
                this.store.sponsored = response.data.results;
                //console.log('Sponsored Apartments:', this.store.sponsored);
            })
        }
    },
    mounted() {
        this.getApartments();
        this.getSponsored();
    }
}
</script>

<style lang="scss" scoped></style>