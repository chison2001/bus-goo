import{d$ as c,bg as o,e0 as n}from"./index-e5a9fd81.js";const l=c({baseUrl:"http://localhost:8080/",fetchOptions:{headers:{Accept:"application/json"}},options:{refetch:!0,async beforeFetch({options:e}){const t=o("accessToken").value;return t&&(e.headers={...e.headers,Authorization:`Bearer ${t}`}),{options:e}},afterFetch(e){const{data:t,response:r}=e;let a=null;try{a=n(t)}catch(s){console.log(s)}return{data:a,response:r}}}});export{l as u};
