/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/NumberFormat','sap/ui/model/FormatException','sap/ui/model/odata/type/ODataType','sap/ui/model/ParseException','sap/ui/model/ValidateException'],function(q,N,F,O,P,V){"use strict";function g(){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterNumber");}function a(t){var f;if(!t.oFormat){f=q.extend({groupingEnabled:true},t.oFormatOptions);t.oFormat=N.getFloatInstance(f);}return t.oFormat;}function i(t){return!t.oConstraints||t.oConstraints.nullable!==false;}function s(t,c){var n;t.oConstraints=undefined;if(c){n=c.nullable;if(n===false||n==="false"){t.oConstraints={nullable:false};}else if(n!==undefined&&n!==true&&n!=="true"){q.sap.log.warning("Illegal nullable: "+n,null,t.getName());}}t._handleLocalizationChange();}var D=O.extend("sap.ui.model.odata.type.Double",{constructor:function(f,c){O.apply(this,arguments);this.oFormatOptions=f;s(this,c);}});D.prototype.formatValue=function(v,t){var f,b;if(v===null||v===undefined){return null;}if(typeof v==="number"){b=v;}else if(typeof v==="string"){b=parseFloat(v);}else if(t!=="any"){throw new F("Illegal "+this.getName()+" value: "+v);}switch(this.getPrimitiveType(t)){case"any":return v;case"float":return b;case"int":return Math.floor(b);case"string":if(b&&(Math.abs(b)>=1e15||Math.abs(b)<1e-4)){f=a(this).oFormatOptions;return b.toExponential().replace("e","\u00a0E").replace(".",f.decimalSeparator).replace("+",f.plusSign).replace("-",f.minusSign);}return a(this).format(b);default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};D.prototype.parseValue=function(v,S){var r;if(v===null||v===""){return null;}switch(this.getPrimitiveType(S)){case"string":r=a(this).parse(v);if(isNaN(r)){throw new P(g());}break;case"int":case"float":r=v;break;default:throw new P("Don't know how to parse "+this.getName()+" from "+S);}return r;};D.prototype._handleLocalizationChange=function(){this.oFormat=null;};D.prototype.validateValue=function(v){if(v===null&&i(this)){return;}if(typeof v==="number"){return;}throw new V(g());};D.prototype.getName=function(){return"sap.ui.model.odata.type.Double";};return D;});
