<template>
  <view class="container">
    {{ flag.id }}
    {{pagination}}-{{loading}}
    
    <template v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item">
      <view @click="aa(item)" style="height: 200rpx;">{{item}}</view>
    </template>
    <yuansheng-loadmore :loading="true" :pagination="pagination"></yuansheng-loadmore>
    <u-no-network></u-no-network>
  </view>
</template>

<script setup>
  import useMapState from '@/hooks/useMapState.js'
  import { onPageScroll, onReachBottom, onShow, onLoad } from '@dcloudio/uni-app'
  import { useStore } from 'vuex'
  import { computed, ref, reactive } from 'vue'
  // console.log( useStore())
  const { state, commit, dispatch }  = useStore()
  const pagination = computed(() => state.home.pagination)
  const loading = computed(() => state.loading.effects['home/query'])
  const flag = ref({
    id: 0
  })
  const aa = (record) => {
    console.log(1234,record)
    flag.value.id = record
  }
  onPageScroll((e) => {
    // console.log(e);
  });
  onReachBottom(() => {
    console.log('onReachBottom');
  });
  onShow(() => {
    console.log('onShow');
  });
  onLoad(() => {
    console.log('onLoad');
    setTimeout(() => {
      commit({ type: 'home/save', payload: { pagination: { test: 1 } } })
      // dispatch({ type: 'home/query' });
    },5000)
  });

// export default {
//   setup() {
//     return {
      // ...useMapState({
      //   pagination: ({ home }) => home.pagination,
      //   loading: ({ loading }) => loading.effects['home/query']
      // }),
//     }
//   },
//   onLoad() {
//    // this.$store.dispatch({ type: 'home/queryGoodsList', payload: { pageNum: 1 } });
//   },
  
//   onReachBottom() {
//     const { current, pageSize, total } = this.pagination;
//     if (current * pageSize < total) {
//       // this.$store.dispatch({ type: 'home/queryGoodsList', payload: { pageNum: current + 1 } });
//     }
//   }
// };
</script>

<style>
page {
  padding-bottom: 0;
}
</style>
<style scoped lang="less">
.container {
  
}
</style>
