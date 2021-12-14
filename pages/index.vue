<template>
  <view class="container">
    1
    <yuansheng-loadmore :loading="lading" :pagination="pagination"></yuansheng-loadmore>
    <u-no-network></u-no-network>
  </view>
</template>

<script>
import useMapState from '@/hooks/useMapState.js'
export default {
  setup() {
    return {
      ...useMapState({
        pagination: ({ home }) => home.pagination,
        loading: ({ loading }) => loading.effects['home/query']
      }),
    }
  },
  onLoad() {
   // this.$store.dispatch({ type: 'home/queryGoodsList', payload: { pageNum: 1 } });
  },
  
  onReachBottom() {
    const { current, pageSize, total } = this.pagination;
    if (current * pageSize < total) {
      // this.$store.dispatch({ type: 'home/queryGoodsList', payload: { pageNum: current + 1 } });
    }
  }
};
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
