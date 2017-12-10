<template>
  <div class="wrap">
    <div class="prizeBox">
      <div class="prize-item prize" :class="selectedIndex === 0 ? 'prize-select' : ''">
        <div>
          {{PRIZES[0]}}
        </div>
      </div>
      <div class="prize-item" :class="selectedIndex === 1 ? 'prize-select' : ''">{{PRIZES[1]}}</div>
      <div class="prize-item" :class="selectedIndex === 2 ? 'prize-select' : ''">{{PRIZES[2]}}</div>
    </div>
    <div class="prizeBox">
      <div class="prize-item" :class="selectedIndex === 3 ? 'prize-select' : ''">{{PRIZES[3]}}</div>
      <div class="prize-item prize-button" @click="luckDraw">开始<br/>抽奖</div>
      <div class="prize-item" :class="selectedIndex === 5 ? 'prize-select' : ''">{{PRIZES[5]}}</div>
    </div>
    <div class="prizeBox">
      <div class="prize-item" :class="selectedIndex === 6 ? 'prize-select' : ''">{{PRIZES[6]}}</div>
      <div class="prize-item" :class="selectedIndex === 7 ? 'prize-select' : ''">{{PRIZES[7]}}</div>
      <div class="prize-item" :class="selectedIndex === 8 ? 'prize-select' : ''">{{PRIZES[8]}}</div>
    </div>
  
    <div class="page" v-if="havePirzeList.length">
      <ul class="box prizeList">
        <li v-for="(item, index) in havePirzeList" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {PRIZES} from './conf'
  const prizeIndexs = [0, 1, 2, 5, 8, 7, 6, 3]
  
  export default {
    created() {
      this.code = this.$route.query.code
      this.$apis['code/check']({
        code
      }).then(res => {
        // code 没被抽 + 有效
        let {
          prizeNo,
          name,
          phone
        } = res
  
        this.prizeNo = prizeNo
        this.name = name
        this.phone = phone
        this.getHavePirzeList()
      }, err => {
        if (err.resCode === 1) {
          // 已经抽过
          this.$router.push({
            name: 'fourth'
          })
        }
        if (err.resCode === 2 || err.resCode === 3) {
          // 无效
          // 没抽+无效
          this.$router.push({
            name: 'lose'
          })
  
        }
  
      })
    },
    data() {
      return {
        code: '',
        name: '',
        phone: '',
        prizeNo: 6,
        currIndex: 0,
        selectedIndex: -1,
        havePirzeList: [],
        PRIZES
      };
    },
    methods: {
      luckDraw() {
        if (this.selectedIndex === this.prizeNo && this.currIndex > 80) {
          this.$router.push({
            name: 'fourth',
            query: {
              name: this.name,
              phone: this.phone,
              pirzeNo: this.prizeNo
            }
          })
          return
        }
        setTimeout(() => {
          this.currIndex++
            this.selectedIndex = prizeIndexs[this.currIndex % 8]
          this.luckDraw()
        }, this.rate)
      },
      getHavePirzeList() {
        this.$apis['code/list']({
          count: 50
        }).then(resData => {
          this.havePirzeList = resData
        }, err => {
  
        })
      }
    },
    computed: {
      rate() {
        return this.currIndex / 0.2
      }
    }
  }
</script>

<style scoped>
  .prizeBox {
    height: 5rem;
    margin: 0 0 1rem 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1em;
  }
  
  .prize-item {
    box-shadow: 1px 1px 10px #bd1313;
    display: inline-block;
    height: 5rem;
    font-size: 16px;
    text-align: center;
    line-height: 5rem;
    flex-grow: 1;
    flex-basis: 5rem;
    background: #9d0909;
    color: white;
    border: 1px solid white;
    margin: .3rem;
    transform: scale(1);
    transition: all .3s;
  }
  
  .prize-select {
    transform: scale(1.1);
    box-shadow: 1px 1px 10px #e1c28b;
    background: #e1c28b;
  }
  
  .prize-button {
    height: 60px;
    background: #e1c28b;
    font-size: 24px;
    color: #fff;
    line-height: 30px;
    padding: 10px 0;
  }
  
  .prizeList {
    width: 100%;
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    color: #a28652;
    overflow: hidden;
    flex: auto;
    align-items: center;
    flex-direction: row;
  }
  
  .prizeList li {
    text-align: center;
    margin: 0 0 5px 0;
    font-size: 1rem;
  }
  
  @keyframes moveup {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  
  .box {
    animation: moveup 60s linear infinite;
  }
  
  .page {
    overflow: hidden;
  }
  
  
  /*样式*/
  
  .page {
    margin-top: 3em;
    margin-bottom: 0;
  }
  
  .box {
    margin: 0;
  }
  
  .box li {
    line-height: 30px;
  }
</style>
