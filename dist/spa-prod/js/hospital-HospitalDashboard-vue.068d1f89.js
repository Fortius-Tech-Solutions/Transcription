"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[657],{7221:(e,l,a)=>{a.r(l),a.d(l,{default:()=>$});a(9665);var s=a(9835),i=a(6970),t=a(499),n=a(4059),o=a(8853),c=a(8339),d=a(9587),r=(a(3878),a(6950)),u=a(9120);const m={class:"home_user_header"},p={class:"comman-title"},f={class:"q-pa-md main-wrapper"},h={class:"custom-tabel-box"},w={class:"close-top-posi"},_={class:"las la-times"},v={class:"row no-wrap items-center"},g={class:"col text-h6 ellipsis"},Z={class:"col text-h6 ellipsis"},b={__name:"HospitalDashboard",setup(e){const l=(0,c.tv)(),b=(0,n.L)(),q=(0,t.iH)(),y=(0,s.RC)((()=>Promise.all([a.e(736),a.e(64)]).then(a.bind(a,2742)))),C=(0,t.iH)(!1),Q=(0,t.iH)({}),W=[{name:"id",label:"NO.",field:"index",align:"left"},{name:"Name",required:!0,label:"Name",align:"left",field:e=>e.name,format:e=>`${e}`},{name:"Address",align:"center",label:"Address",field:e=>e.address,format:e=>`${e}`},{name:"City",align:"center",label:"City",field:e=>e.city,format:e=>`${e}`},{name:"actions",label:"Actions",field:"actions"}],k=(0,t.iH)([]),H=(0,t.iH)(null);function L(){q.value.refresh()}function U(e){r.Z.show({message:"Loading...",spinner:u.Z}),b.deleteHospital(e.id).then((e=>{1==e.success?(L().then((()=>{d["default"].success(e.message)})),r.Z.hide()):0==e.success&&(d["default"].error(e.message),r.Z.hide())})).finally((()=>{r.Z.hide()}))}function S(e){l.push({name:"edit-hospital",params:{slug:e.id}})}function x(e){r.Z.show({message:"Loading...",spinner:u.Z}),b.fetchUser(e.id).then((e=>{1==e.success?(Q.value=e.data,C.value=!0,r.Z.hide()):0==e.success&&(d["default"].error(e.message),r.Z.hide())})).finally((()=>{r.Z.hide()}))}return(e,l)=>{const a=(0,s.up)("q-card-section"),n=(0,s.up)("q-separator"),c=(0,s.up)("q-item-label"),d=(0,s.up)("q-item-section"),r=(0,s.up)("q-item"),u=(0,s.up)("q-card"),b=(0,s.up)("q-dialog"),L=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",null,[(0,s._)("div",m,[(0,s._)("h3",p,(0,i.zw)(e.$q.lang.hospital.title),1)]),(0,s._)("div",f,[(0,s._)("div",h,[(0,s.Wm)((0,t.SU)(y),{ref_key:"userTableComponent",ref:q,apiUrl:(0,t.SU)(o.Lj).LIST,columns:W,rowKey:"id",title:e.$q.lang.hospital.table_title,createUrl:"hospital/create",onDelete:U,onEdit:S,onView:x,onLock:e.lockUser,"extra-filter":{accountStatus:k.value,group:H.value}},null,8,["apiUrl","title","onLock","extra-filter"])])])]),(0,s.Wm)(b,{modelValue:C.value,"onUpdate:modelValue":l[0]||(l[0]=e=>C.value=e)},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{class:"my-card comman-close-popup poli-card-width"},{default:(0,s.w5)((()=>[(0,s._)("div",w,[(0,s.wy)((0,s._)("i",_,null,512),[[L]])]),(0,s.Wm)(a,{class:"q-pa-sm q-pl-md"},{default:(0,s.w5)((()=>[(0,s._)("div",v,[(0,s._)("div",g,(0,i.zw)(Q.value.name),1)])])),_:1}),(0,s.Wm)(n),(0,s.Wm)(a,{class:"q-pa-none newpolicy-popup"},{default:(0,s.w5)((()=>[(0,s.Wm)(r,null,{default:(0,s.w5)((()=>[(0,s.Wm)(d,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s._)("div",Z,(0,i.zw)(Q.value.email),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}}};var q=a(3706),y=a(4458),C=a(3190),Q=a(2218),W=a(490),k=a(1233),H=a(3115),L=a(8149),U=a(2146),S=a(9984),x=a.n(S);const T=b,$=T;x()(b,"components",{QDialog:q.Z,QCard:y.Z,QCardSection:C.Z,QSeparator:Q.Z,QItem:W.Z,QItemSection:k.Z,QItemLabel:H.Z,QField:L.Z}),x()(b,"directives",{ClosePopup:U.Z})}}]);