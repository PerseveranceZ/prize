<template>
   <div>
     <div @click="next">开始抽奖</div>
   </div>
</template>

<script>
export default {
  methods: {
    next(){
      this.$router.push({ name: 'second' })
    }
  }
}
</script>
