export default {

  getList: (instance, params) => {
    return instance.$http.get('http://localhost:8000/api/article', params);
  },

  getItem: (instance, params) => {
    return instance.$http.get('http://localhost:8000/api/article/' + params.slug, params);
  }
}