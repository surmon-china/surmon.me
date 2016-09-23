<template>
<div class="v-spinner" v-show="loading">
    <div class="v-dot v-dot1" v-bind:style="spinnerBasicStyle">
    <div class="v-dot v-dot2" v-bind:style="spinnerStyle">
    </div><div class="v-dot v-dot3" v-bind:style="spinnerStyle">
    </div></div>
  </div>
</template>

<script>
export default {
  
  name: 'DotLoader',

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
  computed: {
    spinnerStyle () {
      return {
        backgroundColor: this.color,
        height: parseFloat(this.size)/2 + 'px',
        width: parseFloat(this.size)/2 + 'px',
        borderRadius: this.radius
      }
    },
    spinnerBasicStyle () {
      return {
        height: this.size,
        width: this.size,
        position: 'relative'
      }
    }
  }

}
</script>

<style>

.v-spinner .v-dot
{
          
}

.v-spinner .v-dot1
{

    -webkit-animation: v-dotRotate 2s 0s infinite linear;
            animation: v-dotRotate 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
}

.v-spinner .v-dot2
{

    -webkit-animation: v-dotBounce 2s 0s infinite linear;
            animation: v-dotBounce 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
    position: 'absolute';
    top: 0;
    bottom: auto;
}

.v-spinner .v-dot3
{
    -webkit-animation: v-dotBounce 2s -1s infinite linear;
            animation: v-dotBounce 2s -1s infinite linear;
    -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
    position: 'absolute';
    top: auto;
    bottom: 0;            
}

@-webkit-keyframes v-dotRotate
{
    100%
    {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}

@keyframes v-dotRotate
{
    100%
    {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
}

@-webkit-keyframes v-dotBounce
{
    0%,
    100%
    {
        -webkit-transform: scale(0);
                transform: scale(0);
    }
    50%
    {
        -webkit-transform: scale(1.0);
                transform: scale(1.0);
    }
}

@keyframes v-dotBounce
{
    0%,
    100%
    {
        -webkit-transform: scale(0);
                transform: scale(0);
    }
    50%
    {
        -webkit-transform: scale(1.0);
                transform: scale(1.0);
    }
}
</style>