sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Controller.extend("lookfood.resources.main.controllers.ProfessionalManagement", {

			onInit: function(){

			},

			onNavButtonPress: function(){
				oApplication.app.back();
			},

			onAddProfPress: function(){
				oApplication.app.to('viewNewProfessional');
			}
		});

	});