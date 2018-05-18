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

		return Controller.extend("gourmeo.resources.main.controllers.NewReviewProfessional", {

			getAppObj: function(){
				var app = this.byId('gourmeoApp');

				if (!app) {
					jQuery.sap.log.info("App object can't be found");
				}
				return app;
			},

			onInit: function(){

			}
		});

	});