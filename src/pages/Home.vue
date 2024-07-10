<template>
    <section id="home_main">
        <JumboComponent />
        <!-- Sezione per gli appartamenti sponsorizzati -->
        <div class="card">
            <span class="card__title">Sponsorizzati</span>
        </div>
        <!-- <div class="left">
            <div class="container text-center mt-2">
                <div class="row row-cols-2 row-cols-lg-4 g-5 g-lg-3">
                    <div class="col" v-for="(item, index) in store.sponsored" :key="index">
                        <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                            :num_rooms="item.num_rooms" :num_beds="item.num_beds" :is_sponsored="item.is_sponsored" />
                    </div>
                </div>
            </div>
        </div> -->
        <div class="container position-relative mt-5">
            <button class="btn btn-17 position-absolute start-0 top-50 translate-middle-y" @click="scrollLeft">
                <span class="text-container">
                    <span class="text fs-2"><i class="fa-solid fa-arrow-left"></i></span>
                </span>
            </button>

            <div class="row overflow-hidden">
                <div ref="scrollContainer" class="d-flex overflow-auto">
                    <div class="col-12 col-md-6 col-lg-4 p-4" v-for="(item, index) in store.sponsored" :key="index">
                        <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                            :num_rooms="item.num_rooms" :num_beds="item.num_beds" :is_sponsored="item.is_sponsored" />
                    </div>
                </div>
            </div>

            <button class="btn btn-17 position-absolute end-0 top-50 translate-middle-y" @click="scrollRight">
                <span class="text-container">
                    <span class="text fs-2"><i class="fa-solid fa-arrow-right"></i></span>
                </span>
            </button>
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
        }
    },
    methods: {
        scrollLeft() {
            const container = this.$refs.scrollContainer;
            container.scrollBy({ left: -200, behavior: 'smooth' });
        },
        scrollRight() {
            const container = this.$refs.scrollContainer;
            container.scrollBy({ left: 200, behavior: 'smooth' });
        },
        // getApartments() {
        //     axios.get('http://127.0.0.1:8000/api/apartments/base').then((response) => {
        //         this.store.apartments = response.data.results;
        //         //console.log('Apartments:', this.store.apartments);
        //     }).catch((error) => {
        //         console.error('API error:', error);
        //     });
        // },
        getSponsored() {
            axios.get(`${this.store.apiBaseUrl}apartments/sponsored`).then((response) => {
                this.store.sponsored = response.data.results;
                //console.log('Sponsored Apartments:', this.store.sponsored);

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
.c-btn-left {
    top: 50%;
    left: 500px;
}

.c-btn-right {
    top: 50%;
    right: 500px;
}

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

.btn-17,
.btn-17 *,
.btn-17 :after,
.btn-17 :before,
.btn-17:after,
.btn-17:before {
    border: 0 solid;
    box-sizing: border-box;
}

.btn-17 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: #000;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
    text-transform: uppercase;
}

.btn-17:disabled {
    cursor: default;
}

.btn-17:-moz-focusring {
    outline: auto;
}

.btn-17 svg {
    display: block;
    vertical-align: middle;
}

.btn-17 [hidden] {
    display: none;
}

.btn-17 {
    border-radius: 99rem;
    border-width: 2px;
    padding: 0.8rem 3rem;
    z-index: 0;
}

.btn-17,
.btn-17 .text-container {
    overflow: hidden;
    position: relative;
}

.btn-17 .text-container {
    display: block;
    mix-blend-mode: difference;
}

.btn-17 .text {
    display: block;
    position: relative;
}

.btn-17:hover .text {
    -webkit-animation: move-up-alternate 0.3s forwards;
    animation: move-up-alternate 0.3s forwards;
}

@-webkit-keyframes move-up-alternate {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(80%);
    }

    51% {
        transform: translateY(-80%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes move-up-alternate {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(80%);
    }

    51% {
        transform: translateY(-80%);
    }

    to {
        transform: translateY(0);
    }
}

.btn-17:after,
.btn-17:before {
    --skew: 0.2;
    background: #fff;
    content: "";
    display: block;
    height: 102%;
    left: calc(-50% - 50% * var(--skew));
    pointer-events: none;
    position: absolute;
    top: -104%;
    transform: skew(calc(150deg * var(--skew))) translateY(var(--progress, 0));
    transition: transform 0.2s ease;
    width: 100%;
}

.btn-17:after {
    --progress: 0%;
    left: calc(50% + 50% * var(--skew));
    top: 102%;
    z-index: -1;
}

.btn-17:hover:before {
    --progress: 100%;
}

.btn-17:hover:after {
    --progress: -102%;
}
</style>
