<template>
    <div>
        <h1>Risultati della ricerca</h1>
        <ul v-if="store.search > 0" class="list-unstyled">
            <li v-for="item in store.search" :key="item.id">
                {{ item.address }}
            </li>
        </ul>
        <p v-else>Nessun risultato trovato</p>
    </div>
</template>

<script>
import{ store } from '@/store';
export default {
    name: 'Search',
    data() {
        return {
            store
        }
    },
}
</script>

<style scoped>
.list-unstyled {
    padding-left: 0;
    list-style: none;
}
</style>
