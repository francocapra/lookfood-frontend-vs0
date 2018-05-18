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

		return Controller.extend("gourmeo.resources.main.controllers.Login", {

			onInit: function(){

			},

					//Login Page
					onLoginBtnPress: function (event) {

						showGlobalLoader();

						var oData = {
							email: this.byId('txtUserId').getValue(),
							password: this.byId('txtPassword').getValue(),
						}

						$.ajax({
							type: 'POST',
							url: service+'login',
							contentType: 'application/json',
							data: JSON.stringify(oData),
							success: function (data, textStatus, jqXHR) {
								hideGlobalLoader();
								oApplication.app.to('viewCockpit');
							},
							error: function (jqXHR, textStatus, errorThrown) {
								hideGlobalLoader();
								console.log(jqXHR.responseText);
							}
						})
					}


				});

	});