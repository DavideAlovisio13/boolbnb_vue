<template>
    <div>
        <JumboComponent />
        <div class="card">
            <span class="card__title">Sponsorizzati</span>
        </div>
        <div class="container text-center mt-2">
            <div class="row row-cols-2 row-cols-lg-4 g-5 g-lg-3">
                <div class="col " v-for="(item, index) in store.sponsored" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" :is_sponsored="item.is_sponsored"
                        :sponsored="sponsored" />
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
            store,
            sponsored: false
        }
    },
    methods: {
        getApartments() {
            axios.get('http://127.0.0.1:8000/api/apartments').then((response) => {
                this.store.apartments = response.data.results;
                //console.log('Apartments:', this.store.apartments);
            })
        },
        getSponsored() {
            axios.get('http://127.0.0.1:8000/api/apartments/sponsored').then((response) => {
                this.store.sponsored = response.data.results;
                this.sponsored = true;
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

<style lang="scss" scoped>
.card {
    width: 400px;
    padding: 20px;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    margin: 10px 80px;
}

.card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
}

.card__title {
    font-size: 32px;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 15px;
    display: block;
    position: relative;
    overflow: hidden;
}

.card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
}

.card:hover .card__title::after {
    transform: translateX(0);
}

</style>