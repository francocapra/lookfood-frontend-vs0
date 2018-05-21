sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oController;

		return Base.extend("gourmeo.resources.main.controllers.Cockpit", {

			onInit: function(){
				oController = this;
			},

			onExit:function(){
				oController = null;
				this.destroy();
			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onLogoffBtnPress: function () {
				let logoff = new sap.m.Dialog({
					title:oController.getResourceBundle().getText('logoffDialogTitle'),
					content:[
					new sap.m.HBox({
						justifyContent:'Center',
						alignItems:'Center',
						items:[
						new sap.m.Text({
							text:oController.getResourceBundle().getText('logoffDialogMessage')
						})
						]
					}).addStyleClass('sapUiSmallMarginTop')
					],
					beginButton:new sap.m.Button({
						text:oController.getResourceBundle().getText('logoffConfirmBtn'),
						press:function(){
							logoff.close();
							oApplication.app.to('viewLogin');
						}
					}),
					endButton:new sap.m.Button({
						text:oController.getResourceBundle().getText('logoffCancelBtn'),
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