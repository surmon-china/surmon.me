import Vue from 'vue'

export default {
  getList(params) {
    return Vue.http.get('http://localhost:8000/api/tags', params)
  }
}
