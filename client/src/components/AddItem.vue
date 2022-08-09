<template>
  <div class="modal-wrap">
    <div class="close-btn" @click="closeModal">
      <img src="../assets/close.svg" alt="close">
    </div>
    <form @submit.prevent="saveItem" class="add-item-form">
      <div class="add-item-row">
        <div>
          <label for="name">Name</label>
          <input type="text" name="name"  v-model="dataForm.name">
          <span class="form-error-message" v-if="showErrors && !nameIsValid">name is required</span>
        </div>
        <div>
          <label for="price">Price</label>
          <input type="number" name="price" v-model.number="dataForm.price">
          <span class="form-error-message" v-if="showErrors && !priceIsValid">price is required and must be a number</span>
        </div>
      </div>
      <div class="add-item-row">
        <div>
          <label for="description">Description</label>
          <textarea name="description" rows="5" cols="21" v-model="dataForm.description"></textarea>
          <span class="form-error-message" v-if="showErrors &&  !descriptionIsValid">description is required</span>
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
      dataForm: {
        name: null,
        price: null,
        description: null
      },
      showErrors: false,
    }
  },
  computed: {
    nameIsValid() {
      return !!this.dataForm.name;
    },
    priceIsValid() {
      return !!this.dataForm.price && typeof this.dataForm.price === 'number';
    },
    descriptionIsValid() {
      return !!this.dataForm.description;
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_ADD_ITEM_MODAL']),
    ...mapActions(['ADD_ITEM']),
    saveItem() {
      const formIsValid = this.nameIsValid && this.priceIsValid && this.descriptionIsValid;

      if(formIsValid) {
        this.showErrors = false;
        this.ADD_ITEM(this.dataForm);
      } else {
        this.showErrors = true;
      }

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
      margin-top: 100px;
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
      display: flex;
      flex-direction: column;
      @media only screen and (min-width: 768px) {
        margin: 0 auto;
      }
    }
    .form-error-message {
      color: var(--error-color);
    }
  }
</style>