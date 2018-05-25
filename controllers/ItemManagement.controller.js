sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		return Base.extend("gourmeo.resources.main.controllers.ItemManagement", {

			onInit: function(){
				oBaseController = this;
			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onAddItemPress: function(){
				oApplication.app.to('viewNewItem');
			},

			getPartnerProducts: function(){
				return $.ajax({
					type:'GET',
					url:oBaseController.getServiceApi()+'products',
					beforeSend:function(oRequest){
						oRequest.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
					}
				});
			},

			onRefreshItemsPress: function(){

				oBaseController.getView().setBusyIndicatorDelay(0).setBusy(true);

				$.when(oBaseController.getPartnerProducts())
				.done(function(data, textStatus, oResponse){
					if(data){
						let prdModel = new sap.ui.model.json.JSONModel({
							ProductCollection: data
						});
						oBaseController.setModel(prdModel, 'PartnerPrdCollection');
					}
				})
				.fail(function(a,b,c){
					console.log(a,b,c);
				})
				.always(function(){
					oBaseController.getView().setBusy(false);
				});
			},

			onListItemPress: function(oEvent) {

				let oModel = oEvent.getSource().getBindingContext('PartnerPrdCollection').getObject();
				
				let prdDetails = sap.ui.xmlfragment('gourmeo.xml.fragments.ProductDetails', this);

				prdDetails.setModel(new sap.ui.model.json.JSONModel(oModel), 'mProductDetails')

				this.getView().addDependent(prdDetails);

				prdDetails.attachAfterClose(function(dialogCloseEvent){
					dialogCloseEvent.getSource().destroy();
				}).open();
			},

			closeDialog:function(oEvent){
				oEvent.getSource().getParent().close();
			}
		});

	});