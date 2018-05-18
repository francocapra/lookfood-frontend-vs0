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
			},

			onNavButtonPress: function(){
				this.getAppObj().back();
			},



			onNewUserLinkPress: function () {

				var newUserDialog = sap.ui.xmlfragment('gourmeo.xml.fragments.NewUserDialog');
				this.getView().addDependent(newUserDialog);

				newUserDialog.open();
			},

			onForgotPassLinkPress: function () {

				var oBundle = this.getView().getModel('i18n').getResourceBundle();

				var forgotPassDialog = new sap.m.Dialog({
					title: oBundle.getText('forgotPassDialogTitle'),
					content: [
					new sap.m.HBox({
						justifyContent: 'Center',
						alignItems: 'Center',
						items: [
						new sap.ui.core.Icon({
							src: 'sap-icon://email',
							size: '2em',
							color: '#d52941'
						}).addStyleClass('sapUiTinyMargin'),
						new sap.m.Input({
							placeholder: oBundle.getText('forgotPassField'),
							type: sap.m.InputType.Email
						})
						]
					})
					],
					beginButton: new sap.m.Button({
						type: 'Emphasized',
						text: oBundle.getText('btnRecoverPass'),
						press: function () {

						}
					}),
					endButton: new sap.m.Button({
						text: oBundle.getText('btnCancel'),
						press: function () {
							forgotPassDialog.close();
						}
					}),
					afterClose: function () {
						forgotPassDialog.close();
					}
				}).addStyleClass('sapUiContentPadding');

				forgotPassDialog.open();
			},


		});

	});