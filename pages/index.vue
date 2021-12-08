<template>
  <view class="container">
    1
    <!-- status: 请求时设置为 loading，请求后判断current * pageSize < total还有数据 有设置为loadmore，无设置为nomore -->
    <u-loadmore
      :status="loading ? 'loading' : pagination.current * pagination.pageSize < pagination.total ? 'loadmore' : 'nomore'"
    ></u-loadmore>
    <u-no-network></u-no-network>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      pagination: ({ home }) => home.pagination,
      loading: ({ loading }) => loading.effects['home/query']
    })
  },
  methods: {
    
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
