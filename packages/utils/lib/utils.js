!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).utils={})}(this,(function(e){"use strict";const t=["string","number","boolean","undefined","bigint","symbol",null],s=(e,t)=>Object.prototype.toString.call(e)===`[object ${t}]`,o=e=>null===e||-1!==t.indexOf(typeof e),i=e=>s(e,"Function"),n=e=>s(e,"String"),r=e=>s(e,"Number"),a=e=>s(e,"Symbol"),c=e=>Array.isArray(e),l=e=>s(e,"Object"),h=(e=8)=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",s=t+"0123456789",o=t.charAt(Math.floor(Math.random()*t.length));let i="";if(e<=0&&(e=8),e>1)for(let t=0;t<e-1;t++)i+=s.charAt(Math.floor(Math.random()*s.length));return o+i};const d="((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)",p={method:"GET",mode:"cors",baseURL:"",headers:{"Content-Type":"application/json"},body:{},credentials:"same-origin",cache:"default",redirect:"follow",referrer:"client"},u=(e,t)=>{const{headers:s,method:o,...i}=e||{},{headers:n,method:r,...a}=t||{};return Object.assign({},{...i,...a},{method:(r||o||"").toUpperCase(),headers:Object.assign({},s||{},n||{})})};const f=e=>JSON.parse(e);e.HTTP=class{constructor(e){this.config=u(p,e)}async fetch(e,t){return await window.fetch(e,t)}parseAPI(e){const t={method:"GET",url:e};if(e.indexOf(":")>-1){const[,s="",o=e]=e.match(/(^[a-zA-Z]+):\s*(.*)/)||[];s&&(t.method=s.toUpperCase()),o&&(t.url=o)}return t}resolve(e=""){return new RegExp(d,"i").test(e)?e:this.config.baseURL.replace(/\/$/,"")+"/"+e.replace(/^\//,"")}create(e){const t={};for(const s in e){const{method:o,url:i}=this.parseAPI(e[s]);t[s]=(e,t)=>{const s={...u(this.config,t),method:o,body:null!==e?JSON.stringify(e):void 0};return t&&t.method&&(s.method=t.method.toUpperCase()),["GET","HEAD"].indexOf(s.method)>-1&&delete s.body,this.fetch(this.resolve(i),s).then((e=>{let t=!1;return e.headers.forEach(((e,s)=>{"content-type"===s.toLowerCase()&&e.indexOf("application/json")>-1&&(t=!0)})),t?e.json():e}))}}return t}},e.REG_URI_DOMAIN=d,e.REG_URI_PATH="((?:\\/[a-z-\\d]+)*)",e.REG_URI_PORT="(?::(\\d+))?",e.REG_URI_PROTOCOL="(?:([a-z]+):\\/\\/)?",e.Store=class{constructor(e){const{type:t,ns:s,data:o}=e||{};this.ns=s||h(),this.type=t||"local",this.setAll(o)}set(e,t,s){let{expire:o}=s||{};const{duration:i}=s||{},n=Date.now(),a=n+31536e8;if(r(o)||(o=r(i)?n+i:a),o<=n)return this.remove(e);const c={expire:o,value:t};switch(this.type){case"local":case"session":window[this.type+"Storage"].setItem(`${this.ns}_${e}`,(l=c,JSON.stringify(l)));break;case"cookie":document.cookie=`${e}:${t}`}var l}setAll(e){if(l(e))for(const t in e)this.set(t,e[t])}get(e,t=!1){let s=null;switch(this.type){case"local":case"session":{const o=window[this.type+"Storage"].getItem(`${this.ns}_${e}`);if(o)break;const{expire:i,value:n}=f(o)||{};if(!r(i))break;i<=Date.now()?this.remove(e):s=t?f(o):n;break}}return s}getAll(e=!1){const t={};switch(this.type){case"local":case"session":{const s=window[this.type+"Storage"].length,o=[];for(let e=0;e<s;e++){const t=window[this.type+"Storage"].key(e);if(t.startsWith(this.ns+"_")){const e=t.replace(new RegExp("^"+this.ns+"_"),"");e&&o.push(e)}}o.forEach((s=>{null!==this.get(s,e)&&(t[s]=this.get(s,e))}));break}}return t}remove(e){switch(this.type){case"local":case"session":window[this.type+"Storage"].removeItem(`${this.ns}_${e}`)}}removeAll(){switch(this.type){case"local":case"session":{const e=window[this.type+"Storage"].length,t=[];for(let s=0;s<e;s++){const e=window[this.type+"Storage"].key(s);e.startsWith(this.ns+"_")&&t.push(e)}t.forEach((e=>{window[this.type+"Storage"].removeItem(e)}));break}}}clear(){switch(this.type){case"local":case"session":window[this.type+"Storage"].clear()}}},e.copy=async function(e){if("undefined"==typeof window)return;const t=await navigator.permissions.query({name:"clipboard-read"}),s=await navigator.permissions.query({name:"clipboard-write"}),[o,i]=await Promise.all([t,s]);["granted","prompt"].indexOf(o.state)>-1||["granted","prompt"].indexOf(i.state)>-1?await navigator.clipboard.writeText(e):await Promise.reject("请授权剪切板")},e.deepClone=e=>{const t=new Map,s=e=>{if(!i(e)){if(a(e))return Symbol(e.description);if(o(e))return e;if(c(e)){const o=[];return t.has(e)?t.get(e):(t.set(e,o),o.push(...e.map((e=>i(e)?null:s(e)))),o)}if(l(e)){const o={};if(t.has(e))return t.get(e);t.set(e,o);for(const t in e)i(e[t])||(o[t]=s(e[t]));return o}}};return s(e)},e.is=s,e.isArray=c,e.isBaseType=o,e.isBigInt=e=>s(e,"BigInt"),e.isBoolean=e=>s(e,"Boolean"),e.isDate=e=>!(!s(e,"Date")&&!n(e)||isNaN(new Date(e).valueOf()))||!(!r(e)||e===1/0||e===-1/0||e!==parseInt(e)),e.isDom=e=>s(e,"Element"),e.isFunction=i,e.isNull=e=>s(e,"Null"),e.isNumber=r,e.isObject=l,e.isPromise=e=>s(e,"Promise"),e.isRegExp=e=>s(e,"RegExp"),e.isString=n,e.isSymbol=a,e.isUndefined=e=>s(e,"Undefined"),e.mapListToObject=e=>e.reduce(((e,t)=>(e[t]=t,e)),{}),e.parseURL=e=>{const[t,s=""]=e.split("?"),[o,i=""]=t.split(/:?\/\//),[n="",r=""]=s.split("#"),a=n.split("&").reduce(((e,t)=>{const[s,o]=t.split("=");let i;return i=""===o||isNaN(Number(o))?o:Number(o),s in e?Array.isArray(e[s])?e[s].push(i):e[s]=[e[s],i]:e[s]=i,e}),{}),c=new RegExp("((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)(?::(\\d+))?((?:\\/[a-z-\\d]+)*)","i"),[,l="",h="",d=""]=i.match(c)||[];return{protocol:o,domain:l,port:h,path:d,params:a,hash:r}},e.random=h,Object.defineProperty(e,"__esModule",{value:!0})}));
