<template>
    <div class="masthead text-center text-white">
        <div class="masthead-content">
            <div class="container px-5">
                <h1 class="masthead-heading mb-0">One Page Wonder</h1>
                <h2 class="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
                <SearchComponent />
            </div>
        </div>
    </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent.vue';
export default {
    name: 'JumboComponent',
    components: {
        SearchComponent
    },
}
</script>

<style lang="scss" scoped>
.masthead {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>