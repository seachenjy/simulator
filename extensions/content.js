/*
 * @Author: sea
 * @Email: 364095436@qq.com
 * @Date: 2022-03-08 20:50:44
 * @LastEditTime: 2022-03-08 21:08:25
 * @FilePath: /simulator/extensions/content.js
 */

const __$__ = function(query) {
    return new __simulator__(query)
}
function __simulator__(query){
    this.dom = document.querySelector(query)
    this.position = this.dom.getBoundingClientRect()
}

__simulator__.prototype.sendMessage = function(msg){
    chrome.runtime.sendMessage(msg)
}

__simulator__.prototype.test = function(){
    this.sendMessage({
        t: 'move',
        x: this.position.x,
        y: this.position.y
    })
    return this
}