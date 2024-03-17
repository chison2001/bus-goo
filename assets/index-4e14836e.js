import{_ as O}from"./AppTextField.vue_vue_type_script_setup_true_lang-90e794ca.js";import{_ as Q}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-fd8a12a0.js";import{_ as G}from"./AppSelect.vue_vue_type_script_setup_true_lang-263668d4.js";import{$ as J}from"./api-a75dc8d8.js";import{V as W,p as X,a as Y,c as Z}from"./VPagination-f6ec3866.js";import{u as ee}from"./useApi-dfef132a.js";import{V as S}from"./VCardText-e03872ea.js";import{V as te,a as x}from"./VRow-c532c0b3.js";import{V as h,b as ae}from"./VCard-61c770c5.js";import{V as le}from"./VSpacer-ef1f5864.js";import{d as oe,r as m,d3 as se,a4 as A,m as o,o as E,c as R,b as t,e as l,b8 as d,n as c,ah as k,t as r,v as f,_ as q,q as z,a as ne}from"./index-3fd149be.js";import{V as M}from"./VDivider-28142714.js";import{V as ie}from"./VChip-259eb5bf.js";import"./VInput-f0b53b48.js";import"./VImg-358e4210.js";import"./VTextField-2ce7eec1.js";import"./VField-51408b73.js";import"./forwardRefs-6ea3df5c.js";import"./filter-63c6ab32.js";import"./VList-f267fd1b.js";import"./VAvatar-f2d95c46.js";import"./VOverlay-159aff9b.js";import"./lazy-b75e2264.js";import"./VMenu-277f5fe7.js";import"./VCheckboxBtn-cc8088ff.js";import"./VSelectionControl-28aa5ef1.js";import"./VTable-435e4ee8.js";import"./index-f220d054.js";const re={key:0},me={class:"me-3 d-flex gap-3 align-center"},de={class:"d-flex align-center flex-wrap gap-4"},ue={class:"invoice-list-filter"},pe={class:"invoice-list-filter"},ce={class:"d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"},fe={class:"text-sm text-disabled mb-0"},ve={key:1},Ke=oe({__name:"index",async setup(_e){let v,C;const _=m(""),u=m(""),g=m(""),V=m(""),s=m(10),n=m(1),D=m(),T=m(),j=i=>{var a,p;n.value=i.page,D.value=(a=i.sortBy[0])==null?void 0:a.order,T.value=(p=i.sortBy[0])==null?void 0:p.key},F=[{title:"Code",key:"code"},{title:"Tên",key:"name"},{title:"Ngày bắt đầu",key:"fromDate"},{title:"Ngày kết thúc",key:"toDate"},{title:"Trạng thái",key:"status"},{title:"Hành động",key:"actions",sortable:!1}],w=[{title:"Active",value:1},{title:"Inactive",value:0}],{data:U,execute:L}=([v,C]=se(()=>ee(Z("api/promotion/find",{query:{q:_,status:u,fromDate:g,toDate:V,itemPerPage:s,page:n.value-1,sortBy:D,orderBy:T}}))),v=await v,C(),v),B=A(()=>U.value.valueReponse.data.content),y=A(()=>U.value.valueReponse.data.totalElements),P=i=>{const a=i;if(a===1)return{color:"success",value:"active"};if(a===0)return{color:"secondary",value:"inactive"}},H=async i=>{await J(`/apps/invoice/${i}`,{method:"DELETE"}),L()};return(i,a)=>{const p=G,$=Q,K=O,I=ne("IconBtn");return o(B)?(E(),R("section",re,[t(h,{title:"Bộ lọc",class:"mb-6"},{default:l(()=>[t(S,null,{default:l(()=>[t(te,null,{default:l(()=>[t(x,{cols:"12",md:"4"},{default:l(()=>[t(p,{modelValue:o(u),"onUpdate:modelValue":a[0]||(a[0]=e=>d(u)?u.value=e:null),label:"Chọn trạng thái",placeholder:"Chọn trạng thái",clearable:"","clear-icon":"tabler-x",items:w},null,8,["modelValue"])]),_:1}),t(x,{cols:"12",md:"4"},{default:l(()=>[t($,{modelValue:o(g),"onUpdate:modelValue":a[1]||(a[1]=e=>d(g)?g.value=e:null),label:"Ngày bắt đầu","clear-icon":"tabler-x",clearable:"",placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1}),t(x,{cols:"12",md:"4"},{default:l(()=>[t($,{modelValue:o(V),"onUpdate:modelValue":a[2]||(a[2]=e=>d(V)?V.value=e:null),label:"Ngày kết thúc","clear-icon":"tabler-x",clearable:"",placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(h,{id:"invoice-list"},{default:l(()=>[t(S,{class:"d-flex align-center flex-wrap gap-4"},{default:l(()=>[c("div",me,[t(p,{"model-value":o(s),items:[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"Tất cả"}],style:{"inline-size":"8rem"},"onUpdate:modelValue":a[3]||(a[3]=e=>s.value=parseInt(e,10))},null,8,["model-value"])]),t(le),c("div",de,[c("div",ue,[t(K,{modelValue:o(_),"onUpdate:modelValue":a[4]||(a[4]=e=>d(_)?_.value=e:null),placeholder:"Tìm kiếm",density:"compact"},null,8,["modelValue"])]),c("div",pe,[t(p,{modelValue:o(u),"onUpdate:modelValue":a[5]||(a[5]=e=>d(u)?u.value=e:null),placeholder:"Chọn trạng thái",clearable:"","clear-icon":"tabler-x","single-line":"",items:w},null,8,["modelValue"])]),t(k,{"prepend-icon":"tabler-plus",to:"add"},{default:l(()=>[r(" Thêm khuyến mãi ")]),_:1})])]),_:1}),t(M),t(o(W),{"items-per-page":o(s),"onUpdate:itemsPerPage":a[7]||(a[7]=e=>d(s)?s.value=e:null),page:o(n),"onUpdate:page":a[8]||(a[8]=e=>d(n)?n.value=e:null),"items-length":o(y),items:o(B),headers:F,class:"text-no-wrap","onClick:row":a[9]||(a[9]=e=>console.log(e)),"onUpdate:options":j},{"item.code":l(({item:e})=>[r(f(e.code),1)]),"item.name":l(({item:e})=>[r(f(e.name),1)]),"item.startdate":l(({item:e})=>[r(f(e.startdate),1)]),"item.toDate":l(({item:e})=>[r(f(e.toDate),1)]),"item.status":l(({item:e})=>{var b;return[t(ie,{color:(b=P(e.status))==null?void 0:b.color,size:"small",label:"",class:"text-capitalize"},{default:l(()=>{var N;return[r(f((N=P(e.status))==null?void 0:N.value),1)]}),_:2},1032,["color"])]}),"item.actions":l(({item:e})=>[t(I,{onClick:b=>H(e.id)},{default:l(()=>[t(q,{icon:"tabler-trash"})]),_:2},1032,["onClick"]),t(I,{to:{name:"promotion-edit-id",params:{id:e.id}}},{default:l(()=>[t(q,{icon:"tabler-edit"})]),_:2},1032,["to"])]),bottom:l(()=>[t(M),c("div",ce,[c("p",fe,f(o(X)({page:o(n),itemPerPage:o(s)},o(y))),1),t(Y,{modelValue:o(n),"onUpdate:modelValue":a[6]||(a[6]=e=>d(n)?n.value=e:null),length:Math.ceil(o(y)/o(s)),"total-visible":i.$vuetify.display.xs?1:Math.ceil(o(y)/o(s))},{prev:l(e=>[t(k,z({variant:"tonal",color:"default"},e,{icon:!1}),{default:l(()=>[r(" Trước ")]),_:2},1040)]),next:l(e=>[t(k,z({variant:"tonal",color:"default"},e,{icon:!1}),{default:l(()=>[r(" Sau ")]),_:2},1040)]),_:1},8,["modelValue","length","total-visible"])])]),_:1},8,["items-per-page","page","items-length","items"])]),_:1})])):(E(),R("section",ve,[t(h,null,{default:l(()=>[t(ae,null,{default:l(()=>[r("Không tìm thấy hoá đơn!!")]),_:1})]),_:1})]))}}});export{Ke as default};