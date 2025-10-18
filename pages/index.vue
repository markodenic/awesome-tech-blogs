<template>
  <div class="cta">
    <div class="mb-6">
      Currently {{ total }} blogs listed!
    </div>

    <nuxt-link
      to="/list"
      class="underlined mb-6"
    >
      Take me to the list!
    </nuxt-link>
  </div>
</template>

<script>
import blogs from '../data.json';

export default {
  data () {
    return {
      total: 0,
    }
  },

  created () {
    this.total = blogs.length;
  },
}
</script>

