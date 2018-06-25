/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/Device','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/core/date/UniversalDate','sap/ui/unified/library','sap/ui/core/format/DateFormat','sap/ui/core/library',"./YearPickerRenderer",'jquery.sap.keycodes'],function(q,C,D,I,a,b,U,l,c,d,Y){"use strict";var e=d.CalendarType;var f=C.extend("sap.ui.unified.calendar.YearPicker",{metadata:{library:"sap.ui.unified",properties:{year:{type:"int",group:"Data",defaultValue:2000},years:{type:"int",group:"Appearance",defaultValue:20},columns:{type:"int",group:"Appearance",defaultValue:4},date:{type:"object",group:"Data"},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"}},events:{select:{},pageChange:{}}}});f.prototype.init=function(){var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this._oYearFormat=c.getDateInstance({format:"y",calendarType:s});this._oFormatYyyymmdd=c.getInstance({pattern:"yyyyMMdd",calendarType:e.Gregorian});this._oMinDate=a._minDate(this.getPrimaryCalendarType());this._oMaxDate=a._maxDate(this.getPrimaryCalendarType());};f.prototype.onAfterRendering=function(){_.call(this);};f.prototype.setYear=function(y){this.setProperty("year",y,true);y=this.getProperty("year");var i=b.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());i.setDate(1);i.setMonth(0);i.setYear(y);this.setDate(i.toLocalJSDate());return this;};f.prototype.setDate=function(i){var p,y,r,F;i&&a._checkJSDateObject(i);y=i.getFullYear();a._checkYearInValidRange(y);p=b.fromLocalJSDate(i,this.getPrimaryCalendarType());p.setMonth(0);p.setDate(1);this.setProperty("date",i,true);this.setProperty("year",p.getYear(),true);this._oDate=p;if(this.getDomRef()){r=this.getYears();F=new b(this._oDate,this.getPrimaryCalendarType());F.setYear(F.getYear()-Math.floor(r/2));o.call(this,F,Math.floor(r/2));}return this;};f.prototype._getDate=function(){if(!this._oDate){var y=this.getYear();this._oDate=new b(y,0,1,this.getPrimaryCalendarType());}return this._oDate;};f.prototype.setPrimaryCalendarType=function(s){this.setProperty("primaryCalendarType",s);this._oYearFormat=c.getDateInstance({format:"y",calendarType:s});if(this._oDate){this._oDate=new b(this._oDate,s);this._oDate.setMonth(0);this._oDate.setDate(1);}this._oMinDate=new b(this._oMinDate,s);this._oMaxDate=new b(this._oMaxDate,s);return this;};f.prototype.nextPage=function(){n.call(this,true,this._oItemNavigation.getFocusedIndex());return this;};f.prototype.previousPage=function(){n.call(this,false,this._oItemNavigation.getFocusedIndex());return this;};f.prototype.onsapspace=function(E){E.preventDefault();};f.prototype.onsapselect=function(E){var i=this._oItemNavigation.getFocusedIndex();var s=m.call(this,i);if(s){this.fireSelect();}};f.prototype.onmousedown=function(E){this._oMousedownPosition={clientX:E.clientX,clientY:E.clientY};};f.prototype.onmouseup=function(E){if(this._bMousedownChange){this._bMousedownChange=false;this.fireSelect();}else if(D.support.touch&&this._isValueInThreshold(this._oMousedownPosition.clientX,E.clientX,10)&&this._isValueInThreshold(this._oMousedownPosition.clientY,E.clientY,10)){var i=this._oItemNavigation.getFocusedIndex();m.call(this,i);this.fireSelect();}};f.prototype.getFirstRenderedDate=function(){var F;if(this.getDomRef()){var i=this._oItemNavigation.getItemDomRefs();F=this._oFormatYyyymmdd.parse(q(i[0]).attr("data-sap-year-start"),true);}return F;};f.prototype._isValueInThreshold=function(r,v,t){var L=r-t,u=r+t;return v>=L&&v<=u;};f.prototype._checkFirstDate=function(i){var y=this.getYears();var M=new b(this._oMaxDate,this.getPrimaryCalendarType());M.setYear(M.getYear()-y+1);if(i.isAfter(M)&&i.getYear()!=M.getYear()){i=new b(M,this.getPrimaryCalendarType());i.setMonth(0);i.setDate(1);}else if(i.isBefore(this._oMinDate)&&i.getYear()!=this._oMinDate.getYear()){i=new b(this._oMinDate,this.getPrimaryCalendarType());i.setMonth(0);i.setDate(1);}return i;};f.prototype._checkDateEnabled=function(i){var E=true;if((i.isAfter(this._oMaxDate)&&i.getYear()!=this._oMaxDate.getYear())||(i.isBefore(this._oMinDate)&&i.getYear()!=this._oMinDate.getYear())){E=false;}return E;};function _(){var y=this.getYears();var i=this._getDate().getYear();var M=this._oMinDate.getYear();var p=this._oMaxDate.getYear();var r=this.getDomRef();var s=this.$().find(".sapUiCalItem");var t=Math.floor(y/2);if(i>p-Math.floor(y/2)){t=t+i-p+Math.floor(y/2);}else if(i<=M+Math.floor(y/2)){t=i-M;}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,g,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,h,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,k,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setHomeEndColumnMode(true,true);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(s);this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(this.getColumns(),true);this._oItemNavigation.setFocusedIndex(t);this._oItemNavigation.setPageSize(s.length);}function g(i){var p=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}if(E.type=="mousedown"){j.call(this,E,p);}}function h(i){var p=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}if(E.type=="mousedown"){j.call(this,E,p);}}function j(E,i){if(E.button||D.support.touch){return;}var s=m.call(this,i);if(s){this._bMousedownChange=true;}E.preventDefault();E.setMark("cancelAutoClose");}function k(i){var E=i.getParameter("event");if(E.type){var y=this.getYears();var p=this.getColumns();if(p==0){p=y;}switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN&&p<y){n.call(this,true,this._oItemNavigation.getFocusedIndex()-y+p,true);}else{n.call(this,true,0,true);}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP&&p<y){n.call(this,false,y-p+this._oItemNavigation.getFocusedIndex(),true);}else{n.call(this,false,y-1,true);}break;case"sappagedown":n.call(this,true,this._oItemNavigation.getFocusedIndex(),true);break;case"sappageup":n.call(this,false,this._oItemNavigation.getFocusedIndex(),true);break;default:break;}}}function m(p){var r=this._oItemNavigation.getItemDomRefs();var $=q(r[p]);if($.hasClass("sapUiCalItemDsbl")){return false;}var y=$.attr("data-sap-year-start");var s=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(y));var t=this.getId()+"-y"+y;for(var i=0;i<r.length;i++){$=q(r[i]);if($.attr("id")==t){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}else{$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}}this.setProperty("date",s.toLocalJSDate(),true);this.setProperty("year",s.getYear(),true);return true;}function n(F,s,i){var p=this._oItemNavigation.getItemDomRefs();var r=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(q(p[0]).attr("data-sap-year-start")),this.getPrimaryCalendarType());var y=this.getYears();if(F){var M=new b(this._oMaxDate,this.getPrimaryCalendarType());M.setYear(M.getYear()-y+1);if(r.isBefore(M)){r.setYear(r.getYear()+y);if(r.isAfter(M)){s=s+(r.getYear()-M.getYear());if(s>y-1){s=y-1;}r=this._oMaxDate;r.setMonth(0);r.setDate(1);}}else{return;}}else{if(r.isAfter(this._oMinDate)){r.setYear(r.getYear()-y);if(r.isBefore(this._oMinDate)){s=s-(this._oMinDate.getYear()-r.getYear());if(s<0){s=0;}r=new b(this._oMinDate,this.getPrimaryCalendarType());}}else{return;}}o.call(this,r,s);if(i){this.firePageChange();}}function o(F,s){var p=this._oFormatYyyymmdd.format(this._getDate().toUTCJSDate(),true);var E=false;var r=this._checkFirstDate(F);var S;if(!r.isSame(F)){S=new b(F,this.getPrimaryCalendarType());S.setYear(S.getYear()+s);F=r;E=true;}var t=this._oItemNavigation.getItemDomRefs();var u=new b(F,this.getPrimaryCalendarType());for(var i=0;i<t.length;i++){var y=this._oFormatYyyymmdd.format(u.toUTCJSDate(),true);var $=q(t[i]);$.attr("id",this.getId()+"-y"+y);$.text(this._oYearFormat.format(U.getInstance(u.toUTCJSDate(),u.getCalendarType()),true));$.attr("data-sap-year-start",y);if($.hasClass("sapUiCalItemSel")&&y!=p){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else if(!$.hasClass("sapUiCalItemSel")&&y==p){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}var v=true;if(E){v=this._checkDateEnabled(u);if(u.isSame(S)){s=i;}}if(v){$.removeClass("sapUiCalItemDsbl");$.removeAttr("aria-disabled");}else{$.addClass("sapUiCalItemDsbl");$.attr("aria-disabled",true);}u.setYear(u.getYear()+1);}this._oItemNavigation.focusItem(s);}return f;});
