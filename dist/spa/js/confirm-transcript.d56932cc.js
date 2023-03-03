"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[433],{1360:(a,l,n)=>{n.r(l),n.d(l,{default:()=>Q});n(9665);var e=n(9835),i=n(499),s=n(6970),t=(n(4016),n(8853),n(8339)),o=n(6950),r=n(9120),u=n(5676),c=n(6928),d=(n(3878),n(3129)),p=n.n(d);const m=a=>((0,e.dD)("data-v-8acca9e6"),a=a(),(0,e.Cn)(),a),_={class:"q-pa-md main-wrapper"},g=["onClick"],h={class:"paient_trans_head"},v={class:"left"},w={class:"right"},f={class:"hospital_name"},y={class:"date_time"},k=["innerHTML"],b={class:"text-center"},q=m((()=>(0,e._)("i",{class:"las la-exclamation-triangle"},null,-1))),Z=m((()=>(0,e._)("h5",null,"Data Not Found",-1))),T={class:"row justify-center q-my-md"},C={style:{display:"none"}},D={__name:"confirmTranscription",setup(a){const l=(0,e.RC)((()=>Promise.all([n.e(736),n.e(64)]).then(n.bind(n,7979)))),d=(0,i.iH)(!1),m=(0,i.iH)([]),D=(0,t.tv)(),H=(0,t.yj)(),L=(0,u.z)(),U=(0,c.t)(),j=(0,i.iH)(null),z=(0,i.iH)(1),P=(0,i.iH)(6),I=(0,i.iH)(!0),S=(0,e.Fl)((()=>L.getTranscriptionList));(0,e.Fl)((()=>U.getUser)),(0,i.iH)({hospitalId:H.params.slug.split("/")[0],statusId:H.params.slug.split("/")[1]});function F(a,l){Q().then((a=>{a.success&&a.data.data.length>0?(z.value=z.value+1,l()):(I.value=!1,l(!0))})).catch((a=>{l(!0)})).finally((()=>{o.Z.hide()}))}function Q(){const a={hospitalId:H.params.slug.split("/")[0],statusId:H.params.slug.split("/")[1],limit:P.value,page:z.value};return L.fetchTranscriptionList(a)}function W(a){console.log(a),a.hospital_id=H.params.slug.split("/")[0],a.isNew=1==H.params.slug.split("/")[1],L.data=a,D.push({name:"confirm-script",params:{slug:a.id}})}async function x(a){o.Z.show({message:"Loading...",spinner:r.Z}),d.value=!0,B(a)}async function B(a){m.value.push(a),setTimeout((()=>{M(document.getElementById("downloadPDF")),o.Z.hide()}),4e3)}function M(a){p()(a,{margin:0,filename:`${m.value[0].patient_name}_${Date.now()}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:1,letterRendering:!0},jsPDF:{unit:"in",format:"a4",orientation:"portrait"}})}function N(){o.Z.show({spinner:r.Z,message:"Loading..."}),L.transcriptionList=[],z.value=1,I.value=!0,j.value.reset(),j.value.resume(),j.value.trigger()}return o.Z.show({spinner:r.Z,message:"Loading..."}),(0,t.iS)(((a,l,n)=>{console.log("leave"),L.resetList(),N(),n()})),(a,n)=>{const t=(0,e.up)("q-chip"),o=(0,e.up)("q-btn"),r=(0,e.up)("q-card"),u=(0,e.up)("q-spinner-dots"),c=(0,e.up)("q-infinite-scroll");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("div",_,[(0,e.Wm)(c,{onLoad:F,offset:250,"scroll-target":"body",ref_key:"scrollList",ref:j},{loading:(0,e.w5)((()=>[(0,e._)("div",T,[(0,e.Wm)(u,{color:"primary",size:"40px"})])])),default:(0,e.w5)((()=>[0!==(0,i.SU)(S).length?((0,e.wg)(),(0,e.j4)(r,{key:0,class:"q-pa-lg"},{default:(0,e.w5)((()=>[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)((0,i.SU)(S),(a=>((0,e.wg)(),(0,e.iD)("div",{class:"patient_trans_list_bg",key:a},[(0,e._)("div",{class:"patient_trans_list",onClick:l=>"Confirmed"==a.name||"Published"==a.name?null:W(a)},[(0,e._)("div",h,[(0,e._)("div",v,[(0,e._)("h2",null,[(0,e.Uk)((0,s.zw)(a.patient_name)+" ",1),(0,e.Wm)(t,{dense:"",color:"primary","text-color":"white"},{default:(0,e.w5)((()=>[(0,e.Uk)((0,s.zw)(a.gender),1)])),_:2},1024)]),(0,e._)("h6",null,(0,s.zw)(a.TSType_name),1)]),(0,e._)("div",w,[(0,e._)("div",f,(0,s.zw)(a.hospital_name),1),(0,e._)("ul",y,[(0,e._)("li",null,["Published"==a.name?((0,e.wg)(),(0,e.j4)(o,{key:0,round:"",color:"primary",icon:"las la-download",class:"q-ml-sm",padding:"sm",onClick:l=>x(a)},null,8,["onClick"])):(0,e.kq)("",!0)]),(0,e._)("li",null,[(0,e.Wm)(t,{color:"Confirmed"==a.name||"Published"==a.name?"green":"Pending"==a.name?"red":"yellow",label:a.name},null,8,["color","label"])]),(0,e._)("li",null,[(0,e.Uk)(" Duration: "),(0,e._)("b",null,(0,s.zw)(a.audio_duration),1)]),(0,e._)("li",null,[(0,e.Uk)(" Updated at: "),(0,e._)("b",null,(0,s.zw)(a.updated_at.split("T")[0]),1)])])])]),(0,e._)("p",{class:"paient_trans_para",innerHTML:a.transcription},null,8,k)],8,g)])))),128))])),_:1})):I.value?(0,e.kq)("",!0):((0,e.wg)(),(0,e.j4)(r,{key:1,class:"q-pa-lg"},{default:(0,e.w5)((()=>[(0,e._)("div",b,[(0,e.Wm)(o,{class:"not_found_icon",outline:"",color:"primary"},{default:(0,e.w5)((()=>[q])),_:1}),Z])])),_:1}))])),_:1},512)]),(0,e._)("div",C,[d.value?((0,e.wg)(),(0,e.j4)((0,i.SU)(l),{key:0,items:m.value,id:"downloadPDF"},null,8,["items"])):(0,e.kq)("",!0)])],64)}}};var H=n(1639),L=n(6870),U=n(4458),j=n(7691),z=n(8879),P=n(7501),I=n(9984),S=n.n(I);const F=(0,H.Z)(D,[["__scopeId","data-v-8acca9e6"]]),Q=F;S()(D,"components",{QInfiniteScroll:L.Z,QCard:U.Z,QChip:j.Z,QBtn:z.Z,QSpinnerDots:P.Z})}}]);