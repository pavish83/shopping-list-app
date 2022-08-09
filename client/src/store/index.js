import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    currency: 'NIS',
    shoppingItems: [],
    showAddItemModal: false,
    loading: false,
    showServerError: false
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
    TOGGLE_SHOW_SERVER_ERROR(state, payload) {
      state.showServerError = payload
    },
  },
  actions: {
    async GET_ITEMS({commit}){
      commit('TOGGLE_LOADER',true);
      await axios.get("http://localhost:3000/api/items")
      .then(response => commit('UPDATE_ITEMS', response.data))
      .catch(e => console.warn(e))
      .finally(() => {
        commit('TOGGLE_LOADER',false);
      })
    },
    async DELETE_ITEM({commit, dispatch}, idToDelete) {
      commit('TOGGLE_LOADER',true);
      commit('TOGGLE_SHOW_SERVER_ERROR',false);

      await axios.delete(`http://localhost:3000/api/item/${idToDelete}`)
        .then(() => dispatch('GET_ITEMS'))
        .catch(() => commit('TOGGLE_SHOW_SERVER_ERROR',true))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
        })
    },
    async UPDATE_COMPLETE({commit, dispatch}, id) {
      commit('TOGGLE_LOADER',true);
      commit('TOGGLE_SHOW_SERVER_ERROR',false);
      
      await axios.put(`http://localhost:3000/api/item/${id}`)
        .then(() => dispatch('GET_ITEMS'))
        .catch(() => commit('TOGGLE_SHOW_SERVER_ERROR',true))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
        })
    },
    async ADD_ITEM({commit, dispatch}, payload) {
      commit('TOGGLE_LOADER',true);
      commit('TOGGLE_SHOW_SERVER_ERROR',false);
      let data = {
        complete: false,
        ...payload
      }
    
      await axios.post('http://localhost:3000/api/item', data)
        .then(() => dispatch('GET_ITEMS'))
        .catch(() => commit('TOGGLE_SHOW_SERVER_ERROR',true))
        .finally(() => {
          commit('TOGGLE_LOADER',false);
          commit('TOGGLE_ADD_ITEM_MODAL');
        })
    },
  },
  modules: {
  }
})
