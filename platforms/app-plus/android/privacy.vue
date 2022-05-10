<template>
  <view class="container">
    <view class="contentWrap">
      <view class="title">用户协议和隐私政策</view>
      <view class="content"><rich-text :nodes="detail"></rich-text></view>
      <view class="closeBtn" @click="close">确定</view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import useSysStore from '@/stores/sys';
const sysStore = useSysStore();
const privacy = ref();
const detail = computed(() => privacy.value?.replace(/<p><\/p>/g,"<br/>").replace(/<img/g, `<img style="max-width:100%;display:block"`))
const close = () => {
  uni.navigateBack();
};
onLoad(() => {
  // 查询隐私政策
  sysStore.service({
    service: 'getSysParams',
    payload: { id: 'privacyProtocol' }
  }).then(res => {
    if(res.code == 200) {
      privacy.value = res.data.codeValue
    }
  })
});
</script>

<style>
page {
  background: transparent;
}
</style>
<style lang="less" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.contentWrap {
  width: 70vw;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  .content {
    margin: 20rpx 0;
    overflow-y: auto;
    max-height: 60vh;
  }
  .title {
    text-align: center;
    font-weight: 800;
  }
  .closeBtn {
    color: #2249FC;
    text-align: right;
  }
}
</style>
