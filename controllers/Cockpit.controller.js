sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;
		var oBundle;

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Controller.extend("gourmeo.resources.main.controllers.Cockpit", {

			onInit: function(){
				oController = this;
			},

			onAfterRendering:function(){
				oBundle = this.getView().getModel('i18n').getResourceBundle();
			},

			onExit:function(){
				oController = null;
				oBundle = null;
			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onLogoffBtnPress: function () {
				let logoff = new sap.m.Dialog({
					title:oBundle.getText('logoffDialogTitle'),
					content:[
					new sap.m.HBox({
						justifyContent:'Center',
						alignItems:'Center',
						items:[
						new sap.m.Text({
							text:oBundle.getText('logoffDialogMessage')
						})
						]
					}).addStyleClass('sapUiSmallMarginTop')
					],
					beginButton:new sap.m.Button({
						text:oBundle.getText('logoffConfirmBtn'),
						press:function(){
							logoff.close();
							oApplication.app.to('viewLogin');
						}
					}),
					endButton:new sap.m.Button({
						text:oBundle.getText('logoffCancelBtn'),
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