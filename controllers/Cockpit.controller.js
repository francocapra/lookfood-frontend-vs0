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

		return Controller.extend("gourmeo.resources.main.controllers.Cockpit", {

			onInit: function(){

			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onLogoffBtnPress: function () {
				var app = this.getAppObj();
				var oBundle = this.getView().getModel('i18n').getResourceBundle();
				var controller = this;

				var logOffDialog = new sap.m.Dialog({
					title: oBundle.getText('logoffDialogTitle'),
					type: 'Message',
					content: [
					new sap.m.Text({
						text: oBundle.getText('logoffDialogMessage')
					})
					],
					beginButton: new sap.m.Button({
						text: oBundle.getText('logoffConfirmBtn'),
						press: function () {
							logOffDialog.close();
							app.to(controller.createId('pageLogin'));
						}
					}),
					endButton: new sap.m.Button({
						text: oBundle.getText('logoffCancelBtn'),
						type: 'Emphasized',
						press: function () {
							logOffDialog.close();
						}
					}),
					afterClose: function () {
						logOffDialog.destroy();
					}
				}).open();
			},

			onTileItemMgmtPress: function(){
				oApplication.app.to('viewItemMgmt');
			},

			onTileProfMgmtPress: function(){
				oApplication.app.to('viewProfMgmt');
			},

			onTilePartProfPress: function(){
				oApplication.app.to('viewPartnerProfile');
			},

			onTileReviewModePress: function(){
				oApplication.app.to('viewReviewMode');
			}

		});

	});