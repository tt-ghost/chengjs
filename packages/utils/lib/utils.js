!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).utils={})}(this,(function(e){"use strict";const t=["string","number","boolean","undefined","bigint","symbol",null],i=(e,t)=>Object.prototype.toString.call(e)===`[object ${t}]`,n=e=>null===e||-1!==t.indexOf(typeof e),o=e=>i(e,"Function"),s=e=>i(e,"String"),r=e=>i(e,"Number"),a=e=>i(e,"Symbol"),d=e=>Array.isArray(e),p=e=>i(e,"Object");const c="((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)",l={"Content-Type":"application/json"};e.HTTP=class{constructor(e){this.option=(e=>{const{headers:t={},method:i,...n}=e||{};return Object.assign({},n,{method:(i||"").toUpperCase(),headers:{...l,...t}})})(e)}async fetch(e,t){await window.fetch(e,t)}parseAPI(e){const t={method:"GET",url:e};if(e.indexOf(":")>-1){const[,i="",n=e]=e.match(/(^[a-zA-Z]+):\s+(.*)/)||[];i&&(t.method=i),n&&(t.url=n)}return t}resolve(e=""){return new RegExp(c,"i").test(e)?e:this.option.baseURL.replace(/\/$/,"")+"/"+e.replace(/^\//,"")}create(e){const t={};for(const i in e){const{method:n,url:o}=this.parseAPI(e[i]);t[i]=(e,t)=>{console.log(123,e);const{headers:i,method:s,...r}=t||{},a={method:(s||"").toUpperCase()||n,headers:i||{},...r,body:null!==e?JSON.stringify(e):void 0};return["GET","HEAD"].indexOf(a.method)>-1&&(a.body=void 0),this.fetch(this.resolve(o),a)}}return t}},e.REG_URI_DOMAIN=c,e.REG_URI_PATH="((?:\\/[a-z-\\d]+)*)",e.REG_URI_PORT="(?::(\\d+))?",e.REG_URI_PROTOCOL="(?:([a-z]+):\\/\\/)?",e.copy=async function(e){if("undefined"==typeof window)return;const t=await navigator.permissions.query({name:"clipboard-read"}),i=await navigator.permissions.query({name:"clipboard-write"}),[n,o]=await Promise.all([t,i]);["granted","prompt"].indexOf(n.state)>-1||["granted","prompt"].indexOf(o.state)>-1?await navigator.clipboard.writeText(e):await Promise.reject("请授权剪切板")},e.deepClone=e=>{const t=new Map,i=e=>{if(!o(e)){if(a(e))return Symbol(e.description);if(n(e))return e;if(d(e)){const n=[];return t.has(e)?t.get(e):(t.set(e,n),n.push(...e.map((e=>o(e)?null:i(e)))),n)}if(p(e)){const n={};if(t.has(e))return t.get(e);t.set(e,n);for(const t in e)o(e[t])||(n[t]=i(e[t]));return n}}};return i(e)},e.is=i,e.isArray=d,e.isBaseType=n,e.isBigInt=e=>i(e,"BigInt"),e.isBoolean=e=>i(e,"Boolean"),e.isDate=e=>!(!i(e,"Date")&&!s(e)||isNaN(new Date(e).valueOf()))||!(!r(e)||e===1/0||e===-1/0||e!==parseInt(e)),e.isDom=e=>i(e,"Element"),e.isFunction=o,e.isNull=e=>i(e,"Null"),e.isNumber=r,e.isObject=p,e.isPromise=e=>i(e,"Promise"),e.isRegExp=e=>i(e,"RegExp"),e.isString=s,e.isSymbol=a,e.isUndefined=e=>i(e,"Undefined"),e.mapListToObject=e=>e.reduce(((e,t)=>(e[t]=t,e)),{}),e.parseURL=e=>{const[t,i=""]=e.split("?"),[n,o=""]=t.split(/:?\/\//),[s="",r=""]=i.split("#"),a=s.split("&").reduce(((e,t)=>{const[i,n]=t.split("=");let o;return o=""===n||isNaN(Number(n))?n:Number(n),i in e?Array.isArray(e[i])?e[i].push(o):e[i]=[e[i],o]:e[i]=o,e}),{}),d=new RegExp("((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)(?::(\\d+))?((?:\\/[a-z-\\d]+)*)","i"),[,p="",c="",l=""]=o.match(d)||[];return{protocol:n,domain:p,port:c,path:l,params:a,hash:r}},Object.defineProperty(e,"__esModule",{value:!0})}));
