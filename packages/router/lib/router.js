!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Router=e()}(this,(function(){"use strict";function t(t=location){const{hash:e,host:o,pathname:n,port:s,protocol:i,search:r}=t,a=function(t){if(t.length<2)return{};t=t.slice(1);const e=new Map,o={};t.split("&").forEach((t=>{const o=t.split("=");e.has(o[0])?e.get(o[0]).push(o[1]):e.set(o[0],[o[1]])}));for(const t of e)t[1].length>1?o[t[0]]=t[1]:o[t[0]]=t[1][0];return o}(r);return{hash:e,host:o,path:n,port:s,protocol:i,query:a}}return class{constructor(e){this.mode=e.mode||"history",this.routes=e.routes||[],this.base=e.base||"",this.route=function(e=location){return t(e)}(),window.addEventListener("popstate",this.listener.bind(this))}push(t,e){const o={key:Date.now(),url:t};window.history.pushState(o,null,t),dispatchEvent(new PopStateEvent("popstate",{state:{...o,onComplete:e}}))}replace(t,e){const o={key:Date.now(),url:t};window.history.replaceState(o,null,t),dispatchEvent(new PopStateEvent("popstate",{state:{...o,onComplete:e}}))}go(t){window.history.go(t)}beforeEach(t){}listener(e){const{url:o,onComplete:n}=e.state,{base:s}=this,i=function(e,o="",n){const s=t(n);return e.find((t=>o+t.path===s.path))}(this.routes,s);"function"==typeof n&&n(i)}}}));