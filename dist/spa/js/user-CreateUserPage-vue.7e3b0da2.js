(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[620],{192:(e,l,a)=>{"use strict";a.r(l),a.d(l,{default:()=>ue});a(9665);var s=a(9835),r=a(1957),t=a(6970),i=a(499),o=a(205),d=a.n(o),n=a(796),m=a(5054),u=a(8853),c=a(4577),p=a(9587),v=a(6950),g=a(9120),b=a(1910),h=a(2057),q=a(8339),_=a(4016),f=a(6928);const U={class:"container"},y={class:"profile-sec q-mb-md"},w={class:"home_user_header"},Z={class:"comman-title"},S={class:"q-pa-md main-wrapper"},H={class:"profile-card"},k={class:"text-center"},V={class:"profile-head edit-pro-head mob-pro-head"},W={class:"profile-avtar"},x=["src"],C={key:1,src:d(),alt:""},F={class:"avtar-edit-icon"},$=["accept"],D={class:"row q-col-gutter-lg q-mt-sm edit-avtar-field"},L={class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa"},T=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm"},"Select User Type",-1),Q={class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa"},A=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm"},"First Name",-1),E={class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa"},R=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm"},"Last Name",-1),N={class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa"},P=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm"},"Email",-1),j={key:0,class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa mob_digit"},z={class:"pass-feild"},I=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm",for:""},"Password ",-1),M={key:1},B={class:"col-md-6 col-sm-12 col-12 edit-field mob-edit-pa"},G=(0,s._)("label",{class:"lable-text q-mb-sm q-ml-sm q-mr-sm"},"Specialty",-1),O={class:"col-md-3 col-sm-12 col-12 edit-field mob-edit-pa q-mt-xl"},J={class:"uploder_box"},K={key:0,class:"uploaded_img"},X=["src"],Y={class:"text-right q-pt-lg mob-action-btn"},ee={__name:"CreateUserPage",setup(e){(0,s.RC)((()=>Promise.all([a.e(736),a.e(64)]).then(a.bind(a,7390))));const{errors:l,serverValidationError:o}=(0,h.Z)(),d=(0,c.H)();d.fetchUserTypeList();const ee=(0,q.tv)(),le=(0,q.yj)(),ae=(0,i.iH)(!1),se=(0,f.t)(),re=((0,s.Fl)((()=>se.isSuperUser)),(0,s.Fl)((()=>d.getUserType))),te=((0,i.iH)(null),(0,i.iH)([]),(0,i.iH)(""),(0,i.iH)("a-z,A-Z,0-9,#"),(0,i.iH)(12),(0,i.iH)("")),ie=(0,i.iH)(""),oe=(0,i.iH)(""),de=(0,i.iH)(""),ne=(0,i.iH)(""),me=(0,i.iH)(""),ue=(0,i.iH)("");function ce(){const e=new b(/[A-Z]{1}/gm).gen(),l=new b(/[a-z]{3,5}/gm).gen(),a=new b(/[@#$%^&*!]{1}/gm).gen(),s=new b(/[0-9]{3,5}/gm).gen();ne.value=e+l+a+s,(0,m.Z)(ne.value)}const pe=(0,i.iH)(null),ve=(0,i.iH)(null),ge=((0,i.iH)([]),(0,i.iH)("")),be=(0,i.iH)("");function he(){ge.value.click()}async function qe(e){v.Z.show({spinner:g.Z,message:"Loading..."});const l=e.target.files[0],a=new FileReader;a.onloadend=()=>{be.value=a.result,v.Z.hide()},a.readAsDataURL(l)}const _e=(e,l)=>{console.log(e),e.forEach((e=>{const a=new FileReader;a.onload=e=>{"sign"==l&&(ue.value=e.target.result),console.log(e.target.result)},a.readAsDataURL(e)}))};function fe(){history.go(-1)}"edit-user"==le.name&&(v.Z.show({message:"Loading...",spinner:g.Z}),pe.value=le.params.slug,_.Z.get(_.Z.resolveApiUrl(u.xR.SHOW,{id:pe.value})).then((e=>{1==e.success?(ve.value=e.data[0].id,te.value={label:e.data[0].usertype.name,value:e.data[0].usertype.id},ie.value=e.data[0].first_name,oe.value=e.data[0].last_name,de.value=e.data[0].email,be.value=e.data[0].avtar,me.value=e.data[0].speciality,ue.value=e.data[0].signature,v.Z.hide()):0==e.success&&(p["default"].error(e.message),v.Z.hide())})).catch((e=>{console.log(e),v.Z.hide()})).finally((()=>{ae.value=!0,v.Z.hide()}))),(0,s.bv)((()=>{"edit-user"!==le.name&&(ae.value=!0)}));const Ue=e=>{"sign"==e&&(ue.value="")};async function ye(){v.Z.show({message:"Loading...",spinner:g.Z});const e=new FormData;if(e.append("user_type_id",te.value.value),e.append("first_name",ie.value),e.append("last_name",oe.value),e.append("email",de.value),ne.value&&e.append("password",ne.value),be.value?.startsWith("https://"))e.append("avtar",be.value);else if(be.value){const l=await fetch(be.value),a=await l.blob(),s=new File([a],`image${(0,n.Z)()}.png`);e.append("avtar",s,`image${(0,n.Z)()}.png`)}if(2==te.value.value)if(e.append("speciality",me.value),ue.value?.startsWith("https://"))e.append("signature",ue.value);else if(ue.value){const l=await fetch(ue.value),a=await l.blob(),s=new File([a],`signature${(0,n.Z)()}.png`);e.append("signature",s,`signature${(0,n.Z)()}.png`)}"edit-user"==le.name?d.updateUser(e,ve.value).then((e=>{1==e.success?(p["default"].success(e.message?e.message:"User Edited Successfully !"),ee.push({name:"user-dashboard"}),v.Z.hide()):0==e.success&&(p["default"].error(e.message),v.Z.hide())})).finally((()=>{v.Z.hide()})):d.saveNewUser(e).then((e=>{1==e.success?(p["default"].success(e.message?e.message:"User Created Successfully !"),ee.push({name:"user-dashboard"}),v.Z.hide()):(console.log(e),l.value=e.errors)})).catch((e=>{e.response&&(l.value=e.response.data.errors)})).finally((()=>{v.Z.hide()}))}return(e,a)=>{const d=(0,s.up)("q-btn"),n=(0,s.up)("q-select"),m=(0,s.up)("q-input"),u=(0,s.up)("q-uploader"),c=(0,s.up)("q-form");return(0,s.wg)(),(0,s.j4)(c,{onSubmit:a[9]||(a[9]=(0,r.iM)((e=>ye()),["prevent"]))},{default:(0,s.w5)((()=>[(0,s._)("div",U,[(0,s._)("section",y,[(0,s._)("div",w,[(0,s._)("h3",Z,(0,t.zw)(pe.value?"Update":"Create")+" User",1)]),(0,s._)("div",S,[(0,s._)("div",H,[(0,s._)("div",k,[(0,s._)("div",V,[(0,s._)("div",W,[be.value?((0,s.wg)(),(0,s.iD)("img",{key:0,src:be.value,alt:"user"},null,8,x)):((0,s.wg)(),(0,s.iD)("img",C))]),(0,s._)("div",F,[(0,s._)("input",{style:{display:"none"},ref_key:"imgInput",ref:ge,type:"file",name:"image",accept:e.accept,onChange:qe},null,40,$),(0,s.Wm)(d,{color:"primary",icon:"las la-pen",class:"edit-pro-btn-avtar",onClick:(0,r.iM)(he,["prevent"])},null,8,["onClick"])])])]),(0,s._)("div",D,[(0,s._)("div",L,[T,(0,s.Wm)(n,{outlined:"","hide-bottom-space":"",dense:e.dense,class:"q-ml-sm q-mr-sm",modelValue:te.value,"onUpdate:modelValue":a[0]||(a[0]=e=>te.value=e),options:(0,i.SU)(re),error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"user_type_id")},null,8,["dense","modelValue","options","error","error-message"])]),(0,s._)("div",Q,[A,(0,s.Wm)(m,{outlined:"","hide-bottom-space":"",modelValue:ie.value,"onUpdate:modelValue":a[1]||(a[1]=e=>ie.value=e),dense:e.dense,class:"q-ml-sm q-mr-sm",rules:[l=>e.required(l,"First Name")],error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"first_name")},null,8,["modelValue","dense","rules","error","error-message"])]),(0,s._)("div",E,[R,(0,s.Wm)(m,{outlined:"","hide-bottom-space":"",modelValue:oe.value,"onUpdate:modelValue":a[2]||(a[2]=e=>oe.value=e),dense:e.dense,placeholder:e.$q.lang.user.edit_profile.name.placeHolder,rules:[l=>e.required(l,"Last Name")],error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"last_name"),class:"q-ml-sm q-mr-sm"},null,8,["modelValue","dense","placeholder","rules","error","error-message"])]),(0,s._)("div",N,[P,(0,s.Wm)(m,{outlined:"","hide-bottom-space":"",modelValue:de.value,"onUpdate:modelValue":a[3]||(a[3]=e=>de.value=e),dense:e.dense,class:"q-ml-sm q-mr-sm",rules:[l=>e.required(l,"Email"),l=>e.isEmail(l)],error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"email")},null,8,["modelValue","dense","rules","error","error-message"])]),pe.value?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",j,[(0,s._)("div",z,[I,(0,s.Wm)(d,{label:"Generate",onClick:a[4]||(a[4]=e=>ce())})]),(0,s.Wm)(m,{outlined:"","hide-bottom-space":"",modelValue:ne.value,"onUpdate:modelValue":a[5]||(a[5]=e=>ne.value=e),dense:e.dense,rules:[l=>e.required(l,"Password"),l=>e.validatePassword(l)],error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"password"),class:"q-ml-sm q-mr-sm"},null,8,["modelValue","dense","rules","error","error-message"])])),2==te.value.value?((0,s.wg)(),(0,s.iD)("span",M,[(0,s._)("div",B,[G,(0,s.Wm)(m,{outlined:"","hide-bottom-space":"",modelValue:me.value,"onUpdate:modelValue":a[6]||(a[6]=e=>me.value=e),dense:e.dense,placeholder:e.$q.lang.user.edit_profile.specialty.placeHolder,rules:[l=>e.required(l,"Specialty")],error:(0,i.SU)(l).length>0,"error-message":(0,i.SU)(o)((0,i.SU)(l),"specialty"),class:"q-ml-sm q-mr-sm"},null,8,["modelValue","dense","placeholder","rules","error","error-message"])]),(0,s._)("div",O,[(0,s._)("div",J,[ue.value?((0,s.wg)(),(0,s.iD)("div",K,[(0,s.Wm)(d,{color:"primary",rounded:"",icon:"las la-times",class:"close",onClick:a[7]||(a[7]=e=>Ue("sign"))}),(0,s._)("img",{src:ue.value},null,8,X)])):((0,s.wg)(),(0,s.j4)(u,{key:1,color:"teal",label:"Signature Image",url:"",onAdded:a[8]||(a[8]=e=>_e(e,"sign"))}))])])])):(0,s.kq)("",!0)]),(0,s._)("div",Y,[(0,s.Wm)(d,{outline:"",onClick:fe,color:"primary",label:e.$q.lang.user.edit_profile.cancel_btn,class:"edit-pro-btn"},null,8,["label"]),(0,s.Wm)(d,{color:"primary",label:e.$q.lang.user.edit_profile.submit_btn,type:"submit",class:"edit-pro-btn q-ml-sm"},null,8,["label"])])])])])])])),_:1})}}};var le=a(8326),ae=a(8879),se=a(2259),re=a(6611),te=a(4343),ie=a(1463),oe=a(8149),de=a(9984),ne=a.n(de);const me=ee,ue=me;ne()(ee,"components",{QForm:le.Z,QBtn:ae.Z,QSelect:se.Z,QInput:re.Z,QUploader:te.Z,QTable:ie.Z,QField:oe.Z})},205:(e,l,a)=>{e.exports=a.p+"img/user-avtart-img.f9e2707e.png"}}]);