import{V as k,r as v}from"./VForm-86a1011a.js";import{d as F,r as m,j as R,d3 as S,o as U,f as $,e as l,b as a,t as T,m as r,b8 as f,bd as A,ah as C,aQ as B}from"./index-e6b68dc9.js";import{_ as I}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-75524abd.js";import{_ as N}from"./AppCombobox.vue_vue_type_script_setup_true_lang-28703870.js";import{$ as g}from"./api-48aa3761.js";import{b as P,a as j,V as O}from"./VCard-0f8dbb07.js";import{V as D,a as c}from"./VRow-4991ca3a.js";import{V as H}from"./VCardText-a3dfbb70.js";import"./VInput-631c3315.js";import"./VImg-b249bafb.js";import"./forwardRefs-6ea3df5c.js";import"./VField-8d5b2183.js";import"./filter-c6306e46.js";import"./VTextField-c3064460.js";import"./VList-0391a593.js";import"./VAvatar-0522e8de.js";import"./VDivider-f42352cb.js";import"./VOverlay-12f580cc.js";import"./lazy-386fe9ed.js";import"./VMenu-cba0e6b4.js";import"./VCheckboxBtn-d95a6a9f.js";import"./VSelectionControl-29ce846d.js";import"./VChip-08f601ae.js";const pe=F({__name:"index",async setup(M){let b,y;const V=m(!1),d=m(),n=m(""),u=m(),p=m(),_=m([]),h=R(),w=async()=>{const e=(await g("api/route/create",{method:"POST",data:{fromId:u.value.value,toId:p.value.value,transferTime:n.value}})).data;console.log(e.respType==="200"),e.respType===200&&h.replace("/route/list")},x=()=>{var t;(t=d.value)==null||t.validate().then(({valid:e})=>{e&&(w(),B(()=>{var s,i;(s=d.value)==null||s.reset(),n.value="",(i=d.value)==null||i.resetValidation()}))})};async function q(t,e){const i=(await g("/api/region/find",{method:"POST",data:{parentId:t,regionStructureId:e}})).data.valueReponse.data;_.value=i.map(o=>({value:o.id,title:o.fullName}))}return[b,y]=S(()=>q(null,1)),await b,y(),(t,e)=>{const s=N,i=I;return U(),$(O,{class:"pa-sm-8 pa-5"},{default:l(()=>[a(j,{class:"text-center"},{default:l(()=>[a(P,{class:"text-h3 mb-3"},{default:l(()=>[T(" Thêm tuyến đường ")]),_:1})]),_:1}),a(H,null,{default:l(()=>[a(r(k),{ref_key:"refForm",ref:d,modelValue:r(V),"onUpdate:modelValue":e[3]||(e[3]=o=>f(V)?V.value=o:null),onSubmit:A(x,["prevent"])},{default:l(()=>[a(D,null,{default:l(()=>[a(c,{cols:"12",md:"6"},{default:l(()=>[a(s,{modelValue:r(u),"onUpdate:modelValue":e[0]||(e[0]=o=>f(u)?u.value=o:null),items:r(_),label:"Điểm khởi hành",rules:["requiredValidator"in t?t.requiredValidator:r(v)]},null,8,["modelValue","items","rules"])]),_:1}),a(c,{cols:"12",md:"6"},{default:l(()=>[a(s,{modelValue:r(p),"onUpdate:modelValue":e[1]||(e[1]=o=>f(p)?p.value=o:null),items:r(_),label:"Điểm đến",rules:["requiredValidator"in t?t.requiredValidator:r(v)]},null,8,["modelValue","items","rules"])]),_:1}),a(c,{cols:"12",md:"6"},{default:l(()=>[a(i,{modelValue:r(n),"onUpdate:modelValue":e[2]||(e[2]=o=>f(n)?n.value=o:null),label:"Thời gian chạy",config:{enableTime:!0,noCalendar:!0,dateFormat:"H:i"},"clear-icon":"tabler-x",clearable:"",rules:["requiredValidator"in t?t.requiredValidator:r(v)]},null,8,["modelValue","rules"])]),_:1}),a(c,{cols:"12",class:"d-flex flex-wrap justify-center gap-4"},{default:l(()=>[a(C,{type:"submit",class:"me-3"},{default:l(()=>[T(" Thêm ")]),_:1}),a(C,{type:"reset",variant:"outlined",color:"secondary",to:"list"},{default:l(()=>[T(" Trở lại ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{pe as default};