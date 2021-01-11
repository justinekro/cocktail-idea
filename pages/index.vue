<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        cocktail-idea
      </h1>
      <!-- <v-btn @click="$router.push({name: 'cocktail-cocktail', params: {cocktail: 'Claudine'}})">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn> -->
     <v-btn
        elevation="1"
        fab
        rounded
        @click="fetchRandomCocktail"
      >
        <v-icon >
        mdi-shuffle-variant
        </v-icon>
      </v-btn>
    </div>
    <div class="modal" :style="{ bottom: isOpen ? '0px' : '-500px', position: 'absolute'}">
        <v-img :src="randomCocktail.strDrinkThumb" class="image">
        <v-icon 
          class="close-icon" 
          color="white"
          @click="closeModal"
          >mdi-close</v-icon>
        <div class="button-container">
          
          <p class="cocktail-title">
            {{randomCocktail.strDrink}}
          </p>
          <v-btn
            elevation="2"
            outlined
            rounded
            color="white"
            @click="$router.push({name: 'cocktail-cocktail', params: {cocktail: randomCocktail.idDrink}})"
          >
          Check recipe
          </v-btn>
          <v-btn
            elevation="2"
            outlined
            rounded
            color="white"
            @click="fetchRandomCocktail"
            class="second-button"
          >
            Show me another cocktail
          </v-btn>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      randomCocktail: {}
    }
  },
  methods: {
    fetchRandomCocktail() {
      this.$axios
        .$get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => {
          this.randomCocktail = response.drinks[0]
          this.isOpen = true
        })
    },
    closeModal() {
      this.isOpen = false;
      setTimeout(() => {
        this.randomCocktail = {}
      }, 1000)
      
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.modal  {
  width: 100%;
  border-radius: 30px 30px 0px 0px;
  height: 500px;
  background-color: beige;
  color: black;
  overflow: hidden;
  transition: bottom 1s;
}

.image {
  height: 500px;
  width: 100%;
  object-fit: cover;
  background-color: rgba(1,1,1,0.2);
}

.button-container {
  margin-top: 200px  
}

.button-container btn{
  margin-top: 20px  
}

.cocktail-title {
  font-weight: bold;
  color: white;
  font-size: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.second-button {
  margin-top: 20px
}

.close-icon {
  right: 20px;
  top: 20px;
  position: absolute !important;
}


</style>
