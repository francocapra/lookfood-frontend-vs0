sap.ui.define([
	"lookfood/resources/main/controllers/Base",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
	], function (Base, History, JSONModel) {
		"use strict";

		var oViewModel = new JSONModel({});

		return Base.extend("lookfood.resources.main.controllers.ProductManagement", {

			onInit: function(){
				var oViewModel = this.getOwnerComponent().getModel("products");								
				this.showGlobalLoader();

				$.when(this.fnGetProducts())
					.done(function(data, textStatus, oResponse){
						if(data){
							oViewModel.setData(data);
							this.setModel(oViewModel, "productList");							
						}
					}.bind(this))
					.fail(function(a,b,c){
						console.log(a,b,c);
					})
					.always(function(){
						this.hideGlobalLoader();
					}.bind(this)
				);
			},

			onNavBack: function (oEvent) {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("appCockpit", {}, true );					
				}
			},

			onAddProductPress: function(){
				this.getRouter().navTo('appNewProduct');
			},

			uploadProductPicture:function(file, authToken, prdId){
				let formData = new FormData();

				formData.append('file', file, file.name);

				return $.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'products/picture?id='+prdId,
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

			updateProductDetails:function(oData, authToken){
				return $.ajax({
					type:'PUT',
					url:oBaseController.getServiceApi()+'products/'+oData.id,
					contentType:'application/json',
					data: JSON.stringify(oData),
					beforeSend:function(oRequest){
						oRequest.setRequestHeader('Authorization', authToken);						
					}
				});
			},

			onRefreshProductsPress: function(){

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

			onSavePrdDetails: function(oEvent){
				let oDialog = oEvent.getSource().getParent();
				let oModel = oDialog.getModel('mProductDetails');
				let authToken = window.sessionStorage.getItem('Authorization');

				oDialog.setBusyIndicatorDelay(0).setBusy(true);

				$.when(oBaseController.updateProductDetails(oModel.getData(), authToken))
				.done(function(data, textStatus, oResponse){
					sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('updatePrdSuccessfullMsg'));
				})
				.fail(function(error, textStatus, oResponse){
					sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('updatePrdFailureMsg'));
				})
				.always(function(){
					oDialog.setBusy(false);
					oDialog.close();
					oBaseController.onRefreshProductsPress();
				});
			},

			onListItemPress: function(oEvent) {

				let oModel = oEvent.getSource().getBindingContext('PartnerPrdCollection').getObject();
				let prdDetails = sap.ui.xmlfragment('prdDetailsFragment','lookfood.xml.fragments.ProductDetails', this);

				prdDetails.setModel(new sap.ui.model.json.JSONModel(oModel), 'mProductDetails')

				this.getView().addDependent(prdDetails);

				let productImage = sap.ui.core.Fragment.byId('prdDetailsFragment', 'imgProductPicture');
				productImage.setSrc(oBaseController.getBucketApi()+'product'+oModel.id+'.jpg');
				productImage.attachError(function(){
					productImage.setSrc('../imgs/food-tray.svg');
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
					let prdId = oDialog.getModel('mProductDetails').getData().id;

					oDialog.setBusyIndicatorDelay(0).setBusy(true);

					$.when(oBaseController.uploadProductPicture(file, authToken, prdId)).done(function(data,textStatus,oResponse){
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