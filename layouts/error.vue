<template>
  <main>
      <div class="error-page" v-if="error.statusCode === 404">
        <h2>404</h2>
        <p>Oops! Page not found.</p>
        <nuxt-link to="/" class="underlined">Go back home</nuxt-link>
      </div>
      <div class="error-page" v-else>
        <h2>{{ error.statusCode }}</h2>
        <p>{{ error.message }}</p>
        <nuxt-link to="/" class="underlined">Go back home</nuxt-link>
      </div>
    </main>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>
.error-page {
  text-align: center;
  padding: 4rem;
}
</style>
