<template>
<div class="v-spinner" v-show="loading">
    <div class="v-clip" v-bind:style="spinnerStyle">
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'ClipLoader',

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
      default: '35px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: this.size,
        width: this.size,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: this.color + ' ' + this.color + ' transparent',
        borderRadius: this.radius,
        background: 'transparent !important'
      }
    }
  }
}
</script>

<style>
.v-spinner
{
/*	  font-size: 10px; 

    width: 60px;
    height: 40px;*/
    /*margin: 25px auto;*/
    text-align: center;
 
}

.v-spinner .v-clip
{
    -webkit-animation: v-clipDelay 0.75s 0s infinite linear;
            animation: v-clipDelay 0.75s 0s infinite linear;
    -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;

    display: inline-block;
}

@-webkit-keyframes v-clipDelay
{
    0%
    {
        -webkit-transform: rotate(0deg) scale(1);
                transform: rotate(0deg) scale(1);
    }
    50%
    {
        -webkit-transform: rotate(180deg) scale(0.8);
                transform: rotate(180deg) scale(0.8);
    }
    100%
    {
        -webkit-transform: rotate(360deg) scale(1);
                transform: rotate(360deg) scale(1);
    }
}

@keyframes v-clipDelay
{
    0%
    {
        -webkit-transform: rotate(0deg) scale(1);
                transform: rotate(0deg) scale(1);
    }
    50%
    {
        -webkit-transform: rotate(180deg) scale(0.8);
                transform: rotate(180deg) scale(0.8);
    }
    100%
    {
        -webkit-transform: rotate(360deg) scale(1);
                transform: rotate(360deg) scale(1);
    }
}
</style>