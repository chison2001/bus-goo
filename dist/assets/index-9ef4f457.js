import{_ as R}from"./AppTextField.vue_vue_type_script_setup_true_lang-085f07cd.js";import{_ as q}from"./AppSelect.vue_vue_type_script_setup_true_lang-82cb8ff5.js";import{$ as M}from"./api-48aa3761.js";import{V as j,p as L,a as O,c as F}from"./VPagination-cfec1eb1.js";import{u as H}from"./useApi-92ebb378.js";import{V as Q}from"./VCardText-a3dfbb70.js";import{V as G}from"./VSpacer-f44f5fc8.js";import{d as J,r as p,d3 as K,a4 as T,o as W,c as X,b as t,e as s,n as o,m as l,b8 as m,ah as h,t as c,v as d,_ as B,q as z,a as Y}from"./index-e6b68dc9.js";import{V as P}from"./VDivider-f42352cb.js";import{V as Z}from"./VChip-08f601ae.js";import{V as ee}from"./VCard-0f8dbb07.js";import"./VInput-631c3315.js";import"./VImg-b249bafb.js";import"./VTextField-c3064460.js";import"./VField-8d5b2183.js";import"./forwardRefs-6ea3df5c.js";import"./filter-c6306e46.js";import"./VList-0391a593.js";import"./VAvatar-0522e8de.js";import"./VOverlay-12f580cc.js";import"./lazy-386fe9ed.js";import"./VMenu-cba0e6b4.js";import"./VCheckboxBtn-d95a6a9f.js";import"./VSelectionControl-29ce846d.js";import"./VTable-22554b1a.js";import"./index-f220d054.js";const te={class:"me-3 d-flex gap-3"},ae={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},se={style:{"inline-size":"10rem"}},le={class:"user-list-filter"},oe={class:"text-capitalize font-weight-medium"},ie={class:"text-capitalize font-weight-medium"},ne={class:"text-capitalize font-weight-medium"},re={class:"text-capitalize font-weight-medium"},pe={class:"d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"},de={class:"text-sm text-disabled mb-0"},Re=J({__name:"index",async setup(ue){let f,V;const v=p(""),_=p(),i=p(10),n=p(1),b=p(),w=p(),S=r=>{var a,u;n.value=r.page,b.value=(a=r.sortBy[0])==null?void 0:a.order,w.value=(u=r.sortBy[0])==null?void 0:u.key},E=[{title:"CODE",key:"userCode"},{title:"Người dùng",key:"fullName"},{title:"Địa chỉ",key:"address"},{title:"Số điện thoại",key:"phone"},{title:"Trạng thái",key:"status"},{title:"Hành động",key:"actions",sortable:!1}],{data:y,execute:I}=([f,V]=K(()=>H(F("api/user/find",{query:{q:v,status:_,itemPerPage:i,page:n.value-1,sortBy:b,orderBy:w}}))),f=await f,V(),f);console.log(y.value.valueReponse.data.content);const N=T(()=>y.value.valueReponse.data.content),g=T(()=>y.value.valueReponse.data.totalElements),$=[{title:"Active",value:1},{title:"Inactive",value:0}],C=r=>{const a=r;if(a===1)return{color:"success",value:"active"};if(a===0)return{color:"secondary",value:"inactive"}},D=async r=>{await M(`/api/user/delete/${r}`,{method:"DELETE"}),I()};return(r,a)=>{const u=q,A=R,k=Y("IconBtn");return W(),X("section",null,[t(ee,{id:"user-list"},{default:s(()=>[t(Q,{class:"d-flex flex-wrap py-4 gap-4"},{default:s(()=>[o("div",te,[t(u,{"model-value":l(i),items:[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"Tất cả"}],style:{"inline-size":"8rem"},"onUpdate:modelValue":a[0]||(a[0]=e=>i.value=parseInt(e,10))},null,8,["model-value"])]),t(G),o("div",ae,[o("div",se,[t(A,{modelValue:l(v),"onUpdate:modelValue":a[1]||(a[1]=e=>m(v)?v.value=e:null),placeholder:"Tìm kiếm",density:"compact"},null,8,["modelValue"])]),o("div",le,[t(u,{modelValue:l(_),"onUpdate:modelValue":a[2]||(a[2]=e=>m(_)?_.value=e:null),placeholder:"Trạng thái",clearable:"","clear-icon":"tabler-x","single-line":"",items:$},null,8,["modelValue"])]),t(h,{variant:"tonal",color:"secondary","prepend-icon":"tabler-screen-share"},{default:s(()=>[c(" Export ")]),_:1}),t(h,{"prepend-icon":"tabler-plus",to:"add"},{default:s(()=>[c(" Thêm người dùng ")]),_:1})])]),_:1}),t(P),t(l(j),{"items-per-page":l(i),"onUpdate:itemsPerPage":a[4]||(a[4]=e=>m(i)?i.value=e:null),page:l(n),"onUpdate:page":a[5]||(a[5]=e=>m(n)?n.value=e:null),items:l(N),"items-length":l(g),headers:E,class:"text-no-wrap","onUpdate:options":S},{"item.code":s(({item:e})=>[o("span",oe,d(e.userCode),1)]),"item.user":s(({item:e})=>[o("span",ie,d(e.fullName),1)]),"item.address":s(({item:e})=>[o("span",ne,d(e.address),1)]),"item.phoneNumber":s(({item:e})=>[o("span",re,d(e.phone),1)]),"item.status":s(({item:e})=>{var x;return[t(Z,{color:(x=C(e.status))==null?void 0:x.color,size:"small",label:"",class:"text-capitalize"},{default:s(()=>{var U;return[c(d((U=C(e.status))==null?void 0:U.value),1)]}),_:2},1032,["color"])]}),"item.actions":s(({item:e})=>[t(k,{onClick:x=>D(e.userId)},{default:s(()=>[t(B,{icon:"tabler-trash"})]),_:2},1032,["onClick"]),t(k,{to:{name:"user-view-id",params:{id:e.userId}}},{default:s(()=>[t(B,{icon:"tabler-eye"})]),_:2},1032,["to"])]),bottom:s(()=>[t(P),o("div",pe,[o("p",de,d(l(L)({page:l(n),itemPerPage:l(i)},l(g))),1),t(O,{modelValue:l(n),"onUpdate:modelValue":a[3]||(a[3]=e=>m(n)?n.value=e:null),length:Math.ceil(l(g)/l(i)),"total-visible":r.$vuetify.display.xs?1:Math.ceil(l(g)/l(i))},{prev:s(e=>[t(h,z({variant:"tonal",color:"default"},e,{icon:!1}),{default:s(()=>[c(" Trước ")]),_:2},1040)]),next:s(e=>[t(h,z({variant:"tonal",color:"default"},e,{icon:!1}),{default:s(()=>[c(" Sau ")]),_:2},1040)]),_:1},8,["modelValue","length","total-visible"])])]),_:1},8,["items-per-page","page","items","items-length"])]),_:1})])}}});export{Re as default};
