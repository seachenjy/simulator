/*
 * @Author: sea
 * @Email: 364095436@qq.com
 * @Date: 2022-03-02 15:14:01
 * @LastEditTime: 2022-03-08 21:03:33
 * @FilePath: /simulator/extensions/main.js
 */
// found in the LICENSE file.
///////event///


let port = null
const vm = new Vue({
  el: '#app',
  data:{
    connect: 0, //连接状态
    hostName: 'com.simulator.mouse', //connect name
    offset_x: 0,
    offset_y: 0,
    command: '' //自定义脚本
  },
  created(){
    port = chrome.runtime.connectNative(this.hostName)
    port.onMessage.addListener(this.onNativeMessage)
    port.onDisconnect.addListener(this.onDisconnected);
    this.install()
    chrome.runtime.onMessage.addListener(msg=>{
      console.log('content',msg)
      msg.x += parseInt(this.offset_x)
      msg.y += parseInt(this.offset_y)
      port.postMessage(msg)
    })
  },
  methods:{
    test(){
      port.postMessage({
        t: 'move',
        x: parseInt(this.offset_x),
        y: parseInt(this.offset_y)
      })
    },
    onNativeMessage(res){
      this.connect = 1
      console.log('native message:',res)
    },
    onDisconnected(res){
      this.connect = 0
    },
    install(){
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.executeScript(tabs[0].id,{file:'./content.js'},null)
      })
    },
    run_cmd(){
      // this.port.postMessage({
      //   t:'m',x:100,y:100,s:''
      // })
      // console.log(JSON.stringify(this.command))
      // chrome.ta
      chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
        chrome.tabs.executeScript(tabs[0].id,{code:this.command},null)
      });
    }
  }
})
