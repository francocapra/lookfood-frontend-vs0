sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		return Base.extend("gourmeo.resources.main.controllers.Cockpit", {

			onInit: function(){
				oBaseController = this;
			},

			onExit:function(){
				oBaseController = null;
				this.destroy();
			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onLogoffBtnPress: function () {
				let logoff = new sap.m.Dialog({
					title:oBaseController.getResourceBundle().getText('logoffDialogTitle'),
					content:[
					new sap.m.HBox({
						justifyContent:'Center',
						alignItems:'Center',
						items:[
						new sap.m.Text({
							text:oBaseController.getResourceBundle().getText('logoffDialogMessage')
						})
						]
					}).addStyleClass('sapUiSmallMarginTop')
					],
					beginButton:new sap.m.Button({
						text:oBaseController.getResourceBundle().getText('logoffConfirmBtn'),
						press:function(){
							logoff.close();
							oBaseController.getRouter().navTo('appLogin');
						}
					}),
					endButton:new sap.m.Button({
						text:oBaseController.getResourceBundle().getText('logoffCancelBtn'),
						type:'Emphasized',
						press:function(){
							logoff.close();
						}
					}),
					afterClose:function(){
						logoff.destroy();
					}
				}).open();
			},

			onTileItemMgmtPress: function(){
				this.getRouter().navTo('appItemsManagement');
			},

			// onTileProfMgmtPress: function(){
			// 	oApplication.app.to('viewProfMgmt');
			// },

			onTilePartProfPress: function(){
				oApplication.app.to('viewPartnerProfile');
			},

			onTileReviewModePress: function(){
				oApplication.app.to('viewReviewMode');
			}

		});

	});