<template>
    <!-- Card Component -->
    <div class="brutalist-card" :class="{ 'brutalist-card--sponsored': sponsored }">
        <!-- Card Header -->
        <div v-if="apartment.sponsors">
            <div class="wrapper">
                <div class="option">
                    <input class="input" type="radio" name="btn" value="option1" checked="">
                    <div class="btn">
                        <span class="span">Sponsored</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="brutalist-card__header">
            <div class="brutalist-card__alert">{{ title }}</div>
        </div>
        <!-- Card Image -->
        <!-- <img src="/public/images/BG.png" alt="" class="brutalist-card__image"> -->
        <img :src="imageUrl" :alt="title" class="brutalist-card__image">

        <!-- Apartment Details -->
        <div class="hint-content do--split-children w-100 align-items-center justify-content-between pt-4">
            <div class="d-flex align-items-center justify-content-between">
                <p class="fs-4"><strong><i class="fa-solid px-2 fa-house-user"></i></strong>{{ apartment.num_rooms }}
                </p>
                <p class="fs-4"><strong><i class="fa-solid px-2 fa-bed"></i></strong>{{ apartment.num_beds }}</p>
                <p class="fs-4"><strong><i class="fa-solid px-2 fa-bath"></i></strong>{{ apartment.num_bathrooms }}</p>
                <p class="fs-4"><strong><i class="fa-solid px-2 fa-ruler"></i></strong>{{ apartment.square_meters }} m²
                </p>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <p v-if="apartment.distance" class="card-text">Distanza: {{ formatDistance(distance) }}</p>
            </div>
        </div>

        <!-- Card Actions -->
        <div class="brutalist-card__actions">
            <router-link :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }"
                class="brutalist-card__button brutalist-card__button--read">Dettagli</router-link>
        </div>

        <!-- Stats Section -->
        <div class="stats pt-2">
            <div>
                <!-- Date -->
                <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"></path>
                        <circle stroke-width="2" r="9" cy="12" cx="12"></circle>
                    </svg>Feb 24</div>
                <!-- Comments -->
                <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5"
                            d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z">
                        </path>
                    </svg>{{ apartment.messages_count }}</div>
                <!-- Likes -->
                <div><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-2.5 0 32 32">
                        <path fill="#000000"
                            d="M0 10.284l0.505 0.36c0.089 0.064 0.92 0.621 2.604 0.621 0.27 0 0.55-0.015 0.836-0.044 3.752 4.346 6.411 7.472 7.060 8.299-1.227 2.735-1.42 5.808-0.537 8.686l0.256 0.834 7.63-7.631 8.309 8.309 0.742-0.742-8.309-8.309 7.631-7.631-0.834-0.255c-2.829-0.868-5.986-0.672-8.686 0.537-0.825-0.648-3.942-3.3-8.28-7.044 0.11-0.669 0.23-2.183-0.575-3.441l-0.352-0.549-8.001 8.001zM1.729 10.039l6.032-6.033c0.385 1.122 0.09 2.319 0.086 2.334l-0.08 0.314 0.245 0.214c7.409 6.398 8.631 7.39 8.992 7.546l-0.002 0.006 0.195 0.058 0.185-0.087c2.257-1.079 4.903-1.378 7.343-0.836l-13.482 13.481c-0.55-2.47-0.262-5.045 0.837-7.342l0.104-0.218-0.098-0.221-0.031 0.013c-0.322-0.632-1.831-2.38-7.498-8.944l-0.185-0.215-0.282 0.038c-0.338 0.045-0.668 0.069-0.981 0.069-0.595 0-1.053-0.083-1.38-0.176z">
                        </path>
                    </svg>{{apartment.views_count}}</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'CardApComponent',
    props: ['apartment', 'index', 'title', 'image', 'num_rooms', 'num_beds', 'sponsored', 'distance', 'is_sponsored', 'messages_count'],
    methods: {
        formatDistance(distance) {
            return distance.toFixed(2) + ' km';
        }
    },
    computed: {
        imageUrl() {
            return this.image ? `http://127.0.0.1:8000/storage/${this.image}` : 'https://via.placeholder.com/320x240';
        }
    }
}
</script>

