<template>
  <view class="container">
    2
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
  }
};
</script>

<style>
page {
  padding-bottom: 0;
}
</style>
<style scoped lang="less">
@import '@/common.less';
.container {
 
}


</style>
