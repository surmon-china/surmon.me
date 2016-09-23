<template>
  <div class="v-spinner" v-bind:style="{position: 'relative', fontSize: 0}" v-show="loading">
  <!-- <div class="v-spinner" v-bind:style="containerStyle"> -->
    <div class="v-fade v-fade1" v-bind:style="[spinnerStyle,animationStyle1]">
    </div><div class="v-fade v-fade2" v-bind:style="[spinnerStyle,animationStyle2]">
    </div><div class="v-fade v-fade3" v-bind:style="[spinnerStyle,animationStyle3]">
    </div><div class="v-fade v-fade4" v-bind:style="[spinnerStyle,animationStyle4]">
    </div><div class="v-fade v-fade5" v-bind:style="[spinnerStyle,animationStyle5]">
    </div><div class="v-fade v-fade6" v-bind:style="[spinnerStyle,animationStyle6]">
    </div><div class="v-fade v-fade7" v-bind:style="[spinnerStyle,animationStyle7]">
    </div><div class="v-fade v-fade8" v-bind:style="[spinnerStyle,animationStyle8]">
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'FadeLoader',

  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: { 
      type: String,
      default: '#5dc596'
    },
    height: {
      type: String,
      default: '15px'
    },
    width: {
      type: String,
      default: '5px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '2px'
    }
  },
  data () {
    return {
      spinnerStyle: {
      	backgroundColor: this.color,
      	height: this.height,
     		width: this.width,
      	margin: this.margin,
      	borderRadius: this.radius
      },
      radius: '20px'
    }
  },
  computed: {
    ngRadius () {
      return '-' + this.radius
    },
    quarter () {
      return (parseFloat(this.radius)/2 + parseFloat(this.radius)/5.5) + 'px'
    },
    ngQuarter () {
      return '-' + this.quarter
    },
    animationStyle1 () {
      return {
        top: this.radius,
        left: 0,
        animationDelay: '0.12s'
      }
    },
    animationStyle2 () {
      return {
        top: this.quarter,
        left: this.quarter,
        animationDelay: '0.24s',
        transform: 'rotate(-45deg)'
      }
    },
    animationStyle3 () {
      return {
        top: 0,
        left: this.radius,
        animationDelay: '0.36s',
        transform: 'rotate(90deg)'
      }
    },
    animationStyle4 () {
      return {
        top: this.ngQuarter,
        left: this.quarter,
        animationDelay: '0.48s',
        transform: 'rotate(45deg)'
      }
    },
    animationStyle5 () {
      return {
        top: this.ngRadius,
        left: 0,
        animationDelay: '0.60s'
      }
    },
    animationStyle6 () {
      return {
        top: this.ngQuarter,
        left: this.ngQuarter,
        animationDelay: '0.72s',
        transform: 'rotate(-45deg)'
      }
    },
    animationStyle7 () {
      return {
        top: 0,
        left: this.ngRadius,
        animationDelay: '0.84s',
        transform: 'rotate(90deg)'
      }
    },
    animationStyle8 () {
      return {
        top: this.quarter,
        left: this.ngQuarter,
        animationDelay: '0.96s',
        transform: 'rotate(45deg)'
      }
    }
  }

}
</script>

<style>

.v-spinner .v-fade
{
    -webkit-animation: v-fadeStretchDelay 1.2s infinite ease-in-out;
            animation: v-fadeStretchDelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;
    position: absolute;               
}

@-webkit-keyframes v-fadeStretchDelay
{
    50%
    {
        -webkit-opacity: 0.3;             
                opacity: 0.3;
    }
    100%
    {
        -webkit-opacity: 1;             
                opacity: 1;
    }
}

@keyframes v-fadeStretchDelay
{
    50%
    {
        -webkit-opacity: 0.3;             
                opacity: 0.3;
    }
    100%
    {
        -webkit-opacity: 1;             
                opacity: 1;
    }
}
</style>