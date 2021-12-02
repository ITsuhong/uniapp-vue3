<template>
  <view class="container">
    <u-parse :html="richText"></u-parse>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        richText: '',
      };
    },
    onLoad() {
      const eventChannel = this.getOpenerEventChannel()
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.once('acceptRichText', (data) => {
        this.richText = data.richText
      })
    }
  };
</script>
<style>
  page{background-color: #FFFFFF;}
</style>
<style scoped lang="less">
  .container {
    background-color: #fff;
  }
</style>
