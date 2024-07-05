<template>
    <div class="nav">
        <div class="nav__container">
            <div class="shadow__nav"></div>
            <div class="input__search">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-around align-items-center">
                    <li class="nav-item input__button__shadow" v-for="(item, index) in navItems" :key="index">
                        <router-link :to="{ name: item.routeName }" class="nav-link">{{ item.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
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

<style lang="scss" scoped>
.nav {
    padding: 30px 0;
}

.nav__container {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border: 4px solid #000;
    width: 70%;
    margin: 0 auto;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(5deg) rotateY(-5deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #000;
}

.nav__container:hover {
    transform: rotateX(5deg) rotateY(1 deg) scale(1.05);
    box-shadow: 25px 25px 0 -5px #e9b50b, 25px 25px 0 0 #000;
}

.shadow__nav {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(45deg,
            rgba(255, 107, 107, 0.4) 0%,
            rgba(255, 107, 107, 0.1) 100%);
    filter: blur(20px);
}

.input__button__shadow {
    cursor: pointer;
    border: 3px solid #000;
    background: #e9b50b;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    font-family: "Courier New", monospace;
    
}

.input__button__shadow:hover {
    background: #e9b50b;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
}

.input__button__shadow svg {
    fill: #000;
    width: 25px;
    height: 25px;
}

.input__search {
    width: 100%;
    outline: none;
    border: 3px solid #000;
    padding: 15px;
    font-size: 18px;
    background: #fff;
    color: #000;
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
}

.input__search::placeholder {
    color: #666;
    font-weight: bold;
    text-transform: uppercase;
}

.input__search:hover,
.input__search:focus {
    background: #f0f0f0;
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
}

.input__container::before {
    content: "USERNAME";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #e9b50b;
    color: #000;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #000;
}
</style>