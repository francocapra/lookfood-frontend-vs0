/**
 * Sinon.JS 1.14.1, 2015/03/16
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @author Contributors: https://github.com/cjohansen/Sinon.JS/blob/master/AUTHORS
 *
 * (The BSD License)
 *
 * Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of Christian Johansen nor the names of his contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * Sinon core utilities. For internal use only.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
var sinon=(function(){"use strict";var s;var i=typeof module!=="undefined"&&module.exports&&typeof require==="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function l(r,e,m){s=m.exports=r("./sinon/util/core");r("./sinon/extend");r("./sinon/typeOf");r("./sinon/times_in_words");r("./sinon/spy");r("./sinon/call");r("./sinon/behavior");r("./sinon/stub");r("./sinon/mock");r("./sinon/collection");r("./sinon/assert");r("./sinon/sandbox");r("./sinon/test");r("./sinon/test_case");r("./sinon/match");r("./sinon/format");r("./sinon/log_error");}if(a){define(l);}else if(i){l(require,module.exports,module);s=module.exports;}else{s={};}return s;}());(function(s){var d=typeof document!="undefined"&&document.createElement("div");var h=Object.prototype.hasOwnProperty;function c(a){var b=false;try{a.appendChild(d);b=d.parentNode==a;}catch(e){return false;}finally{try{a.removeChild(d);}catch(e){}}return b;}function f(a){return d&&a&&a.nodeType===1&&c(a);}function g(a){return typeof a==="function"||!!(a&&a.constructor&&a.call&&a.apply);}function j(v){return typeof v==="number"&&isNaN(v);}function m(t,a){for(var b in a){if(!h.call(t,b)){t[b]=a[b];}}}function k(a){return typeof a==="function"&&typeof a.restore==="function"&&a.restore.sinon;}var n="keys"in Object;function o(s){s.wrapMethod=function wrapMethod(a,b,l){if(!a){throw new TypeError("Should wrap property of object");}if(typeof l!="function"&&typeof l!="object"){throw new TypeError("Method wrapper should be a function or a property descriptor");}function t(w){if(!g(w)){u=new TypeError("Attempted to wrap "+(typeof w)+" property "+b+" as function");}else if(w.restore&&w.restore.sinon){u=new TypeError("Attempted to wrap "+b+" which is already wrapped");}else if(w.calledBefore){var e=!!w.returns?"stubbed":"spied on";u=new TypeError("Attempted to wrap "+b+" which is already "+e);}if(u){if(w&&w.stackTrace){u.stack+="\n--------------\n"+w.stackTrace;}throw u;}}var u,w;var v=a.hasOwnProperty?a.hasOwnProperty(b):h.call(a,b);if(n){var x=(typeof l=="function")?{value:l}:l,y=s.getPropertyDescriptor(a,b),i;if(!y){u=new TypeError("Attempted to wrap "+(typeof w)+" property "+b+" as function");}else if(y.restore&&y.restore.sinon){u=new TypeError("Attempted to wrap "+b+" which is already wrapped");}if(u){if(y&&y.stackTrace){u.stack+="\n--------------\n"+y.stackTrace;}throw u;}var z=s.objectKeys(x);for(i=0;i<z.length;i++){w=y[z[i]];t(w);}m(x,y);for(i=0;i<z.length;i++){m(x[z[i]],y[z[i]]);}Object.defineProperty(a,b,x);}else{w=a[b];t(w);a[b]=l;l.displayName=b;}l.displayName=b;l.stackTrace=(new Error("Stack Trace for original")).stack;l.restore=function(){if(!v){try{delete a[b];}catch(e){}if(a[b]===l){a[b]=w;}}else if(n){Object.defineProperty(a,b,y);}if(!n&&a[b]===l){a[b]=w;}};l.restore.sinon=true;if(!n){m(l,w);}return l;};s.create=function create(a){var F=function(){};F.prototype=a;return new F();};s.deepEqual=function deepEqual(a,b){if(s.match&&s.match.isMatcher(a)){return a.test(b);}if(typeof a!="object"||typeof b!="object"){if(j(a)&&j(b)){return true;}else{return a===b;}}if(f(a)||f(b)){return a===b;}if(a===b){return true;}if((a===null&&b!==null)||(a!==null&&b===null)){return false;}if(a instanceof RegExp&&b instanceof RegExp){return(a.source===b.source)&&(a.global===b.global)&&(a.ignoreCase===b.ignoreCase)&&(a.multiline===b.multiline);}var S=Object.prototype.toString.call(a);if(S!=Object.prototype.toString.call(b)){return false;}if(S=="[object Date]"){return a.valueOf()===b.valueOf();}var e,l=0,L=0;if(S=="[object Array]"&&a.length!==b.length){return false;}for(e in a){l+=1;if(!(e in b)){return false;}if(!deepEqual(a[e],b[e])){return false;}}for(e in b){L+=1;}return l==L;};s.functionName=function functionName(a){var b=a.displayName||a.name;if(!b){var e=a.toString().match(/function ([^\s\(]+)/);b=e&&e[1];}return b;};s.functionToString=function toString(){if(this.getCall&&this.callCount){var t,a,i=this.callCount;while(i--){t=this.getCall(i).thisValue;for(a in t){if(t[a]===this){return a;}}}}return this.displayName||"sinon fake";};s.objectKeys=function objectKeys(a){if(a!==Object(a)){throw new TypeError("sinon.objectKeys called on a non-object");}var b=[];var e;for(e in a){if(h.call(a,e)){b.push(e);}}return b;};s.getPropertyDescriptor=function getPropertyDescriptor(a,b){var e=a,i;while(e&&!(i=Object.getOwnPropertyDescriptor(e,b))){e=Object.getPrototypeOf(e);}return i;};s.getConfig=function(a){var b={};a=a||{};var e=s.defaultConfig;for(var i in e){if(e.hasOwnProperty(i)){b[i]=a.hasOwnProperty(i)?a[i]:e[i];}}return b;};s.defaultConfig={injectIntoThis:true,injectInto:null,properties:["spy","stub","mock","clock","server","requests"],useFakeTimers:true,useFakeServer:true};s.timesInWords=function timesInWords(a){return a==1&&"once"||a==2&&"twice"||a==3&&"thrice"||(a||0)+" times";};s.calledInOrder=function(a){for(var i=1,l=a.length;i<l;i++){if(!a[i-1].calledBefore(a[i])||!a[i].called){return false;}}return true;};s.orderByFirstCall=function(e){return e.sort(function(a,b){var C=a.getCall(0);var i=b.getCall(0);var I=C&&C.callId||-1;var l=i&&i.callId||-1;return I<l?-1:1;});};s.createStubInstance=function(a){if(typeof a!=="function"){throw new TypeError("The constructor should be a function.");}return s.stub(s.create(a.prototype));};s.restore=function(a){if(a!==null&&typeof a==="object"){for(var b in a){if(k(a[b])){a[b].restore();}}}else if(k(a)){a.restore();}};return s;}var p=typeof module!=="undefined"&&module.exports&&typeof require=="function";var q=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function r(a,e){o(e);}if(q){define(r);}else if(p){r(require,module.exports);}else if(!s){return;}else{o(s);}}(typeof sinon=="object"&&sinon||null));(function(s){function m(s){var h=(function(){var o={constructor:function(){return"0";},toString:function(){return"1";},valueOf:function(){return"2";},toLocaleString:function(){return"3";},prototype:function(){return"4";},isPrototypeOf:function(){return"5";},propertyIsEnumerable:function(){return"6";},hasOwnProperty:function(){return"7";},length:function(){return"8";},unique:function(){return"9"}};var r=[];for(var p in o){r.push(o[p]());}return r.join("")!=="0123456789";})();function e(t){var c=Array.prototype.slice.call(arguments,1),d,i,p;for(i=0;i<c.length;i++){d=c[i];for(p in d){if(d.hasOwnProperty(p)){t[p]=d[p];}}if(h&&d.hasOwnProperty("toString")&&d.toString!==t.toString){t.toString=d.toString;}}return t;};s.extend=e;return s.extend;}function l(r,e,c){var s=r("./util/core");c.exports=m(s);}var a=typeof module!=="undefined"&&module.exports&&typeof require=="function";var b=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(b){define(l);}else if(a){l(require,module.exports,module);}else if(!s){return;}else{m(s);}}(typeof sinon=="object"&&sinon||null));
/**
 * Minimal Event interface implementation
 *
 * Original implementation by Sven Fuchs: https://gist.github.com/995028
 * Modifications and tests by Christian Johansen.
 *
 * @author Sven Fuchs (svenfuchs@artweb-design.de)
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
 */
