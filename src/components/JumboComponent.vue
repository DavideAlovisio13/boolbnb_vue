<template>
    <div class="masthead text-center text-white">
        <div class="masthead-content">
            <div class="container px-5 d-flex justify-content-center align-items-center">
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
    position: relative;
    
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>