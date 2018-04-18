<template>
  <div class='home-wrapper'>
      <div class='nav'>
              <router-link :to='"/home/"+item.url' class='nav-item' v-for='item in myLinks' :key='item.url'>
                  {{item.text}}
              </router-link>
      </div>
      <div class='page'>
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
      return {
          myPages:[]
      }
  },
  computed:{
      ...mapGetters({
          myLinks:'myLinks'
      })
  },
  created(){
      this.myPages = this.myLinks
  }
}
</script>
<style lang='stylus' scoped>
@import '../../common/css/variable.styl';
    .home-wrapper
        margin:0 auto
        width:100%
        min-width :960px
        max-width:1100px
        display :flex
        .nav
            border-right:1px solid $color-desc
            width:150px
            flex:0 0 150px
            .nav-item
                margin:0 auto
                width:50%
                display :block
                padding:30px
                border-bottom:1px solid $color-desc
                color:$color-title
                font-size:16px
                font-weight:700
                text-align:center
                &:last-child
                    border:none
                &.router-link-active,&:hover
                    color:$color-active
        .page
            flex:1
                
</style>
