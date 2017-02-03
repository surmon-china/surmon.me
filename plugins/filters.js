// Libs
import Vue from 'vue'

// fiters
import filters from '../filters'
console.log('filters', filters);

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
