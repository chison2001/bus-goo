import{V as k,r as b}from"./VForm-86a1011a.js";import{d as F,r as i,j as N,d3 as w,o as U,f as A,e as o,b as t,t as T,m as r,b8 as V,bd as I,ah as $,aQ as S}from"./index-e6b68dc9.js";import{_ as j}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-75524abd.js";import{_ as E}from"./AppCombobox.vue_vue_type_script_setup_true_lang-28703870.js";import{$ as y}from"./api-48aa3761.js";import{b as G,a as P,V as D}from"./VCard-0f8dbb07.js";import{V as H,a as v}from"./VRow-4991ca3a.js";import{V as M}from"./VCardText-a3dfbb70.js";import"./VInput-631c3315.js";import"./VImg-b249bafb.js";import"./forwardRefs-6ea3df5c.js";import"./VField-8d5b2183.js";import"./filter-c6306e46.js";import"./VTextField-c3064460.js";import"./VList-0391a593.js";import"./VAvatar-0522e8de.js";import"./VDivider-f42352cb.js";import"./VOverlay-12f580cc.js";import"./lazy-386fe9ed.js";import"./VMenu-cba0e6b4.js";import"./VCheckboxBtn-d95a6a9f.js";import"./VSelectionControl-29ce846d.js";import"./VChip-08f601ae.js";const ce=F({__name:"index",async setup(O){let n,d;const _=i(!1),m=i(),p=i(),f=i(),u=i(""),h=i([]),C=i([]),g=N(),x=async()=>{const e=(await y("api/timetable/create",{method:"POST",data:{busId:p.value.value,routeId:f.value.value,startTime:u.value}})).data;console.log(e.respType==="200"),e.respType===200&&g.replace("/schedule/list")},q=()=>{var l;(l=m.value)==null||l.validate().then(({valid:e})=>{e&&(x(),S(()=>{var a,c;(a=m.value)==null||a.reset(),u.value="",(c=m.value)==null||c.resetValidation()}))})};async function B(){const e=(await y("api/route/find-all",{method:"GET"})).data.valueReponse.data;h.value=e.map(a=>({value:a.id,title:`${a.from.fullName} - ${a.to.fullName}`}))}[n,d]=w(()=>B()),await n,d();async function R(){const e=(await y("api/bus/find-all",{method:"GET"})).data.valueReponse.data;console.log(e.map(a=>({value:a.id,title:`${a.name} - ${a.typeBus.name}`}))),C.value=e.map(a=>({value:a.id,title:`${a.name} - ${a.typeBus.name}`}))}return[n,d]=w(()=>R()),await n,d(),(l,e)=>{const a=E,c=j;return U(),A(D,{class:"pa-sm-8 pa-5"},{default:o(()=>[t(P,{class:"text-center"},{default:o(()=>[t(G,{class:"text-h3 mb-3"},{default:o(()=>[T(" Thêm lịch trình ")]),_:1})]),_:1}),t(M,null,{default:o(()=>[t(r(k),{ref_key:"refForm",ref:m,modelValue:r(_),"onUpdate:modelValue":e[3]||(e[3]=s=>V(_)?_.value=s:null),onSubmit:I(q,["prevent"])},{default:o(()=>[t(H,null,{default:o(()=>[t(v,{cols:"12",md:"6"},{default:o(()=>[t(a,{modelValue:r(f),"onUpdate:modelValue":e[0]||(e[0]=s=>V(f)?f.value=s:null),items:r(h),label:"Chọn tuyến đường",rules:["requiredValidator"in l?l.requiredValidator:r(b)]},null,8,["modelValue","items","rules"])]),_:1}),t(v,{cols:"12",md:"6"},{default:o(()=>[t(a,{modelValue:r(p),"onUpdate:modelValue":e[1]||(e[1]=s=>V(p)?p.value=s:null),items:r(C),label:"Chọn xe",rules:["requiredValidator"in l?l.requiredValidator:r(b)]},null,8,["modelValue","items","rules"])]),_:1}),t(v,{cols:"12",md:"6"},{default:o(()=>[t(c,{modelValue:r(u),"onUpdate:modelValue":e[2]||(e[2]=s=>V(u)?u.value=s:null),label:"Thời gian và ngày khởi hành",config:{enableTime:!0,dateFormat:"Y-m-dTH:i"},"clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in l?l.requiredValidator:r(b)]},null,8,["modelValue","rules"])]),_:1}),t(v,{cols:"12",class:"d-flex flex-wrap justify-center gap-4"},{default:o(()=>[t($,{type:"submit",class:"me-3"},{default:o(()=>[T(" Thêm ")]),_:1}),t($,{type:"reset",variant:"outlined",color:"secondary",to:"list"},{default:o(()=>[T(" Trở lại ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{ce as default};
