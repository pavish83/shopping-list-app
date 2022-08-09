<template>
  <div class="home">
    <div class="shopping-list-title">Shopping List</div>
    <div class="container">
      <ItemsList :items="shoppingItems"/>
      <AddItem v-if="showAddItemModal" />
    </div>
    <div v-if="showServerError" class="error-message">
      <img src="../assets/triangle-exclamation.svg" alt="error">
      <div>
        Something went wrong please try again
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import ItemsList from '@/components/ItemsList.vue'
import AddItem from '@/components/AddItem.vue'

export default {
  name: 'HomeView',
  components: {
    ItemsList,
    AddItem
  },
  created() {
    this.GET_ITEMS();
  },
  methods: {
    ...mapActions(['GET_ITEMS']),
  },
  computed: {
    ...mapState(['showAddItemModal', 'shoppingItems', 'showServerError']),
  },
}
</script>
<style lang="scss">
  .error-message {
    color: var(--error-color);
    display: flex;
    justify-content: center;
    img {
      margin-right: 10px;
    }
  }
</style>