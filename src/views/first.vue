<template>
   <div>
     <img class="themImg animated infinite pulse" src="../assets/theme.png" alt="">
		<transition name="bounce" enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
	     	<div v-if="btnShow" class="button" @click="next">开始抽奖</div>
        </transition>     
   </div>
</template>

<script>
const IMGS = ['/static/img/icon.png', '/static/img/logo.jpg', '/static/img/ny.png', '/static/img/theme.png', '/static/img/bg.jpg']

export default {
	data() {
        return {
            loadArr: [],
            btnShow: false
        }
    },
    watch: {
        loadArr(newVal) {
            if( newVal.length === 5 ){
            	setTimeout(() => {
	                // GLOBAL.vbus.$emit('handleImgNy', true)
	                this.btnShowHandler()
            	}, 1000)
            }
        }
    },	
	beforeRouteEnter (to, from, next) {
		GLOBAL.vbus.$emit('handleImgNy', true)
		next()
	},

	mounted() {
		setTimeout(() => {
			GLOBAL.vbus.$emit('handleImgNy', true)
			this.btnShowHandler()
		},3000)
	},
	methods: {
	    next(){
	     	this.$router.push({ name: 'second' })
	    },
	    btnShowHandler() {
			setTimeout(() => {
               this.btnShow = true
        	}, 1000)	    	
	    },
		loaderImgs() {
            let imgArr = [],
                self = this
            for (var i = 0, len = IMGS.length; i < len; i ++) {
                // this.loadArr[i] = i
                imgArr[i] = new Image()
                imgArr[i].src = IMGS[i]
                imgArr[i].onload = (function(i){
                    return function(){ self.loadArr.push(i) }
                })(i);
            }
        }	    
  	}
}
</script>


<style lang="scss" scoped>
	.themImg{
		width: 80%;
		margin: 0 10%;

	}
	.button{
		color: #FFD27E;
	    width: 40%;
	    height: 3rem;
	    background: #c30d23;
	    position: absolute;
	    bottom: 4rem;
	    left: 1.5rem;
	    box-shadow: 1px 1px 5px #FFD27E, 1px 1px 5px #c30d23;
	}


</style>