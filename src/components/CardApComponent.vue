<template>
    <div class="brutalist-card" :class="{ 'brutalist-card--sponsored': sponsored }">
        <div class="brutalist-card__header">
            <div class="brutalist-card__alert">{{ title }}</div>
        </div>
        <img :src="imageUrl" :alt="title" class="brutalist-card__image">
        <div class="d-flex justify-content-between">
            <div class="item-hints">
                <div class="hint" data-position="4">
                    <span class="hint-radius"></span>
                    <span class="hint-dot">Info </span>
                    <div class="hint-content do--split-children brutalist-card">
                        <p class="fs-4"><strong><i class="fa-solid fa-house-user"></i>:
                            </strong> {{ apartment.num_rooms }}</p>
                        <p class="fs-4"><strong><i class="fa-solid fa-bed"></i>:</strong> {{ apartment.num_beds }}</p>
                        <p class="fs-4"><strong><i class="fa-solid fa-bath"></i>:</strong> {{ apartment.num_bathrooms }}
                        </p>
                        <p class="fs-4"><strong><i class="fa-solid fa-ruler"></i>:</strong> {{ apartment.square_meters
                            }} m²</p>
                        <p v-if="apartment.distance" class="card-text">Distanza: {{ formatDistance(distance) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="brutalist-card__actions">
            <router-link :to="{ name: 'apartment-detail', params: { slug: apartment.slug } }"
                class="brutalist-card__button brutalist-card__button--read">Dettagli</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardApComponent',
    props: ['apartment', 'index', 'title', 'image', 'num_rooms', 'num_beds', 'sponsored', 'distance'],
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
.brutalist-card {
    width: 320px;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
}

.brutalist-card--sponsored {
    width: 320px;
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
    font-size: 1.5rem;
    text-transform: uppercase;
}

.brutalist-card__image {
    width: 100%;
    height: auto;
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
</style>