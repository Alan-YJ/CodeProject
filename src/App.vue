<template>
  <div id="app">
      <Header></Header>
      <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/header/header'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style lang='stylus'>
@import './common/css/initStyle.styl';
    
</style>
