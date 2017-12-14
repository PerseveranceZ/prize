<template>
    <div>
        <div>中奖成功</div>
        <div>{{info}}</div>
    </div>
</template>

<script>
import {PRIZES} from './conf'
    export default {
        beforeRouteEnter (to, from, next) {
            GLOBAL.vbus.$emit('handleImgNy', true)
            GLOBAL.vbus.$emit('handleIconAnimated', false)            
            next()
        },        
        data() {
            return {
                info: null
            }
        },
        created() {
            this.$apis['code/check']({
                code: this.$route.query.code
            }).then(info => {
                this.info = info
            })
        }
    }
</script>
