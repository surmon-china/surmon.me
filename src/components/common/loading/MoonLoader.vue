<template>
<div class="v-spinner" v-show="loading">
    <div class="v-moon v-moon1" v-bind:style="spinnerStyle">
    <div class="v-moon v-moon2" v-bind:style="[spinnerMoonStyle,animationStyle2]">
    </div><div class="v-moon v-moon3" v-bind:style="[spinnerStyle,animationStyle3]">
    </div></div>
  </div>
</template>

<script>
export default {
  
  name: 'MoonLoader',

  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: { 
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '60px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      spinnerStyle: {
        height: this.size,
        width: this.size,
        borderRadius: this.radius
      }
    }
  },
  computed: {
    moonSize() {
      return parseFloat(this.size)/7
    },
    spinnerMoonStyle () {
      return {
        height: this.moonSize  + 'px',
        width: this.moonSize  + 'px',
        borderRadius: this.radius
      }
    },
    animationStyle2 () {
      return {
        top: parseFloat(this.size)/2 - this.moonSize/2 + 'px',
        backgroundColor: this.color
      }
    },
    animationStyle3 () {
      return {
        border: this.moonSize + 'px solid ' + this.color
      }
    }
  }

}
</script>

<style>

.v-spinner .v-moon1
{

    -webkit-animation: v-moonStretchDelay 0.6s 0s infinite linear;
            animation: v-moonStretchDelay 0.6s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
    position: relative;
}

.v-spinner .v-moon2
{
    -webkit-animation: v-moonStretchDelay 0.6s 0s infinite linear;
            animation: v-moonStretchDelay 0.6s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
    opacity: 0.8;
    position: absolute;
}

.v-spinner .v-moon3
{
    opacity: 0.1;
}

@-webkit-keyframes v-moonStretchDelay
{
    100%
    {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}

@keyframes v-moonStretchDelay
{
    100%
    {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}
</style>