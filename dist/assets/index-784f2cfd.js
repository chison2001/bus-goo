import{V as C,r as v}from"./VForm-86a1011a.js";import{d as g,r as i,j as h,o as w,f as D,e as t,b as e,t as _,m as r,b8 as f,bd as k,ah as b,aQ as q}from"./index-e6b68dc9.js";import{_ as F}from"./AppTextarea.vue_vue_type_script_setup_true_lang-4e4b3384.js";import{_ as N}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-75524abd.js";import{$ as S}from"./api-48aa3761.js";import{b as U,a as $,V as A}from"./VCard-0f8dbb07.js";import{V as B,a as c}from"./VRow-4991ca3a.js";import{V as R}from"./VCardText-a3dfbb70.js";import"./VInput-631c3315.js";import"./VImg-b249bafb.js";import"./forwardRefs-6ea3df5c.js";import"./VField-8d5b2183.js";import"./VAvatar-0522e8de.js";const X=g({__name:"index",setup(j){const V=i(!1),u=i(),d=i(""),m=i(""),n=i(""),T=h(),y=async()=>{const a=(await S("api/price/create",{method:"POST",data:{toDate:m.value,fromDate:d.value,priceDescription:n.value}})).data;console.log(a.respType==="200"),a.respType===200&&T.replace("/price/list")},x=()=>{var l;(l=u.value)==null||l.validate().then(({valid:a})=>{a&&(y(),q(()=>{var s,p;(s=u.value)==null||s.reset(),(p=u.value)==null||p.resetValidation()}))})};return(l,a)=>{const s=N,p=F;return w(),D(A,{class:"pa-sm-8 pa-5"},{default:t(()=>[e($,{class:"text-center"},{default:t(()=>[e(U,{class:"text-h3 mb-3"},{default:t(()=>[_(" Thêm đơn giá ")]),_:1})]),_:1}),e(R,null,{default:t(()=>[e(r(C),{ref_key:"refForm",ref:u,modelValue:r(V),"onUpdate:modelValue":a[3]||(a[3]=o=>f(V)?V.value=o:null),onSubmit:k(x,["prevent"])},{default:t(()=>[e(B,null,{default:t(()=>[e(c,{cols:"12",md:"6"},{default:t(()=>[e(s,{modelValue:r(d),"onUpdate:modelValue":a[0]||(a[0]=o=>f(d)?d.value=o:null),rules:["requiredValidator"in l?l.requiredValidator:r(v)],label:"Ngày có hiệu lực"},null,8,["modelValue","rules"])]),_:1}),e(c,{cols:"12",md:"6"},{default:t(()=>[e(s,{modelValue:r(m),"onUpdate:modelValue":a[1]||(a[1]=o=>f(m)?m.value=o:null),rules:["requiredValidator"in l?l.requiredValidator:r(v)],label:"Ngày hết hiệu lực"},null,8,["modelValue","rules"])]),_:1}),e(c,{cols:"12",md:"6"},{default:t(()=>[e(p,{modelValue:r(n),"onUpdate:modelValue":a[2]||(a[2]=o=>f(n)?n.value=o:null),rows:"1",label:"Ghi chú",items:["Admin","Manager","Staff","Customer"]},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",class:"d-flex flex-wrap justify-center gap-4"},{default:t(()=>[e(b,{type:"submit",class:"me-3"},{default:t(()=>[_(" Thêm ")]),_:1}),e(b,{type:"reset",variant:"outlined",color:"secondary",to:"list"},{default:t(()=>[_(" Huỷ ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{X as default};