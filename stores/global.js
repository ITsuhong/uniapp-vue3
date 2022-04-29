import { defineStore } from 'pinia';
import * as service_oss from '@/services/oss.js';
import * as services_sys from "@/services/sys.js"

export default defineStore('global', {
	state: () => ({
    apkInfo: {},
    haveNew: false
	}),
	actions: {
		async getSTSInfo() {
		  const response = await service_oss.getSTSInfo()
		  return response
		},
    async checkAndroidUpdate(payload) {
      const response = await services_sys.checkAndroidUpdate({ ...payload })
      if(response?.code == 200) {
        this.apkInfo = response.data
        plus.runtime.getProperty(plus.runtime.appid, res => {
          // console.log(res.version);
          if(res.version != response.data?.newVersion){
            setTimeout(() => uni.getSubNVueById('appUpdate').show(),500); 
            this.haveNew = true
          }
        });
      }
      return response
    },
	},
});