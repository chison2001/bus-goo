import{V as le,r as V}from"./VForm-37c1912f.js";import{d as ke,r as u,i as De,w as O,d3 as ae,a4 as ge,o as j,f as Te,e as o,b as e,t as v,m as n,b8 as m,bd as Le,n as i,_ as K,c as te,h as xe,F as we,ah as U,v as k,aQ as M}from"./index-3fd149be.js";import{_ as qe}from"./AppCombobox.vue_vue_type_script_setup_true_lang-c1d9498f.js";import{_ as Ue}from"./AppTextarea.vue_vue_type_script_setup_true_lang-ebcf7f43.js";import{_ as Ne}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-fd8a12a0.js";import{_ as Ie}from"./AppTextField.vue_vue_type_script_setup_true_lang-90e794ca.js";import{$}from"./api-a75dc8d8.js";import{b as Q,a as $e,V as H,c as Ae}from"./VCard-61c770c5.js";import{V as J,a as r}from"./VRow-c532c0b3.js";import{V as W}from"./VCardText-e03872ea.js";import{V as Fe}from"./VTable-435e4ee8.js";import{V as oe}from"./VDialog-047137e7.js";import{V as Ge}from"./VDivider-28142714.js";import{V as X}from"./VSpacer-ef1f5864.js";import{V as Se}from"./VChip-259eb5bf.js";import"./VInput-f0b53b48.js";import"./VImg-358e4210.js";import"./forwardRefs-6ea3df5c.js";import"./filter-63c6ab32.js";import"./VTextField-2ce7eec1.js";import"./VField-51408b73.js";import"./VList-f267fd1b.js";import"./VAvatar-f2d95c46.js";import"./VOverlay-159aff9b.js";import"./lazy-b75e2264.js";import"./VMenu-277f5fe7.js";import"./VCheckboxBtn-cc8088ff.js";import"./VSelectionControl-28aa5ef1.js";const Be=i("th",{class:"text-center"}," ID ",-1),Ee=i("th",{class:"text-center"}," Tên dòng ",-1),Re=i("th",{class:"text-center"}," Ngày bắt đầu ",-1),ze=i("th",{class:"text-center"}," Ngày kết thúc ",-1),Pe=i("th",{class:"text-center"}," Loại khuyến mãi ",-1),Oe=i("th",{class:"text-center"}," Trạng thái ",-1),je={class:"text-center"},Ke={class:"text-center"},Me={class:"text-center"},Qe={class:"text-center"},He={class:"text-center"},Je={class:"text-center"},We={class:"text-center"},Xe={class:"text-center"},Ye={class:"text-h5"},Ze=i("span",null,"Chi tiết khuyến mãi",-1),Nl=ke({__name:"[id]",async setup(el){let D,A;const B=u(!1),F=u(),E=u(!1),g=u(),R=u([]),ne=[{value:1,title:"Giá"},{value:2,title:"Chiết khấu"}],T=u(""),G=u(""),h=u(""),b=u({value:1,title:"Giá"}),y=u(""),N=u(""),I=u(""),L=u(),x=u(),de=De(),w=u(!0);O(b,l=>{l!==null&&(console.log(l),l.value===1&&(w.value=!0,L.value=null),l.value===2&&(w.value=!1,x.value=null))});const ie=([D,A]=ae(()=>$("api/promotion/get-by-id",{method:"GET",params:{promotionId:de.params.id}})),D=await D,A(),D),p=ge(()=>ie.data.valueReponse.data),c=new Date(p.value.fromDate)<new Date,f=p.value.status===0,se=()=>{var l;(l=F.value)==null||l.validate().then(({valid:a})=>{a&&M(()=>{var d,s;(d=F.value)==null||d.reset(),(s=F.value)==null||s.resetValidation()})})};async function ue(){const a=(await $("api/promotion/get-line",{method:"GET",params:{promotionId:p.value.id}})).data.valueReponse.data;R.value=a.map(d=>({id:d.id,code:d.code,promoName:d.lineName,promoType:d.promotionType,fromDate:d.fromDate,toDate:d.toDate,status:d.status}))}[D,A]=ae(()=>ue()),await D,A();const _=u(!1),q=u(!1);let C=null,Y=-1;async function re(l){const d=(await $("api/promotion/get-detail",{method:"GET",params:{promotionLineId:l}})).data.valueReponse.data,s=d.promotionLine;C=s.id,G.value=s.lineName,T.value=s.code,h.value=s.fromDate,b.value.value=s.promotionType,y.value=s.toDate,d.id,N.value=d.code,I.value=d.discount,L.value=d.maxDiscount,x.value=d.conditionApply,b.value.value===1&&(w.value=!0),b.value.value===2&&(w.value=!1)}function me(){C=null,_.value=!0}function pe(l){C=l,re(l),_.value=!0}function ce(l){Y=l,q.value=!0}function fe(){R.value.splice(Y,1),P()}function z(){M(()=>{var l,a;(l=g.value)==null||l.reset(),h.value="",y.value="",(a=g.value)==null||a.resetValidation()}),_.value=!1}function P(){q.value=!1}async function Ve(){C=(await $("api/promotion/create-update/promotionline",{method:"POST",data:{lineCode:T.value,promotionId:p.value.id,promotionLineId:C,lineName:T.value,fromDate:h.value,toDate:y.value,promotionType:b.value.value}})).data.valueReponse.data.id}async function ve(){await $("api/promotion/create-update/promotiondetail",{method:"POST",data:{promotionLineId:C,detailCode:N.value,discount:I.value,maxDiscount:L.value,conditionApply:x.value}})}function be(){var l;(l=g.value)==null||l.validate().then(async({valid:a})=>{a&&(await Ve(),await ve(),z(),M(()=>{var d,s;(d=g.value)==null||d.reset(),h.value="",y.value="",(s=g.value)==null||s.resetValidation()}))})}O(_,l=>{l||z()}),O(q,l=>{l||P()});const he=l=>{const a=l;if(a===1)return"Giá";if(a===2)return"Chiết khấu"},Z=l=>{const a=l;if(a===1)return{color:"success",value:"active"};if(a===0)return{color:"secondary",value:"inactive"}};return(l,a)=>{const d=Ie,s=Ne,ye=Ue,_e=qe;return j(),Te(H,{class:"pa-sm-8 pa-5"},{default:o(()=>[e($e,{class:"text-center"},{default:o(()=>[e(Q,{class:"text-h3 mb-3"},{default:o(()=>[v(" Chỉnh sửa chương trình khuyến mãi ")]),_:1})]),_:1}),e(W,null,{default:o(()=>[e(n(le),{ref_key:"refForm",ref:F,modelValue:n(B),"onUpdate:modelValue":a[4]||(a[4]=t=>m(B)?B.value=t:null),onSubmit:Le(se,["prevent"])},{default:o(()=>[e(J,null,{default:o(()=>[e(r,{cols:"12",md:"6"},{default:o(()=>[e(d,{modelValue:n(p).code,"onUpdate:modelValue":a[0]||(a[0]=t=>n(p).code=t),rules:["requiredValidator"in l?l.requiredValidator:n(V)],disabled:c||f,label:l.$t("Code"),placeholder:"TET2024"},null,8,["modelValue","rules","disabled","label"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{modelValue:n(p).fromDate,"onUpdate:modelValue":a[1]||(a[1]=t=>n(p).fromDate=t),label:"Ngày bắt đầu",disabled:c||f,"clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in l?l.requiredValidator:n(V)],placeholder:"Chọn ngày"},null,8,["modelValue","disabled","rules"])]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(s,{modelValue:n(p).toDate,"onUpdate:modelValue":a[2]||(a[2]=t=>n(p).toDate=t),label:"Ngày kết thúc",disabled:c||f,"clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in l?l.requiredValidator:n(V)],placeholder:"Chọn ngày"},null,8,["modelValue","disabled","rules"])]),_:1}),e(r,{cols:"12",md:"12"},{default:o(()=>[e(ye,{modelValue:n(p).description,"onUpdate:modelValue":a[3]||(a[3]=t=>n(p).description=t),label:"Giới thiệu chi tiết",disabled:c||f,placeholder:"Nhập giới thiệu",rows:"2"},null,8,["modelValue","disabled"])]),_:1}),e(W,null,{default:o(()=>[e(Fe,null,{default:o(()=>[i("thead",null,[i("tr",null,[Be,Ee,Re,ze,Pe,Oe,i("th",je,[e(K,{class:"me-2",size:"small",icon:"tabler-plus",onClick:me})])])]),i("tbody",null,[(j(!0),te(we,null,xe(n(R),(t,Ce)=>{var ee;return j(),te("tr",{key:Ce},[i("td",Ke,k(t.id),1),i("td",Me,k(t.promoName),1),i("td",Qe,k(t.fromDate),1),i("td",He,k(t.toDate),1),i("td",Je,k(he(t.promoType)),1),i("td",We,[e(Se,{color:(ee=Z(t.status))==null?void 0:ee.color,size:"small",label:"",class:"text-capitalize"},{default:o(()=>{var S;return[v(k((S=Z(t.status))==null?void 0:S.value),1)]}),_:2},1032,["color"])]),i("td",Xe,[e(K,{class:"me-2",size:"small",icon:"tabler-edit",onClick:S=>pe(t.id)},null,8,["onClick"]),e(K,{size:"small",icon:"tabler-trash",onClick:S=>ce(t.id)},null,8,["onClick"])])])}),128))])]),_:1})]),_:1}),e(r,{cols:"12",class:"d-flex flex-wrap justify-center gap-4"},{default:o(()=>[e(U,{type:"submit",class:"me-3",disabled:c||f},{default:o(()=>[v(" Cập nhật ")]),_:1},8,["disabled"]),e(U,{type:"reset",variant:"outlined",color:"secondary",to:"/promotion/list"},{default:o(()=>[v(" Trở lại ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(oe,{modelValue:n(_),"onUpdate:modelValue":a[15]||(a[15]=t=>m(_)?_.value=t:null),"max-width":"1000px",persistent:""},{default:o(()=>[e(H,null,{default:o(()=>[e(Q,null,{default:o(()=>[i("span",Ye,k(n(C)===-1?"Thêm dòng khuyến mãi":"Chỉnh sửa dòng khuyến mãi"),1)]),_:1}),e(W,null,{default:o(()=>[e(n(le),{ref_key:"refFormLine",ref:g,modelValue:n(E),"onUpdate:modelValue":a[14]||(a[14]=t=>m(E)?E.value=t:null)},{default:o(()=>[e(J,null,{default:o(()=>[e(r,{cols:"12",md:"6"},{default:o(()=>[e(d,{modelValue:n(T),"onUpdate:modelValue":a[5]||(a[5]=t=>m(T)?T.value=t:null),rules:["requiredValidator"in l?l.requiredValidator:n(V)],disabled:c||f,label:l.$t("Code"),placeholder:"TET2024"},null,8,["modelValue","rules","disabled","label"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(d,{modelValue:n(G),"onUpdate:modelValue":a[6]||(a[6]=t=>m(G)?G.value=t:null),label:"Tên dòng khuyến mãi",rules:["requiredValidator"in l?l.requiredValidator:n(V)]},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(s,{modelValue:n(h),"onUpdate:modelValue":a[7]||(a[7]=t=>m(h)?h.value=t:null),label:"Ngày bắt đầu","clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in l?l.requiredValidator:n(V)],placeholder:"Chọn ngày"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(s,{modelValue:n(y),"onUpdate:modelValue":a[8]||(a[8]=t=>m(y)?y.value=t:null),label:"Ngày kết thúc","clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in l?l.requiredValidator:n(V)],placeholder:"Chọn ngày"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(_e,{modelValue:n(b),"onUpdate:modelValue":a[9]||(a[9]=t=>m(b)?b.value=t:null),items:ne,label:"Loại dòng khuyến mãi",rules:["requiredValidator"in l?l.requiredValidator:n(V)]},null,8,["modelValue","rules"])]),_:1}),e(n(Ge)),e(r,{cols:"12",md:"12"},{default:o(()=>[Ze]),_:1}),e(r,{cols:"12",md:"6"},{default:o(()=>[e(d,{modelValue:n(N),"onUpdate:modelValue":a[10]||(a[10]=t=>m(N)?N.value=t:null),rules:["requiredValidator"in l?l.requiredValidator:n(V)],disabled:c||f,label:l.$t("Code"),placeholder:"TET2024"},null,8,["modelValue","rules","disabled","label"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(d,{modelValue:n(I),"onUpdate:modelValue":a[11]||(a[11]=t=>m(I)?I.value=t:null),label:"Giảm giá",disabled:c||f,rules:["requiredValidator"in l?l.requiredValidator:n(V)]},null,8,["modelValue","disabled","rules"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(d,{modelValue:n(L),"onUpdate:modelValue":a[12]||(a[12]=t=>m(L)?L.value=t:null),label:"Giảm giá tối đa",disabled:c||f||n(w)},null,8,["modelValue","disabled"])]),_:1}),e(r,{cols:"12",md:"6",mb:"12"},{default:o(()=>[e(d,{modelValue:n(x),"onUpdate:modelValue":a[13]||(a[13]=t=>m(x)?x.value=t:null),label:"Giá mua tối thiểu",disabled:c||f||!n(w)},null,8,["modelValue","disabled"])]),_:1})]),_:1}),e(J,null,{default:o(()=>[e(X),e(U,{color:"blue-darken-1",variant:"text",onClick:z},{default:o(()=>[v(" Thoát ")]),_:1}),e(U,{color:"blue-darken-1",variant:"text",type:"submit",disabled:c||f,onClick:be},{default:o(()=>[v(" Lưu dòng khuyến mãi ")]),_:1},8,["disabled"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(oe,{modelValue:n(q),"onUpdate:modelValue":a[16]||(a[16]=t=>m(q)?q.value=t:null),"max-width":"500px"},{default:o(()=>[e(H,null,{default:o(()=>[e(Q,{class:"text-h5"},{default:o(()=>[v(" Bạn có muốn xoá dòng khuyến mãi này không? ")]),_:1}),e(Ae,null,{default:o(()=>[e(X),e(U,{color:"blue-darken-1",variant:"text",onClick:P},{default:o(()=>[v(" Cancel ")]),_:1}),e(U,{color:"blue-darken-1",variant:"text",onClick:fe},{default:o(()=>[v(" OK ")]),_:1}),e(X)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{Nl as default};