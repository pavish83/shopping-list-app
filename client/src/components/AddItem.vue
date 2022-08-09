<template>
  <div class="modal-wrap">
    <div class="close-btn" @click="closeModal">
      <img src="../assets/close.svg" alt="close">
    </div>
    <form @submit.prevent="saveItem" class="add-item-form">
      <div class="add-item-row">
        <div>
          <label for="name">Name</label>
          <input type="text" name="name"  v-model="dataForm['name']" required>
        </div>
        <div>
          <label for="price">Price</label>
          <input type="number" name="price" v-model="dataForm['price']" required>
        </div>
      </div>
      <div class="add-item-row">
        <div>
          <label for="description">Description</label>
          <textarea name="description" rows="5" cols="21" v-model="dataForm['description']" required></textarea>
        </div>
      </div>
      <button type="submit">
        <img src="../assets/save.svg" alt="save">
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'AddItem',
  data() {
    return {
      dataForm: {}
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_ADD_ITEM_MODAL']),
    ...mapActions(['ADD_ITEM']),
    saveItem() {
      this.ADD_ITEM(this.dataForm);
    },
    closeModal() {
      this.TOGGLE_ADD_ITEM_MODAL();
    }
  }
}
</script>

<style lang="scss">
  .modal-wrap {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 122px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: #FFFFFF;
    color: var(--gray-color);
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    input {
      border: none;
      outline: none;
      border-bottom: 1px solid var(--border-color);;
      margin-right: 17px;
      padding-bottom: 10px;
    }
    textarea {
      border: none;
      outline: none;
      resize: none;
      border-bottom: 1px solid var(--border-color);
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    button {
      border: none;
      background: none;
      align-self: end;
      margin-top: 176px;
      margin-right: 8px;
      cursor: pointer;
    }
    .close-btn {
      cursor: pointer;
      align-self: flex-end;
      margin: 17px 18px 0 0;
    }
    .add-item-row {
      margin: 37px 0 0 20px;
      display: flex;
      div {
        display: flex;
        flex-direction: column;
      }
    }
    .add-item-form {
      height: 333px;
      display: flex;
      flex-direction: column;
    }
  }
</style>