<template>
    <div>
        <div>中奖成功</div>
        <div>{{PRIZES[prizeNo]}}</div>
        <div>{{name}}</div>
        <div>{{phone}}</div>
    </div>
</template>

<script>
import {PRIZES} from './conf'
    export default {
        data() {
            return {
                name: '',
                phone: '',
                prizeNo: '',
                PRIZES
            }
        },
        created() {
            this.name = this.$route.query.name
            this.phone = this.$route.query.phone
            this.prizeNo = this.$route.query.prizeNo
        },
        methods: {
    
        }
    }
</script>
