<template>
  <v-container>
    <div>
      <h1 class="mainTitle">Find<br />your Cocktail</h1>
      <v-row align="center" class="searchBar">
        <div class="searchElement">
          <v-text-field
            v-model="inputSearch"
            style="margin-bottom: -28px"
            outlined
            dense
            label="Search"
            color="#252525"
            clearable
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

      <!--<div class="showNewCocktail">
        <v-img
          src="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5noda61589575158.jpg"
        ></v-img>
        <h2>Ready for party ?</h2>
      </div>-->

      <div v-if="searchShow != null">
        <div class="itemIter" v-for="(item, index) in searchShow" :key="index">
          <div>
            <v-img
              height="60"
              width="60"
              class="imageIter"
              :src="`${item.strDrinkThumb}/preview`"
            />
          </div>
          <div class="itemName">
            <h2 class="itemTitle">{{ item.strDrink }}</h2>
            <v-chip-group class="chipGroup" v-if="searchByIngredient == false">
              <v-chip small class="chipElem">{{ item.strAlcoholic }}</v-chip>
              <v-chip
                small
                v-if="item.strIngredient1.length < 10"
                >{{ item.strIngredient1 }}</v-chip
              >
              <v-chip
                small
                v-else
                >{{ item.strIngredient1.substring(0, 10) }}...</v-chip
              >
            </v-chip-group>
            <v-chip-group class="chipGroup" v-else>
              <v-chip small class="chipElem">{{ actualIngredient }}</v-chip>
            </v-chip-group>
          </div>
          <div
            @click="
              $router.push({
                name: 'cocktail-cocktail',
                params: { cocktail: item.idDrink },
              })
            "
            class="itemChevron"
          >
            <v-icon large color="#252525">mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>
    </div>
  </v-container>
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
  },
};
</script>

<style>
.mainTitle {
  text-transform: uppercase;
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
}
.imageIter {
  border-radius: 10px;
}
.itemTitle {
  font-size: 15px;
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
}
</style>
