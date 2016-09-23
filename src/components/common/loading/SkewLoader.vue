<template>
<div class="v-spinner" v-show="loading">
    <div class="v-skew" v-bind:style="spinnerStyle">
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'SkewLoader',

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
      default: '20px'
    }
  },
  data () {
    return {
      spinnerStyle: {
      	height: 0,
     	  width: 0,
        borderLeft: this.size + ' solid transparent',
        borderRight: this.size + ' solid transparent',
        borderBottom: this.size + ' solid ' + this.color
      }
    }
  }

}
</script>

<style>
.v-spinner
{
    text-align: center;
}

.v-spinner .v-skew
{
    -webkit-animation: v-skewDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);
            animation: v-skewDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);
    -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;
    display: inline-block;
}

@-webkit-keyframes v-skewDelay
{
    25%
    {
        -webkit-transform: perspective(100px) rotateX(180deg) rotateY(0);
                transform: perspective(100px) rotateX(180deg) rotateY(0);
    }
    50%
    {
        -webkit-transform: perspective(100px) rotateX(180deg) rotateY(180deg);
                transform: perspective(100px) rotateX(180deg) rotateY(180deg);
    }
    75%
    {
        -webkit-transform: perspective(100px) rotateX(0) rotateY(180deg);
                transform: perspective(100px) rotateX(0) rotateY(180deg);
    }
    100%
    {
        -webkit-transform: perspective(100px) rotateX(0) rotateY(0);
                transform: perspective(100px) rotateX(0) rotateY(0);
    }
}

@keyframes v-skewDelay
{
    25%
    {
        -webkit-transform: perspective(100px) rotateX(180deg) rotateY(0);
                transform: perspective(100px) rotateX(180deg) rotateY(0);
    }
    50%
    {
        -webkit-transform: perspective(100px) rotateX(180deg) rotateY(180deg);
                transform: perspective(100px) rotateX(180deg) rotateY(180deg);
    }
    75%
    {
        -webkit-transform: perspective(100px) rotateX(0) rotateY(180deg);
                transform: perspective(100px) rotateX(0) rotateY(180deg);
    }
    100%
    {
        -webkit-transform: perspective(100px) rotateX(0) rotateY(0);
                transform: perspective(100px) rotateX(0) rotateY(0);
    }
}
</style>