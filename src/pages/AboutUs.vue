<template>
    <div class="my-container"
    style="background-image: url(/images/bg-main.png); background-repeat: no-repeat; background-size: cover">
    <div class="container">
    <div class="apartment-details brutalist-card mt-2"> 

    <section class="hero">    
        <h1 class="d-flex align-items-center justify-content-center"> <i class="fa-solid fa-earth-americas pe-2"></i>Scopri Boolbnb</h1>
        <div class="d-flex align-items-center justify-content-center pb-3">
            <span>Connettiamo viaggiatori con alloggi unici in tutto il mondo.</span>
        </div>
    </section>

    <section class="mission">
           <h4> <i class="fa-solid fa-plane pe-2"></i>
             La nostra missione</h4>
        <div class="d-flex align-items-center justify-content-center pb-3">
            <span> Offrire esperienze di viaggio autentiche e memorabili, sostenendo le economie locali.</span>
        </div>
    </section>
    
    <section class="values">
        <h2 class="pb-3">I nostri valori</h2> 
        <h4> <i class="fa-solid fa-shield-halved pe-2"></i>Affidabilità</h4>
        <div class="d-flex align-items-center justify-content-center pb-3">  
            <span>Garantiamo sicurezza e fiducia per ogni prenotazione.</span >
        </div>

        <h4><i class="fa-regular fa-handshake pe-2"></i>Ospitalità</h4>
        <div class="d-flex align-items-center justify-content-center pb-3">
            <span>Accogliamo i nostri ospiti con calore e professionalità.</span>
        </div>

        <h4><i class="fa-solid fa-seedling pe-2"></i>Sostenibilità</h4>
        <div class="d-flex align-items-center justify-content-center pb-3">
            <span>Promuoviamo pratiche rispettose dell'ambiente.</span>
        </div>
    </section>
</div>
</div>
    </div>
</template>

<script>
    export default {
        name:'AboutUs',
    }
</script>

<style lang="scss" scoped>
    .my-container{
    height: 100%;
    }
    .container{
        padding-top: 200px;
        padding-bottom: 100px;
    }
    h2, h4, span {
      color: black;
      text-align: center;
    }
    h1{
        font-weight: bold;
        color: #E9B50D ;
        text-shadow: 1px 2px 2px rgba(145, 142, 142, 0.7);
    }
    .brutalist-card {
  width: 75%;
  margin: 0 auto;
  border: 4px solid #000;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: 10px 10px 0 #000;
  font-family: "Arial", sans-serif;
}

.brutalist-card__alert {
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
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

</style>
