<template>

    <div class="container">
      <h1 class="mainTitle">My Fav<br />Cocktail 🍸</h1>
      <v-row align="center" class="searchBar">
        <div class="searchElement">
          <v-text-field
            v-model="inputSearch"
            style="margin-bottom: -28px"
            outlined
            dense
            label="Search"
            color="#252525"
          />
        </div>
        <div @click="goSearch" class="searchMagnify">
          <v-icon color="#252525">mdi-magnify</v-icon>
        </div>
      </v-row>

      <v-row class="popular">
        <h2>Popular Ingredients <span style="display: none">{{ fakeSearch }}</span></h2>
      </v-row>

      <v-row class="ingredients">
        <v-chip-group class="popIngredients">
          <v-chip @click="searchIngredient('Rum')">Rum</v-chip>
          <v-chip @click="searchIngredient('Vodka')">Vodka</v-chip>
          <v-chip @click="searchIngredient('Gin')">Gin</v-chip>
        </v-chip-group>
      </v-row>

      <div v-if="searchShow === null && inputSearch.length == 0 || inputSearch.length == 0 && searchByIngredient == false" class="showNewCocktail">
        <v-img
          src="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5noda61589575158.jpg"
          class="image-pub"
        >
        <h2 class="pub-title">Find the best cocktail recipies!</h2>
        </v-img>

        <v-img
        @click="$router.push({name: 'cocktail-cocktail', params: {cocktail: '11000'}})"
          src="https://www.thecocktaildb.com//images//media//drink//metwgh1606770327.jpg"
          class="image-pub image-recipies"
        >
        <h2 class="pub-title">Mojito</h2>
        </v-img>

        <v-img
        @click="$router.push({name: 'cocktail-cocktail', params: {cocktail: '14167'}})"
          src="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qyxrqw1439906528.jpg"
          class="image-pub image-recipies"
        >
        <h2 class="pub-title">Vodka Martini</h2>
        </v-img>
      </div>

      <div v-if="searchShow === null && lastinput != 0">
        <p class="notFound">No cocktail found</p>
      </div>

      <div v-if="searchShow != null && inputSearch.length != 0 || searchShow != null && searchByIngredient != false" class="searchClass">
        <div class="itemIter" v-for="(item, index) in searchShow" :key="index" 
        @click="
              $router.push({
                name: 'cocktail-cocktail',
                params: { cocktail: item.idDrink },
              })
            ">
          <div 
            >
            <v-img
              height="60"
              width="60"
              class="imageIter"
              :src="`${item.strDrinkThumb}/preview`"
            />
          </div>
          <div class="itemName">
            <h2 class="itemTitle">{{ item.strDrink }} <span v-if="searchByIngredient == false" class="itemAlcol">- {{ item.strAlcoholic }}</span></h2>
            <p v-if="searchByIngredient == false"><span class="itemIngre">{{ item.strIngredient1 }}</span></p>
            <p v-else><span class="itemIngre">{{ actualIngredient }}</span></p>
          </div>
          <div
           
            class="itemChevron"
          >
            <v-icon large color="#252525">mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>

     <v-btn
        elevation="1"
        outlined
        @click="fetchRandomCocktail"
        class="random-button"
        rounded
      >
        Show me a random cocktail!
      </v-btn>
    <div class="modal" :style="{ bottom: isOpen ? '0px' : '-500px'}">
        <v-img :src="randomCocktail.strDrinkThumb" class="image">
        <div class="cocktail-image-overlay"></div>
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
      inputSearch: null,
      lastinput: 0,
      searchShow: null,
      searchByIngredient: false,
      actualIngredient: "",
      isOpen: false,
      randomCocktail: {}
    };
  },
  computed: {
    fakeSearch() {
      if (this.inputSearch != null && this.inputSearch.length != this.lastinput && this.inputSearch.length != 0) {
        this.lastinput = this.inputSearch.length;
        this.goSearch();
        return this.lastinput
      } else if (this.inputSearch != null && this.inputSearch.length == 0) {
        this.lastinput = 0;
        this.searchShow = null;
        return 0
      }
    },
  },
  methods: {
    searchIngredient(name) {
      this.$axios
        .$get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
        )
        .then((response) => {
          this.searchByIngredient = true;
          this.actualIngredient = name;
          this.searchShow = response.drinks;
        });
    },
    goSearch() {
      this.$axios
        .$get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.inputSearch}`
        )
        .then((response) => {
          this.searchShow = response.drinks;
          this.searchByIngredient = false;
          this.actualIngredient = "";
        });
    },
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
    },
  },
};
</script>

<style>

.container {
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  padding: 12px !important;
  overflow: hidden;
}

.mainTitle {
  margin-top: 20px;
  margin-bottom: 5px;
  line-height: 30px;
}
.popular {
  padding: 10px;
}
.ingredients {
  padding: 10px;
}
.popIngredients {
  margin-top: -10px;
}
.searchBar {
  padding: 10px;
}
.searchElement {
  flex: 1;
}
.searchMagnify {
  cursor: pointer;
  padding: 15px;
}
.itemIter {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  cursor: pointer;
}
.imageIter {
  border-radius: 10px;
}
.itemTitle {
  font-size: 15px;
  margin-bottom: 2px;
}
.itemName {
  flex: 1;
  padding: 5px 10px 10px 10px;
}
.itemChevron {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 50px;
}
.showIngredients {
  display: flex;
}
.chipGroup {
  margin-top: -5px;
}
.chipElem {
  font-weight: 600;
}

.showNewCocktail {
  margin: 10px;
  padding-bottom: 40px;
  border-radius: 30px;
}

.modal  {
  width: 100%;
  border-radius: 30px 30px 0px 0px;
  height: 500px;
  background-color: beige;
  color: black;
  overflow: hidden;
  transition: bottom 1s;
  left: 0px;
  position: fixed;
}

.image {
  height: 500px;
  width: 100%;
  object-fit: cover;
}

.cocktail-image-overlay {
  height: 500px;
  width: 100%;
  background:rgba(0,0,0,0.3);
  position: absolute;
}

.button-container {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cocktail-title {
  font-weight: bold;
  color: white;
  font-size: 30px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  z-index: 2;
}

.second-button {
  margin-top: 20px
}

.close-icon {
  right: 20px;
  top: 20px;
  position: absolute !important;
}

.random-button {
  background-color: white !important;
  position: fixed !important;
  bottom: 20px;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
}
.image-recipies {
  height: 150px;
}
.image-pub {
  background: rgba(0,0,0,0.3);
  border-radius: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
}

.pub-title {
  color: white !important
}
.searchClass {
  margin-bottom: 60px;
}
.itemAlcol {
  font-weight: 300;
  font-size: 14px;
}
.itemIngre {
  background-color: #E5E5E5;
  padding: 5px 10px 5px 10px;
  border-radius: 20px;
  font-size: 13px;
}
.notFound {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}
</style>
