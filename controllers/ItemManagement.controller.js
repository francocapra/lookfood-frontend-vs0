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

			uploadProductPicture:function(file, authToken){
				let formData = new FormData();

				formData.append('file', file, file.name);

				return $.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'products/picture',
					data: formData,
					async:true,
					cache:false,
					contentType:false,
					processData:false,
					beforeSend:function(request){
						request.setRequestHeader('Authorization', authToken)
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
				let prdDetails = sap.ui.xmlfragment('prdDetailsFragment','gourmeo.xml.fragments.ProductDetails', this);

				prdDetails.setModel(new sap.ui.model.json.JSONModel(oModel), 'mProductDetails')

				this.getView().addDependent(prdDetails);

				let productImage = sap.ui.core.Fragment.byId('prdDetailsFragment', 'imgProductPicture');
				productImage.setSrc(oBaseController.getBucketApi()+'product'+oModel.id+'.jpg');
				productImage.attachError(function(){
					productImage.setSrc('imgs/food-tray.png');
				});

				prdDetails.attachAfterClose(function(dialogCloseEvent){
					dialogCloseEvent.getSource().destroy();
				}).open();
			},

			closeDialog:function(oEvent){
				oEvent.getSource().getParent().close();
			},

			onPrdImagePress:function(oEvent){
				let _uploader = $('#productPicUploader');

				_uploader.on('change', function(){
					let file = this.files[0];
					let authToken = window.sessionStorage.getItem('Authorization');

					if(!file)
						return;

					let oDialog = sap.ui.core.Fragment.byId('prdDetailsFragment', 'prdDetailsDialog');

					oDialog.setBusyIndicatorDelay(0).setBusy(true);

					$.when(oBaseController.uploadProductPicture(file, authToken)).done(function(data,textStatus,oResponse){
						let location = oResponse.getResponseHeader('location')

						oDialog.setBusy(false);
						sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('imgSavedSuccessfully'))
					}).fail(function(a,b,c){
						console.log(a,b,c);
						oDialog.setBusy(false);
					});
				});

				_uploader.trigger('click');
			}
		});

	});