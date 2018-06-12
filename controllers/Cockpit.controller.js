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
				if (this._oDialog) {
					this._oDialog.destroy();
				}
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

			onTileCreateReviewPress: function(){

				// let oModel = new sap.ui.model.json.JSONModel(
				// 	jQuery.sap.getModulePath('lookfood.mockdata','/reviews/products_for_review.json')
				// 	);

				oBaseController.showGlobalLoader();

				$.when(oBaseController.getPartnerProducts())
				.done(function(data, textStatus, oResponse){
					if(data){
						let prdModel = new sap.ui.model.json.JSONModel(data);

						if (!oBaseController._oDialog) {
							oBaseController._oDialog = sap.ui.xmlfragment("lookfood.xml.fragments.ProductsForReview", oBaseController);
							oBaseController._oDialog.setModel(prdModel, 'mProductsForReview');

							oBaseController._oDialog.setTitle(oBaseController.getResourceBundle().getText('prdsForReviewTitle'));
							oBaseController._oDialog.setNoDataText(oBaseController.getResourceBundle().getText('prdsForReviewNoData'));
						}

						oBaseController._oDialog.open();
					}
				})
				.fail(function(a,b,c){
					console.log(a,b,c);
				})
				.always(function(){
					oBaseController.hideGlobalLoader();
				});

			},

			handleSearch: function(oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sValue);
				var oBinding = oEvent.getSource().getBinding("items");
				oBinding.filter([oFilter]);
			},

			handleConfirm:function(oEvent){
				var aContexts = oEvent.getParameter("selectedContexts");

				let oProducts = {
					products:[]
				};

				aContexts.forEach(function(oContext){
					oProducts.products.push(oContext.getObject());
				});

				oBaseController.showGlobalLoader();

				$.when(oBaseController.startNewReview(oProducts))
				.done(function(data,textStatus,oResponse){
					console.log(data,textStatus,oResponse);
				})
				.fail(function(error,textStatus,oResponse){
					console.log(error,textStatus,oResponse);
				})
				.always(function(){
					oBaseController.hideGlobalLoader();
				});
			},

			startNewReview:function(oProducts){
				return $.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'reviews',
					contentType:'application/json',
					data:JSON.stringify(oProducts),
					beforeSend:function(oRequest){
						let authToken = window.sessionStorage.getItem('Authorization');
						oRequest.setRequestHeader('Authorization', authToken);
					}
				});
			},

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