<template>
    <div class="masthead text-center text-white d-flex flex-column" style="position: relative;">
        <div id="quote" class=" px-4 mb-5">La tua casa lontano da casa</div>
        <div class="masthead-content">
            <div class="container px-5 d-flex justify-content-center align-items-center">
                <SearchComponent />
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
import SearchComponent from '@/components/SearchComponent.vue';
export default {
    name: 'JumboComponent',
    components: {
        SearchComponent
    },
    methods: {
        animateQuote() {
            const quoteText = document.getElementById('quote');
            const chars = quoteText.textContent.split('');
            quoteText.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
            gsap.fromTo(".char",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.1, stagger: 0.05, ease: "power2.out" }
            );
        },

    },
    mounted() {
        this.animateQuote();
    }
}
</script>

<style lang="scss" scoped>
#quote {
    font-family: "Courier New", monospace;
    font-size: 6rem;
    font-style: italic;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000;
}

.masthead {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
