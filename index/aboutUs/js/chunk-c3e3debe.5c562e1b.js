(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3e3debe"],{2636:function(e,t,s){"use strict";var a=s("c5fc"),r=s.n(a);r.a},"8e14":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"p-20 container-main"},[s("el-steps",{attrs:{active:1,"finish-status":"success"}},[s("el-step",{attrs:{title:e.$t("checkOrder_yhfk")}}),s("el-step",{attrs:{title:e.$t("checkOrder_ddsh")}}),s("el-step",{attrs:{title:e.$t("checkOrder_ckbg")}}),s("el-step",{attrs:{title:e.$t("checkOrder_pjfk")}})],1),s("div",[s("div",{staticClass:"bg-grey p-15 fs-16 fw-700"},[e._v(e._s(e.$t("checkOrder_txbhd")))]),s("el-table",{staticStyle:{width:"100%"},attrs:{"highlight-current-row":"",data:e.gridData}},[s("el-table-column",{attrs:{prop:"inspect_time",label:e.$t("checkOrder_yhrq")}}),s("el-table-column",{attrs:{property:"province",label:e.$t("checkOrder_yhdz")},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.country+(null===t.row.province?"":t.row.province)+(t.row.province==t.row.city?"":t.row.city)+t.row.insp_address))]}}])}),s("el-table-column",{attrs:{property:"products",label:e.$t("checkOrder_cpmc")},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.products?t.row.products.map((function(e){return e.product_name})).join(","):""))]}}])}),s("el-table-column",{attrs:{property:"type",label:e.$t("checkOrder_yhlx")},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.typeObj[t.row.type]))]}}])}),s("el-table-column",{attrs:{label:e.$t("checkOrder_yhrs")},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-input-number",{attrs:{min:1,max:10},on:{change:e.handleChange},model:{value:e.numPerson,callback:function(t){e.numPerson=t},expression:"numPerson"}})]}}])}),s("el-table-column",{attrs:{label:e.$t("checkOrder_yhts")},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-input-number",{attrs:{min:1,max:10},on:{change:e.handleChange},model:{value:e.numDay,callback:function(t){e.numDay=t},expression:"numDay"}})]}}])}),s("el-table-column",{attrs:{property:"insp_fee",label:e.$t("checkOrder_yhfy")},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.user_account?s("span",[e._v("￥ "+e._s(t.row.insp_fee.insp_fee))]):2==t.row.user_account?s("span",[e._v("$ "+e._s(t.row.insp_fee))]):e._e()]}}])}),s("el-table-column",{attrs:{property:"address",label:e.$t("checkOrder_xj"),width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.littleTotal))]}}])})],1),s("div",{staticClass:"bg-grey p-20",staticStyle:{overflow:"hidden"}},[s("div",{staticClass:"pull-left"},[s("div",{staticClass:"fs-16 text-yellow p-b-10"},[e._v(e._s(e.$t("checkOrder_wxtx"))+": "),s("span",{staticClass:"fs-14 text-grey",staticStyle:{"line-height":"18px"}},[e._v(" "+e._s(e.$t("checkOrder_JEDJ"))),s("span",{staticClass:"text-yellow"},[e._v("n")]),e._v(e._s(e.$t("checkOrder_XDYH"))+" ")])])]),s("div",{staticClass:"pull-right text-right"},[s("p",{staticClass:"m-b-15"},[e._v(" "+e._s(e.$t("checkOrder_yhyclf"))+" "),s("span",{staticClass:"text-red"},[e._v(" "+e._s(e.yhyFee)+" ")]),s("i",{staticClass:"cursor-pointer",class:e.showYhyFee?"el-icon-caret-bottom":"el-icon-caret-left",on:{click:function(t){e.showYhyFee=!e.showYhyFee}}})]),e.showYhyFee?s("p",{staticClass:"fs-14",staticStyle:{margin:"8px 0"}},[e._v(" "+e._s(e.$t("clfybt"))),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.gridData[0].expenses?1==e.gridData[0].user_account?e.gridData[0].expenses.fee:e.gridData[0].expenses.us_fee:0))]),e._v(" * ("+e._s(e.$t("user_Index_TIAN"))+") "),s("span",{staticClass:"text-yellow"},[e._v(e._s(e.numPerson))]),e._v(" * ("+e._s(e.$t("user_Index_REN"))+") "),s("span",{staticClass:"text-yellow"},[e._v(e._s(e.numDay))]),e._v("= "),s("span",{staticClass:"text-yellow"},[e._v(e._s(e.yhyFee))])]):e._e(),s("p"),s("div",{staticClass:"m-b-15"},[e._v(" "+e._s(e.$t("checkOrder_ptyhje"))+" "),s("span",{staticClass:"text-red"},[e._v(e._s(1==e.gridData[0].user_account?"￥":"$")+e._s(e.yhMoney))]),s("i",{staticClass:"cursor-pointer",class:e.showYhFee?"el-icon-caret-bottom":"el-icon-caret-left",on:{click:function(t){e.showYhFee=!e.showYhFee}}}),e.showYhFee?s("p",{staticClass:"fs-14",staticStyle:{margin:"8px 0"}},[s("span",{staticClass:"text-yellow fs-15"},[e._v(e._s(e.allTotal))]),e._v("("+e._s(e.$t("DDJE"))+") X "),s("span",{staticClass:"text-yellow fs-15"},[e._v(e._s(e.gridData[0].grade)+"%")]),e._v(" ("+e._s(e.$t("YHDJ"))+") + "),s("span",{staticClass:"text-yellow fs-15"},[e._v("$"+e._s(e.djqData?e.djqData.money:0))]),e._v("("+e._s(e.$t("YHQ"))+") = "),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.yhMoney))])]):e._e()]),s("div",{staticClass:"m-b-15"},[e._v(" "+e._s(e.$t("qtfyzjx"))+" "),s("span",{staticClass:"text-red"},[e._v(e._s(1==e.gridData[0].user_account?"￥":"$")+e._s(e.QtMoney))]),s("i",{staticClass:"cursor-pointer",class:e.showQtFee?"el-icon-caret-bottom":"el-icon-caret-left",on:{click:function(t){e.showQtFee=!e.showQtFee}}}),e.showQtFee?s("div",{staticClass:"fs-14",staticStyle:{margin:"8px 0"}},[e.gridData[0].orders_cost.difference?s("p",{staticStyle:{margin:"5px 0"}},[e._v(e._s(e.$t("user_Index_CE"))+"："),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.gridData[0].orders_cost.difference))])]):e._e(),e.gridData[0].orders_cost.travel_expense?s("p",{staticStyle:{margin:"5px 0"}},[e._v(e._s(e.$t("user_Index_CLF"))+"："),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.gridData[0].orders_cost.travel_expense))])]):e._e(),e.gridData[0].orders_cost.overtime_pay?s("p",{staticStyle:{margin:"5px 0"}},[e._v(e._s(e.$t("user_Index_JBF"))+"："),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.gridData[0].orders_cost.overtime_pay))])]):e._e()]):e._e()]),s("p",{staticClass:"fs-18 fw-600"},[e._v(" "+e._s(e.$t("checkOrder_sfje"))+" "),s("span",{staticClass:"text-red"},[e._v(e._s(1==e.gridData[0].user_account?"￥":"$")+e._s(e.realPay))]),s("i",{staticClass:"cursor-pointer",class:e.showsfFee?"el-icon-caret-bottom":"el-icon-caret-left",on:{click:function(t){e.showsfFee=!e.showsfFee}}})]),e.showsfFee?s("p",{staticClass:"fs-14",staticStyle:{margin:"8px 0"}},[e._v(" ("+e._s(e.$t("ZJE"))+") "),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.allTotal))]),e._v(" - ("+e._s(e.$t("user_Index_YHJE"))+")"),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.yhMoney))]),e._v(" + "+e._s(e.$("qtfy"))+" "),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.QtMoney))]),e._v("= "),s("span",{staticClass:"text-yellow"},[e._v("$"+e._s(e.realPay))])]):e._e(),s("p")])]),s("div",{staticClass:"p-30",staticStyle:{"margin-top":"20px",overflow:"hidden",background:"#fff4f2",border:"1px solid #fa7202"}},[s("div",{staticClass:"pull-right"},[s("p",{staticClass:"d-inline-block fs-22 fw-700 m-r-10"},[e._v(" "+e._s(e.$t("checkOrder_sfje"))+" "),s("span",{staticClass:"text-red"},[e._v(e._s(1==e.gridData[0].user_account?"￥":"$")+e._s(e.realPay))])]),s("el-button",{staticClass:"m-r-10",attrs:{type:"primary",size:"large"},on:{click:e.submit}},[e._v(e._s(e.$t("checkOrder_tjdd")))]),s("el-button",{attrs:{type:"text"},on:{click:function(t){return e.$router.push({path:"/index/wantOrder",query:{id:e.$route.query.id}})}}},[e._v(e._s(e.$t("checkOrder_fhsyy")))])],1)])],1),s("pay",{attrs:{showpay:e.payShow,showData:e.showData},on:{reload:e.reload,upPay:e.upPay}})],1)},r=[],n=(s("ea69"),s("513c"),s("20a5"),s("fb16")),i=(s("6a61"),s("457c")),c=s("5a05"),o=s("d56e"),l={data:function(){return{gridData:[{user_account:"",expenses:{},grade:1}],payShow:!1,showYhFee:!1,showQtFee:!1,showYhyFee:!1,showsfFee:!1,showData:{accounts:{amount_type:"1"},users:{quotas:{quota:"加载中"}},price:"加载中"},dialogTableVisible:!0,typeObj:{1:this.$t("user_Index_CJ"),2:this.$t("user_Index_QJ"),3:this.$t("user_Index_ZXJY"),4:this.$t("user_Index_YC"),5:this.$t("user_Index_JG"),6:this.$t("user_Index_YH+JG")},numPerson:1,numDay:1,djqData:{}}},computed:{QtMoney:function(){try{var e=0;return e=Number(this.gridData[0].orders_cost.difference)+Number(this.gridData[0].orders_cost.travel_expense)+Number(this.gridData[0].orders_cost.overtime_pay),Number(e).toFixed(2)}catch(t){}},yhyFee:function(){var e=0,t="￥";return 1==this.gridData[0].user_account?(e=this.gridData[0].expenses?this.gridData[0].expenses.fee:0,t="￥"):2==this.gridData[0].user_account&&(e=this.gridData[0].expenses?this.gridData[0].expenses.us_fee:0,t="$"),t+Number(Number(e)*this.numPerson*this.numDay).toFixed(2)},realPay:function(){var e="";return e=this.allTotal-this.yhMoney+Number(this.QtMoney),Number(e).toFixed(2)},littleTotal:function(){var e="",t="￥";return 1==this.gridData[0].user_account?(e=this.gridData[0].insp_fee?this.gridData[0].insp_fee.insp_fee:0,t="￥"):2==this.gridData[0].user_account&&(e=this.gridData[0].insp_fee?this.gridData[0].insp_fee:0,t="$"),t+Number(Number(e)*this.numPerson*this.numDay).toFixed(2)},allTotal:function(){var e="",t="";return 1==this.gridData[0].user_account?(e=this.gridData[0].expenses?this.gridData[0].expenses.fee:0,t=this.gridData[0].insp_fee?this.gridData[0].insp_fee.insp_fee:0):2==this.gridData[0].user_account&&(e=this.gridData[0].expenses?this.gridData[0].expenses.us_fee:0,t=this.gridData[0].insp_fee?this.gridData[0].insp_fee:0),Number((Number(e)+Number(t))*this.numPerson*this.numDay).toFixed(2)},yhMoney:function(){var e="";return this.gridData[0]&&(e=this.allTotal*this.gridData[0].grade*.01),e=this.djqData?Number(Number(e).toFixed(2))+Number(Number(this.djqData.money).toFixed(2)):Number(e).toFixed(2),e}},components:{pay:o["a"]},created:function(){},methods:{reload:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.submit();case 1:case"end":return t.stop()}}),t)})))()},upPay:function(e){this.payShow=e},coupon:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["l"])();case 2:s=t.sent,a=s.data,r=a.data,a.code,e.djqData=r;case 5:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a,r,i,o,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s={order_id:e.$route.query.id,insp_number:e.numPerson,insp_day:e.numDay,coupon_id:e.djqData.id,insp_fee:e.gridData[0].insp_fee},t.next=3,Object(c["y"])(s);case 3:if(a=t.sent,r=a.data,r.data,i=r.code,200!=i){t.next=12;break}return e.payShow=!0,t.next=9,Object(c["k"])({order_id:e.$route.query.id});case 9:o=t.sent,l=o.data,u=l.data,l.code,e.showData=Object(n["a"])({realPay:e.realPay},u);case 12:case"end":return t.stop()}}),t)})))()},handleChange:function(e){},getTableList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.gridData=[{user_account:"",expenses:{}}],t.next=3,Object(c["j"])({order_id:e.$route.query.id});case 3:s=t.sent,a=s.data,r=a.data,a.code,e.gridData.splice(0,1,r),e.numPerson=e.gridData[0].insp_number,e.numDay=e.gridData[0].insp_day;case 8:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.getTableList(),this.coupon();var e=this.$route.query.handle;e&&localStorage.setItem("handle",e)}},u=l,_=(s("2636"),s("9ca4")),d=Object(_["a"])(u,a,r,!1,null,"64b257e2",null);t["default"]=d.exports},c5fc:function(e,t,s){}}]);