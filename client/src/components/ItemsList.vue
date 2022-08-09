<template>
  <div>
    <LoadingSpinner v-show="loading"/>
    <div v-if="totalItemsLength">
      <div v-for="(item,index) in items" :key="index">
        <SingleItem :item-info="item" :item-num="index+1" @delete-item="deleteItem"/>
      </div>
      <div class="total-container">
        <div></div>
        <div></div>
        <div class="total-info">
          <div>
            Total:
          </div>
          <div>
            {{getTotalItemsPrice}} {{currency}}
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <div class="empty-list">
        Currently there are no items
      </div>
    </div>
    <div class="add-btn" @click="addItem">
      <div class="add-plus">
        +
      </div>
      <div></div>
      <div class="add-product">
        Add Product
      </div>
    </div>
    <footer>
      <div class="footer-divider"></div>
    </footer>
  </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue'
import LoadingSpinner from '@/components/LoadingSpinner'
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'ItemsList',
  components: {
    SingleItem,
    LoadingSpinner
  },
  props: [
    'items'
  ],
  methods: {
    ...mapActions(['DELETE_ITEM']),
    ...mapMutations(['TOGGLE_ADD_ITEM_MODAL']),
    deleteItem(id) {
      this.DELETE_ITEM(id);
    },
    addItem() {
      this.TOGGLE_ADD_ITEM_MODAL();
    }
  },
  computed: {
    ...mapGetters(['getTotalItemsPrice']),
    ...mapState(['loading', 'currency']),
    totalItemsLength() {
      return this.items.length > 0
    }
  }
}
</script>

<style lang="scss">
  .total-container, .add-btn {
    display: grid;
    grid-template-columns: 50px 2px 60% 20%;
    margin: 20px 0;
    padding: 15px 15px;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 50px 2px 75% 20%;
    }
  }
  .total-info {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }
  .add-btn {
    cursor: pointer;
    color: var(--orange-color);
  }
  .add-plus {
    font-family: "Inter";
    font-size: 24px;
    font-weight: 700;
    color: var(--orange-color);
    padding: 3px 22px 3px 13px;
  }
  .add-product{
    margin-left: 20px;
    padding-top: 5px;
  }
  .empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }
  .footer-divider {
    width:100%;
    height:100px;
    position:absolute;
    bottom:0;
    left:0;
    z-index: 99999;
    border-top: 1px solid var(--border-color);
  }
</style>
