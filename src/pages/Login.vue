<template>
    <div class="my-container"
    style="background-image: url(/images/bg-main.png); background-repeat: no-repeat; background-size: cover">
        <div class="container">
            <div class="apartment-details brutalist-card mt-2">  
                <h1 class="pb-3 text-center">Benvenuto!</h1>
                <div class="d-flex justify-content-center">
                    <a href="http://127.0.0.1:8000/login" class="btn btn-success">Login</a>
                </div>

                <p class="pt-3 text-center">Registrati e inizia a guadagnare con noi</p>
                <div class="d-flex justify-content-center">
                    <a href="http://127.0.0.1:8000/register" class="btn btn-primary">Registrati</a>    
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name:'Login',
    }
</script>

<style lang="scss" scoped>
.my-container{
  height: 100vh;
}
        .container{
        padding-top: 200px;
    }
    a {
      color: white;
      text-decoration: none;
    }
    a:hover {
      font-weight: bold;
    }
    h1{
      color: black;
    }
    a {
      color: white;
      text-decoration: none;
    }
    a:hover {
      font-weight: bold;
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