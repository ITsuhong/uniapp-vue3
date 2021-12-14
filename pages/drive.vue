<template>
  <view class="container">
    2
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
