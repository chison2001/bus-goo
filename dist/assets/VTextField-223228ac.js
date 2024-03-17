import{m as H,f as J,V as K,a as L}from"./VField-23e2b48a.js";import{a as W,u as X,V as _}from"./VInput-a9fd18de.js";import{f as Y}from"./forwardRefs-6ea3df5c.js";import{a0 as Z,an as $,aw as ee,a4 as v,r as x,a8 as te,aV as ne,b as n,q as V,I as le,ar as ae,F as g,bF as ue,aQ as b,dg as ie}from"./index-8f404a99.js";import{i as oe}from"./VImg-0a711975.js";const re=["color","file","time","date","datetime-local","week","month"],se=Z({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...W(),...H()},"VTextField"),Ve=$()({name:"VTextField",directives:{Intersect:oe},inheritAttrs:!1,props:se(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,w){let{attrs:m,emit:y,slots:l}=w;const i=ee(e,"modelValue"),{isFocused:r,focus:S,blur:A}=X(e),D=v(()=>typeof e.counterValue=="function"?e.counterValue(i.value):typeof e.counterValue=="number"?e.counterValue:(i.value??"").toString().length),R=v(()=>{if(m.maxlength)return m.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter}),T=v(()=>["plain","underlined"].includes(e.variant));function p(t,a){var u,o;!e.autofocus||!t||(o=(u=a[0].target)==null?void 0:u.focus)==null||o.call(u)}const C=x(),F=x(),s=x(),B=v(()=>re.includes(e.type)||e.persistentPlaceholder||r.value||e.active);function d(){var t;s.value!==document.activeElement&&((t=s.value)==null||t.focus()),r.value||S()}function M(t){y("mousedown:control",t),t.target!==s.value&&(d(),t.preventDefault())}function N(t){d(),y("click:control",t)}function E(t){t.stopPropagation(),d(),b(()=>{i.value=null,ie(e["onClick:clear"],t)})}function O(t){var u;const a=t.target;if(i.value=a.value,(u=e.modelModifiers)!=null&&u.trim&&["text","search","password","tel","url"].includes(e.type)){const o=[a.selectionStart,a.selectionEnd];b(()=>{a.selectionStart=o[0],a.selectionEnd=o[1]})}}return te(()=>{const t=!!(l.counter||e.counter!==!1&&e.counter!=null),a=!!(t||l.details),[u,o]=ne(m),[{modelValue:ce,...U}]=_.filterProps(e),[j]=J(e);return n(_,V({ref:C,modelValue:i.value,"onUpdate:modelValue":c=>i.value=c,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--plain-underlined":["plain","underlined"].includes(e.variant)},e.class],style:e.style},u,U,{centerAffix:!T.value,focused:r.value}),{...l,default:c=>{let{id:f,isDisabled:h,isDirty:k,isReadonly:q,isValid:z}=c;return n(K,V({ref:F,onMousedown:M,onClick:N,"onClick:clear":E,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},j,{id:f.value,active:B.value||k.value,dirty:k.value||e.dirty,disabled:h.value,focused:r.value,error:z.value===!1}),{...l,default:Q=>{let{props:{class:P,...G}}=Q;const I=le(n("input",V({ref:s,value:i.value,onInput:O,autofocus:e.autofocus,readonly:q.value,disabled:h.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:d,onBlur:A},G,o),null),[[ae("intersect"),{handler:p},null,{once:!0}]]);return n(g,null,[e.prefix&&n("span",{class:"v-text-field__prefix"},[n("span",{class:"v-text-field__prefix__text"},[e.prefix])]),l.default?n("div",{class:P,"data-no-activator":""},[l.default(),I]):ue(I,{class:P}),e.suffix&&n("span",{class:"v-text-field__suffix"},[n("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:a?c=>{var f;return n(g,null,[(f=l.details)==null?void 0:f.call(l,c),t&&n(g,null,[n("span",null,null),n(L,{active:e.persistentCounter||r.value,value:D.value,max:R.value},l.counter)])])}:void 0})}),Y({},C,F,s)}});export{Ve as V,se as m};
