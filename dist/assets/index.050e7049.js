import{_ as p,d as u,u as h,r as m,o as r,c,a as l,b as f,w as v,t as g,H as y}from"./index.0b1ad4d3.js";const k=u({setup(){const e={children:"children",label:"path"},o=h();console.log(o);const t=o.options.routes;return console.log(t),{routes:t,defaultProps:e,show:(a,n)=>{console.log(a.data.meta.title),console.log(n)}}}}),C={class:"layout-container"},$={class:"box"},w=["onClick"],x={key:0};function b(e,o,t,d,a,n){const i=m("el-tree");return r(),c("div",C,[l("div",$,[f(i,{ref:"tree",class:"my-tree",data:e.routes,props:e.defaultProps,"node-key":"id","highlight-current":"","default-expand-all":""},{default:v(({node:_,data:s})=>[l("div",{class:"custom-tree-node",onClick:B=>e.show(_,s)},[s.meta?(r(),c("span",x,g(e.$t(s.meta.title)),1)):y("",!0)],8,w)]),_:1},8,["data","props"])])])}var V=p(k,[["render",b],["__scopeId","data-v-6be004a7"]]);export{V as default};
