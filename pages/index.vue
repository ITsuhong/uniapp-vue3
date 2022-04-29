<template>
  <view class="container">
    123
    <avatar-cropper
      selWidth="500rpx"
      selHeight="500rpx"
      stretch="short"
      :inner="true"
      @upload="myUpload"
      :avatarSrc="avatarUrl"
      avatarStyle="width: 200rpx; height: 200rpx; border-radius: 0;"
    ></avatar-cropper>

    <yuansheng-loadmore :loading="loading" :pagination="pagination"></yuansheng-loadmore>
  </view>
</template>

<script setup>
import { onShow, onLoad, onReachBottom } from '@dcloudio/uni-app';
import { computed, ref, getCurrentInstance } from 'vue';
import useHomeStore from '@/stores/index/home';
const myUpload = rsp => {
  // this.url = rsp.path; //更新头像方式一
  //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
  console.log(rsp);
  avatarUrl.value = rsp.path
};
const avatarUrl = ref('/static/tabbar/icon_home_click@2x.png');

const homeStore = useHomeStore()
const { pagination, loading } = homeStore
onShow(() => {
  console.log('onShow');
});
onLoad(() => {
  console.log('onLoad');
});

onReachBottom(() => {
  console.log('onReachBottom', pagination);
  const { current, pageSize, total } = pagination;
  if (current * pageSize < total) {
    // homeStore.query({ pageNum: current + 1 })
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
