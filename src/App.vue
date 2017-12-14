<template>
    <div class="wrap">
        <img src="./assets/icon.png" class="img-icon" :class="{'animated bounce': iconAnimated}">
        <img src="./assets/logo.jpg" class="img-logo">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="bounce" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
            <img v-if="nyShow" src="./assets/ny.png"  class="img-ny">
        </transition>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGIN_CODE } from 'Config';

export default {
    data() {
        return {
            nyShow: false,
            iconAnimated: false
        }
    },
    methods: {
        ...mapActions(['getUserInfo']),
        bindEvent() {
            GLOBAL.vbus.$on('ajax_handle_error', (resData) => {
                let codeStatus = {
                    600007: 'fourth',
                    600006: 'lose',
                  }
                  this.$router.push({
                    name: codeStatus[resData.data.code],
                    query: {
                        code: resData.config.params.code
                    }
                  })
            })
            GLOBAL.vbus.$on('request_error', (resData) => {
            })
            GLOBAL.vbus.$on('response_error', (resData) => {
                alert(resData)
                
            })
            GLOBAL.vbus.$on('scrollToTop', (resData) => {
            })
            GLOBAL.vbus.$on('handleImgNy', (resData) => {
                this.nyShow = resData
            })
            GLOBAL.vbus.$on('handleIconAnimated', (resData) => {
                this.handleIconAnimated = resData
            })                        
        }
    },
    created() {
        this.bindEvent()
    },

}
</script>
<style>
@import './assets/style/index.scss';
.img-logo{
    width: 7.2rem;
    position: absolute;
    top: 0rem;
    left: 1.3rem;
    z-index: 9;
}
.img-icon{
    width: 7rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 9;
    animation-duration: 3s;
    animation-delay: .5s;
    animation-iteration-count: infinite;
}
.img-ny{
    width: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>

