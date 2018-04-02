/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Metadata","sap/m/library"],function(q,M,l){"use strict";var L=l.LinkConversion;var A=M.createClass("sap.m.FormattedTextAnchorGenerator",{});var c=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;var W=/(www\.[^\s><]+(\b|$))/gim;var d="//";var D=/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+(?!\/\s\*)>/gim;var E=/<a[^>]*>([^<]+)<\/a>/gim;var e=[D,E];A.generateAnchors=function(t,s,T){if(s===L.ProtocolOnly){t=A._createAnchors(t,c,T);}if(s===L.All){t=A._createAnchors(t,c,T);t=A._createAnchors(t,W,T,d);}return t;};A._createPositionObject=function(i,a){return{iStartPos:i,iEndPos:i+a};};A._isNested=function(f,s){return f.iStartPos<s.iStartPos&&f.iEndPos>s.iEndPos;};A._isAllowed=function(b,C){return b.some(function(B){return A._isNested(B,C);});};A._shouldBeProcessed=function(u,C,b){return q.sap.validateUrl(u)&&!A._isAllowed(b,C);};A._scanForEntitiesToSkip=function(r,t){var a=[],C;while((C=r.exec(t))!==null){a.push(A._createPositionObject(C.index,C[0].length));}return a;};A._getEntitiesToSkipWhileSearchingForLinks=function(t){return e.map(function(s){return A._scanForEntitiesToSkip(s,t);}).reduce(function(a,b){return a.concat(b);});};A._createAnchors=function(t,r,T,p){var a=A._getEntitiesToSkipWhileSearchingForLinks(t),C;p=p||'';C=function(P){var o=A._createPositionObject(arguments[3],P.length);if(!A._shouldBeProcessed(P,o,a)){return P;}return"<a href=\""+p+P+"\" target=\""+T+"\">"+P+"</a>";};return t.replace(r,C);};return A;},false);