if(typeof sinon=="undefined"){this.sinon={};}(function(){var p=[].push;function m(s){s.Event=function Event(t,d,e,f){this.initEvent(t,d,e,f);};s.Event.prototype={initEvent:function(t,d,e,f){this.type=t;this.bubbles=d;this.cancelable=e;this.target=f;},stopPropagation:function(){},preventDefault:function(){this.defaultPrevented=true;}};s.ProgressEvent=function ProgressEvent(t,d,e){this.initEvent(t,false,false,e);this.loaded=d.loaded||null;this.total=d.total||null;this.lengthComputable=!!d.total;};s.ProgressEvent.prototype=new s.Event();s.ProgressEvent.prototype.constructor=s.ProgressEvent;s.CustomEvent=function CustomEvent(t,d,e){this.initEvent(t,false,false,e);this.detail=d.detail||null;};s.CustomEvent.prototype=new s.Event();s.CustomEvent.prototype.constructor=s.CustomEvent;s.EventTarget={addEventListener:function addEventListener(e,l){this.eventListeners=this.eventListeners||{};this.eventListeners[e]=this.eventListeners[e]||[];p.call(this.eventListeners[e],l);},removeEventListener:function removeEventListener(e,d){var f=this.eventListeners&&this.eventListeners[e]||[];for(var i=0,l=f.length;i<l;++i){if(f[i]==d){return f.splice(i,1);}}},dispatchEvent:function dispatchEvent(e){var t=e.type;var l=this.eventListeners&&this.eventListeners[t]||[];for(var i=0;i<l.length;i++){if(typeof l[i]=="function"){l[i].call(this,e);}else{l[i].handleEvent(e);}}return!!e.defaultPrevented;}};}var a=typeof module!=="undefined"&&module.exports&&typeof require=="function";var b=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function c(r){var s=r("./core");m(s);}if(b){define(c);}else if(a){c(require);}else{m(sinon);}}());
/**
 * Logs errors
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
(function(s){var r=setTimeout;function m(s){function b(){}function c(d,f){var g=d+" threw exception: ";s.log(g+"["+f.name+"] "+f.message);if(f.stack){s.log(f.stack);}c.setTimeout(function(){f.message=g+f.message;throw f;},0);};c.setTimeout=function(f,t){r(f,t);};var e={};e.log=s.log=b;e.logError=s.logError=c;return e;}function l(b,e,c){var s=b("./util/core");c.exports=m(s);}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(a){define(l);}else if(i){l(require,module.exports,module);}else if(!s){return;}else{m(s);}}(typeof sinon=="object"&&sinon||null));if(typeof sinon=="undefined"){this.sinon={};}(function(g){var x={XDomainRequest:g.XDomainRequest};x.GlobalXDomainRequest=g.XDomainRequest;x.supportsXDR=typeof x.GlobalXDomainRequest!="undefined";x.workingXDR=x.supportsXDR?x.GlobalXDomainRequest:false;function m(s){s.xdr=x;function F(){this.readyState=F.UNSENT;this.requestBody=null;this.requestHeaders={};this.status=0;this.timeout=null;if(typeof F.onCreate=="function"){F.onCreate(this);}}function v(x){if(x.readyState!==F.OPENED){throw new Error("INVALID_STATE_ERR");}if(x.sendFlag){throw new Error("INVALID_STATE_ERR");}}function b(x){if(x.readyState==F.UNSENT){throw new Error("Request not sent");}if(x.readyState==F.DONE){throw new Error("Request done");}}function c(d){if(typeof d!="string"){var e=new Error("Attempted to respond to fake XDomainRequest with "+d+", which is not a string.");e.name="InvalidBodyException";throw e;}}s.extend(F.prototype,s.EventTarget,{open:function open(d,u){this.method=d;this.url=u;this.responseText=null;this.sendFlag=false;this.readyStateChange(F.OPENED);},readyStateChange:function readyStateChange(d){this.readyState=d;var f="";switch(this.readyState){case F.UNSENT:break;case F.OPENED:break;case F.LOADING:if(this.sendFlag){f="onprogress";}break;case F.DONE:if(this.isTimeout){f="ontimeout"}else if(this.errorFlag||(this.status<200||this.status>299)){f="onerror";}else{f="onload"}break;}if(f){if(typeof this[f]=="function"){try{this[f]();}catch(e){s.logError("Fake XHR "+f+" handler",e);}}}},send:function send(d){v(this);if(!/^(get|head)$/i.test(this.method)){this.requestBody=d;}this.requestHeaders["Content-Type"]="text/plain;charset=utf-8";this.errorFlag=false;this.sendFlag=true;this.readyStateChange(F.OPENED);if(typeof this.onSend=="function"){this.onSend(this);}},abort:function abort(){this.aborted=true;this.responseText=null;this.errorFlag=true;if(this.readyState>s.FakeXDomainRequest.UNSENT&&this.sendFlag){this.readyStateChange(s.FakeXDomainRequest.DONE);this.sendFlag=false;}},setResponseBody:function setResponseBody(d){b(this);c(d);var e=this.chunkSize||10;var f=0;this.responseText="";do{this.readyStateChange(F.LOADING);this.responseText+=d.substring(f,f+e);f+=e;}while(f<d.length);this.readyStateChange(F.DONE);},respond:function respond(d,e,f){this.status=typeof d=="number"?d:200;this.setResponseBody(f||"");},simulatetimeout:function simulatetimeout(){this.status=0;this.isTimeout=true;this.responseText=undefined;this.readyStateChange(F.DONE);}});s.extend(F,{UNSENT:0,OPENED:1,LOADING:3,DONE:4});s.useFakeXDomainRequest=function useFakeXDomainRequest(){s.FakeXDomainRequest.restore=function restore(k){if(x.supportsXDR){g.XDomainRequest=x.GlobalXDomainRequest;}delete s.FakeXDomainRequest.restore;if(k!==true){delete s.FakeXDomainRequest.onCreate;}};if(x.supportsXDR){g.XDomainRequest=s.FakeXDomainRequest;}return s.FakeXDomainRequest;};s.FakeXDomainRequest=F;}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function l(r,e,b){var s=r("./core");r("../extend");r("./event");r("../log_error");m(s);b.exports=s;}if(a){define(l);}else if(i){l(require,module.exports,module);}else{m(sinon);}})(this);
/**
 * Fake XMLHttpRequest object
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
(function(g){var s=typeof ProgressEvent!=="undefined";var a=typeof CustomEvent!=="undefined";var b={XMLHttpRequest:g.XMLHttpRequest};b.GlobalXMLHttpRequest=g.XMLHttpRequest;b.GlobalActiveXObject=g.ActiveXObject;b.supportsActiveX=typeof b.GlobalActiveXObject!="undefined";b.supportsXHR=typeof b.GlobalXMLHttpRequest!="undefined";b.workingXHR=b.supportsXHR?b.GlobalXMLHttpRequest:b.supportsActiveX?function(){return new b.GlobalActiveXObject("MSXML2.XMLHTTP.3.0")}:false;b.supportsCORS=b.supportsXHR&&"withCredentials"in(new b.GlobalXMLHttpRequest());var u={"Accept-Charset":true,"Accept-Encoding":true,Connection:true,"Content-Length":true,Cookie:true,Cookie2:true,"Content-Transfer-Encoding":true,Date:true,Expect:true,Host:true,"Keep-Alive":true,Referer:true,TE:true,Trailer:true,"Transfer-Encoding":true,Upgrade:true,"User-Agent":true,Via:true};function F(){this.readyState=F.UNSENT;this.requestHeaders={};this.requestBody=null;this.status=0;this.statusText="";this.upload=new U();if(b.supportsCORS){this.withCredentials=false;}var x=this;var e=["loadstart","load","abort","loadend"];function h(l){x.addEventListener(l,function(w){var y=x["on"+l];if(y&&typeof y=="function"){y.call(this,w);}});}for(var i=e.length-1;i>=0;i--){h(e[i]);}if(typeof F.onCreate=="function"){F.onCreate(this);}}function U(){this.eventListeners={progress:[],load:[],abort:[],error:[]}}U.prototype.addEventListener=function addEventListener(e,l){this.eventListeners[e].push(l);};U.prototype.removeEventListener=function removeEventListener(e,h){var w=this.eventListeners[e]||[];for(var i=0,l=w.length;i<l;++i){if(w[i]==h){return w.splice(i,1);}}};U.prototype.dispatchEvent=function dispatchEvent(e){var l=this.eventListeners[e.type]||[];for(var i=0,h;(h=l[i])!=null;i++){h(e);}};function v(x){if(x.readyState!==F.OPENED){throw new Error("INVALID_STATE_ERR");}if(x.sendFlag){throw new Error("INVALID_STATE_ERR");}}function c(e,i){i=i.toLowerCase();for(var h in e){if(h.toLowerCase()==i){return h;}}return null;}function d(e,h){if(!e){return;}for(var i=0,l=e.length;i<l;i+=1){h(e[i]);}}function f(e,h){for(var i=0;i<e.length;i++){if(h(e[i])===true){return true;}}return false;}var j=function(e,h,i){switch(i.length){case 0:return e[h]();case 1:return e[h](i[0]);case 2:return e[h](i[0],i[1]);case 3:return e[h](i[0],i[1],i[2]);case 4:return e[h](i[0],i[1],i[2],i[3]);case 5:return e[h](i[0],i[1],i[2],i[3],i[4]);}};F.filters=[];F.addFilter=function addFilter(e){this.filters.push(e)};var I=/MSIE 6/;F.defake=function defake(h,x){var i=new b.workingXHR();d(["open","setRequestHeader","send","abort","getResponseHeader","getAllResponseHeaders","addEventListener","overrideMimeType","removeEventListener"],function(e){h[e]=function(){return j(i,e,arguments);};});var l=function(z){d(z,function(A){try{h[A]=i[A]}catch(e){if(!I.test(navigator.userAgent)){throw e;}}});};var w=function w(){h.readyState=i.readyState;if(i.readyState>=F.HEADERS_RECEIVED){l(["status","statusText"]);}if(i.readyState>=F.LOADING){l(["responseText","response"]);}if(i.readyState===F.DONE){l(["responseXML"]);}if(h.onreadystatechange){h.onreadystatechange.call(h,{target:h});}};if(i.addEventListener){for(var y in h.eventListeners){if(h.eventListeners.hasOwnProperty(y)){d(h.eventListeners[y],function(e){i.addEventListener(y,e);});}}i.addEventListener("readystatechange",w);}else{i.onreadystatechange=w;}j(i,"open",x);};F.useFilters=false;function k(x){if(x.readyState!=F.OPENED){throw new Error("INVALID_STATE_ERR - "+x.readyState);}}function m(x){if(x.readyState==F.DONE){throw new Error("Request done");}}function n(x){if(x.async&&x.readyState!=F.HEADERS_RECEIVED){throw new Error("No headers received");}}function o(e){if(typeof e!="string"){var h=new Error("Attempted to respond to fake XMLHttpRequest with "+e+", which is not a string.");h.name="InvalidBodyException";throw h;}}F.parseXML=function parseXML(e){var x;if(typeof DOMParser!="undefined"){var h=new DOMParser();x=h.parseFromString(e,"text/xml");}else{x=new ActiveXObject("Microsoft.XMLDOM");x.async="false";x.loadXML(e);}return x;};F.statusCodes={100:"Continue",101:"Switching Protocols",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",300:"Multiple Choice",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported"};function p(h){h.xhr=b;h.extend(F.prototype,h.EventTarget,{async:true,open:function open(e,i,l,w,x){this.method=e;this.url=i;this.async=typeof l=="boolean"?l:true;this.username=w;this.password=x;this.responseText=null;this.responseXML=null;this.requestHeaders={};this.sendFlag=false;if(F.useFilters===true){var y=arguments;var z=f(F.filters,function(A){return A.apply(this,y)});if(z){return F.defake(this,arguments);}}this.readyStateChange(F.OPENED);},readyStateChange:function readyStateChange(i){this.readyState=i;if(typeof this.onreadystatechange=="function"){try{this.onreadystatechange();}catch(e){h.logError("Fake XHR onreadystatechange handler",e);}}this.dispatchEvent(new h.Event("readystatechange"));switch(this.readyState){case F.DONE:this.dispatchEvent(new h.Event("load",false,false,this));this.dispatchEvent(new h.Event("loadend",false,false,this));this.upload.dispatchEvent(new h.Event("load",false,false,this));if(s){this.upload.dispatchEvent(new h.ProgressEvent("progress",{loaded:100,total:100}));this.dispatchEvent(new h.ProgressEvent("progress",{loaded:100,total:100}));}break;}},setRequestHeader:function setRequestHeader(e,i){v(this);if(u[e]||/^(Sec-|Proxy-)/.test(e)){throw new Error("Refused to set unsafe header \""+e+"\"");}if(this.requestHeaders[e]){this.requestHeaders[e]+=","+i;}else{this.requestHeaders[e]=i;}},setResponseHeaders:function setResponseHeaders(e){k(this);this.responseHeaders={};for(var i in e){if(e.hasOwnProperty(i)){this.responseHeaders[i]=e[i];}}if(this.async){this.readyStateChange(F.HEADERS_RECEIVED);}else{this.readyState=F.HEADERS_RECEIVED;}},send:function send(e){v(this);if(!/^(get|head)$/i.test(this.method)){var i=c(this.requestHeaders,"Content-Type");if(this.requestHeaders[i]){var l=this.requestHeaders[i].split(";");this.requestHeaders[i]=l[0]+";charset=utf-8";}else if(!(e instanceof FormData)){this.requestHeaders["Content-Type"]="text/plain;charset=utf-8";}this.requestBody=e;}this.errorFlag=false;this.sendFlag=this.async;this.readyStateChange(F.OPENED);if(typeof this.onSend=="function"){this.onSend(this);}this.dispatchEvent(new h.Event("loadstart",false,false,this));},abort:function abort(){this.aborted=true;this.responseText=null;this.errorFlag=true;this.requestHeaders={};if(this.readyState>F.UNSENT&&this.sendFlag){this.readyStateChange(F.DONE);this.sendFlag=false;}this.readyState=F.UNSENT;this.dispatchEvent(new h.Event("abort",false,false,this));this.upload.dispatchEvent(new h.Event("abort",false,false,this));if(typeof this.onerror==="function"){this.onerror();}},getResponseHeader:function getResponseHeader(e){if(this.readyState<F.HEADERS_RECEIVED){return null;}if(/^Set-Cookie2?$/i.test(e)){return null;}e=c(this.responseHeaders,e);return this.responseHeaders[e]||null;},getAllResponseHeaders:function getAllResponseHeaders(){if(this.readyState<F.HEADERS_RECEIVED){return"";}var e="";for(var i in this.responseHeaders){if(this.responseHeaders.hasOwnProperty(i)&&!/^Set-Cookie2?$/i.test(i)){e+=i+": "+this.responseHeaders[i]+"\r\n";}}return e;},setResponseBody:function setResponseBody(i){m(this);n(this);o(i);var l=this.chunkSize||10;var w=0;this.responseText="";do{if(this.async){this.readyStateChange(F.LOADING);}this.responseText+=i.substring(w,w+l);w+=l;}while(w<i.length);var x=this.getResponseHeader("Content-Type");if(this.responseText&&(!x||/(text\/xml)|(application\/xml)|(\+xml)/.test(x))){try{this.responseXML=F.parseXML(this.responseText);}catch(e){}}this.readyStateChange(F.DONE);},respond:function respond(e,i,l){this.status=typeof e=="number"?e:200;this.statusText=F.statusCodes[this.status];this.setResponseHeaders(i||{});this.setResponseBody(l||"");},uploadProgress:function uploadProgress(e){if(s){this.upload.dispatchEvent(new h.ProgressEvent("progress",e));}},downloadProgress:function downloadProgress(e){if(s){this.dispatchEvent(new h.ProgressEvent("progress",e));}},uploadError:function uploadError(e){if(a){this.upload.dispatchEvent(new h.CustomEvent("error",{detail:e}));}}});h.extend(F,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4});h.useFakeXMLHttpRequest=function(){F.restore=function restore(e){if(b.supportsXHR){g.XMLHttpRequest=b.GlobalXMLHttpRequest;}if(b.supportsActiveX){g.ActiveXObject=b.GlobalActiveXObject;}delete F.restore;if(e!==true){delete F.onCreate;}};if(b.supportsXHR){g.XMLHttpRequest=F;}if(b.supportsActiveX){g.ActiveXObject=function ActiveXObject(e){if(e=="Microsoft.XMLHTTP"||/^Msxml2\.XMLHTTP/i.test(e)){return new F();}return new b.GlobalActiveXObject(e);};}return F;};h.FakeXMLHttpRequest=F;}var q=typeof module!=="undefined"&&module.exports&&typeof require=="function";var r=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function t(e,h,i){var l=e("./core");e("../extend");e("./event");e("../log_error");p(l);i.exports=l;}if(r){define(t);}else if(q){t(require,module.exports,module);}else if(typeof sinon==="undefined"){return;}else{p(sinon);}})(typeof global!=="undefined"?global:this);
/**
 * Format functions
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2014 Christian Johansen
 */
