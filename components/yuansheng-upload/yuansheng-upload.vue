<!-- 
 * 上传文件
 * @作者：郑超
 * @公司：四川源昇科技公司
 * @版本：v1.0.0
 -->
<template>
  <view>
    <view class="container">
      <template v-for="(item, index) in value">
        <view class="imgBox" :key="index" :style="boxStyle">
          <image
            @click="handlePreview(item)"
            mode="aspectFill"
            class="uploadIcon"
            :src="fileType == 'video' ? item.url + ossSuffix : item.url"
          ></image>
          <u-icon v-if="closeAble" @click="handleDelete(index)" class="deleteIcon" name="close-circle-fill" color="#f50" size="50"></u-icon>
        </view>
      </template>

      <view v-if="value.length < maxCount" @click="handleUploadChange">
        <slot v-if="$slots.default"></slot>
        <view v-else class="imgBox" :style="boxStyle">
          <image class="uploadIcon" :src="require('./icon_upload@2x.png')"></image>
        </view>
      </view>
    </view>
    <!-- #ifdef APP-PLUS -->
    <!-- 此容器解决ios下video仍然有高度占位的问题 -->
    <view style="width: 0;height: 0;,overflow: hidden;">
      <video
        @fullscreenchange="fullscreenchange"
        style="width: 1px; height: 1px;opacity: 0;"
        playsinline
        preload="auto"
        :src="videoSrc"
        id="myVideo"
      ></video>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { ossHost, ossSuffix, getToken } from '@/utils/config.js';
import { getOSSData } from '@/utils/utils.js';
import md5 from 'md5';
export default {
  /**
   * 数据
   */
  props: {
    // 默认值
    value: { //文件数组由父级传值
      type: Array,
      default() {
        return [];
      }
    },
    maxCount: { //文件最大上传数量
      type: Number,
      default: 9 
    },
    fileType: {
      type: String,
      default: 'image' //video为视频，默认image
    },
    boxStyle: {
      type: String,
      default: ''
    },
    closeAble: {
      type: Boolean,
      default: true
    }
  },
  /**
   * 数据
   */
  data() {
    return {
      ossSuffix: ossSuffix,
      formData: {},
      videoSrc: ''
    };
  },

  /**
   * 监听数据
   */
  watch: {},

  /**
   * 组件初次加载完成
   */
  mounted() {
    // console.log('mounted');
    // #ifdef APP-PLUS
    this.videoContext = uni.createVideoContext('myVideo'); //获取video实例
    // #endif
    if (getToken()) {
      getOSSData().then(formData => (this.formData = formData)); //获取并创建oss上传参数
    }
  },

  /**
   * 函数
   */
  methods: {
    handleDelete(index) {
      this.$emit('change', this.value.filter((_, i) => index !== i));
    },
    handleUploadChange() {
      switch (this.fileType) {
        case 'video':
          uni.chooseVideo({
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
              this.upload([{ ...res, path: res.tempFilePath }]);
            },
            fail: err => {
              this.$checkPermission({
                iOS: 'photoLibrary',
                Android: 'android.permission.WRITE_EXTERNAL_STORAGE',
                WEIXIN: 'scope.writePhotosAlbum'
              });
            }
          });
          break;
        default:
          uni.chooseImage({
            count: this.maxCount - this.value.length, //最大值减去数组的长度
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
              this.upload(res.tempFiles);
            },
            fail: err => {
              this.$checkPermission({
                iOS: 'photoLibrary',
                Android: 'android.permission.WRITE_EXTERNAL_STORAGE',
                WEIXIN: 'scope.writePhotosAlbum'
              });
            }
          });
          break;
      }
    },
    upload(files) {
      uni.showLoading({ title: '上传中...', mask: true });
      const promiseArr = files.map(item => {
        return new Promise((resolve, reject) => {
          item.fileName = `uni/${md5(Date.parse(new Date()) + md5(item.path))}`;
          uni.uploadFile({
            url: ossHost, // 开发者服务器的URL。
            filePath: item.path,
            name: 'file', // 必须填file。
            formData: {
              key: item.fileName,
              ...this.formData,
              success_action_status: '200'
            },
            success: res => {
              item.url = `${ossHost}/${item.fileName}`;
              if (res.statusCode === 200) {
                resolve(item);
              } else {
                reject(res);
              }
            }
          });
        });
      });
      // console.log(promiseArr)
      Promise.all(promiseArr.filter(r => r))
        .then(res => {
          uni.hideLoading();
          this.$emit('change', this.value.concat(res));
        })
        .catch(err => {
          uni.hideLoading();
          uni.showModal({
            title: `上传失败`,
            content: `OSS上传失败：${err.statusCode}`,
            showCancel: false,
            confirmText: '知道了'
          });
        });
    },
    // #ifdef APP-PLUS
    fullscreenchange(e) {
      if (e.detail.fullScreen) {
        //全屏时候播放
        this.videoContext.seek(0);
        this.videoContext.play();
      } else {
        this.videoContext.pause();
      }
    },
    // #endif
    handlePreview(record) {
      switch (this.fileType) {
        case 'video':
          // #ifdef APP-PLUS
          this.videoSrc = record.url;
          // 进入全屏状态
          this.videoContext.requestFullScreen({ direction: 0 });
          // #endif
          // #ifdef MP-WEIXIN
          wx.previewMedia({
            sources: [{ url: record.url, type: 'video', poster: record.url + ossSuffix }]
          });
          // #endif
          break;
        default:
          uni.previewImage({
            current: record.url,
            urls: this.value.map(item => item.url)
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.imgBox {
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  position: relative;
  border-radius: 10rpx;
  overflow: hidden;

  .deleteIcon {
    position: absolute;
    right: 0rpx;
    top: 0rpx;
  }
}

.uploadIcon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
