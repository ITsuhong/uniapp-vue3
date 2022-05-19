<template>
  <view class="container">
    <rich-text :nodes="richText" space="nbsp"></rich-text>
  </view>
</template>

<script setup>
  import { ref, getCurrentInstance } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  const richText = ref('')
  onLoad(() => {
    const { ctx } = getCurrentInstance()
    const eventChannel = ctx.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.once('acceptRichText', (data) => {
      richText.value = data?.replace(/<p><\/p>/g,"<br/>").replace(/<img/g, `<img style="max-width:100%;display:block"`)
    })
  })
</script>
<style scoped lang="less">
  .container {
    padding: 0 30rpx;
    box-sizing: border-box;
  }
</style>
