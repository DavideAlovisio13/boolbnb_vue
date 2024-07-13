<template>
    <!-- Jumbo Component -->
    <JumboComponent />

    <!-- Main Section with Background Video -->
    <section id="home_main" class="template-bg position-relative h-100 w-100">
        <!-- Background Video -->
        <video src="/videos/video-main.mp4" autoplay loop muted
            style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: -1; opacity: 20%">
        </video>

        <!-- Sponsored Apartments Section -->
        <div id="sponsor" class="pt-5">
            <!-- Title Card -->
            <div class="card">
                <span class="card__title">Sponsorizzati</span>
            </div>

            <!-- Cards Section -->
            <div id="cards-section">
                <div class="container text-center">
                    <div class="row row-cols-3">
                        <!-- Loop through Sponsored Apartments -->
                        <div class="col-4 col-md-6 py-5" v-for="(item, index) in store.sponsored" :key="index">
                            <!-- Card Component for Each Apartment -->
                            <CardApComponent :apartment="item" :index="index" :title="item.name"
                                :image="item.cover_image" :num_rooms="item.num_rooms" :num_beds="item.num_beds"
                                :is_sponsored="item.is_sponsored" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
        CardApComponent,
    },
    data() {
        return {
            store,
            showOptions: true
        }
    },
    methods: {
        // getApartments() {
        //     axios.get('http://127.0.0.1:8000/api/apartments/base').then((response) => {
        //         this.store.apartments = response.data.results;
        //         //console.log('Apartments:', this.store.apartments);
        //     }).catch((error) => {
        //         console.error('API error:', error);
        //     });
        // },
        getSponsored() {
            this.store.sponsored = [];
            axios.get(`${this.store.apiBaseUrl}apartments/sponsored`).then((response) => {
                this.store.sponsored = response.data.results;
                console.log('Sponsored Apartments:', this.store.sponsored);

            }).catch((error) => {
                console.error('API error:', error);
            });
        }
    },
    mounted() {
        this.getSponsored();
    }
}
</script>

<style lang="scss" scoped>
#home_main {
    height: calc(100% - 1000px);


    ::-webkit-scrollbar {
        display: none;
    }
}

.card {
    width: 400px;
    padding: 20px;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    margin: 0px 80px;
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
