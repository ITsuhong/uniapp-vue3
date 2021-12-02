<script>
import { getUnionuser } from '@/utils/config.js';
export default {
  globalData: {},
  onLaunch: function() {
    console.log('App Launch');
    // #ifdef MP-WEIXIN
    const updateManager = uni.getUpdateManager();
    updateManager.onUpdateReady(() => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    // #endif

    // #ifdef APP-PLUS
    // 安卓隐私政策
    if (!plus.runtime.isAgreePrivacy() && plus.os.name == 'Android') {
      //弹出自定义隐私政策提示框
      plus.runtime.agreePrivacy(); //用户同意
      uni.navigateTo({
        url: '/platforms/app-plus/android/privacy'
      });
    }
    // 极光推送
    const jpushModule = uni.requireNativePlugin("JG-JPush")
    jpushModule?.initJPushService(); //初始化极光
    jpushModule?.setLoggerEnable(true) //开启日志 false为不开启
    jpushModule?.addConnectEventListener(result=>{ //监听链接极光推送之后设置别名alias
    	let connectEnable = result.connectEnable
      console.log(result,plus.os.name)
      if (connectEnable == true) {
        console.log('已连接')
        // 设置别名一般写在登录成功之后，一般用userId作为别名推送消息
        // 退出登录/401之后需要deleteAlias，此部分代码开发者自行处理
        // 一台手机只要设置过alias都能接到推送，删除alias就收不到。
        jpushModule.setAlias({
          'alias' : plus.os.name, //Android 或者 iOS
          'sequence': 1
        })
        // jpushModule.deleteAlias({ 'sequence': 1 })
      }else {
        console.log('未连接')
      }
    });
    // 监听收到的推送消息
    jpushModule?.addNotificationListener(result=>{
      // notificationArrived为收到推送消息，notificationOpened为点击推送消息
    	const notificationEventType = result.notificationEventType 
    	const messageID = result.messageID
    	const title = result.title
    	const content = result.content
    	const extras = result.extras
      // 以下自己写业务处理代码
      console.log(notificationEventType)
    	uni.showToast({
    		icon: 'none',
    		title: JSON.stringify(result),
    		duration: 3000
    	})
    });
    // #endif
  },
  onShow: function() {
    console.log('App Show');
    // #ifdef APP-PLUS
    const jpushModule = uni.requireNativePlugin('JG-JPush');
    jpushModule?.setBadge(0);//清除极光推送的角标
    plus.runtime.setBadgeNumber(0); //清除本地的角标
    // #endif
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import './uni_modules/vk-uview-ui/index.scss';

/*每个页面公共css */
/* #ifdef H5 || MP-WEIXIN || APP-VUE */
page {
  background-color: #f7f7f7;
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
image {
  display: block;
}
/* #endif */
</style>
