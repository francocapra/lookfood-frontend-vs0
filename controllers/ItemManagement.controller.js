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

				oBaseController.byId('tblPartnerProducts').setBusyIndicatorDelay(0).setBusy(true);

				$.when(oBaseController.getPartnerProducts())
				.done(function(data, textStatus, oResponse){
					if(data){
						let prdModel = new sap.ui.model.json.JSONModel({
							ProductCollection: data
						});
						console.log(prdModel);
						oBaseController.setModel(prdModel, 'PartnerPrdCollection');
					}
				})
				.fail(function(a,b,c){
					console.log(a,b,c);
				})
				.always(function(){
					oBaseController.byId('tblPartnerProducts').setBusy(false);
				});
			}
		});

	});