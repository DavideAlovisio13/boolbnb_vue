<template>
    <div>
        <JumboComponent />
        <div class="container text-center mt-5">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col m-5" v-for="(item, index) in store.apartments" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.title" :image="item.cover_image" :key="index"/>
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
                this.store.apartments = response.data.results
                console.log(this.store.apartments)
            })
        }
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<style lang="scss" scoped></style>