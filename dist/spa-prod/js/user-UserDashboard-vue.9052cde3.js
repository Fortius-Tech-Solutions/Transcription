"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[624],{1025:(e,l,a)=>{a.r(l),a.d(l,{default:()=>$});a(9665);var s=a(9835),i=a(6970),t=a(499),n=a(4577),o=a(8853),r=a(8339),u=a(9587),c=(a(3878),a(6950)),d=a(9120);const m={class:"home_user_header"},p={class:"comman-title"},f={class:"q-pa-md main-wrapper"},h={class:"custom-tabel-box"},_={class:"close-top-posi"},w={class:"las la-times"},v={class:"row no-wrap items-center"},g={class:"col text-h6 ellipsis"},Z={class:"col text-h6 ellipsis"},b={__name:"UserDashboard",setup(e){const l=(0,r.tv)(),b=(0,n.H)();b.fetchUserTypeList();const q=(0,t.iH)(),y=(0,s.RC)((()=>Promise.all([a.e(736),a.e(64)]).then(a.bind(a,2742)))),U=((0,s.Fl)((()=>b.getUserType)),(0,t.iH)({label:"Super Admin",value:1}),(0,t.iH)(!1)),T=(0,t.iH)({}),Q=[{name:"id",label:"NO.",field:"index",align:"left"},{name:"Name",required:!0,label:"Name",align:"left",field:e=>e.first_name+" "+e.last_name,format:e=>`${e}`},{name:"email",align:"center",label:"Email",field:e=>e.email,format:e=>`${e}`},{name:"Type",align:"center",label:"Type",field:e=>e.usertype.name,format:e=>`${e}`},{name:"actions",label:"Actions",field:"actions"}],W=(0,t.iH)([]),k=(0,t.iH)(null);function H(){q.value.refresh()}function S(e){c.Z.show({message:"Loading...",spinner:d.Z}),b.deleteUser(e.id).then((e=>{1==e.success?(H(),u["default"].success(e.message),c.Z.hide()):0==e.success&&(u["default"].error(e.message),c.Z.hide())})).finally((()=>{c.Z.hide()}))}function x(e){l.push({name:"edit-user",params:{slug:e.id}})}function C(e){c.Z.show({message:"Loading...",spinner:d.Z}),b.fetchUser(e.id).then((e=>{1==e.success?(T.value=e.data,U.value=!0,c.Z.hide()):0==e.success&&(u["default"].error(e.message),c.Z.hide())})).finally((()=>{c.Z.hide()}))}return(e,l)=>{const a=(0,s.up)("q-card-section"),n=(0,s.up)("q-separator"),r=(0,s.up)("q-item-label"),u=(0,s.up)("q-item-section"),c=(0,s.up)("q-item"),d=(0,s.up)("q-card"),b=(0,s.up)("q-dialog"),H=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",null,[(0,s._)("div",m,[(0,s._)("h3",p,(0,i.zw)(e.$q.lang.user.title),1)]),(0,s._)("div",f,[(0,s._)("div",h,[(0,s.Wm)((0,t.SU)(y),{ref_key:"userTableComponent",ref:q,apiUrl:(0,t.SU)(o.xR).LIST,columns:Q,rowKey:"id",title:e.$q.lang.user.table_title,createUrl:"user/create",onDelete:S,onEdit:x,onView:C,onLock:e.lockUser,"extra-filter":{accountStatus:W.value,group:k.value}},null,8,["apiUrl","title","onLock","extra-filter"])])])]),(0,s.Wm)(b,{modelValue:U.value,"onUpdate:modelValue":l[0]||(l[0]=e=>U.value=e)},{default:(0,s.w5)((()=>[(0,s.Wm)(d,{class:"my-card comman-close-popup poli-card-width"},{default:(0,s.w5)((()=>[(0,s._)("div",_,[(0,s.wy)((0,s._)("i",w,null,512),[[H]])]),(0,s.Wm)(a,{class:"q-pa-sm q-pl-md"},{default:(0,s.w5)((()=>[(0,s._)("div",v,[(0,s._)("div",g,(0,i.zw)(T.value.name),1)])])),_:1}),(0,s.Wm)(n),(0,s.Wm)(a,{class:"q-pa-none newpolicy-popup"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(r,null,{default:(0,s.w5)((()=>[(0,s._)("div",Z,(0,i.zw)(T.value.email),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}}};var q=a(3706),y=a(4458),U=a(3190),T=a(2218),Q=a(490),W=a(1233),k=a(3115),H=a(8149),S=a(2146),x=a(9984),C=a.n(x);const L=b,$=L;C()(b,"components",{QDialog:q.Z,QCard:y.Z,QCardSection:U.Z,QSeparator:T.Z,QItem:Q.Z,QItemSection:W.Z,QItemLabel:k.Z,QField:H.Z}),C()(b,"directives",{ClosePopup:S.Z})}}]);