<template>
    <section class="w-100 vh-100 overflow-auto">
        <video src="/videos/Beige.mp4" autoplay loop muted
            style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; opacity: 20%">
        </video>
        <div class="top-card">
            <div class="card">
                <span class="card__title">Le nostre strutture</span>
            </div>
        </div>
        <div class="container text-center">
            <div class="row">
                <div class="col-12 col-md-6 col-xl-4 pb-5 d-flex justify-content-center" v-for="(item, index) in store.apartments" :key="index">
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
            store,
            
        }
    },
    methods: {
        getApartments() {
            axios.get('http://127.0.0.1:8000/api/apartments').then((response) => {
                this.store.apartments = response.data.results;
                console.log(this.store.apartments);

            }).catch((error) => {
                console.error('API error:', error);
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



@media (max-width: 576px) {
    .card {
        width: 400px;
    }
    .card__title {
        font-size: 28px;
    }
    .container{
    padding-top: 50px !important; 
}
}
</style>
