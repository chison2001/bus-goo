import{V as U,r as u,e as c}from"./VForm-91111467.js";import{d as y,i as _,d3 as A,r as B,o as H,f as F,e as i,b as l,t as V,m as e,b8 as S,bd as R,ah as h}from"./index-8f404a99.js";import{_ as $}from"./AppCombobox.vue_vue_type_script_setup_true_lang-b238dc7f.js";import{_ as k}from"./AppSelect.vue_vue_type_script_setup_true_lang-207b1357.js";import{_ as I}from"./AppTextField.vue_vue_type_script_setup_true_lang-28c8d330.js";import{u as M}from"./useApi-d6a24a7c.js";import{b as P,a as j,V as D}from"./VCard-7472a958.js";import{V as E,a as d}from"./VRow-78dd9d6f.js";import{V as X}from"./VCardText-55737145.js";import"./VInput-a9fd18de.js";import"./VImg-0a711975.js";import"./forwardRefs-6ea3df5c.js";import"./filter-55513ba0.js";import"./VTextField-223228ac.js";import"./VField-23e2b48a.js";import"./VList-e70f133a.js";import"./VAvatar-3e62277b.js";import"./VDivider-94f30ef1.js";import"./VOverlay-025f4234.js";import"./lazy-4d6bd754.js";import"./VMenu-2ddf8f39.js";import"./VCheckboxBtn-7a64e6e7.js";import"./VSelectionControl-d4c1b6ee.js";import"./VChip-ab435abd.js";const be=y({__name:"[id]",emits:["submit"],async setup(z,{emit:q}){let s,f;const C=q,v=["Hồ Chí Minh","Bình Định","Bình Thuận","Nha Trang","Hà Nội","Hải Phòng","Đà Nẵng"],Q=["Quận 1","Quận 3","Bình Thạnh","Quận 12","Quận 10","Quận 8","Quận 9"],g=["Quận 1","Quận 3","Bình Thạnh","Quận 12","Quận 10","Quận 8","Quận 9"],T=_(),{data:r}=([s,f]=A(()=>M(`/apps/users/${T.params.id}`)),s=await s,f(),s),n=B(!1),w=()=>{C("submit",r.value)},N=()=>{};return(a,t)=>{const m=I,b=k,p=$;return H(),F(D,{class:"pa-sm-8 pa-5"},{default:i(()=>[l(j,{class:"text-center"},{default:i(()=>[l(P,{class:"text-h3 mb-3"},{default:i(()=>[V(" Cập nhật thông tin người dùng ")]),_:1})]),_:1}),l(X,null,{default:i(()=>[l(U,{modelValue:e(n),"onUpdate:modelValue":t[8]||(t[8]=o=>S(n)?n.value=o:null),class:"mt-6",onSubmit:R(w,["prevent"])},{default:i(()=>[l(E,null,{default:i(()=>[l(d,{cols:"12",md:"6"},{default:i(()=>[l(m,{modelValue:e(r).fullName,"onUpdate:modelValue":t[0]||(t[0]=o=>e(r).fullName=o),rules:["requiredValidator"in a?a.requiredValidator:e(u)],label:"Họ và tên"},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(m,{modelValue:e(r).email,"onUpdate:modelValue":t[1]||(t[1]=o=>e(r).email=o),rules:["requiredValidator"in a?a.requiredValidator:e(u),"emailValidator"in a?a.emailValidator:e(c)],label:"Email"},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(m,{modelValue:e(r).phoneNumber,"onUpdate:modelValue":t[2]||(t[2]=o=>e(r).phoneNumber=o),rules:["requiredValidator"in a?a.requiredValidator:e(u)],label:"Số điện thoại"},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(b,{modelValue:e(r).role,"onUpdate:modelValue":t[3]||(t[3]=o=>e(r).role=o),rules:["requiredValidator"in a?a.requiredValidator:e(u)],label:"Vai trò",items:[{title:"Admin",value:"admin"},{title:"Staff",value:"staff"},{title:"Customer",value:"customer"}]},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(b,{modelValue:e(r).status,"onUpdate:modelValue":t[4]||(t[4]=o=>e(r).status=o),label:"Chọn trạng thái",placeholder:"Chọn trạng thái",rules:["requiredValidator"in a?a.requiredValidator:e(u)],items:[{title:"Active",value:"active"},{title:"Inactive",value:"inactive"}]},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(p,{modelValue:e(r).address.city,"onUpdate:modelValue":t[5]||(t[5]=o=>e(r).address.city=o),items:v,label:"Tỉnh/Thành phố",rules:["requiredValidator"in a?a.requiredValidator:e(u)]},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(p,{modelValue:e(r).address.district,"onUpdate:modelValue":t[6]||(t[6]=o=>e(r).address.district=o),items:Q,label:"Quận/Huyện",rules:["requiredValidator"in a?a.requiredValidator:e(u)]},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",md:"6"},{default:i(()=>[l(p,{modelValue:e(r).address.ward,"onUpdate:modelValue":t[7]||(t[7]=o=>e(r).address.ward=o),items:g,label:"Phường/Xã",rules:["requiredValidator"in a?a.requiredValidator:e(u)]},null,8,["modelValue","rules"])]),_:1}),l(d,{cols:"12",class:"d-flex flex-wrap justify-center gap-4"},{default:i(()=>[l(h,{type:"submit",to:"/user/list"},{default:i(()=>[V(" Cập nhật ")]),_:1}),l(h,{color:"secondary",variant:"tonal",to:"/user/list",onClick:N},{default:i(()=>[V(" Huỷ ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{be as default};
