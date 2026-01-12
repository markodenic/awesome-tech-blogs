<template>
  <main>
    <div class="error-page">
      <h2>{{ error.statusCode === 404 ? '404' : error.statusCode }}</h2>
      <p>{{ error.statusCode === 404 ? 'Oops! Page not found.' : error.message }}</p>
      <nuxt-link to="/" class="underlined">Go back home</nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style>
.error-page {
  text-align: center;
  padding: 4rem;
}
</style>
