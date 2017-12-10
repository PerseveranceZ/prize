<template>
    <div class="wrap">
        <div class="formBox">
            <div class="itemBox">
                <span class="item-text">邀请码</span>
                <input class="item-input" type="text" v-model="code">
            </div>
            <div class="itemBox">
                <span class="item-text">姓名</span>
                <input class="item-input" type="text" v-model="name">
            </div>
            <div class="itemBox">
                <span class="item-text">电话</span>
                <input class="item-input" type="number" v-model="phone">
            </div>
            <div class="itemBox">
                <span class="item-text">门店</span>
                <input class="item-input" type="text" v-model="store">
            </div>
            <div class="itemBox">
                <span class="item-text">机型</span>
                <input class="item-input" type="text" v-model="pmodel">
            </div>
            <div class="itemBox">
                <div class="item-button" @click="check">验证</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            name: '',
            phone: '',
            store: '',
            pmodel: ''
        }
    },
    computed: {
        startCheck(){
            return this.code && this.name && this.phone && this.store && this.pmodel
        }
    },
    methods: {
        check(){
            this.$apis['code/verify']({
                code: this.code,
                name: this.name,
                phone: this.phone,
                store: this.store,
                pmodel: this.pmodel,
            }).then((res) => {
                this.$router.push({
                    name: 'third',
                    query: {
                        code: this.code
                    }
                })
            })
        }
    }
}
</script>
<style>


.formBox{
    width: auto;
    margin: 1rem 1.5rem .9rem 1.5rem;
}

.formBox .itemBox{
    width: 100%;
    height: 4rem;
    margin: 0 0 0 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.formBox .itemBox .item-text {
    line-height: center;
    font-size: 1.3rem;
    display: inline-block;
    flex-grow: 1;
    flex-basis: 4rem;
    color: #a28652;
}

.formBox .itemBox .item-input {
    background: none;
    flex-grow: 3;
    border: none;
    height: 1rem;
    border-bottom: 1px solid #a28652;
}

.item-button{
    background: #c00000;
    width: 10rem;
    height: 3.5rem;
    border-radius: 1rem;
    box-shadow: 5px 5px 5px #888888;
    font-size: 2rem;
    color: #fff;
    line-height: 3.5rem;
    text-align: center;
    /* margin-left: 3.5rem; */
}

</style>

