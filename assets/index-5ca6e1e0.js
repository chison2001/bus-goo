import{_ as L}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-fd8a12a0.js";import{_ as F}from"./AppSelect.vue_vue_type_script_setup_true_lang-263668d4.js";import{$ as H}from"./api-a75dc8d8.js";import{V as O,p as G,a as J,c as K}from"./VPagination-f6ec3866.js";import{u as Q}from"./useApi-dfef132a.js";import{V as U}from"./VCardText-e03872ea.js";import{V as W,a as x}from"./VRow-c532c0b3.js";import{V as N}from"./VCard-61c770c5.js";import{V as X}from"./VSpacer-ef1f5864.js";import{d as Y,r as n,d3 as Z,a4 as S,o as ee,c as te,b as t,e as a,m as o,b8 as p,n as c,ah as y,t as m,v as u,_ as $,q as E,a as ae}from"./index-3fd149be.js";import{V as z}from"./VDivider-28142714.js";import{V as le}from"./VChip-259eb5bf.js";import"./VField-51408b73.js";import"./VImg-358e4210.js";import"./VInput-f0b53b48.js";import"./forwardRefs-6ea3df5c.js";import"./filter-63c6ab32.js";import"./VTextField-2ce7eec1.js";import"./VList-f267fd1b.js";import"./VAvatar-f2d95c46.js";import"./VOverlay-159aff9b.js";import"./lazy-b75e2264.js";import"./VMenu-277f5fe7.js";import"./VCheckboxBtn-cc8088ff.js";import"./VSelectionControl-28aa5ef1.js";import"./VTable-435e4ee8.js";import"./index-f220d054.js";const oe={class:"me-3 d-flex gap-3"},se={class:"app-user-search-filter d-flex align-center flex-wrap gap-4"},ie={class:"text-capitalize font-weight-medium"},re={class:"text-capitalize font-weight-medium"},ne={class:"d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"},pe={class:"text-sm text-disabled mb-0"},Me=Y({__name:"index",async setup(ce){let f,h;const v=n(),g=n(""),_=n(""),s=n(10),i=n(1),C=n(),D=n(),A=r=>{var l,d;i.value=r.page,C.value=(l=r.sortBy[0])==null?void 0:l.order,D.value=(d=r.sortBy[0])==null?void 0:d.key},I=[{title:"Mã",key:"priceCode"},{title:"Ngày bắt đầu",key:"fromDate"},{title:"Ngày kết thúc",key:"toDate"},{title:"Trạng thái",key:"status"},{title:"Hành động",key:"actions",sortable:!1}],M=[{title:"Active",value:1},{title:"Inactive",value:0}],{data:k,execute:R}=([f,h]=Z(()=>Q(K("api/price/find",{query:{status:v,fromDate:g,toDate:_,itemPerPage:s,page:i.value-1,sortBy:C,orderBy:D}}))),f=await f,h(),f),j=S(()=>k.value.valueReponse.data.content),V=S(()=>k.value.valueReponse.data.totalElements),w=r=>{const l=r;if(l===1)return{color:"success",value:"active"};if(l===0)return{color:"secondary",value:"inactive"}},q=async r=>{await H(`api/price/delete/${r}`,{method:"DELETE"}),R()};return(r,l)=>{const d=F,P=L,B=ae("IconBtn");return ee(),te("section",null,[t(N,{title:"Bộ lọc",class:"mb-6"},{default:a(()=>[t(U,null,{default:a(()=>[t(W,null,{default:a(()=>[t(x,{cols:"12",md:"4"},{default:a(()=>[t(d,{modelValue:o(v),"onUpdate:modelValue":l[0]||(l[0]=e=>p(v)?v.value=e:null),label:"Chọn trạng thái",placeholder:"Chọn trạng thái",clearable:"","clear-icon":"tabler-x",items:M},null,8,["modelValue"])]),_:1}),t(x,{cols:"12",md:"4"},{default:a(()=>[t(P,{modelValue:o(g),"onUpdate:modelValue":l[1]||(l[1]=e=>p(g)?g.value=e:null),label:"Ngày bắt đầu","clear-icon":"tabler-x",clearable:"",placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1}),t(x,{cols:"12",md:"4"},{default:a(()=>[t(P,{modelValue:o(_),"onUpdate:modelValue":l[2]||(l[2]=e=>p(_)?_.value=e:null),label:"Ngày kết thúc","clear-icon":"tabler-x",clearable:"",placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(N,null,{default:a(()=>[t(U,{class:"d-flex flex-wrap py-4 gap-4"},{default:a(()=>[c("div",oe,[t(d,{"model-value":o(s),items:[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"Tất cả"}],style:{"inline-size":"6.25rem"},"onUpdate:modelValue":l[3]||(l[3]=e=>s.value=parseInt(e,10))},null,8,["model-value"])]),t(X),c("div",se,[t(y,{variant:"tonal",color:"secondary","prepend-icon":"tabler-screen-share"},{default:a(()=>[m(" Export ")]),_:1}),t(y,{"prepend-icon":"tabler-plus",to:"add"},{default:a(()=>[m(" Thêm đơn giá ")]),_:1})])]),_:1}),t(z),t(o(O),{"items-per-page":o(s),"onUpdate:itemsPerPage":l[5]||(l[5]=e=>p(s)?s.value=e:null),page:o(i),"onUpdate:page":l[6]||(l[6]=e=>p(i)?i.value=e:null),items:o(j),"items-length":o(V),headers:I,class:"text-no-wrap","onUpdate:options":A},{"item.priceCode":a(({item:e})=>[m(u(e.code),1)]),"item.fromDate":a(({item:e})=>[c("span",ie,u(e.fromDate),1)]),"item.toDate":a(({item:e})=>[c("span",re,u(e.toDate),1)]),"item.status":a(({item:e})=>{var b;return[t(le,{color:(b=w(e.status))==null?void 0:b.color,size:"small",label:"",class:"text-capitalize"},{default:a(()=>{var T;return[m(u((T=w(e.status))==null?void 0:T.value),1)]}),_:2},1032,["color"])]}),"item.actions":a(({item:e})=>[t(B,{onClick:b=>q(e.id)},{default:a(()=>[t($,{icon:"tabler-trash"})]),_:2},1032,["onClick"]),t(B,{to:{name:"price-edit-id",params:{id:e.id}}},{default:a(()=>[t($,{icon:"tabler-edit"})]),_:2},1032,["to"])]),bottom:a(()=>[t(z),c("div",ne,[c("p",pe,u(o(G)({page:o(i),itemPerPage:o(s)},o(V))),1),t(J,{modelValue:o(i),"onUpdate:modelValue":l[4]||(l[4]=e=>p(i)?i.value=e:null),length:Math.ceil(o(V)/o(s)),"total-visible":r.$vuetify.display.xs?1:Math.ceil(o(V)/o(s))},{prev:a(e=>[t(y,E({variant:"tonal",color:"default"},e,{icon:!1}),{default:a(()=>[m(" Trước ")]),_:2},1040)]),next:a(e=>[t(y,E({variant:"tonal",color:"default"},e,{icon:!1}),{default:a(()=>[m(" Sau ")]),_:2},1040)]),_:1},8,["modelValue","length","total-visible"])])]),_:1},8,["items-per-page","page","items","items-length"])]),_:1})])}}});export{Me as default};