sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Base.extend("gourmeo.resources.main.controllers.PartnerProfile", {

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onInit: function(){
				oController = this;
			}
		});

	});