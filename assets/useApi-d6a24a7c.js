import{d$ as c,bg as o,e0 as n}from"./index-8f404a99.js";const l=c({baseUrl:"http://localhost:8080/",fetchOptions:{headers:{Accept:"application/json"}},options:{refetch:!0,async beforeFetch({options:e}){const r=o("accessToken").value;return r&&(e.headers={...e.headers,Authorization:`Bearer ${r}`}),{options:e}},afterFetch(e){const{data:r,response:a}=e;let t=null;try{t=n(r)}catch(s){console.error(s)}return{data:t,response:a}}}});export{l as u};