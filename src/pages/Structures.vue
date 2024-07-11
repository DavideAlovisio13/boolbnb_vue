<template>
    <section class=""
        style="background-image: url(/images/bg-main.png); background-repeat: no-repeat; background-size: cover">
        <div class="top-card">
            <div class="card">
                <span class="card__title">Sponsorizzati</span>
            </div>
        </div>
        <div class="container text-center">
            <div class="row row-cols-4">
                <div class="co p-3 mx-5" v-for="(item, index) in store.apartments" :key="index">
                    <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                        :num_rooms="item.num_rooms" :num_beds="item.num_beds" />
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios';
import CardApComponent from '@/components/CardApComponent.vue';
import { store } from '../store';
export default {
    name: 'Structures',
    components: {
        CardApComponent,
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getApartments() {
            axios.get('http://127.0.0.1:8000/api/apartments').then((response) => {
                this.store.apartments = response.data.results;

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
    padding-top: 100px;
}

.top-card {
    padding-top: 200px;
}

.card {
    width: 500px;
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
