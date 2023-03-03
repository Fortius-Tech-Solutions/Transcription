"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[630],{424:(e,l,a)=>{a.r(l),a.d(l,{default:()=>K});var o=a(9835),s=a(6970),t=a(499),r=a(826),i=a(9587),n=a(6950),u=a(9120),d=a(4170),m=a(2057),c=a(8339),p=a(5531),v=a(8853),f=a(4016),b=a(5676),g=a(6928);const _={class:"home_user_header"},h={class:"comman-title"},y={class:"q-pa-md main-wrapper"},Z={class:"bg-box"},S=(0,o._)("label",{for:""}," Patient Name",-1),U={key:0,class:"q-mt-md"},q=(0,o._)("label",{for:""},"Enter Other Type",-1),V={class:"btn_input_box"},w={class:"q-mt-lg"},T=(0,o._)("label",{for:""},"Gender",-1),C={class:"q-gutter-sm"},D={class:"q-mb-md q-mt-md"},k=(0,o._)("label",{class:"q-mr-md",for:""},"Date of Service",-1),W={class:"q-mt-lg"},N=(0,o._)("label",{for:""},"Transcription",-1),Q={autocorrect:"on",autocapitalize:"off",autocomplete:"off",spellcheck:"true"},H={key:0,class:"form_comon_btn q-mt-md q-mr-md q-mb-md"},F={key:1,class:"form_comon_btn q-mt-md q-mr-md q-mb-md"},P={__name:"writeScript",setup(e){const l=(0,c.tv)(),a=(0,c.yj)(),P=((0,t.iH)(""),(0,t.iH)(!1)),R=(0,t.iH)(null),L=(0,p.b)(),E=(0,g.t)(),M=(0,b.z)(),{errors:Y,serverValidationError:x}=(0,m.Z)(),A=(0,o.Fl)((()=>L.getTsTypeList)),j=(0,t.iH)(null),z=(0,t.iH)(null),B=(0,t.iH)(null),I=(0,t.iH)(null),O=(0,t.iH)(null),G=(0,t.iH)(""),J=(0,o.Fl)((()=>E.getUser)),K=(0,o.Fl)((()=>L.getDraftStatus));(0,o.bv)((()=>{n.Z.show({message:"Loading...",spinner:u.Z}),L.fetchTsType().finally((()=>{n.Z.hide()}))}));const X=(0,o.Fl)((()=>"confirm-script"==l.currentRoute.value.name?M.getData:L.getData));function $(e){n.Z.show({message:"Loading...",spinner:u.Z});const l={patient_name:z.value,gender:B.value,transcription:I.value,TSType_id:j.value.value,date_of_service:R.value};"Draft"===e&&(l.draft="draft"),L.saveTranscription(l,a.params.slug).then((e=>{1==e.success?(i["default"].success(e.message?e.message:"Transcription Created Successfully !"),history.go(-1),n.Z.hide()):0==e.success&&(i["default"].error(e.message),n.Z.hide())})).finally((()=>{n.Z.hide()}))}function ee(){console.log(X.value);const e={user_id:J.value.id,hospital_id:X.value.hospital_id,status_id:"3",patient_name:z.value,gender:B.value,transcription:I.value,TSType_id:j.value.value,date_of_service:R.value};f.Z.post(f.Z.resolveApiUrl(v.PZ.CONFIRM,{id:a.params.slug}),e).then((e=>{e.success&&history.go(-1)}))}function le(e){return e<=d.ZP.formatDate(Date.now(),"YYYY/MM/DD")}function ae(){n.Z.show({message:"Loading...",spinner:u.Z});const e={name:G.value};f.Z.post("writer/add-ts-type",e).then((e=>{e.success&&(L.tsType=[],L.fetchTsType(),j.value="")})).finally((()=>{n.Z.hide()}))}function oe(){R.value=null}function se(){history.go(-1)}return 1==K.value?(n.Z.show({message:"Loading...",spinner:u.Z}),f.Z.get(f.Z.resolveApiUrl(v.jU.SAVE,{id:a.params.slug})).then((e=>{1==e.success?(j.value=e.data[0].ts_type,z.value=e.data[0].patient_name,B.value=e.data[0].gender,I.value=e.data[0].transcription,n.Z.hide()):0==e.success&&(i["default"].error(e.message),n.Z.hide(),Y.value=e.errors)})).catch((e=>{e.response&&(Y.value=e.response.data.errors),console.log(e),n.Z.hide()})).finally((()=>{n.Z.hide()}))):"confirm-script"==l.currentRoute.value.name&&(z.value=X.value.patient_name,B.value=X.value.gender,I.value=X.value.transcription,R.value=X.value.date_of_service.split("T")[0],A.value.forEach((e=>{e.value==X.value.TSType_id&&(j.value=e)}))),(0,c.iS)(((e,l,a)=>{console.log("leave"),L.resetList(),M.resetList(),oe(),a()})),(e,a)=>{const i=(0,o.up)("q-input"),n=(0,o.up)("q-select"),u=(0,o.up)("q-btn"),d=(0,o.up)("q-radio"),m=(0,o.up)("q-editor"),c=(0,o.up)("q-form"),p=(0,o.up)("q-date"),v=(0,o.up)("q-dialog"),f=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",_,[(0,o._)("h3",h,(0,s.zw)("confirm-script"!==(0,t.SU)(l).currentRoute.value.name?"Create":"Confirm")+" Transcription ",1)]),(0,o.Wm)((0,t.SU)(r.Z),{ref_key:"audioRef",ref:O,option:{src:(0,t.SU)(X).audio_filepath,title:(0,t.SU)(X).audio_name,coverImage:"",coverRotate:"",progressBarColor:"",indicatorColor:"",autoplay:!1}},null,8,["option"]),(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[(0,o._)("div",y,[(0,o._)("div",Z,[S,(0,o.Wm)(i,{outlined:"",modelValue:z.value,"onUpdate:modelValue":a[0]||(a[0]=e=>z.value=e),dense:e.dense,placeholder:"Please Enter Patient Name",disable:(0,t.SU)(X).isNew,class:"create-user-field-box",rules:[l=>e.required(l,"Patient Name")],error:(0,t.SU)(Y).length>0,"error-message":(0,t.SU)(x)((0,t.SU)(Y),"Patient Name")},null,8,["modelValue","dense","disable","rules","error","error-message"]),(0,o.Wm)(n,{modelValue:j.value,"onUpdate:modelValue":a[1]||(a[1]=e=>j.value=e),options:(0,t.SU)(A),dense:e.dense,class:"select_drop",outlined:"","hide-bottom-space":"",label:"Select Type",disable:(0,t.SU)(X).isNew},null,8,["modelValue","options","dense","disable"]),"other"==j.value?.value?((0,o.wg)(),(0,o.iD)("div",U,[q,(0,o._)("div",V,[(0,o.Wm)(i,{modelValue:G.value,"onUpdate:modelValue":a[2]||(a[2]=e=>G.value=e),dense:e.dense,outlined:"",type:"text"},null,8,["modelValue","dense"]),(0,o.Wm)(u,{class:"q-ml-md",color:"primary",label:"Add Type",onClick:ae})])])):(0,o.kq)("",!0),(0,o._)("div",w,[T,(0,o._)("div",C,[(0,o.Wm)(d,{modelValue:B.value,"onUpdate:modelValue":a[3]||(a[3]=e=>B.value=e),val:"male",label:"Male",disable:(0,t.SU)(X).isNew},null,8,["modelValue","disable"]),(0,o.Wm)(d,{modelValue:B.value,"onUpdate:modelValue":a[4]||(a[4]=e=>B.value=e),val:"female",label:"Female",disable:(0,t.SU)(X).isNew},null,8,["modelValue","disable"]),(0,o.Wm)(d,{modelValue:B.value,"onUpdate:modelValue":a[5]||(a[5]=e=>B.value=e),val:"other",label:"Don't want to Disclose",disable:(0,t.SU)(X).isNew},null,8,["modelValue","disable"])])]),(0,o._)("div",D,[k,(0,o.Wm)(u,{color:"primary",icon:"las la-calendar",onClick:a[6]||(a[6]=e=>P.value=!0),label:R.value??"Select Date",disable:(0,t.SU)(X).isNew},null,8,["label","disable"]),R.value?((0,o.wg)(),(0,o.j4)(u,{key:0,onClick:oe,icon:"la la-times"})):(0,o.kq)("",!0)]),(0,o._)("div",W,[N,(0,o._)("form",Q,[(0,o.Wm)(m,{modelValue:I.value,"onUpdate:modelValue":a[7]||(a[7]=e=>I.value=e),dense:e.dense,definitions:{bold:{label:"Bold",icon:null,tip:"My bold tooltip"}},rules:[l=>e.required(l,"Transcription")],error:(0,t.SU)(Y).length>0,"error-message":(0,t.SU)(x)((0,t.SU)(Y),"Transcription"),disable:(0,t.SU)(X).isNew},null,8,["modelValue","dense","rules","error","error-message","disable"])])])]),"confirm-script"!==(0,t.SU)(l).currentRoute.value.name?((0,o.wg)(),(0,o.iD)("div",H,[(0,o.Wm)(u,{outline:"",color:"primary",label:"Cancel",onClick:se}),(0,o.Wm)(u,{color:"primary",label:"Save as Draft",class:"q-ml-md",onClick:a[8]||(a[8]=e=>$("Draft"))}),(0,o.Wm)(u,{color:"primary",label:"Save & Confirmed",class:"q-ml-md",onClick:a[9]||(a[9]=e=>$("Confirmed"))})])):((0,o.wg)(),(0,o.iD)("div",F,[(0,o.Wm)(u,{color:"primary",label:"Confirmed",class:"q-ml-md",onClick:a[10]||(a[10]=e=>ee())})]))])])),_:1}),(0,o.Wm)(v,{modelValue:P.value,"onUpdate:modelValue":a[12]||(a[12]=e=>P.value=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{modelValue:R.value,"onUpdate:modelValue":a[11]||(a[11]=e=>R.value=e),options:le},{default:(0,o.w5)((()=>[(0,o.wy)((0,o.Wm)(u,{label:"Submit",color:"primary"},null,512),[[f]])])),_:1},8,["modelValue"])])),_:1},8,["modelValue"])],64)}}};var R=a(3478),L=a(8326),E=a(6611),M=a(2259),Y=a(8879),x=a(1480),A=a(3706),j=a(6711),z=a(8746),B=a(8149),I=a(2146),O=a(9984),G=a.n(O);const J=P,K=J;G()(P,"components",{QEditor:R.Z,QForm:L.Z,QInput:E.Z,QSelect:M.Z,QBtn:Y.Z,QRadio:x.Z,QDialog:A.Z,QDate:j.Z,QTable:z.Z,QField:B.Z}),G()(P,"directives",{ClosePopup:I.Z})}}]);