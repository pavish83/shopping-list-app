<template>
  <div class="item-description">
    <div class="back-button">
      <router-link to="/">
        <img src="../assets/back.svg" alt="back">
      </router-link>
    </div>
    <div class="shopping-list-title">
      {{getItemData.name}}
    </div>
    <section>
      {{getItemData.description}}
    </section>
    <footer>
      <div class="footer-divider"></div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ItemDescription',
  computed: {
    ...mapGetters([
      'getItemById',
    ]),
    getItemData() {
      return this.getItemById(this.$route.params.itemId)
    } 
  }
}
</script>

<style scoped lang="scss">
  .shopping-list-title {
    margin-bottom: 42px;
  }
  .back-button {
    position: absolute;
    top: 68px;
    left: 24px;
  }
  .item-description section {
    margin: 0 10px;
  }
</style>