<template>
  <view class="container">
    1
    <yuansheng-loadmore :loading="loading" :pagination="pagination"></yuansheng-loadmore>
  </view>
</template>

<script setup>
import { onShow, onLoad, onReachBottom } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
import { computed, ref, getCurrentInstance } from 'vue';

const store = useStore();
const pagination = computed(() => store.state.home.pagination); //ref对象
const loading = computed(() => store.state.loading.effects['home/query']);
onShow(() => {
  console.log('onShow');
});
onLoad(() => {
  console.log('onLoad');
});

onReachBottom(() => {
  console.log('onReachBottom',pagination);
  const { current, pageSize, total } = pagination.value;
  if (current * pageSize < total) {
    // store.dispatch({ type: 'home/queryGoodsList', payload: { pageNum: current + 1 } });
  }
});

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
