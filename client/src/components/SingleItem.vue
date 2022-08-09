<template>
  <div class="item-container">
    <div>
      <span class="item-number">
        {{itemNum}}
      </span>
    </div>
    <div class="info-divider"></div>
    <div class="item-info" :class="{'complete': itemData.complete}" @click="showInfo">
      <div>
        {{itemData.name}}
      </div>
      <div>{{itemData.price}} {{currency}}</div>
    </div>
    <div class="action-btn-container">
      <span class="action-btn" @click="updateComplete">
        <img src="../assets/update.svg" alt="update">
      </span>
      <span class="divider"></span>
      <span class="action-btn" @click="deleteItem">
        <img src="../assets/delete.svg" alt="delete">
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SingleItem',
  props: [
    'itemInfo',
    'itemNum'
  ],
  data() {
    return {
      itemData: this.itemInfo
    }
  },
  computed: {
    ...mapState(['currency']),
  },
  methods: {
    ...mapActions(['UPDATE_COMPLETE']),
    showInfo() {
      this.$router.push({name: 'item', params: {itemId: this.itemData.id}});
    },
    deleteItem() {
      this.$emit('deleteItem', this.itemData.id);
    },
    updateComplete() {
      this.UPDATE_COMPLETE(this.itemData.id);
    },
  },
  watch: {
    itemInfo: {
      handler (val) {
        this.itemData = val;
      }
    }
  },
}
</script>

<style lang="scss">
  .item-number {
    font-family: 'Inter';
    font-size: 24px;
    font-weight: 700;
    color: var(--orange-color);;
    padding: 3px 22px 3px 13px;
    position: relative;
  }
  .info-divider{
    &:after {
      height: 100%;
      background: var(--border-color);
      content: "";
      width: 1px;
      display: block;
      position: relative;
      top: -14px;
      padding-bottom: 24px;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    cursor: pointer;
    position: relative; 
    &.complete {
      color: var(--border-color);
      &:after {
        position: absolute;
        left: 0;
        top: 36%;
        height: 1px;
        background: var(--border-color);
        content: "";
        width: 100%;
        display: block;
      }
    }
  }
  .item-container {
    display: grid;
    grid-template-columns: 50px 2px 60% 20%;
    margin: 20px 0;
    padding: 10px 15px;
    border-bottom: 1px solid var(--border-color);
    @media only screen and (min-width: 768px) {
      grid-template-columns: 50px 2px 75% 20%;
    }
  }
  .action-btn-container {
    display: flex;
    justify-content: space-evenly;
  }
  .divider {
    border-right: 1px solid var(--border-color);
  }
  .action-btn {
    cursor: pointer;
  }
</style>