<style lang="scss" scoped>
.stats {
    position: relative;
    width: 100%;
    color: #9fa4aa;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stats div {
    margin-right: 1rem;
    height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.stats svg {
    margin-right: 5px;
    height: 100%;
    stroke: #9fa4aa;
}

.brutalist-card {
    width: 350px;
    height: 600px;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 15px 15px 0 #000;
    }
}

.brutalist-card--sponsored {
    width: 350px;
    height: 600px;
    border: 4px solid #000;
    background-color: #e9b50b;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
}

.brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
}

.brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.5rem;
}

.brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: #fff;
}

.brutalist-card__alert {
    font-weight: 900;
    color: #000;
    font-size: 1.8rem;
    text-transform: uppercase;
}

.brutalist-card__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    overflow: hidden;
    margin-bottom: 1rem;
}

.brutalist-card__message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
    font-weight: 600;
}

.brutalist-card__actions {
    margin-top: 1rem;
}

.brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #000;
    background-color: #fff;
    color: #000;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #000;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 1rem;
}

.brutalist-card__button--read {
    background-color: #000;
    color: #fff;
}

.brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent);
    transition: all 0.6s;
}

.brutalist-card__button:hover::before {
    left: 100%;
}

.brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #000;
}

.brutalist-card__button--mark:hover {
    background-color: black;
    border-color: white;
    color: #fff;
    box-shadow: 7px 7px 0 black;
}

.brutalist-card__button--read:hover {
    background-color: #ff0000;
    border-color: #ff0000;
    color: #fff;
    box-shadow: 7px 7px 0 #800000;
}

.brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
}

.item-hints {
    --purple: #720c8f;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
}

.item-hints .hint {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-hints .hint-dot {
    z-index: 3;
    border: 1px solid black;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    -webkit-transform: translate(-0%, -0%) scale(0.95);
    transform: translate(-0%, -0%) scale(0.95);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
}

.item-hints .hint-radius {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -125px 0 0 -125px;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: scale(0);
    transform: scale(0);
}

.item-hints .hint[data-position="1"] .hint-content {
    top: 85px;
    left: 50%;
    margin-left: 56px;
}

.item-hints .hint-content {
    width: 300px;
    position: absolute;
    z-index: 1000;
    padding: 35px 0;
    opacity: 0;
    transition: opacity 0.7s ease, visibility 0.7s ease;
    color: #fff;
    visibility: hidden;
    pointer-events: none;
}

.item-hints .hint:hover .hint-content {
    position: absolute;
    z-index: 5;
    padding: 35px 0;
    opacity: 1;
    -webkit-transition: opacity 0.7s ease, visibility 0.7s ease;
    transition: opacity 0.7s ease, visibility 0.7s ease;
    color: black;
    visibility: visible;
    pointer-events: none;
}

.item-hints .hint-content::before {
    width: 0px;
    bottom: 29px;
    left: 0;
    content: "";
    background-color: black;
    height: 1px;
    position: absolute;
    transition: width 0.4s;
}

.item-hints .hint:hover .hint-content::before {
    width: 180px;
    transition: width 0.4s;
}

.item-hints .hint-content::after {
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: rotate(-225deg);
    transform: rotate(-225deg);
    bottom: 29px;
    left: 0;
    width: 80px;
    content: "";
    background-color: black;
    height: 1px;
    position: absolute;
    opacity: 1;
    -webkit-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
}

.item-hints .hint:hover .hint-content::after {
    opacity: 1;
    visibility: visible;
}

.item-hints .hint[data-position="4"] .hint-content {
    bottom: 85px;
    left: 50%;
    margin-left: 56px;
}

.wrapper {
    --font-color-dark: #323232;
    --font-color-light: #FFF;
    --bg-color: #fff;
    --main-color: #323232;
    position: relative;
    width: 102px;
    height: 36px;
    background-color: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 4px 4px var(--main-color);
}

.option {
    width: 95px;
    height: 28px;
    position: relative;
    top: 2px;
    left: 2px;
    padding-right: 4px;

}

.input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    appearance: none;
    cursor: pointer;
}

.btn {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.span {
    color: var(--font-color-dark);
}

.input:checked+.btn {
    background-color: var(--main-color);
}

.input:checked+.btn .span {
    color: var(--font-color-light);
}
</style>