<template>
  <div class="_container">
    <v-img :src="cocktail.strDrinkThumb" class="_image">
    <div class="image-overlay"></div>
       <v-icon 
          class="close-icon" 
          color="white"
          @click="$router.push('/')"

          >mdi-arrow-left
          </v-icon>
    </v-img>
    <div class="cocktail-container"><h2>{{cocktail.strDrink}}</h2>
    <p class="instructions">{{cocktail.strInstructions}}</p>
    <h3>Ingredients</h3>
    <div v-for="(item, index) in ingredients" :key="index" class="ingredients-container">
      <div>{{item.name}}</div>
      <div>{{item.quantity}}</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'search',
    data() {
    return {
      isOpen: false,
      randomCocktail: {}
    }
  },
  async asyncData({ route, $axios }) {
    const c = await $axios
        .$get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.cocktail}`)

    const getIngredients = drink => {
      return Object.keys(drink).filter(item => item.includes("strIngredient")).reduce((all, item, index) => {
        if (item.includes("strIngredient")) {
          if (!!drink[item]) {
            all.push({name: drink[item], quantity: drink[`strMeasure${index+1}`]})
          } 
        }
        return all
        }, [])
    }

    return {
      cocktail: c.drinks[0],
      ingredients: getIngredients(c.drinks[0])
    }
  },
  methods: {
  }
}

</script>

<style scope>

._container{
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  padding: 0px;
}

._image {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0px;
}


.image-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  background:rgba(0,0,0,0.3);
}

.close-icon {
  top: 15px;
  left: 15px;
}

.cocktail-container {
  background-color: white;
  border-radius: 30px 30px 0px 0px;
  position: absolute;
  bottom: 0;
  height: 60%;
  width: 100%;
  padding: 20px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.ingredients-container {
  display: flex;
  justify-content: space-between;
}

.instructions {
  text-align: left;
}

</style>
