<template>

    <!-- Background Video -->
    <video src="/videos/video-main.mp4" autoplay loop muted
        style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: -1; opacity: 20%">
    </video>

    <div class="container text-center mt-5 h-100">
        <!-- Search Component -->
        <SearchComponent @search-performed="getApartments" />

        <!-- Services Title -->
        <h4 class="fs-2 pt-3" style="font-family: 'Courier New', monospace; font-weight: bold;">Servizi</h4>

        <!-- Services Buttons -->
        <div class="d-flex justify-content-between align-items-start pt-3">
            <button v-for="(service, index) in services" :key="index"
                :class="{ 'selected-service': selectedServiceId.includes(service.id) }"
                class="service-item w-25 btn-ser d-flex flex-column align-items-center justify-content-start"
                @click="toggleServiceSelection(service.id)">
                <img :src="getServiceIconUrl(service.icon)" :alt="service.name"
                    style="width: 50px; height: 50px; aspect-ratio: 1 / 1; padding-bottom: 10px;" />
                <p style="font-family: 'Courier New', monospace; font-weight: bold; color: black;">{{ service.name }}
                </p>
            </button>
        </div>

        <!-- Filter Options -->
        <div class="d-flex justify-content-between align-items-center">
            <!-- Number of Rooms Filter -->
            <div class="d-flex flex-column">
                <label for="num_rooms">Numero camere</label>
                <select name="num_rooms" id="num_rooms" v-model="num_rooms">
                    <option value="all">Qualsiasi</option>
                    <option value="1">1 camera</option>
                    <option value="2">2 camere</option>
                    <option value="3">3 camere</option>
                    <option value="4">4 camere</option>
                    <option value="5">5 o più camere</option>
                </select>
            </div>

            <!-- Number of Beds Filter -->
            <div class="d-flex flex-column">
                <label for="num_beds">Numero letti</label>
                <select name="num_beds" id="num_beds" v-model="num_beds">
                    <option value="all">Qualsiasi</option>
                    <option value="1">1 posto letto</option>
                    <option value="2">2 posti letto</option>
                    <option value="3">3 posti letto</option>
                    <option value="4">4 posti letto</option>
                    <option value="5">5 o più posti letto</option>
                </select>
            </div>

            <!-- Distance Filter -->
            <div class="d-flex flex-column">
                <label for="distance">Distanza</label>
                <input type="range" v-model="distance" name="distance" id="distance" min="3" max="50" value="20"
                    step="1">
                <span>{{ distance }} km</span>
            </div>

            <!-- Apply Filters Button -->
            <button @click="getAdvancedSearchResults">
                <span class="button_top">Applica i filtri</span>
            </button>
        </div>

        <!-- Number of Results -->
        <p class="py-5" style="font-family: 'Courier New', monospace; font-weight: bold;">Numero di risultati: {{
            allApartments.length }}</p>

        <!-- Apartments Cards -->
        <div class="row row-cols-4">
            <div class="col mx-5 p-3" v-for="(item, index) in allApartments" :key="index">
                <CardApComponent :apartment="item" :index="index" :title="item.name" :image="item.cover_image"
                    :num_rooms="item.num_rooms" :num_beds="item.num_beds" :class="['bg-warning', 'sponsored']"
                    :distance="item.distance" />
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { store } from '../store';
import CardApComponent from '../components/CardApComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';
import JumboComponent from '@/components/JumboComponent.vue';
export default {
    name: 'Search',
    components: {
        CardApComponent,
        SearchComponent,
        JumboComponent
    },
    data() {
        return {
            store,
            apartmentsBase: [],
            apartmentsSponsored: [],
            services: [],
            searchAddress: '',
            latitude: null,
            longitude: null,
            filteredApartmentsBase: [],
            filteredApartmentsSponsored: [],
            allApartments: [],
            selectedServiceId: [],
            num_beds: 'all',
            num_rooms: 'all',
            distance: 20
        }
    },

    methods: {
        getApartments({ query, latitude, longitude }) {
            this.searchAddress = query;
            const url = `${this.store.apiBaseUrl}apartments/search/${encodeURIComponent(query)}/${latitude}/${longitude}`;
            axios.get(url).then((response) => {
                this.apartmentsBase = response.data.results.base;
                this.apartmentsSponsored = response.data.results.sponsored;
                this.services = response.data.results.services;
                this.filteredApartmentsBase = [...this.apartmentsBase];
                this.filteredApartmentsSponsored = [...this.apartmentsSponsored];
                this.allApartments = [...this.apartmentsSponsored, ...this.apartmentsBase];
            }).catch((error) => {
                console.error('API error:', error);
            });
        },
        toggleServiceSelection(serviceId) {
            const index = this.selectedServiceId.indexOf(serviceId);
            if (index === -1) {
                this.selectedServiceId.push(serviceId);
            } else {
                this.selectedServiceId.splice(index, 1);
            }
            this.getAdvancedSearchResults();
        },

        getAdvancedSearchResults() {
            const query = this.searchAddress;
            const latitude = this.latitude;
            const longitude = this.longitude;
            const rooms = this.num_rooms;
            const beds = this.num_beds;
            const range = this.distance;
            const serviceIds = this.selectedServiceId.length > 0 ? this.selectedServiceId.join(',') : 'all';
            const url = `${this.store.apiBaseUrl}apartments/advanced-search/${encodeURIComponent(query)}/${latitude}/${longitude}/${serviceIds}/${rooms}/${beds}/${range}`;
            axios.get(url)
                .then((response) => {
                    this.filteredApartmentsBase = response.data.results.base;
                    this.filteredApartmentsSponsored = response.data.results.sponsored;
                    this.allApartments = [...this.filteredApartmentsSponsored, ...this.filteredApartmentsBase];
                }).catch((error) => {
                    console.error('API error:', error);
                })
        },

        extractParamsFromUrl(url) {
            const parts = url.split('/');
            const query = decodeURIComponent(parts[parts.indexOf('search') + 1]);
            const latitude = parseFloat(parts[parts.indexOf(query) + 1]);
            const longitude = parseFloat(parts[parts.indexOf(query) + 2]);
            return { query, latitude, longitude };
        },
        getServiceIconUrl(iconPath) {
            return `http://127.0.0.1:8000/${iconPath}`;
        },
    },
    mounted() {
        const fullUrl = window.location.href;
        const { query, latitude, longitude } = this.extractParamsFromUrl(fullUrl);
        this.latitude = latitude;
        this.longitude = longitude;
        this.getApartments({ query, latitude, longitude });
    },

}
</script>

