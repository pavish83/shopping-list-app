import { createStore } from 'vuex'
//import heplerFunctions from "../utils/helperMethods.js";

export default createStore({
  state: {
    currency: 'NIS',
    shoppingItems: [],
    showAddItemModal: false,
    loading: false
  },
  getters: {
    getShoppingItems: (state) => {
      return JSON.parse(localStorage.getItem('shoppingList')) || state.shoppingItems
    },
    getItemById: (state) => (id) => {
      return state.shoppingItems.filter(item => item.id == id)[0]
    },
    getTotalItemsPrice: (state) => {
      return state.shoppingItems.reduce((acc, next) => acc + parseInt(next.price), 0);
    }
  },
  mutations: {
    UPDATE_ITEMS(state, payload) {
      state.shoppingItems = payload;
    },
    TOGGLE_ADD_ITEM_MODAL(state) {
      state.showAddItemModal = !state.showAddItemModal
    },
    TOGGLE_LOADER(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    async GET_ITEMS({commit}){
      commit('TOGGLE_LOADER',true);
      await fetch("http://localhost:3000/api/items")
      .then(response => response.json())
      .then(data => { commit('UPDATE_ITEMS', data)})
      .catch(e => console.warn(e))
      .finally(() => {
        commit('TOGGLE_LOADER',false);
      })
    },
    async DELETE_ITEM({commit, dispatch}, idToDelete) {
      commit('TOGGLE_LOADER',true);

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
      await fetch(`http://localhost:3000/api/item/${idToDelete}`, requestOptions)
        .then(() => dispatch('GET_ITEMS'))
        .catch(e => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
        })
    },
    async UPDATE_COMPLETE({commit, dispatch}, id) {
      commit('TOGGLE_LOADER',true);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }
      await fetch(`http://localhost:3000/api/item/${id}`, requestOptions)
        .then(() => dispatch('GET_ITEMS'))
        .catch(e => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
        })
    },
    async ADD_ITEM({commit, dispatch}, payload) {
      commit('TOGGLE_LOADER',true);
      let data = {
        complete: false,
        ...payload
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      }
      await fetch('http://localhost:3000/api/item', requestOptions)
        .then(() => dispatch('GET_ITEMS'))
        .catch(e => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
          commit('TOGGLE_ADD_ITEM_MODAL');
        })
    },
  },
  modules: {
  }
})
