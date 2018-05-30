sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"lookfood/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.Cockpit", {

			onInit: function(){
				oBaseController = this;
			},

			onExit:function(){
				oBaseController = null;
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
						}
					}),
					endButton:new sap.m.Button({
						text:oBaseController.getResourceBundle().getText('logoffCancelBtn'),
						type:'Emphasized',
						press:function(){
							logoff.close();
						}
					}),
					afterClose:function(oEvent){

						logoff.destroy();
						
						if(oEvent.getParameters().origin.getText() == oBaseController.getResourceBundle().getText('logoffConfirmBtn'))
							oBaseController.getRouter().navTo('appLogin');
					}
				}).open();
			},

			onTileItemMgmtPress: function(){

				oBaseController.showGlobalLoader();

				$.when(oBaseController.getPartnerProducts())
				.done(function(data, textStatus, oResponse){
					if(data){
						let prdModel = new sap.ui.model.json.JSONModel({
							ProductCollection: data
						});
						oBaseController.setModel(prdModel, 'PartnerPrdCollection');

						oBaseController.getRouter().navTo('appProductManagement');
					}
				})
				.fail(function(a,b,c){
					console.log(a,b,c);
				})
				.always(function(){
					oBaseController.hideGlobalLoader();
				});
			},

			// onTileProfMgmtPress: function(){
			// 	oApplication.app.to('viewProfMgmt');
			// },

			onTilePartProfPress: function(){
				this.getRouter().navTo('appPartnerProfile');
			},

			getTopProducts:function(){
				return $.ajax({
					type:'GET',
					url:oBaseController.getServiceApi()+'products/top',
					beforeSend:function(oRequest){
						oRequest.setRequestHeader('Authorization',
							window.sessionStorage.getItem('Authorization'));
					}
				});
			},

			onTileReviewModePress: function(){

				oBaseController.showGlobalLoader();

				$.when(this.getTopProducts())
				.done(function(data,textStatus,oResponse){
					let oModel = new sap.ui.model.json.JSONModel(data);

					oBaseController.setModel(oModel, 'TopProducts');

					oBaseController.getRouter().navTo('appReviewMode');
				})
				.fail(function(error,textStatus,oResponse){
					sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('topProductsError'));
				})
				.always(function(){
					oBaseController.hideGlobalLoader();
				});
			}

		});

	});