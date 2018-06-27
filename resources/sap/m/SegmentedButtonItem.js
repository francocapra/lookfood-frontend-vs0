/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Item','sap/m/Button','sap/ui/core/CustomStyleClassSupport'],function(l,I,B,C){"use strict";var S=I.extend("sap.m.SegmentedButtonItem",{metadata:{library:"sap.m",properties:{icon:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},events:{press:{}}}});C.apply(S.prototype);S.prototype.init=function(){var b=new B(this.getId()+"-button");this.aCustomStyleClasses;this.mCustomStyleClassMap;b.aCustomStyleClasses=this.aCustomStyleClasses;b.mCustomStyleClassMap=this.mCustomStyleClassMap;b.getCustomData=this.getCustomData.bind(this);b.getLayoutData=this.getLayoutData.bind(this);b.firePress=function(){this.firePress();B.prototype.firePress.call(b);}.bind(this);this.getDomRef=b.getDomRef.bind(b);this.oButton=b;};S.prototype.exit=function(){if(this.oButton){this.oButton.destroy();this.oButton=null;}};S.prototype.setText=function(v){this.setProperty("text",v,true);if(this.oButton){this.oButton.setText(this.getText());}return this;};S.prototype.setIcon=function(v){this.setProperty("icon",v,true);if(this.oButton){this.oButton.setIcon(this.getIcon());}return this;};S.prototype.setEnabled=function(v){this.setProperty("enabled",v,true);if(this.oButton){this.oButton.setEnabled(this.getEnabled());}return this;};S.prototype.setTextDirection=function(v){this.setProperty("textDirection",v,true);if(this.oButton){this.oButton.setTextDirection(this.getTextDirection());}return this;};S.prototype.setVisible=function(v){this.setProperty("visible",v,true);if(this.oButton){this.oButton.setVisible(v);}return this;};S.prototype.setWidth=function(v){this.setProperty("width",v,true);if(this.oButton){this.oButton.setWidth(this.getWidth());}return this;};S.prototype.setTooltip=function(v){this.setAggregation("tooltip",v,true);if(this.oButton){this.oButton.setTooltip(v);}return this;};return S;});