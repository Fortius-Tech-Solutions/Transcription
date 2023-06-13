(()=>{var e={9818:(e,t,r)=>{"use strict";var a=r(1957),o=r(1947),s=r(499),n=r(9835);function i(e,t){const r=(0,n.up)("router-view");return(0,n.wg)(),(0,n.j4)(r)}var c=r(1639);const u={},l=(0,c.Z)(u,[["render",i]]),d=l;var h=r(3340),p=r(3746);const m=(0,h.h)((()=>{const e=(0,p.WB)();return e}));var f=r(8339);function v(e,t,a,o,s){return{path:`/${e}`,meta:{requiresAuth:!0,transition:"slide-right"},children:[{path:"",name:`${t}-dashboard`,component:()=>r(5170)(`./${a}/${s}.vue`)},{path:"create",name:`create-${t}`,component:()=>r(5170)(`./${a}/${o}.vue`),meta:{requiresAuth:!0,transition:"slide-left"}},{path:"edit/:slug",name:`edit-${t}`,component:()=>r(5170)(`./${a}/${o}.vue`),meta:{requiresAuth:!0,transition:"slide-left"}}]}}const g=[{path:"/",component:()=>Promise.all([r.e(736),r.e(184)]).then(r.bind(r,905)),children:[{path:"/",name:"sign-in",component:()=>Promise.all([r.e(736),r.e(64),r.e(819)]).then(r.bind(r,7537)),meta:{requireGuest:!0}}]},{path:"/",component:()=>Promise.all([r.e(736),r.e(64),r.e(969)]).then(r.bind(r,5969)),children:[v("user","user","user","CreateUserPage","UserDashboard"),v("hospital","hospital","hospital","CreateHospitalPage","HospitalDashboard"),v("transcription","transcription","transcription","CreateTranscriptionPage","TranscriptionDashboard"),{path:"/",name:"home",component:()=>Promise.all([r.e(64),r.e(177)]).then(r.bind(r,958)),meta:{requiresAuth:!0}},{path:"/change-password",name:"change-password",component:()=>Promise.all([r.e(736),r.e(64),r.e(21)]).then(r.bind(r,7798)),meta:{requiresAuth:!0}},{path:"/writer-dashboard",name:"writer-dashboard",component:()=>Promise.all([r.e(736),r.e(64),r.e(93)]).then(r.bind(r,4587)),meta:{requiresAuth:!0}},{path:"/doctor-dashboard",name:"doctor-dashboard",component:()=>Promise.all([r.e(736),r.e(64),r.e(340)]).then(r.bind(r,2097)),meta:{requiresAuth:!0}},{path:"/:slug",name:"component",component:()=>Promise.all([r.e(736),r.e(64),r.e(750)]).then(r.bind(r,3476)),meta:{requiresAuth:!0}},{path:"/audio-list/:slug",name:"audio-list",component:()=>Promise.all([r.e(736),r.e(64),r.e(343)]).then(r.bind(r,8147)),meta:{requiresAuth:!0}},{path:"/write-script/:slug",name:"write-script",component:()=>Promise.all([r.e(736),r.e(64),r.e(630)]).then(r.bind(r,424)),meta:{requiresAuth:!0}},{path:"/script-view",name:"script-view",component:()=>Promise.all([r.e(736),r.e(64),r.e(435)]).then(r.bind(r,4672)),meta:{requiresAuth:!0}},{path:"/confirm-transcript/:slug",name:"confirm-transcript",component:()=>Promise.all([r.e(736),r.e(64),r.e(433)]).then(r.bind(r,1360)),meta:{requiresAuth:!0}},{path:"/confirm-script/:slug",name:"confirm-script",component:()=>Promise.all([r.e(736),r.e(64),r.e(630)]).then(r.bind(r,424)),meta:{requiresAuth:!0}},{path:"transcription/:slug",name:"transcription-list",component:()=>Promise.all([r.e(736),r.e(64),r.e(538)]).then(r.bind(r,3261)),meta:{requiresAuth:!0}}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(862)]).then(r.bind(r,1862))}],b=g,w=(0,h.BC)((function(){const e=f.r5,t=(0,f.p7)({scrollBehavior:()=>({left:0,top:0}),routes:b,history:e("")});return t}));async function P(e,t){const r=e(d);r.use(o.Z,t);const a="function"===typeof m?await m({}):m;r.use(a);const n=(0,s.Xl)("function"===typeof w?await w({store:a}):w);return a.use((({store:e})=>{e.router=n})),{app:r,store:a,router:n}}var y=r(9527),_=r(6827),A=r(3703),Z=r(6950);const O={config:{},lang:y.Z,plugins:{Notify:_.Z,LocalStorage:A.Z,Loading:Z.Z}};r(6890);let k="function"===typeof d.preFetch?d.preFetch:void 0!==d.__c&&"function"===typeof d.__c.preFetch&&d.__c.preFetch;function T(e,t){const r=e?e.matched?e:t.resolve(e).route:t.currentRoute.value;if(!r)return[];const a=r.matched.filter((e=>void 0!==e.components));return 0===a.length?[]:Array.prototype.concat.apply([],a.map((e=>Object.keys(e.components).map((t=>{const r=e.components[t];return{path:e.path,c:r}})))))}function q({router:e,store:t,publicPath:r}){e.beforeResolve(((a,o,s)=>{const n=window.location.href.replace(window.location.origin,""),i=T(a,e),c=T(o,e);let u=!1;const l=i.filter(((e,t)=>u||(u=!c[t]||c[t].c!==e.c||e.path.indexOf("/:")>-1))).filter((e=>void 0!==e.c&&("function"===typeof e.c.preFetch||void 0!==e.c.__c&&"function"===typeof e.c.__c.preFetch))).map((e=>void 0!==e.c.__c?e.c.__c.preFetch:e.c.preFetch));if(!1!==k&&(l.unshift(k),k=!1),0===l.length)return s();let d=!1;const h=e=>{d=!0,s(e)},p=()=>{!1===d&&s()};l.reduce(((e,s)=>e.then((()=>!1===d&&s({store:t,currentRoute:a,previousRoute:o,redirect:h,urlPath:n,publicPath:r})))),Promise.resolve()).then(p).catch((e=>{console.error(e),p()}))}))}const E="";async function C({app:e,router:t,store:r},a){let o=!1;const s=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},n=e=>{if(o=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=s(e);null!==t&&(window.location.href=t,window.location.reload())},i=window.location.href.replace(window.location.origin,"");for(let u=0;!1===o&&u<a.length;u++)try{await a[u]({app:e,router:t,store:r,ssrContext:null,redirect:n,urlPath:i,publicPath:E})}catch(c){return c&&c.url?void n(c.url):void console.error("[Quasar] boot error:",c)}!0!==o&&(e.use(t),q({router:t,store:r}),e.mount("#q-app"))}P(a.ri,O).then((e=>{const[t,a]=void 0!==Promise.allSettled?["allSettled",e=>e.map((e=>{if("rejected"!==e.status)return e.value.default;console.error("[Quasar] boot error:",e.reason)}))]:["all",e=>e.map((e=>e.default))];return Promise[t]([Promise.resolve().then(r.bind(r,6210)),Promise.resolve().then(r.bind(r,6612)),Promise.resolve().then(r.bind(r,1569)),Promise.resolve().then(r.bind(r,8812)),Promise.resolve().then(r.bind(r,9587))]).then((t=>{const r=a(t).filter((e=>"function"===typeof e));C(e,r)}))}))},4016:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var a=r(1569),o=r(9587),s=r(3703),n=r(1947);const i={get(e){return new Promise(((t,r)=>{a.api.get(e).then((e=>{t(e.data)})).catch((e=>{this.showApiError(e),r(e)}))}))},getWithParam(e,t,r={}){return new Promise(((o,s)=>{a.api.get(e,{params:t,headers:r.headers}).then((e=>{o(e.data)})).catch((e=>{this.showApiError(e),s(e)}))}))},post(e,t,r={}){return new Promise(((o,s)=>{a.api.post(e,t,r).then((e=>{o(e.data)})).catch((e=>{this.showApiError(e),s(e)}))}))},postWithParam(e,t,r,o={}){return new Promise(((s,n)=>{a.api.post(e,t,{params:r,headers:o.headers}).then((e=>{s(e.data)})).catch((e=>{this.showApiError(e),n(e)}))}))},put(e,t){return new Promise(((r,o)=>{a.api.put(e,t).then((e=>{r(e.data)})).catch((e=>{this.showApiError(e),o(e)}))}))},delete(e,t){return new Promise(((r,o)=>{a.api["delete"](e,{data:t}).then((e=>{r(e.data)})).catch((e=>{this.showApiError(e),o(e)}))}))},resolveApiUrl(e,t){for(var r of Object.keys(t))e=e.replace(`:${r}`,t[r]);return e},showApiError(e){if(e.response)if(401==e.response.status)s.Z.remove("access_token"),s.Z.remove("user"),o["default"].error("Your session has expired. Please login again."),location.reload();else if(419==e.response.status)location.reload();else if(500==e.response.status)o["default"].error("There's been a glitch. We're not quite sure what went wrong. Please try again later.");else if(404==e.response.status)e.response.data.message||o["default"].error("The requested resource was not found.");else{let t=e?.response?.data?.errors;if(t){if(!t.required)return void o["default"].error("Data validation failed")}else if(e?.response?.data?.code){const t=e?.response?.data?.code;"ER_DUP_ENTRY"==t?o["default"].error("Please check your input. This value is already in use."):"E_ROW_NOT_FOUND"==t&&o["default"].error(n.Z.lang.props.errors.notFound)}}else e.request?o["default"].error("The request was made but no response was received"):o["default"].error(e.message)}}},6210:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(3340),o=r(3703),s=r(9587),n=r(6928);(0,n.t)();const i=(0,a.xr)((({router:e})=>{e.beforeEach(((e,t,r)=>e.matched.some((e=>e.meta.requiresAuth))&&!o.Z.getItem("access_token")?(console.log("not authenticated"),s["default"].error("You must be logged in to view this page."),r({name:"sign-in"})):e.matched.some((e=>e.meta.requireGuest))&&o.Z.getItem("access_token")?"Doctor "==JSON.parse(o.Z.getItem("roles"))?(console.log(o.Z.getItem("roles")),r({name:"doctor-dashboard"})):"Writer"==JSON.parse(o.Z.getItem("roles"))?(console.log(JSON.parse(o.Z.getItem("roles"))),r({name:"writer-dashboard"})):(console.log(JSON.parse(o.Z.getItem("roles"))),r({name:"home"})):void r()))}))},1569:(e,t,r)=>{"use strict";r.r(t),r.d(t,{api:()=>i,axios:()=>s.a,default:()=>u});var a=r(3340),o=r(9981),s=r.n(o),n=r(3703);const i=s().create({baseURL:"https://api-s.acplservices.com.au/v1/",headers:{Accept:"application/json"}}),c=e=>{const t=n.Z.getItem("access_token");return t&&"undefined"!==t&&t.length>0&&(e.headers.Authorization=t?`Bearer ${t}`:""),e};i.interceptors.request.use(c);const u=(0,a.xr)((({app:e})=>{e.config.globalProperties.$axios=s(),e.config.globalProperties.$api=i}))},8812:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(3340),o=r(2988);const s=(0,a.xr)((({app:e,store:t})=>{e.mixin({methods:{getHumanReadable(e){return o.ou.fromISO(e).toRelative()},isBase64(e){const t=/^[data]{4}[:]{1}/;return t.test(e)},required(e,t=null,r=!0){return!!r&&(e&&e.length>0||"Please enter a "+t)},isEmail(e){const t=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return t.test(e)||"Please enter a valid email address"},validatePassword(e){var t=/^\S*$/;return!!e.match(t)||"white space not allowed"},isSpecialString(e){const t=/^[a-zA-Z0-9_.]+$/;return t.test(e)||"Please enter a valid string"},isNumber(e){const t=/^([0-9])+$/;return t.test(e)||"Please enter a only number"},isUrl(e){var t=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return null===e||void 0===e||(t.test(e)||"Please enter valid url")},alpha(e){const t=/^[a-zA-Z ]+$/;return t.test(e)||"Please enter only alphabets"},min(e,t,r=null){return e.length>=t||"Please enter a minimum of "+t+" characters in "+r},max(e,t,r=null){return e.length<=t||"Please enter a maximum of "+t+" characters in "+r},between(e,t,r){return e.length>=t&&e.length<=r||"Please enter a value between "+t+" and "+r+" characters"},createFolderValidation(e,t,r){if("Year"===r){const a=/^([0-9])+$/;return a.test(e)?e.length<=t||"Please enter a maximum of "+t+" characters in "+r:"Please enter a only number"}}}})}))},9587:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(6827);const o={error(e){a.Z.create({type:"negative",message:e})},success(e){a.Z.create({type:"positive",message:e})},info(e){a.Z.create({message:e})}}},6612:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(1947);const o=async()=>{const e="en-US";try{await r(1662)("./"+e+"/index.js").then((e=>{a.Z.lang.set(e.default)}))}catch(t){}}},6928:(e,t,r)=>{"use strict";r.d(t,{t:()=>h});var a=r(3746),o=r(4016),s=r(9587),n=r(3703);const i="auth",c=i+"/login",u=i+"/logout",l="/user/me",d="/user/change-password",h=(0,a.Q_)("auth",{state:()=>({user:n.Z.getItem("user")||"",userRoles:""|JSON.parse(n.Z.getItem("roles")),accessToken:n.Z.getItem("access_token")||""}),getters:{getUser(){return this.user},isLoggedIn(){return!!this.accessToken},isSuperAdmin(){return!(!this.user||1!=this.user.usertype.id)},isRole(){return this.userRoles}},actions:{async signIn(e){return new Promise(((t,r)=>{o.Z.post(c,e).then((e=>{e.success?(this.accessToken=e.data.token,n.Z.set("access_token",this.accessToken),this.getProfile().then((()=>{t(e)}))):(s["default"].error(e.message),t(e))})).catch((e=>{r(e)}))}))},async changePassword(e){return new Promise(((t,r)=>{o.Z.post(d,e).then((e=>{t(e)})).catch((e=>{r(e)}))}))},async logout(){return new Promise(((e,t)=>{o.Z.get(u).then((t=>{n.Z.remove("access_token"),n.Z.remove("user"),n.Z.remove("email"),n.Z.remove("roles"),e(t)})).catch((e=>{t(e)}))}))},async getProfile(){return new Promise(((e,t)=>{o.Z.get(l).then((t=>{t.success?(this.user=t.data[0],this.userRoles=t.data[0]?.usertype?.name,n.Z.set("user",this.user),n.Z.set("roles",JSON.stringify(this.userRoles))):s["default"].error(t.message),e(t)})).catch((e=>{t(e)}))}))}}})},1662:(e,t,r)=>{var a={"./en-US/index.js":[1791,985]};function o(e){if(!r.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return r.e(t[1]).then((()=>r(o)))}o.keys=()=>Object.keys(a),o.id=1662,e.exports=o},5170:(e,t,r)=>{var a={"./auth/ChangePassword.vue":[7798,736,64,21],"./auth/LoginPage.vue":[7537,736,64,819],"./doctor/confirmTranscription.vue":[1360,736,64,433],"./doctor/doctor-dashboard.vue":[2097,736,64,340],"./hospital/CreateHospitalPage.vue":[9482,736,64,99],"./hospital/HospitalDashboard.vue":[7221,736,64,657],"./receptionist/listScript.vue":[3261,736,64,538],"./transcription/TranscriptionDashboard.vue":[6152,736,64,305],"./transcription/script-view.vue":[4672,736,64,435],"./user/CreateUserPage.vue":[4391,736,64,620],"./user/UserDashboard.vue":[1025,736,64,624],"./writer/audioList.vue":[8147,736,64,343],"./writer/writeScript.vue":[424,736,64,630],"./writer/writer-dashboard.vue":[4587,736,64,93]};function o(e){if(!r.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return Promise.all(t.slice(1).map(r.e)).then((()=>r(o)))}o.keys=()=>Object.keys(a),o.id=5170,e.exports=o}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}r.m=e,(()=>{var e=[];r.O=(t,a,o,s)=>{if(!a){var n=1/0;for(l=0;l<e.length;l++){for(var[a,o,s]=e[l],i=!0,c=0;c<a.length;c++)(!1&s||n>=s)&&Object.keys(r.O).every((e=>r.O[e](a[c])))?a.splice(c--,1):(i=!1,s<n&&(n=s));if(i){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[a,o,s]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,a)=>(r.f[a](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+({21:"change-password",64:"chunk-common",93:"writer-dashboard",99:"hospital-CreateHospitalPage-vue",177:"home",184:"default-layout",305:"transcription-TranscriptionDashboard-vue",340:"doctor-dashboard",343:"audio-list",433:"confirm-transcript",435:"script-view",538:"transcription",620:"user-CreateUserPage-vue",624:"user-UserDashboard-vue",630:"write-script",657:"hospital-HospitalDashboard-vue",750:"[request]",819:"sign-in",985:"lang-index0"}[e]||e)+"."+{21:"dc83d3c7",64:"38fbbf58",93:"d0f124cc",99:"2bc7f1a9",177:"d96aed40",184:"45e870be",305:"7bb722c7",340:"5f72c759",343:"0f69f9e3",433:"93adaef9",435:"16ba955c",538:"6f63c0c0",620:"83bd3690",624:"4a343c1d",630:"9a6f3cc2",657:"64e6888b",750:"9a32394a",819:"78de962b",862:"f3fe7b0a",865:"6d1f59e6",969:"5f9e1d99",979:"3de663bb",985:"8ad17c65"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+{21:"change-password",93:"writer-dashboard",99:"hospital-CreateHospitalPage-vue",143:"app",177:"home",305:"transcription-TranscriptionDashboard-vue",340:"doctor-dashboard",343:"audio-list",433:"confirm-transcript",435:"script-view",620:"user-CreateUserPage-vue",624:"user-UserDashboard-vue",630:"write-script",657:"hospital-HospitalDashboard-vue",736:"vendor",819:"sign-in"}[e]+"."+{21:"0e3aecb2",93:"da3e2ad5",99:"f604eb16",143:"ab102d47",177:"27ce1a20",305:"99b09c1e",340:"da3e2ad5",343:"4a178740",433:"fd5031c6",435:"e152cf69",620:"86ba65c1",624:"6c88f92c",630:"43b7cd6c",657:"6c88f92c",736:"ba5977c8",819:"0e3aecb2"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="Transcription:";r.l=(a,o,s,n)=>{if(e[a])e[a].push(o);else{var i,c;if(void 0!==s)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+s){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",t+s),i.src=a),e[a]=[o];var h=(t,r)=>{i.onerror=i.onload=null,clearTimeout(p);var o=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(r))),t)return t(r)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),c&&document.head.appendChild(i)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=s=>{if(o.onerror=o.onload=null,"load"===s.type)r();else{var n=s&&("load"===s.type?"missing":s.type),i=s&&s.target&&s.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=n,c.request=i,o.parentNode.removeChild(o),a(c)}};return o.onerror=o.onload=s,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var o=r[a],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var n=document.getElementsByTagName("style");for(a=0;a<n.length;a++){o=n[a],s=o.getAttribute("data-href");if(s===e||s===t)return o}},a=a=>new Promise(((o,s)=>{var n=r.miniCssF(a),i=r.p+n;if(t(n,i))return o();e(a,i,o,s)})),o={143:0};r.f.miniCss=(e,t)=>{var r={21:1,93:1,99:1,177:1,305:1,340:1,343:1,433:1,435:1,620:1,624:1,630:1,657:1,819:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,a)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise(((r,a)=>o=e[t]=[r,a]));a.push(o[2]=s);var n=r.p+r.u(t),i=new Error,c=a=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),n=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+n+")",i.name="ChunkLoadError",i.type=s,i.request=n,o[1](i)}};r.l(n,c,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,a)=>{var o,s,[n,i,c]=a,u=0;if(n.some((t=>0!==e[t]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(c)var l=c(r)}for(t&&t(a);u<n.length;u++)s=n[u],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(l)},a=globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=r.O(void 0,[736],(()=>r(9818)));a=r.O(a)})();