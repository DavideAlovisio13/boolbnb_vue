<template>
    <!-- Masthead section with video background and centered content -->
    <div class="masthead text-center text-white d-flex flex-column" style="position: relative;">
        <!-- Background video -->
        <video src="/videos/video-jumbo.mp4" autoplay loop muted
            style="position:absolute; z-index:-1; object-fit: cover; width: 100%; height: 100%;"></video>
        <!-- Quote container -->
        <div id="quote" class="px-4 mb-5"></div>
        <div class="px-4 mb-5 quote-query">
            <h1>Cerca, prenota e rilassati</h1>
        </div>
        <!-- Masthead content with search component -->
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
    data() {
        return {
            phrases: [
                "La tua casa lontano da casa",
                "Benvenuto nella tua oasi di pace",
                "Il tuo rifugio perfetto",
                "Dove i tuoi sogni diventano realtà"
            ],
            currentPhraseIndex: 0
        };
    },
    methods: {
        // Method to animate the quote text
        animateQuote() {
            const quoteText = document.getElementById('quote');
            const phrase = this.phrases[this.currentPhraseIndex];
            const chars = phrase.split('');
            quoteText.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');

            const tl = gsap.timeline({
                onComplete: () => {
                    this.changePhrase();
                }
            });

            tl.from(".char",
                { opacity: 0, y: 50, scale: 0.8, stagger: 0.05, ease: "power3.out" }
            ).to(".char",
                { opacity: 0, y: -50, scale: 0.8, stagger: 0.05, ease: "power3.in" },
                "+=2" // Waits 2 seconds before starting the fade out
            );
        },
        // Method to change the current phrase and re-trigger the animation
        changePhrase() {
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            this.animateQuote();
        }
    },
    mounted() {
        this.animateQuote();
    }
}
</script>

<style lang="scss" scoped>
/* Styling for the quote text */
#quote {
    font-family: "Courier New", monospace;
    font-size: 6rem;
    font-style: italic;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000;
}

.quote-query {

    h1 {
        font-size: 5.5rem;
        font-family: "Courier New", monospace;
        font-style: italic;
        font-weight: bold;
        color: #fff;
        text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000;
    }
}

/* Styling for the masthead container */
.masthead {
    width: 100%;
    height: 1000px;
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

@media screen and (max-width: 576px) {
    .quote-query {
        display: block;
    }

    #quote {
        display: none;
    }
}

@media screen and (min-width: 576px) {
    .quote-query {
        display: none;
    }
}
</style>
