<template>
<div class="v-spinner" v-show="loading">
    <div class="v-square" v-bind:style="spinnerStyle">
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'SquareLoader',

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
      default: '50px'
    }
  },
  data () {
    return {
      spinnerStyle: {
      	backgroundColor: this.color,
      	height: this.size,
     	  width: this.size
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

.v-spinner .v-square
{
    -webkit-animation: v-squareDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);
            animation: v-squareDelay 3s 0s infinite cubic-bezier(.09,.57,.49,.9);
    -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;
    perspective: 100px;
    display: inline-block;
}

@-webkit-keyframes v-squareDelay
{
    25%
    {
        -webkit-transform: rotateX(180deg) rotateY(0);
                transform: rotateX(180deg) rotateY(0);
    }
    50%
    {
        -webkit-transform: rotateX(180deg) rotateY(180deg);
                transform: rotateX(180deg) rotateY(180deg);
    }
    75%
    {
        -webkit-transform: rotateX(0) rotateY(180deg);
                transform: rotateX(0) rotateY(180deg);
    }
    100%
    {
        -webkit-transform: rotateX(0) rotateY(0);
                transform: rotateX(0) rotateY(0);
    }
}

@keyframes v-squareDelay
{
    25%
    {
        -webkit-transform: rotateX(180deg) rotateY(0);
                transform: rotateX(180deg) rotateY(0);
    }
    50%
    {
        -webkit-transform: rotateX(180deg) rotateY(180deg);
                transform: rotateX(180deg) rotateY(180deg);
    }
    75%
    {
        -webkit-transform: rotateX(0) rotateY(180deg);
                transform: rotateX(0) rotateY(180deg);
    }
    100%
    {
        -webkit-transform: rotateX(0) rotateY(0);
                transform: rotateX(0) rotateY(0);
    }
}
</style>