<style lang="scss" scoped>
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: #e9b50b;
    /* Cambia questo colore come preferisci */
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    /* Questo valore può variare a seconda dell'altezza della traccia */
}

.btn-ser {
    font-size: 17px;
    background: transparent;
    border: none;
    padding: 1em 1.5em;
    color: #ffedd3;
    text-transform: uppercase;
    position: relative;
    transition: 0.5s ease;
    cursor: pointer;
    border-radius: 0;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 0;
        background-color: #ffc506;
        transition: 0.5s ease;
    }

    &:hover {
        color: #1e1e2b;
        transition-delay: 0.5s;
        box-shadow: 2px 2px 0 #000;
    }

    &:hover::before {
        width: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0;
        width: 100%;
        background-color: #ffc506;
        transition: 0.4s ease;
        z-index: -1;
    }

    &:hover::after {
        height: 100%;
        transition-delay: 0.4s;
        color: aliceblue;
    }


}

button {
    /* Variables */
    --button_radius: 0.75em;
    --button_color: #e8e8e8;
    --button_outline_color: #000000;
    font-size: 17px;
    font-weight: bold;
    border: none;
    border-radius: var(--button_radius);
    background: var(--button_outline_color);
}

.button_top {
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.75em 1.5em;
    background: var(--button_color);
    color: var(--button_outline_color);
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
}

button:hover .button_top {
    /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
}

button:active .button_top {
    /* Push the button downwards when pressed */
    transform: translateY(0);
}

.list-unstyled {
    padding-left: 0;
    list-style: none;
}

.card {
    width: 400px;
    padding: 20px;
    background: #fff;
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    margin: 20px 80px;
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

.service-item {
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border 0.3s;
}

.selected-service {
    background-color: #FFC107;
    border: 2px solid #a9a9a9;
    border-radius: 5px;
}

.container {
    padding-top: 200px;
}
</style>
