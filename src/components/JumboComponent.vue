<template>
    <div class="masthead text-center text-white d-flex flex-column" style="position: relative;">
        <video src="/videos/video-jumbo.mp4" autoplay loop muted
            style="position:absolute; z-index:-1; object-fit: cover; width: 100%; height: 100%;"></video>
        <div id="quote" class="px-4 mb-5"></div>
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
                "+=2" // Attende 2 secondi prima di iniziare la dissolvenza
            );
        },
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
</style>
