(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{418:function(e){e.exports=JSON.parse("{}")},628:function(e,t,n){},651:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(28),i=n.n(r),s=n(234),o=n(15),l=n(16),u=n(31),h=n(17),j=n(19),d=n(659),p=n(132),b=n(49),O=n(6),m=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsxs)(b.d,{type:"dark",bg:"dark",theme:"primary",expand:"md",children:[Object(O.jsxs)(b.e,{href:"/Flights#/",children:[Object(O.jsx)("svg",{id:"FlightIcon","enable-background":"new 0 0 512 512",height:"30",viewBox:"0 0 512 512",width:"40",xmlns:"http://www.w3.org/2000/svg",children:Object(O.jsx)("g",{children:Object(O.jsx)("g",{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#FF8A65",stroke:"#FF5722",children:Object(O.jsx)("path",{d:"M2230 5104 c-996 -127 -1833 -835 -2123 -1794 -78 -256 -107 -462\r\n-107 -750 0 -491 116 -914 363 -1325 404 -672 1099 -1123 1877 -1220 162 -20\r\n478 -20 640 0 1001 124 1842 831 2133 1795 78 256 107 462 107 750 0 491 -116\r\n914 -363 1325 -404 672 -1099 1123 -1877 1220 -153 19 -501 18 -650 -1z m388\r\n-996 c17 -40 39 -103 50 -139 44 -142 82 -456 82 -668 l0 -96 193 -182 192\r\n-181 26 24 c68 65 182 46 224 -37 9 -16 19 -78 24 -140 6 -70 14 -116 23 -124\r\n7 -6 137 -127 289 -268 l276 -257 7 -106 c4 -58 6 -108 3 -110 -2 -2 -286 134\r\n-631 302 -346 168 -629 304 -631 302 -1 -2 -19 -223 -39 -493 -20 -269 -38\r\n-501 -40 -515 -4 -22 20 -45 200 -189 140 -114 203 -170 200 -180 -3 -9 -8\r\n-37 -12 -64 -3 -26 -7 -47 -8 -47 -1 0 -96 32 -211 70 -275 92 -273 92 -556 4\r\n-117 -36 -219 -69 -227 -71 -11 -5 -12 6 -6 58 3 35 10 71 15 79 4 8 95 80\r\n203 160 156 116 194 149 191 165 -2 11 -17 240 -32 508 -27 478 -28 488 -48\r\n484 -11 -3 -296 -127 -634 -276 -338 -149 -616 -270 -618 -267 -2 2 2 46 9 97\r\nl13 94 280 264 280 264 -3 116 c-4 108 -2 118 20 151 15 21 41 42 70 54 41 17\r\n53 18 87 8 21 -7 52 -26 69 -43 l31 -31 199 186 199 186 6 159 c12 300 64 548\r\n159 753 17 37 34 68 39 68 4 0 21 -33 37 -72z"})})})}),"FlightFinder"]}),Object(O.jsxs)(b.a,{navbar:!0,className:"container-fluid",children:[Object(O.jsx)(b.b,{children:Object(O.jsx)(b.c,{active:!0,href:"/Flights/#/alliances",children:"Alliances"})}),Object(O.jsx)(b.b,{children:Object(O.jsx)(b.c,{active:!0,href:"/Flights/#/airports",children:"Airports"})}),Object(O.jsx)(b.b,{children:Object(O.jsx)(b.c,{active:!0,href:"/Flights/#/routeSearch",children:"Search"})}),Object(O.jsx)(b.b,{className:"ml-auto",children:Object(O.jsx)(b.c,{active:!0,href:"#",children:"CIS 550 Project"})})]})]})}}]),n}(c.a.Component),f=m,x=n(26),g=n.n(x),v=n(44),y=(n(418),"https://api.flights-550.net"),w=function(){var e=Object(v.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.flights-550.net/alliances/",{method:"GET"});case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(v.a)(g.a.mark((function e(t,n,a){var c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"/alliances/").concat(t,"/airlines?page_size=").concat(n,"&page=").concat(a,"/"),{method:"GET"});case 2:return c=e.sent,e.abrupt("return",c.json());case 4:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),C=function(){var e=Object(v.a)(g.a.mark((function e(t){var n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"/alliances/").concat(t,"/airports"),{method:"GET"});case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(v.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"/countries/?name_query=").concat(t),{method:"GET"});case 2:return e.sent,e.abrupt("return",new Promise((function(e,n){fetch("".concat(y,"/countries/?name_query=").concat(t)).then((function(e){return e.json()})).then((function(t){e(t.map((function(e){var t=e.name;return{value:e.iso_code,label:t}})))})).catch(n)})));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(v.a)(g.a.mark((function e(t,n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"/airports/").concat(t,"?query=").concat(n),{method:"GET"});case 2:return e.sent,e.abrupt("return",new Promise((function(e,a){fetch("".concat(y,"/airports/").concat(t,"?query=").concat(n)).then((function(e){return e.json()})).then((function(t){e(t.map((function(e){return{value:e.id,label:e.name}})))})).catch(a)})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=Object(v.a)(g.a.mark((function e(t){var n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.flights-550.net/countries/".concat(t),{method:"GET"});case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(v.a)(g.a.mark((function e(t){var n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.flights-550.net/landmarks/?country_code=".concat(t),{method:"GET"});case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(v.a)(g.a.mark((function e(t,n){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(y,"/airports/?page_size=").concat(n,"&page=").concat(t),{method:"GET"});case 2:return a=e.sent,e.abrupt("return",a.json());case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),z=(d.a.Column,d.a.ColumnGroup,p.a.Option,function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={alliances:[],matchesResults:[],matchesPageNumber:1,matchesPageSize:10,playersResults:[],pagination:null},a.leagueOnChange=a.leagueOnChange.bind(Object(u.a)(a)),a.goToMatch=a.goToMatch.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"goToMatch",value:function(e){window.location="/matches?id=".concat(e)}},{key:"leagueOnChange",value:function(e){var t=this;w().then((function(e){t.setState({alliances:e})}))}},{key:"componentDidMount",value:function(){var e=this;w().then((function(t){e.setState({alliances:t})}))}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsx)("div",{class:"d-flex justify-content-center",children:Object(O.jsxs)("div",{class:"d-flex-column",children:[Object(O.jsx)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:Object(O.jsx)("svg",{id:"FlightIcon","enable-background":"new 0 0 512 512",height:"200",viewBox:"0 0 512 512",width:"200",xmlns:"http://www.w3.org/2000/svg",children:Object(O.jsx)("g",{children:Object(O.jsx)("g",{transform:"translate(0.000000,512.000000) scale(0.100000,-0.100000)",fill:"#FF8A65",stroke:"#FF5722",children:Object(O.jsx)("path",{d:"M2230 5104 c-996 -127 -1833 -835 -2123 -1794 -78 -256 -107 -462\n-107 -750 0 -491 116 -914 363 -1325 404 -672 1099 -1123 1877 -1220 162 -20\n478 -20 640 0 1001 124 1842 831 2133 1795 78 256 107 462 107 750 0 491 -116\n914 -363 1325 -404 672 -1099 1123 -1877 1220 -153 19 -501 18 -650 -1z m388\n-996 c17 -40 39 -103 50 -139 44 -142 82 -456 82 -668 l0 -96 193 -182 192\n-181 26 24 c68 65 182 46 224 -37 9 -16 19 -78 24 -140 6 -70 14 -116 23 -124\n7 -6 137 -127 289 -268 l276 -257 7 -106 c4 -58 6 -108 3 -110 -2 -2 -286 134\n-631 302 -346 168 -629 304 -631 302 -1 -2 -19 -223 -39 -493 -20 -269 -38\n-501 -40 -515 -4 -22 20 -45 200 -189 140 -114 203 -170 200 -180 -3 -9 -8\n-37 -12 -64 -3 -26 -7 -47 -8 -47 -1 0 -96 32 -211 70 -275 92 -273 92 -556 4\n-117 -36 -219 -69 -227 -71 -11 -5 -12 6 -6 58 3 35 10 71 15 79 4 8 95 80\n203 160 156 116 194 149 191 165 -2 11 -17 240 -32 508 -27 478 -28 488 -48\n484 -11 -3 -296 -127 -634 -276 -338 -149 -616 -270 -618 -267 -2 2 2 46 9 97\nl13 94 280 264 280 264 -3 116 c-4 108 -2 118 20 151 15 21 41 42 70 54 41 17\n53 18 87 8 21 -7 52 -26 69 -43 l31 -31 199 186 199 186 6 159 c12 300 64 548\n159 753 17 37 34 68 39 68 4 0 21 -33 37 -72z"})})})})}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Welcome to FlightFinder"}),"There are XX flights, XX planes, XX alliances, XX landmarks available for perusal."]}),Object(O.jsx)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:Object(O.jsx)("a",{href:"https://api.flights-550.net/api/index.html",target:"_blank",class:"btn btn-primary btn-lg",role:"button","aria-pressed":"true",children:"See Auto-Generated API Documentation"})})]})})]})}}]),n}(c.a.Component)),G=(n(650),n(661)),F=(Object(G.a)(".3r"),function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{children:Object(O.jsx)("h1",{children:" Player "})})}}]),n}(c.a.Component)),M=F,P=n(660),E=n(180),J=(d.a.Column,d.a.ColumnGroup,p.a.Option,[{title:"Country",dataIndex:"country",key:"country",render:function(e){return Object(O.jsxs)("div",{children:[Object(O.jsx)(E.a,{countryCode:e})," ",e]})},sorter:function(e,t){return e.country.localeCompare(t.country)}},{title:"IATA",dataIndex:"iata",key:"iata"},{title:"ICAO",dataIndex:"icao",key:"icao"},{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.localeCompare(t.name)}},{title:"City",dataIndex:"city",key:"city"},,]);function Q(){alert("Celsius is wrong!")}var R=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={airports:[],matchesResults:[],matchesPageNumber:1,matchesPageSize:10,playersResults:[],pagination:null,tempHighQuery:-20,tempLowQuery:45},a.leagueOnChange=a.leagueOnChange.bind(Object(u.a)(a)),a.goToAirport=a.goToAirport.bind(Object(u.a)(a)),a.handleTemperatureChange=a.handleTemperatureChange.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"goToAirport",value:function(e,t,n,a){window.location="#/airport?id=".concat(e,"&iata=").concat(t,"&country=").concat(n,"&iso=").concat(a)}},{key:"handleTemperatureChange",value:function(e){this.setState({tempLowQuery:e[0]}),this.setState({tempHighQuery:e[1]})}},{key:"leagueOnChange",value:function(e){var t=this;N().then((function(e){t.setState({airports:e})}))}},{key:"componentDidMount",value:function(){var e=this;N(1,1e5).then((function(t){e.setState({airports:t})}))}},{key:"render",value:function(){var e=this;return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Airports"}),Object(O.jsx)(d.a,{onRow:function(t,n){return{onClick:function(n){e.goToAirport(t.name,t.iata,t.country,t.iso)}}},dataSource:this.state.airports,columns:J,pagination:{pageSizeOptions:[5,10],defaultPageSize:5,showQuickJumper:!0}})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("br",{}),Object(O.jsx)("label",{class:"d-flex justify-content-center",children:"Temperature (\xb0C)"}),Object(O.jsx)(P.a,{range:!0,defaultValue:[-20,45],onChange:this.handleTemperatureChange,style:{width:"50vw",margin:"0 auto"},min:-20,max:45}),Object(O.jsx)("br",{}),Object(O.jsx)("button",{style:{justifyContent:"center"},onClick:Q,children:"Apply"})]})]})}}]),n}(c.a.Component),D=(n(489),n(490),n(491),d.a.Column,d.a.ColumnGroup,c.a.Component,n(33)),L={color:"white"},X=(c.a.Component,d.a.Column,d.a.ColumnGroup,p.a.Option,[{dataIndex:"image",key:"Image",render:function(e){return Object(O.jsx)("img",{alt:e,height:"100",src:e})}},{title:"Name",dataIndex:"name",key:"Name"},{title:"ID",dataIndex:"id",key:"id"}]),_=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={alliances:[]},a.goToAlliance=a.goToAlliance.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"goToAlliance",value:function(e){window.location="#/alliance?id=".concat(e)}},{key:"leagueOnChange",value:function(e){var t=this;w().then((function(e){t.setState({alliances:e})}))}},{key:"componentDidMount",value:function(){var e=this;w().then((function(t){e.setState({alliances:t})}))}},{key:"render",value:function(){var e=this;return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Alliances"}),Object(O.jsx)(d.a,{onRow:function(t,n){return{onClick:function(n){e.goToAlliance(t.name)}}},dataSource:this.state.alliances,columns:X,pagination:{pageSizeOptions:[5,10],defaultPageSize:5,showQuickJumper:!0}})]})]})}}]),n}(c.a.Component),q=n(14),U=n(135),B=(d.a.Column,d.a.ColumnGroup,p.a.Option,[{title:"Airline Name",dataIndex:"",key:"name"}]),Z=[{title:"Airport Name",dataIndex:"name",key:"name"},{title:"Latitude",dataIndex:"lat",key:"lat"},{title:"Longitude",dataIndex:"lon",key:"lon"}],H=Object(U.withScriptjs)(Object(U.withGoogleMap)((function(e){return Object(O.jsx)(U.GoogleMap,{defaultZoom:5,defaultCenter:{lat:-34.397,lng:150.644},children:e.marks.map((function(e,t){return Object(O.jsx)(U.Circle,{center:e,radius:1e3,options:{strokeColor:"#66009a",strokeOpacity:.8,strokeWeight:2,fillColor:"#66009a",fillOpacity:.35,zIndex:1}},t)}))})}))),W=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={airlines:[],airports:[],selectedAllianceName:window.location.href.split("=")[1],image:"https://www.gannett-cdn.com/presto/2019/06/23/USAT/c3a9f051-bd6c-4b39-b5b9-38244deec783-GettyImages-932651818.jpg?width=660&height=517&fit=crop&format=pjpg&auto=webp",marks:[]},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;k(this.state.selectedAllianceName,1e5,1).then((function(t){e.setState({airlines:t})})),C(this.state.selectedAllianceName).then((function(t){e.setState({airports:t});for(var n=0;n<t.length;n++)e.setState({marks:[].concat(Object(q.a)(e.state.marks),[{lat:t[n].lat,lng:t[n].lon}])});console.log(e.state.airports)})),w().then((function(t){for(var n=0;n<t.length;n++)t[n].name===e.state.selectedAllianceName.replace("%20"," ")&&e.setState({image:t[n].image})}))}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{class:"d-flex justify-content-center",children:[Object(O.jsx)("br",{}),Object(O.jsxs)("h1",{children:[" ",this.state.selectedAllianceName.replace("%20"," ")]}),Object(O.jsx)("br",{})]}),Object(O.jsx)("div",{class:"d-flex justify-content-center",children:Object(O.jsx)("img",{alt:this.state.image,height:"100",src:this.state.image})}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Airlines"}),Object(O.jsx)(d.a,{dataSource:this.state.airlines,columns:B,pagination:{pageSizeOptions:[5,10],defaultPageSize:5,showQuickJumper:!0}})]}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Airports"}),Object(O.jsx)(d.a,{dataSource:this.state.airports,columns:Z,pagination:{pageSizeOptions:[5,10],defaultPageSize:5,showQuickJumper:!0}})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)(H,{googleMapURL:"http://maps.googleapis.com/maps/api/js?key=AIzaSyAK9NIuGRc17jZyiPZUtJOhdjaY4qB9lqs",loadingElement:Object(O.jsx)("div",{style:{height:"100%"}}),containerElement:Object(O.jsx)("div",{style:{height:"400px"}}),mapElement:Object(O.jsx)("div",{style:{height:"100%"}}),marks:this.state.marks}),";"]})]})}}]),n}(c.a.Component),K=(d.a.Column,d.a.ColumnGroup,p.a.Option,[{title:"Landmark Name",dataIndex:"name",key:"name"},{title:"Image URL",dataIndex:"imageUrl",key:"imageUrl",render:function(e){return Object(O.jsx)("img",{alt:e,height:"100",src:e})}}]),V=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={landmarks:[],countryName:[],selectedAirportName:window.location.href.split("=")[1].split("&")[0],selectedAirportIATA:window.location.href.split("=")[2].split("&")[0],selectedAirportCountry:window.location.href.split("=")[3].split("&")[0],selectedAirportIso:window.location.href.split("=")[4]},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;T(this.state.selectedAirportCountry).then((function(t){e.setState({countryName:t[0].name})})),I(this.state.selectedAirportCountry).then((function(t){console.log(e.state.selectedAirportCountry),e.setState({landmarks:t})}))}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{class:"d-flex justify-content-center",children:[Object(O.jsx)("br",{}),Object(O.jsxs)("h1",{children:[" ",this.state.selectedAirportName.replaceAll(/%../gi," ")]})]}),Object(O.jsxs)("div",{class:"d-flex justify-content-center",children:[Object(O.jsx)("br",{}),Object(O.jsxs)("h3",{children:[" ",this.state.selectedAirportIATA]})]}),Object(O.jsxs)("div",{class:"d-flex justify-content-center",children:[Object(O.jsx)("br",{}),Object(O.jsxs)("h5",{children:[" ",this.state.countryName," "]}),Object(O.jsx)("div",{children:Object(O.jsx)(E.a,{countryCode:this.state.selectedAirportCountry})})]}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Landmarks"}),Object(O.jsx)(d.a,{dataSource:this.state.landmarks,columns:K,pagination:{pageSizeOptions:[5,10],defaultPageSize:5,showQuickJumper:!0}})]})]})}}]),n}(c.a.Component),Y=(n(628),n(136)),$=(d.a.Column,d.a.ColumnGroup,function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={countryOptions:[],alliances:[],countrySrc:"",countryTgt:"",citySrc:"",cityTgt:""},a.goToAlliance=a.goToAlliance.bind(Object(u.a)(a)),a}return Object(l.a)(n,[{key:"goToAlliance",value:function(e){window.location="#/alliance?id=".concat(e)}},{key:"getCountryA",value:function(e){this.countryA=e}},{key:"countryAOnChange",value:function(e){}},{key:"componentDidMount",value:function(){var e=this;w().then((function(t){e.setState({alliances:t})}))}},{key:"render",value:function(){var e=this;return Object(O.jsxs)("div",{children:[Object(O.jsx)(f,{}),Object(O.jsxs)("div",{style:{width:"70vw",margin:"0 auto",marginTop:"5vh"},children:[Object(O.jsx)("h3",{children:"Search for Itinerary"}),Object(O.jsxs)("div",{class:"row",children:[Object(O.jsx)("div",{class:"col",children:Object(O.jsx)(Y.a,{className:"select-search",loadOptions:function(e){return S(e)},onChange:function(t,n){return e.setState({countrySrc:t.value})},placeholder:"Source Country"})}),Object(O.jsx)("div",{class:"col",children:Object(O.jsx)(Y.a,{className:"select-search",loadOptions:function(t){return A(e.state.countrySrc,t)},onChange:function(t,n){return e.setState({citySrc:t.value})},placeholder:"Source Country"})}),Object(O.jsx)("div",{class:"col",children:Object(O.jsx)(Y.a,{className:"select-search",loadOptions:function(e){return S(e)},onChange:function(t,n){return e.setState({countryTgt:t.value})},placeholder:"Target Country"})}),Object(O.jsx)("div",{class:"col",children:Object(O.jsx)(Y.a,{className:"select-search",loadOptions:function(t){return A(e.state.countryTgt,t)},onChange:function(t,n){return e.setState({cityTgt:t.value})},placeholder:"Source Country"})})]})]})]})}}]),n}(c.a.Component)),ee=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)(D.c,{children:[Object(O.jsx)(D.a,{exact:!0,path:"/",children:Object(O.jsx)(z,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/players",children:Object(O.jsx)(M,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/alliances",children:Object(O.jsx)(_,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/alliance",children:Object(O.jsx)(W,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/airports",children:Object(O.jsx)(R,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/airport",children:Object(O.jsx)(V,{})}),Object(O.jsx)(D.a,{exact:!0,path:"/routeSearch",children:Object(O.jsx)($,{})})]})})}}]),n}(c.a.Component),te=ee;i.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(s.a,{children:Object(O.jsx)(te,{})})}),document.getElementById("root"))}},[[651,1,2]]]);
//# sourceMappingURL=main.2cc7696a.chunk.js.map