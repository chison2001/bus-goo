import{d as R,a as E,o as x,f as A,e as l,b as a,_ as q,y as Y,r,a4 as y,d3 as Z,m as o,c as L,b8 as d,n as f,ah as C,t as m,v as _,q as M}from"./index-e6b68dc9.js";import{V as ee}from"./VMenu-cba0e6b4.js";import{V as te}from"./VList-0391a593.js";import{_ as ae}from"./AppTextField.vue_vue_type_script_setup_true_lang-085f07cd.js";import{_ as le}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-75524abd.js";import{_ as oe}from"./AppSelect.vue_vue_type_script_setup_true_lang-82cb8ff5.js";import{V as ne,p as se,a as ie,c as re}from"./VPagination-cfec1eb1.js";import{u as de}from"./useApi-92ebb378.js";import{V as S}from"./VCardText-a3dfbb70.js";import{V as me,a as w}from"./VRow-4991ca3a.js";import{V as B,b as ce}from"./VCard-0f8dbb07.js";import{V as ue}from"./VSpacer-f44f5fc8.js";import{V as $}from"./VDivider-f42352cb.js";import{V as pe}from"./VChip-08f601ae.js";import"./VOverlay-12f580cc.js";import"./forwardRefs-6ea3df5c.js";import"./lazy-386fe9ed.js";import"./VImg-b249bafb.js";import"./VAvatar-0522e8de.js";import"./VInput-631c3315.js";import"./VTextField-c3064460.js";import"./VField-8d5b2183.js";import"./filter-c6306e46.js";import"./VCheckboxBtn-d95a6a9f.js";import"./VSelectionControl-29ce846d.js";import"./VTable-22554b1a.js";import"./index-f220d054.js";const ve=R({__name:"MoreBtn",props:{menuList:{},itemProps:{type:Boolean}},setup(D){const c=D;return(h,g)=>{const u=E("IconBtn");return x(),A(u,{density:"compact",color:"disabled"},{default:l(()=>[a(q,{icon:"tabler-dots-vertical"}),c.menuList?(x(),A(ee,{key:0,activator:"parent"},{default:l(()=>[a(te,{items:c.menuList,"item-props":c.itemProps},null,8,["items","item-props"])]),_:1})):Y("",!0)]),_:1})}}}),fe={key:0},_e={class:"me-3 d-flex gap-3 align-center"},ge={class:"d-flex align-center flex-wrap gap-4"},Ve={class:"invoice-list-filter"},ye={class:"invoice-list-filter"},be={class:"d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"},xe={class:"text-sm text-disabled mb-0"},he={key:1},Xe=R({__name:"index",async setup(D){let c,h;const g=r(""),u=r(""),V=r(""),p=r(null),k=r([]),s=r(10),i=r(1),I=r(),U=r(),z=n=>{var t,v;i.value=n.page,I.value=(t=n.sortBy[0])==null?void 0:t.key,U.value=(v=n.sortBy[0])==null?void 0:v.order},j=[{title:"Mã",key:"id"},{title:"Người đặt",key:"client.fullName"},{title:"Ngày đặt",key:"orderDate"},{title:"Ngày khởi hành",key:"startDate"},{title:"Tổng tiền",key:"total"},{title:"Trạng thái",key:"status"},{title:"Hành động",key:"actions",sortable:!1}],O=y(()=>{const[n,t]=u.value?u.value.split("to"):"";return{start:n,end:t}}),F=y(()=>{const[n,t]=V.value?V.value.split("to"):"";return{start:n,end:t}}),{data:P,execute:H}=([c,h]=Z(()=>de(re("/apps/invoice",{query:{q:g,status:p,selectedOrderDateRange:O,selectedStartDateRange:F,itemsPerPage:s,page:i,sortBy:I,orderBy:U}}))),c=await c,h(),c),T=y(()=>P.value.invoices),b=y(()=>P.value.totalInvoices),K=n=>{const t=n.toLowerCase();return t==="active"?"success":t==="inactive"?"secondary":"primary"},Q=y(()=>n=>[{title:"Download",value:"download",prependIcon:"tabler-download"},{title:"Edit",value:"edit",prependIcon:"tabler-pencil",to:{name:"apps-invoice-edit-id",params:{id:n}}}]),G=async n=>{await $api(`/apps/invoice/${n}`,{method:"DELETE"}),H()};return(n,t)=>{const v=oe,N=le,J=ae,W=E("IconBtn"),X=ve;return o(T)?(x(),L("section",fe,[a(B,{title:"Bộ lọc",class:"mb-6"},{default:l(()=>[a(S,null,{default:l(()=>[a(me,null,{default:l(()=>[a(w,{cols:"12",md:"4"},{default:l(()=>[a(v,{modelValue:o(p),"onUpdate:modelValue":t[0]||(t[0]=e=>d(p)?p.value=e:null),label:"Chọn trạng thái",placeholder:"Chọn trạng thái",clearable:"","clear-icon":"tabler-x",items:["Active","Inactive"]},null,8,["modelValue"])]),_:1}),a(w,{cols:"12",md:"4"},{default:l(()=>[a(N,{modelValue:o(u),"onUpdate:modelValue":t[1]||(t[1]=e=>d(u)?u.value=e:null),label:"Ngày đặt","clear-icon":"tabler-x",clearable:"",config:{mode:"range"},placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1}),a(w,{cols:"12",md:"4"},{default:l(()=>[a(N,{modelValue:o(V),"onUpdate:modelValue":t[2]||(t[2]=e=>d(V)?V.value=e:null),label:"Ngày khởi hành","clear-icon":"tabler-x",clearable:"",config:{mode:"range"},placeholder:"Chọn ngày"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),a(B,{id:"invoice-list"},{default:l(()=>[a(S,{class:"d-flex align-center flex-wrap gap-4"},{default:l(()=>[f("div",_e,[a(v,{"model-value":o(s),items:[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"All"}],style:{"inline-size":"6.25rem"},"onUpdate:modelValue":t[3]||(t[3]=e=>s.value=parseInt(e,10))},null,8,["model-value"])]),a(ue),f("div",ge,[f("div",Ve,[a(J,{modelValue:o(g),"onUpdate:modelValue":t[4]||(t[4]=e=>d(g)?g.value=e:null),placeholder:"Tìm kiếm",density:"compact"},null,8,["modelValue"])]),f("div",ye,[a(v,{modelValue:o(p),"onUpdate:modelValue":t[5]||(t[5]=e=>d(p)?p.value=e:null),placeholder:"Chọn trạng thái",clearable:"","clear-icon":"tabler-x","single-line":"",items:["Active","Inactive"]},null,8,["modelValue"])]),a(C,{"prepend-icon":"tabler-plus",to:{name:"reservation-add"}},{default:l(()=>[m(" Đặt vé ")]),_:1})])]),_:1}),a($),a(o(ne),{modelValue:o(k),"onUpdate:modelValue":t[7]||(t[7]=e=>d(k)?k.value=e:null),"items-per-page":o(s),"onUpdate:itemsPerPage":t[8]||(t[8]=e=>d(s)?s.value=e:null),page:o(i),"onUpdate:page":t[9]||(t[9]=e=>d(i)?i.value=e:null),"items-length":o(b),headers:j,items:o(T),class:"text-no-wrap","onClick:row":t[10]||(t[10]=e=>console.log(e)),"onUpdate:options":z},{"item.id":l(({item:e})=>[m(_(e.id),1)]),"item.total":l(({item:e})=>[m(_(e.total)+" vnd ",1)]),"item.orderDate":l(({item:e})=>[m(_(e.orderDate),1)]),"item.startdate":l(({item:e})=>[m(_(e.startdate),1)]),"item.status":l(({item:e})=>[a(pe,{color:K(e.status),size:"small",label:"",class:"text-capitalize"},{default:l(()=>[m(_(e.status),1)]),_:2},1032,["color"])]),"item.actions":l(({item:e})=>[a(W,{onClick:ke=>G(e.id)},{default:l(()=>[a(q,{icon:"tabler-trash"})]),_:2},1032,["onClick"]),a(X,{"menu-list":o(Q)(e.id),"item-props":"",color:"undefined"},null,8,["menu-list"])]),bottom:l(()=>[a($),f("div",be,[f("p",xe,_(o(se)({page:o(i),itemsPerPage:o(s)},o(b))),1),a(ie,{modelValue:o(i),"onUpdate:modelValue":t[6]||(t[6]=e=>d(i)?i.value=e:null),length:Math.ceil(o(b)/o(s)),"total-visible":n.$vuetify.display.xs?1:Math.ceil(o(b)/o(s))},{prev:l(e=>[a(C,M({variant:"tonal",color:"default"},e,{icon:!1}),{default:l(()=>[m(" Trước ")]),_:2},1040)]),next:l(e=>[a(C,M({variant:"tonal",color:"default"},e,{icon:!1}),{default:l(()=>[m(" Sau ")]),_:2},1040)]),_:1},8,["modelValue","length","total-visible"])])]),_:1},8,["modelValue","items-per-page","page","items-length","items"])]),_:1})])):(x(),L("section",he,[a(B,null,{default:l(()=>[a(ce,null,{default:l(()=>[m("Không tìm thấy hoá đơn!!")]),_:1})]),_:1})]))}}});export{Xe as default};