(function(s,f){function m(s){function v(d){return""+d;}function g(){var c=f.configure({quoteStrings:false,limitChildrenCount:250});function d(){return c.ascii.apply(c,arguments);};return d;}function b(d){function h(d){return typeof d=="object"&&d.toString===Object.prototype.toString?u.inspect(d):d;};try{var u=require("util");}catch(e){}return u?h:v;}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function",c;if(i){try{f=require("formatio");}catch(e){}}if(f){c=g()}else if(i){c=b();}else{c=v;}s.format=c;return s.format;}function l(r,e,b){var s=r("./util/core");b.exports=m(s);}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;if(a){define(l);}else if(i){l(require,module.exports,module);}else if(!s){return;}else{m(s);}}((typeof sinon=="object"&&sinon||null),(typeof formatio=="object"&&formatio)));
/**
 * The Sinon "server" mimics a web server that receives requests from
 * sinon.FakeXMLHttpRequest and provides an API to respond to those requests,
 * both synchronously and asynchronously. To respond synchronuously, canned
 * answers have to be provided upfront.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
if(typeof sinon=="undefined"){var sinon={};}(function(){var p=[].push;function F(){}function c(e){F.prototype=e;return new F();}function r(e){var i=e;if(Object.prototype.toString.call(e)!="[object Array]"){i=[200,{},e];}if(typeof i[2]!="string"){throw new TypeError("Fake server response body should be string, but was "+typeof i[2]);}return i;}var w=typeof window!=="undefined"?window.location:{};var a=new RegExp("^"+w.protocol+"//"+w.host);function m(e,i,j){var k=e.method;var l=!k||k.toLowerCase()==i.toLowerCase();var u=e.url;var n=!u||u==j||(typeof u.test=="function"&&u.test(j));return l&&n;}function b(e,i){var j=i.url;if(!/^https?:\/\//.test(j)||a.test(j)){j=j.replace(a,"");}if(m(e,this.getHTTPMethod(i),j)){if(typeof e.response=="function"){var k=e.url;var l=[i].concat(k&&typeof k.exec=="function"?k.exec(j).slice(1):[]);return e.response.apply(e,l);}return true;}return false;}function d(s){s.fakeServer={create:function(){var e=c(this);if(!s.xhr.supportsCORS){this.xhr=s.useFakeXDomainRequest();}else{this.xhr=s.useFakeXMLHttpRequest();}e.requests=[];this.xhr.onCreate=function(x){e.addRequest(x);};return e;},addRequest:function addRequest(x){var e=this;p.call(this.requests,x);x.onSend=function(){e.handleRequest(this);if(e.respondImmediately){e.respond();}else if(e.autoRespond&&!e.responding){setTimeout(function(){e.responding=false;e.respond();},e.autoRespondAfter||10);e.responding=true;}};},getHTTPMethod:function getHTTPMethod(e){if(this.fakeHTTPMethods&&/post/i.test(e.method)){var i=(e.requestBody||"").match(/_method=([^\b;]+)/);return!!i?i[1]:e.method;}return e.method;},handleRequest:function handleRequest(x){if(x.async){if(!this.queue){this.queue=[];}p.call(this.queue,x);}else{this.processRequest(x);}},log:function log(e,i){var j;j="Request:\n"+s.format(i)+"\n\n";j+="Response:\n"+s.format(e)+"\n\n";s.log(j);},respondWith:function respondWith(e,u,i){if(arguments.length==1&&typeof e!="function"){this.response=r(e);return;}if(!this.responses){this.responses=[];}if(arguments.length==1){i=e;u=e=null;}if(arguments.length==2){i=u;u=e;e=null;}p.call(this.responses,{method:e,url:u,response:typeof i=="function"?i:r(i)});},respond:function respond(){if(arguments.length>0){this.respondWith.apply(this,arguments);}var q=this.queue||[];var e=q.splice(0,q.length);var i;while(i=e.shift()){this.processRequest(i);}},processRequest:function processRequest(j){try{if(j.aborted){return;}var k=this.response||[404,{},""];if(this.responses){for(var l=this.responses.length,i=l-1;i>=0;i--){if(b.call(this,this.responses[i],j)){k=this.responses[i].response;break;}}}if(j.readyState!=4){this.log(k,j);j.respond(k[0],k[1],k[2]);}}catch(e){s.logError("Fake server request processing",e);}},restore:function restore(){return this.xhr.restore&&this.xhr.restore.apply(this.xhr,arguments);}};}var f=typeof module!=="undefined"&&module.exports&&typeof require=="function";var g=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function h(e,i,j){var s=e("./core");e("./fake_xdomain_request");e("./fake_xml_http_request");e("../format");d(s);j.exports=s;}if(g){define(h);}else if(f){h(require,module.exports,module);}else{d(sinon);}}());
/**
 * Fake timer API
 * setTimeout
 * setInterval
 * clearTimeout
 * clearInterval
 * tick
 * reset
 * Date
 *
 * Inspired by jsUnitMockTimeOut from JsUnit
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
if(typeof sinon=="undefined"){var sinon={};}(function(g){function m(s,b){var c=typeof lolex!=="undefined"?lolex:b;s.useFakeTimers=function(){var n,d=Array.prototype.slice.call(arguments);if(typeof d[0]==="string"){n=0;}else{n=d.shift();}var e=c.install(n||0,d);e.restore=e.uninstall;return e;};s.clock={create:function(n){return c.createClock(n);}};s.timers={setTimeout:setTimeout,clearTimeout:clearTimeout,setImmediate:(typeof setImmediate!=="undefined"?setImmediate:undefined),clearImmediate:(typeof clearImmediate!=="undefined"?clearImmediate:undefined),setInterval:setInterval,clearInterval:clearInterval,Date:Date};}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function l(r,e,b,c){var s=r("./core");m(s,c);b.exports=s;}if(a){define(l);}else if(i){l(require,module.exports,module,require("lolex"));}else{m(sinon);}}(typeof global!="undefined"&&typeof global!=="function"?global:this));
/**
 * Add-on for sinon.fakeServer that automatically handles a fake timer along with
 * the FakeXMLHttpRequest. The direct inspiration for this add-on is jQuery
 * 1.3.x, which does not use xhr object's onreadystatehandler at all - instead,
 * it polls the object for completion with setInterval. Dispite the direct
 * motivation, there is nothing jQuery-specific in this file, so it can be used
 * in any environment where the ajax implementation depends on setInterval or
 * setTimeout.
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010-2013 Christian Johansen
 */
(function(){function m(s){function S(){}S.prototype=s.fakeServer;s.fakeServerWithClock=new S();s.fakeServerWithClock.addRequest=function addRequest(x){if(x.async){if(typeof setTimeout.clock=="object"){this.clock=setTimeout.clock;}else{this.clock=s.useFakeTimers();this.resetClock=true;}if(!this.longestTimeout){var c=this.clock.setTimeout;var b=this.clock.setInterval;var d=this;this.clock.setTimeout=function(f,t){d.longestTimeout=Math.max(t,d.longestTimeout||0);return c.apply(this,arguments);};this.clock.setInterval=function(f,t){d.longestTimeout=Math.max(t,d.longestTimeout||0);return b.apply(this,arguments);};}}return s.fakeServer.addRequest.call(this,x);};s.fakeServerWithClock.respond=function respond(){var r=s.fakeServer.respond.apply(this,arguments);if(this.clock){this.clock.tick(this.longestTimeout||0);this.longestTimeout=0;if(this.resetClock){this.clock.restore();this.resetClock=false;}}return r;};s.fakeServerWithClock.restore=function restore(){if(this.clock){this.clock.restore();}return s.fakeServer.restore.apply(this,arguments);};}var i=typeof module!=="undefined"&&module.exports&&typeof require=="function";var a=typeof define==="function"&&typeof define.amd==="object"&&define.amd;function l(r){var s=r("./core");r("./fake_server");r("./fake_timers");m(s);}if(a){define(l);}else if(i){l(require);}else{m(sinon);}}());
