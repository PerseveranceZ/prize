<template>
    <div class="formBox">
        <div class="itemBox">
            <span class="item-text">邀请码</span>
            <input class="item-input" type="text" v-model="code">
        </div>
        <div class="itemBox">
            <span class="item-text">姓名</span>
            <input class="item-input" type="text" v-model="user_name">
        </div>
        <div class="itemBox">
            <span class="item-text">电话</span>
            <input class="item-input" type="number" v-model="user_phone">
        </div>
        <div class="itemBox">
            <span class="item-text">门店</span>
            <input class="item-input" type="text" v-model="shop_name">
        </div>
        <div class="itemBox">
            <span class="item-text">机型</span>
            <input class="item-input" type="text" v-model="model_type">
        </div>
        <div class="item-button" @click="check">验证</div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter (to, from, next) {
        GLOBAL.vbus.$emit('handleImgNy', false)
        GLOBAL.vbus.$emit('handleIconAnimated', true)            
        next()
    },    
    data() {
        return {
            code: 'ICUNHD',
            user_name: '杨明哲',
            user_phone: '18587206366',
            shop_name: '店铺名称',
            model_type: '类型'
        }
    },
    computed: {
        startCheck(){
            return this.code && this.user_name && this.user_phone && this.shop_name && this.model_type
        }
    },
    methods: {
        check(){
            let params = {
                code: this.code,
                user_name: this.user_name,
                user_phone: this.user_phone,
                shop_name: this.shop_name,
                model_type: this.model_type,                
            }
            this.$apis['code/verify'](params).then((res) => {
                this.$router.push({
                    name: 'third',
                    query: params
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.formBox{
    width: auto;
    font-size: 1.3rem;
    padding: 1rem;
    margin: 1rem;
    border-radius: .2rem;
    background: #c30d23ab;
    box-shadow: 1px 1px 5px #c30d23ab;
    .itemBox{
        width: 100%;
        height: 4rem;
        margin: 0 0 0 0;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        .item-text {
            width: 30%;
            line-height: center;
            display: inline-block;
            flex-grow: 1;
            flex-basis: 4rem;
            color: #ecc481;
        }
        .item-input {
            width: 70%;
            margin-left: 1rem;
            text-align: center;
            color:#ecc481;
            font-size: 1.3rem;
            height: 2rem;
            background: none;
            flex-grow: 3;
            border: none;
            border-bottom: 1px solid #ecc481;
            border-radius: 0;
        }
    }

    .item-button{
        width: 100%;
        height: 3rem;
        color: #fff;
        background: #c30d23;
        margin-top: 2rem;
        border-radius: .2rem;
        border: 1px solid #e3c48c;
        box-shadow: 1px 1px 5px #ad3333;

        line-height: 3rem;
        text-align: center;
    }
}

</style>

