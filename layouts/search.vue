<template>
  <v-app>
    <v-main>
      <v-app-bar dense flat>
        <v-icon @click="$router.push('/')">mdi-arrow-left</v-icon>
      </v-app-bar>

      <Nuxt />
    </v-main>
  </v-app>
</template>