/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/debug/ControlTree',['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/core/Element','sap/ui/core/UIArea','./Highlighter'],function(q,E,a,U,H){"use strict";var C=E.extend("sap.ui.debug.ControlTree",{constructor:function(c,w,p,r){E.apply(this,arguments);this.oWindow=w;this.oDocument=w.document;this.oCore=c;this.oSelectedNode=null;this.oParentDomRef=p;this.oSelectionHighlighter=new H("sap-ui-testsuite-SelectionHighlighter");this.oHoverHighlighter=new H("sap-ui-testsuite-HoverHighlighter",true,'#c8f',1);var t=this;q(p).bind("click",function(e){t.onclick(e);}).bind("mouseover",function(e){t.onmouseover(e);}).bind("mouseout",function(e){t.onmouseout(e);});this.enableInplaceControlSelection();this.oCore.attachUIUpdated(this.renderDelayed,this);this.sSelectedNodeId="";this.sResourcePath=r?q.sap.getModulePath("","/"):(window.top.testfwk.sResourceRoot||"../");this.sTestResourcePath=this.sResourcePath+"../test-resources/";this.sSpaceUrl=this.sResourcePath+"sap/ui/debug/images/space.gif";this.sMinusUrl=this.sResourcePath+"sap/ui/debug/images/minus.gif";this.sPlusUrl=this.sResourcePath+"sap/ui/debug/images/plus.gif";this.sLinkUrl=this.sResourcePath+"sap/ui/debug/images/link.gif";}});C.M_EVENTS={SELECT:"SELECT"};C.prototype.exit=function(){q(document).unbind();q(this.oParentDomRef).unbind();};C.prototype.renderDelayed=function(){if(this.oTimer){this.oWindow.jQuery.sap.clearDelayedCall(this.oTimer);}this.oTimer=this.oWindow.jQuery.sap.delayedCall(0,this,"render");};C.prototype.render=function(){var d=this.oParentDomRef;var u=null,o=this.oCore.mUIAreas;d.innerHTML="";for(var i in o){var u=o[i],D=this.createTreeNodeDomRef(u.getId(),0,"UIArea",this.sTestResourcePath+"sap/ui/core/images/controls/sap.ui.core.UIArea.gif");d.appendChild(D);var r=u.getContent();for(var i=0,l=r.length;i<l;i++){this.renderNode(d,r[i],1);}}};C.prototype.createTreeNodeDomRef=function(i,l,t,I){var d=this.oParentDomRef.ownerDocument.createElement("DIV");d.setAttribute("id","sap-debug-controltree-"+i);var s=t.substring(t.lastIndexOf(".")>-1?t.lastIndexOf(".")+1:0);d.innerHTML="<img style='height:12px;width:12px;display:none' src='"+this.sSpaceUrl+"' align='absmiddle'/><img style='height:16px;width:16px' src='"+I+"' align='absmiddle'/>&nbsp;<span>"+s+" - "+i+"</span>";d.style.overflow="hidden";d.style.whiteSpace="nowrap";d.style.textOverflow="ellipsis";d.style.paddingLeft=(l*16)+"px";d.style.height="20px";d.style.cursor="default";d.setAttribute("sap-type",t);d.setAttribute("sap-id",i);d.setAttribute("sap-expanded","true");d.setAttribute("sap-level",""+l);d.title=t+" - "+i;return d;};C.prototype.createLinkNode=function(p,i,l,t){var d=this.oParentDomRef.ownerDocument.createElement("DIV");d.setAttribute("id","sap-debug-controltreelink-"+i);var s=t?t.substring(t.lastIndexOf(".")>-1?t.lastIndexOf(".")+1:0):"";d.innerHTML="<img style='height:12px;width:12px;display:none' src='"+this.sSpaceUrl+"' align='absmiddle'/><img style='height:12px;width:12px' src='"+this.sLinkUrl+"' align='absmiddle'/>&nbsp;<span style='color:#888;border-bottom:1px dotted #888;'>"+(s?s+" - ":"")+i+"</span>";d.style.overflow="hidden";d.style.whiteSpace="nowrap";d.style.textOverflow="ellipsis";d.style.paddingLeft=(l*16)+"px";d.style.height="20px";d.style.cursor="default";d.setAttribute("sap-type","Link");d.setAttribute("sap-id",i);d.setAttribute("sap-expanded","true");d.setAttribute("sap-level",""+l);d.title="Association to '"+i+"'";p.appendChild(d);return d;};C.prototype.renderNode=function(d,c,l){if(!c){return;}var m=c.getMetadata();var I=this.sTestResourcePath+m.getLibraryName().replace(/\./g,"/")+"/images/controls/"+m.getName()+".gif";var D=this.createTreeNodeDomRef(c.getId(),l,m.getName(),I);d.appendChild(D);var r=false;if(c.mAggregations){for(var n in c.mAggregations){r=true;var A=c.mAggregations[n];if(A&&A.length){for(var i=0;i<A.length;i++){var o=A[i];if(o instanceof a){this.renderNode(d,A[i],l+1);}}}else if(A instanceof a){this.renderNode(d,A,l+1);}}}if(c.mAssociations){for(var n in c.mAssociations){r=true;var b=c.mAssociations[n];if(Array.isArray(b)){for(var i=0;i<b.length;i++){var o=b[i];if(typeof o==="string"){this.createLinkNode(d,o,l+1);}}}else if(typeof b==="string"){this.createLinkNode(d,b,l+1);}}}if(r){var e=D.getElementsByTagName("IMG")[0];e.src=this.sMinusUrl;e.style.display="";}};C.prototype.onclick=function(e){var s=e.target;if(s.tagName=="IMG"){var p=s.parentNode,l=parseInt(p.getAttribute("sap-level"),10),n=p.nextSibling,b=p.getAttribute("sap-expanded")=="true";s=p.firstChild;if(n){var N=parseInt(n.getAttribute("sap-level"),10);while(n&&N>l){var o=n.getElementsByTagName("IMG")[0];if(b){n.style.display="none";n.setAttribute("sap-expanded","false");if(o&&o.src!==this.sSpaceUrl){o.src=this.sPlusUrl;}}else{n.style.display="block";n.setAttribute("sap-expanded","true");if(o&&o.src!==this.sSpaceUrl){o.src=this.sMinusUrl;}}n=n.nextSibling;if(n){N=parseInt(n.getAttribute("sap-level"),10);}}}if(b){s.src=this.sPlusUrl;p.setAttribute("sap-expanded","false");}else{s.src=this.sMinusUrl;p.setAttribute("sap-expanded","true");}}else{if(s.tagName!="SPAN"){s=s.getElementsByTagName("SPAN")[0];}var p=s.parentNode,i=p.getAttribute("sap-id"),c=this.oCore.byId(i),d=p.getAttribute("sap-type")==="Link"?"sap-debug-controltree-"+i:p.id;this.oSelectionHighlighter.hide();if(c instanceof a){this.oSelectionHighlighter.highlight(c.getDomRef());this.oHoverHighlighter.hide();}this.deselectNode(this.sSelectedNodeId);this.selectNode(d);}};C.prototype.onmouseover=function(e){var s=e.target;if(s.tagName=="SPAN"){this.oHoverHighlighter.highlight(this.getTargetDomRef(s.parentNode));}};C.prototype.onmouseout=function(e){var s=e.target;if(s.tagName=="SPAN"){if(this.getTargetDomRef(s.parentNode)){this.oHoverHighlighter.hide();}}};C.prototype.selectNode=function(i){if(!i){return;}var d=q.sap.domById(i,q.sap.ownerWindow(this.oParentDomRef));if(!d){q.sap.log.warning("Control with Id '"+i.substring(22)+"' not found in tree");return;}var c=d.getAttribute("sap-id");var s=d.getElementsByTagName("SPAN")[0];s.style.backgroundColor="#000066";s.style.color="#FFFFFF";this.sSelectedNodeId=i;this.fireEvent(C.M_EVENTS.SELECT,{id:i,controlId:c});};C.prototype.deselectNode=function(i){if(!i){return;}var d=q.sap.domById(i,q.sap.ownerWindow(this.oParentDomRef));var s=d.getElementsByTagName("SPAN")[0];s.style.backgroundColor="transparent";s.style.color="#000000";this.sSelectedNodeId=i;};C.prototype.getTargetDomRef=function(t){var T=t.getAttribute("sap-type"),i=t.getAttribute("sap-id"),s=T==="UIArea"?this.oCore.getUIArea(i):this.oCore.byId(i);while(s instanceof a){var d=s.getDomRef();if(d){return d;}s=s.getParent();}if(s instanceof U){return s.getRootNode();}};C.prototype.enableInplaceControlSelection=function(){var t=this;q(document).bind("mouseover",function(e){t.selectControlInTree(e);});};C.prototype.selectControlInTree=function(e){if(e){if(e.ctrlKey&&e.shiftKey&&!e.altKey){var c=e.srcElement||e.target;while(c&&(!c.id||!this.oCore.getControl(c.id))){c=c.parentNode;}if(c&&c.id&&this.oCore.getControl(c.id)){this.oHoverHighlighter.highlight(c);}else{this.oHoverHighlighter.hide();}}else{this.oHoverHighlighter.hide();}}};return C;});
