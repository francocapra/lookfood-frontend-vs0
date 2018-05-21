sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("gourmeo.resources.main.controllers.Base", {

			getServiceApi: function(){
				return 'https://app-lookfood.herokuapp.com/';
			},

			showGlobalLoader : function () {
				sap.ui.core.BusyIndicator.show(0);
			},

			hideGlobalLoader : function () {
				sap.ui.core.BusyIndicator.hide();
			},

			getResourceBundle:function(){
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},

			getModel:function(sName){
				return this.getOwnerComponent().getModel(sName);
			},

			setModel:function(oModel, sName){
				return this.getOwnerComponent().setModel(oModel, sName);
			}
		});

	});