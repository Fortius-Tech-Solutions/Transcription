"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[433],{1360:(a,l,e)=>{e.r(l),e.d(l,{default:()=>Q});e(9665);var n=e(9835),i=e(499),t=e(6970),s=(e(4016),e(8853),e(8339)),o=e(6950),r=e(9120),u=e(4170),d=e(5676),c=e(6928),p=(e(3878),e(3129)),m=e.n(p);const _=a=>((0,n.dD)("data-v-b6531bf0"),a=a(),(0,n.Cn)(),a),g={class:"q-pa-md main-wrapper"},f=["onClick"],v={class:"paient_trans_head"},h={class:"left"},w={class:"right"},y={class:"hospital_name"},k={class:"date_time"},b=["innerHTML"],Z={class:"text-center"},q=_((()=>(0,n._)("i",{class:"las la-exclamation-triangle"},null,-1))),D=_((()=>(0,n._)("h5",null,"Data Not Found",-1))),T={class:"row justify-center q-my-md"},C={style:{display:"none"}},H={__name:"confirmTranscription",setup(a){const l=(0,n.RC)((()=>e.e(979).then(e.bind(e,7979)))),p=(0,i.iH)(!1),_=(0,i.iH)([]),H=(0,s.tv)(),L=(0,s.yj)(),U=(0,d.z)(),j=(0,c.t)(),z=(0,i.iH)(null),P=(0,i.iH)(1),I=(0,i.iH)(6),S=(0,i.iH)(!0),F=(0,n.Fl)((()=>U.getTranscriptionList));(0,n.Fl)((()=>j.getUser)),(0,i.iH)({hospitalId:L.params.slug.split("/")[0],statusId:L.params.slug.split("/")[1]});function Y(a,l){Q().then((a=>{a.success&&a.data.data.length>0?(P.value=P.value+1,l()):(S.value=!1,l(!0))})).catch((a=>{l(!0)})).finally((()=>{o.Z.hide()}))}function Q(){const a={hospitalId:L.params.slug.split("/")[0],statusId:L.params.slug.split("/")[1],limit:I.value,page:P.value};return U.fetchTranscriptionList(a)}function W(a){console.log(a),a.hospital_id=L.params.slug.split("/")[0],a.isNew=1==L.params.slug.split("/")[1],U.data=a,H.push({name:"confirm-script",params:{slug:a.id}})}async function x(a){o.Z.show({message:"Loading...",spinner:r.Z}),p.value=!0,M(a)}async function M(a){_.value=a,setTimeout((()=>{R(document.getElementById("downloadPDF")),o.Z.hide()}),4e3)}function R(a){m()(a,{margin:0,filename:`${_.value.patient_name}_${u.ZP.formatDate(_.value.date_of_service,"DD-MM-YYYY")}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:1,letterRendering:!0},jsPDF:{unit:"in",format:"a4",orientation:"portrait"}})}function B(){o.Z.show({spinner:r.Z,message:"Loading..."}),U.transcriptionList=[],P.value=1,S.value=!0,z.value.reset(),z.value.resume(),z.value.trigger()}return o.Z.show({spinner:r.Z,message:"Loading..."}),(0,s.iS)(((a,l,e)=>{console.log("leave"),U.resetList(),B(),e()})),(a,e)=>{const s=(0,n.up)("q-chip"),o=(0,n.up)("q-btn"),r=(0,n.up)("q-card"),u=(0,n.up)("q-spinner-dots"),d=(0,n.up)("q-infinite-scroll");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",g,[(0,n.Wm)(d,{onLoad:Y,offset:250,"scroll-target":"body",ref_key:"scrollList",ref:z},{loading:(0,n.w5)((()=>[(0,n._)("div",T,[(0,n.Wm)(u,{color:"primary",size:"40px"})])])),default:(0,n.w5)((()=>[0!==(0,i.SU)(F).length?((0,n.wg)(),(0,n.j4)(r,{key:0,class:"q-pa-lg"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)((0,i.SU)(F),(a=>((0,n.wg)(),(0,n.iD)("div",{class:"patient_trans_list_bg",key:a},[(0,n._)("div",{class:"patient_trans_list",onClick:l=>"Confirmed"==a.name||"Published"==a.name?null:W(a)},[(0,n._)("div",v,[(0,n._)("div",h,[(0,n._)("h2",null,[(0,n.Uk)((0,t.zw)(a.patient_name)+" ",1),(0,n.Wm)(s,{dense:"",color:"primary","text-color":"white"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,t.zw)(a.gender),1)])),_:2},1024)]),(0,n._)("h6",null,(0,t.zw)(a.TSType_name),1)]),(0,n._)("div",w,[(0,n._)("div",y,(0,t.zw)(a.hospital_name),1),(0,n._)("ul",k,[(0,n._)("li",null,["Published"==a.name?((0,n.wg)(),(0,n.j4)(o,{key:0,round:"",color:"primary",icon:"las la-download",class:"q-ml-sm",padding:"sm",onClick:l=>x(a),title:"Report Download"},null,8,["onClick"])):(0,n.kq)("",!0)]),(0,n._)("li",null,[(0,n.Wm)(s,{color:"Confirmed"==a.name||"Published"==a.name?"green":"Pending"==a.name?"red":"yellow",label:a.name},null,8,["color","label"])]),(0,n._)("li",null,[(0,n.Uk)(" Duration: "),(0,n._)("b",null,(0,t.zw)(a.audio_duration),1)]),(0,n._)("li",null,[(0,n.Uk)(" Updated at: "),(0,n._)("b",null,(0,t.zw)(a.updated_at.split("T")[0]),1)])])])]),(0,n._)("p",{class:"paient_trans_para",innerHTML:a.transcription},null,8,b)],8,f)])))),128))])),_:1})):S.value?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(r,{key:1,class:"q-pa-lg"},{default:(0,n.w5)((()=>[(0,n._)("div",Z,[(0,n.Wm)(o,{class:"not_found_icon",outline:"",color:"primary"},{default:(0,n.w5)((()=>[q])),_:1}),D])])),_:1}))])),_:1},512)]),(0,n._)("div",C,[p.value?((0,n.wg)(),(0,n.j4)((0,i.SU)(l),{key:0,items:_.value,id:"downloadPDF"},null,8,["items"])):(0,n.kq)("",!0)])],64)}}};var L=e(1639),U=e(6870),j=e(4458),z=e(7691),P=e(8879),I=e(7501),S=e(9984),F=e.n(S);const Y=(0,L.Z)(H,[["__scopeId","data-v-b6531bf0"]]),Q=Y;F()(H,"components",{QInfiniteScroll:U.Z,QCard:j.Z,QChip:z.Z,QBtn:P.Z,QSpinnerDots:I.Z})}}]);