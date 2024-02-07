"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[343],{682:(l,a,e)=>{e.r(a),e.d(a,{default:()=>X});e(9665);var i=e(9835),s=e(499),o=e(6970),n=(e(826),e(4016)),t=e(8853),d=e(8339),u=e(5531),c=e(6950),r=e(9120),_=e(4170),p=e(3703),m=(e(3878),e(1410)),v=e(3508);const g={class:"q-pa-md main-wrapper"},f={class:"text-right d-flex filter_search_box"},h={class:"search"},w=(0,i._)("div",{class:"audio_list_head"},[(0,i._)("div",{class:"col1"},[(0,i._)("div",{class:"td_col1"},"Audio Name"),(0,i._)("div",{class:"td_col2"},"Patient Name"),(0,i._)("div",{class:"td_col3"},"Hospital Name"),(0,i._)("div",{class:"td_col4"},"Service Date")]),(0,i._)("div",{class:"col2"},"Action")],-1),Z={class:"audio_list_body"},y={class:"audio_list_item"},k={class:"audio_list_col1"},b={class:"audioplayer_col"},q=(0,i._)("span",{class:"play_icon"},[(0,i._)("i",{class:"las la-play"})],-1),D={class:"audio_info"},C={class:"audio_heading"},L={class:"audio_meta"},S={class:"audio_meta_list"},U={class:"audo_patient_name"},H=["title"],P={class:"audo_hospital_name"},W={class:"audo_service_date"},Q={class:"audio_list_action"},V={class:"text-center"},Y=(0,i._)("i",{class:"las la-exclamation-triangle"},null,-1),j=(0,i._)("h5",null,"Data Not Found",-1),z={class:"row justify-center q-my-md"},A={style:{display:"none"}},x={__name:"audioList",setup(l){const a=(0,i.RC)((()=>Promise.all([e.e(64),e.e(241)]).then(e.bind(e,4051)))),x=(0,d.tv)(),T=(0,d.yj)(),F=(0,s.iH)(!1),I=(0,s.iH)(null),M=(0,u.b)();c.Z.show({spinner:r.Z,message:"Loading..."});const N=(0,i.Fl)((()=>M.getAudioList)),E=(0,s.iH)(null),R=(0,s.iH)(1),$=(0,s.iH)(null),B=(0,s.iH)(6),K=(0,s.iH)(!0),G=(0,m.T)();function J(){const l={from_date:I.value?.from,to_date:I.value?.to,limit:B.value,page:R.value,userId:T.params.slug.split("/")[0],statusId:T.params.slug.split("/")[1],q:$.value};return M.fetchAudioList(l)}function O(l,a){J().then((l=>{l.success&&l.data.data.length>0?(R.value=R.value+1,a()):(K.value=!1,a(!0))})).catch((l=>{a(!0)})).finally((()=>{c.Z.hide()}))}function X(l){M.draft=l.draft,M.data=l,p.Z.set("data",l),x.push({name:"write-script",params:{slug:l.id}})}function ll(l){c.Z.show({spinner:r.Z,message:"Loading..."}),n.Z.post(n.Z.resolveApiUrl(t.jU.SAVE,{id:l.id}),{status_id:"4"}).then((a=>{N.value.forEach(((a,e,i)=>{a.id==l.id&&(a.name="Published")}))})).catch((l=>{console.log(l)})).finally((()=>{c.Z.hide()}))}const al=(0,s.iH)(!1);async function el(l){c.Z.show({spinner:r.Z,spinnerSize:140,spinnerColor:"primary"}),G.pdfData=l,al.value=!0,2===l.hospital_id?setTimeout((()=>{c.Z.hide(),(0,v.$)("downloadPDF",`${l.patient_name}`)}),2e3):(x.push({name:"transcription-pdf"}),c.Z.hide())}function il(){c.Z.show({spinner:r.Z,message:"Loading..."}),R.value=1,K.value=!0,M.audioList=[],O()}function sl(){c.Z.show({spinner:r.Z,message:"Loading..."}),I.value=null,M.audioList=[],R.value=1,K.value=!0,E.value.reset(),E.value.resume(),E.value.trigger()}function ol(){c.Z.show({spinner:r.Z,message:"Loading..."}),M.audioList=[],R.value=1,K.value=!0,E.value.reset(),E.value.resume(),E.value.trigger()}return(0,d.iS)(((l,a,e)=>{console.log("leave"),M.resetList(),e()})),(l,e)=>{const n=(0,i.up)("q-icon"),t=(0,i.up)("q-input"),d=(0,i.up)("q-btn"),u=(0,i.up)("q-card"),c=(0,i.up)("q-spinner-dots"),r=(0,i.up)("q-infinite-scroll"),p=(0,i.up)("q-date"),m=(0,i.up)("q-dialog"),v=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",g,[(0,i._)("div",f,[(0,i._)("div",h,[(0,i.Wm)(t,{modelValue:$.value,"onUpdate:modelValue":[e[0]||(e[0]=l=>$.value=l),ol],debounce:"500",outlined:"",dense:"",placeholder:"Search"},{append:(0,i.w5)((()=>[(0,i.Wm)(n,{name:"search"})])),_:1},8,["modelValue"])]),(0,i._)("div",null,[(0,i.Wm)(d,{color:"primary",onClick:e[1]||(e[1]=l=>F.value=!0),label:I.value?.from?I.value.from+" to "+I.value.to:I.value??"Select Date"},null,8,["label"]),I.value?((0,i.wg)(),(0,i.j4)(d,{key:0,onClick:sl,icon:"la la-times"})):(0,i.kq)("",!0)])]),(0,i.Wm)(r,{onLoad:O,offset:250,"scroll-target":"body",ref_key:"scrollList",ref:E},{loading:(0,i.w5)((()=>[(0,i._)("div",z,[(0,i.Wm)(c,{color:"primary",size:"40px"})])])),default:(0,i.w5)((()=>[0!==(0,s.SU)(N).length?((0,i.wg)(),(0,i.j4)(u,{key:0,class:"q-pa-lg"},{default:(0,i.w5)((()=>[w,(0,i._)("div",Z,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(N),(l=>((0,i.wg)(),(0,i.iD)("div",{class:"audio_list_bg caption",key:l},[(0,i._)("div",y,[(0,i._)("div",k,[(0,i._)("div",b,[q,(0,i._)("div",D,[(0,i._)("p",C,(0,o.zw)(l.audio_name),1),(0,i._)("div",L,[(0,i._)("ul",S,[(0,i._)("li",null,[(0,i.Uk)(" Duration: "),(0,i._)("b",null,(0,o.zw)(l.audio_duration),1)]),(0,i._)("li",null,[(0,i.Uk)(" Created at: "),(0,i._)("b",null,(0,o.zw)((0,s.SU)(_.ZP).formatDate(l.created_at,"DD-MM-YYYY")),1)])])])]),(0,i._)("div",U,[(0,i._)("p",{title:l.patient_name},[(0,i._)("b",null,(0,o.zw)(l.patient_name),1)],8,H)]),(0,i._)("div",P,[(0,i._)("p",null,(0,o.zw)(l.hospital_name),1)]),(0,i._)("div",W,[(0,i._)("p",null,(0,o.zw)((0,s.SU)(_.ZP).formatDate(l.date_of_service,"DD-MM-YYYY")),1)])])]),(0,i._)("div",Q,["Published"==l.name?((0,i.wg)(),(0,i.j4)(d,{key:0,title:"Report Download",round:"",color:"primary",icon:"las la-download",class:"q-ml-sm",padding:"sm",onClick:a=>el(l)},null,8,["onClick"])):(0,i.kq)("",!0),(0,i.Wm)(d,{round:"",color:"blue",icon:"las la-download",title:"Audio Download",class:"q-ml-sm",padding:"sm",href:l.audio_filepath,download:""},null,8,["href"]),"Confirmed"==l.name?((0,i.wg)(),(0,i.j4)(d,{key:1,color:"green",label:"Publish",class:"q-ml-sm",onClick:a=>ll(l)},null,8,["onClick"])):(0,i.kq)("",!0),(0,i.Wm)(d,{round:"",color:"secondary",icon:"las la-edit",class:"q-ml-sm",padding:"sm",disable:"Pending"!==l.name,onClick:a=>X(l)},null,8,["disable","onClick"])])])])))),128))])])),_:1})):K.value?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(u,{key:1,class:"q-pa-lg"},{default:(0,i.w5)((()=>[(0,i._)("div",V,[(0,i.Wm)(d,{class:"not_found_icon",outline:"",color:"primary"},{default:(0,i.w5)((()=>[Y])),_:1}),j])])),_:1}))])),_:1},512)]),(0,i.Wm)(m,{modelValue:F.value,"onUpdate:modelValue":e[3]||(e[3]=l=>F.value=l)},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{modelValue:I.value,"onUpdate:modelValue":e[2]||(e[2]=l=>I.value=l),range:""},{default:(0,i.w5)((()=>[(0,i.wy)((0,i.Wm)(d,{label:"Submit",onClick:il,type:"submit",color:"primary"},null,512),[[v]])])),_:1},8,["modelValue"])])),_:1},8,["modelValue"]),(0,i._)("div",A,[al.value?((0,i.wg)(),(0,i.j4)((0,s.SU)(a),{key:0,id:"downloadPDF"})):(0,i.kq)("",!0)])],64)}}};var T=e(6611),F=e(2857),I=e(8879),M=e(6870),N=e(4458),E=e(7501),R=e(3706),$=e(6711),B=e(8149),K=e(2146),G=e(9984),J=e.n(G);const O=x,X=O;J()(x,"components",{QInput:T.Z,QIcon:F.Z,QBtn:I.Z,QInfiniteScroll:M.Z,QCard:N.Z,QSpinnerDots:E.Z,QDialog:R.Z,QDate:$.Z,QField:B.Z}),J()(x,"directives",{ClosePopup:K.Z})}}]);