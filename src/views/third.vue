<template>
  <div>
    <div class="prizeBox">
      <div ref="prize_1" class="prize-item prize" :class="{'prize-select': selectedIndex === 1}">
        <i class="iconfont">&#xe628;</i>
        <p>{{PRIZES[0]}}</p>
      </div>
      <div ref="prize_2" class="prize-item" :class="{'prize-select': selectedIndex === 2}">
        <i class="iconfont">&#xe603;</i>
        <p>{{PRIZES[1]}}</p>
    </div>
      <div ref="prize_3" class="prize-item" :class="{'prize-select': selectedIndex === 3}">
        <i class="iconfont">&#xe645;</i>
        <p>{{PRIZES[2]}}</p>
    </div>
    </div>
    <div class="prizeBox">
      <div ref="prize_4" class="prize-item" :class="{'prize-select': selectedIndex === 4}"><i class="iconfont">&#xe636;</i><p>{{PRIZES[3]}}</p></div>
      <div class="prize-item prize-button" @click="openPrize">
        <i class="iconfont">&#xe677;</i>
        <p>开始抽奖</p>
      </div>
        <!-- <div class="prize-item prize-button" @click="luckDraw">
          <i class="iconfont">&#xe666;</i>
          <p>已结束</p>
        </div>     -->  
      <div ref="prize_5" class="prize-item" :class="{'prize-select': selectedIndex === 5}"><i class="iconfont">&#xe65e;</i><p>{{PRIZES[5]}}</p></div>
    </div>
    <div class="prizeBox">
      <div ref="prize_6" class="prize-item" :class="{'prize-select': selectedIndex === 6}"><i class="iconfont">&#xe60c;</i><p>{{PRIZES[6]}}</p></div>
      <div ref="prize_7" class="prize-item" :class="{'prize-select': selectedIndex === 7}"><i class="iconfont">&#xe61d;</i><p>{{PRIZES[7]}}</p></div>
      <div ref="prize_8" class="prize-item" :class="{'prize-select': selectedIndex === 8}"><i class="iconfont">&#xe605;</i><p>{{PRIZES[8]}}</p></div>
    </div>
  
    <div class="page" v-if="havePirzeList.length">
      <ul class="prizeList">
        <li v-for="(item, index) in havePirzeList" :key="index">{{`${item.user_phone}-${item.user_name}-${item.prize_name}`}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {PRIZES} from './conf'
  const prizeIndexs = [1, 1, 2, 3, 5, 8, 7, 6, 4]
  
  export default {
    created() {
      this.code = this.$route.query.code
      this.$apis['code/check']({
        code: this.code
      }).then(res => {
        let {
          prize_no,
          user_name,
          user_phone,
          status
        } = res

        this.prizeNo = parseInt(prize_no, 10) || 1
        this.name = user_name
        this.phone = user_phone
        if( status == 1 ) {
          this.gotoFourth()
        }else{
          this.canOpenPrize = true
          this.getHavePirzeList()
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
        canOpenPrize: false,
        PRIZES
      };
    },
    methods: {
      openPrize() {
        if( !this.canOpenPrize ) return
        this.changeCodeStatus().then(resData => {
          this.luckDraw()
        })
      },
      luckDraw() {
          if (this.selectedIndex === this.prizeNo && this.currIndex > 28) {
          this.$nextTick(() => {
            this.$refs[`prize_${this.prizeNo}`].className += ' animated infinite pulse'
          })
          setTimeout(() => {
            this.gotoFourth()           
          }, 3000)
          return
        }
        setTimeout(() => {
          this.currIndex++
          if(this.currIndex % 9 === 0) this.currIndex++
          this.selectedIndex = prizeIndexs[this.currIndex % 9]
          this.luckDraw()
        }, this.rate)
      },
      getHavePirzeList() {
        this.$apis['code/list']({
          page: 1,
          size: 50
        }).then(resData => {
          this.havePirzeList = resData.list
        })
      },
      changeCodeStatus() {
        return this.$apis['code/prize']({
          code: this.code,
        }).then(resData => {
          return resData
        })        
      },
      gotoFourth() {
        this.$router.push({
          name: 'fourth',
          query: {
            code: this.code
          }
        })            
      }
    },
    computed: {
      rate() {
        return this.currIndex / 0.1
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
      padding-top: .6rem;
    height: 5rem;
    font-size: 16px;
    text-align: center;
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
    background: #e1c28b;
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
    background-color: transparent;
    overflow: hidden;
    flex: auto;
    align-items: center;
    flex-direction: row;
    animation: moveup 30s linear infinite;
    margin: 0;    
  }
  
  .prizeList li {
    line-height: 30px;

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
  
  .page {
    overflow: hidden;
    margin-bottom: 0;
  }
  
  
</style>
