<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-for="(item, index) in navItems" :key="index">
                            <router-link :to="{ name: item.routeName }" class="nav-link">{{ item.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'AppHeaderComponent',
    data() {
        return {
            navItems: [
                {
                    name: "Home",
                    routeName: "home"
                },
                {
                    name: "About",
                    routeName: "about"
                },
                {
                    name: "Contattti",
                    routeName: "contacts"
                },
                {
                    name: "Strutture",
                    routeName: "structures"
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped></style>