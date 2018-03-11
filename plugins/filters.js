/*
 *
 * 所有过滤器
 *
*/

import Vue from 'vue'
import filters from '~/filters'

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
