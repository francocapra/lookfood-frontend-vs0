sap.ui.define([
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function (Base, History, JSONModel, Filter, FilterOperator) {
		"use strict";

		return Base.extend("lookfood.resources.Lookfood.controllers.ProductManagement", {

			onInit: function(){
											
				var oViewModel,
					iOriginalBusyDelay,
					uri,
					token,
					oHeaders,
					oListModel,
					oList;
				
				oList = this.byId("list");
				iOriginalBusyDelay = oList.getBusyIndicatorDelay();

				oViewModel = new JSONModel({
					listTitle: this.getResourceBundle().getText("listHeader"),
					listBusyDelay: 0				
					// busy: true,
					// delay: 0
				});	
				this.setModel(oViewModel, "productView");	

				uri = this.getServiceApi() + "products";
				token = window.sessionStorage.getItem('Authorization');
				oHeaders = {"Authorization": token};				

				oListModel = new JSONModel();				
				oListModel.loadData(uri, null, true, "GET", null, false, oHeaders);								
				// oListModel.attachRequestCompleted( {} ,function(){
				// 	// Restore original busy indicator delay for worklist's table
				// 	// oViewModel.setProperty("/busy", false);
				// 	// oViewModel.setProperty("/delay", iOriginalBusyDelay);
				// 	oViewModel.setProperty("/listBusyDelay", iOriginalBusyDelay);

				// }, this );				
				this.setModel(oListModel, "productList");	

				oList.attachEventOnce("updateFinished", function(){
					// Restore original busy indicator delay for worklist's table
					oViewModel.setProperty("/listBusyDelay", iOriginalBusyDelay);
				});
			},

			/**
			 * Triggered by the table's 'updateFinished' event: after new table
			 * data is available, this handler method updates the table counter.
			 * This should only happen if the update was successful, which is
			 * why this handler is attached to 'updateFinished' and not to the
			 * table's list binding's 'dataReceived' method.
			 * @param {sap.ui.base.Event} oEvent the update finished event
			 * @public
			 */
			onUpdateFinished : function (oEvent) {
				// update the worklist's object counter after the table update
				var sTitle,
					oList = oEvent.getSource(),
					// oModel = this.getModel(),
					// oViewModel = this.getModel("productView"),
					iTotalItems = oEvent.getParameters().total;
				// only update the counter if the length is final and
				// the table is not empty
				if (iTotalItems && oList.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("listHeaderCount", [iTotalItems]);
					// // iterate the filters and request the count from the server
					// $.each(this._mFilters, function (sFilterKey, oFilter) {
					// 	var sPath = "/" + sFilterKey;
					// 	var sProperty = oViewModel.getProperty(sPath);
					// 	if (!sProperty) {
					// 		oModel.read("/ProductSet/$count", {
					// 			filters: oFilter,
					// 			success: function (oData) {
					// 				oViewModel.setProperty(sPath, oData);
					// 			}
					// 		});
					// 	}
					// });

				} else {
					sTitle = this.getResourceBundle().getText("listHeader");
				}
				this.getModel("productView").setProperty("/listTitle", sTitle);
			},

			onSearch : function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					// Search field's 'refresh' button has been pressed.
					// This is visible if you select any master list item.
					// In this case no new search is triggered, we only
					// refresh the list binding.
					this.onRefresh();
				} else {
					var aTableSearchState = [];
					var sQuery = oEvent.getParameter("query");

					if (sQuery && sQuery.length > 0) {
						aTableSearchState = [new Filter("description", FilterOperator.Contains, sQuery)];
					}
					this._applySearch(aTableSearchState);
				}

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

			/**
			 * Event handler for refresh event. Keeps filter, sort
			 * and group settings and refreshes the list binding.
			 * @public
			 */
			onRefreshProductsPress: function(){			
				var oList = this.byId("list");
				oList.getBinding("items").refresh();
			},
				// oBaseController.getView().setBusyIndicatorDelay(0).setBusy(true);

				// $.when(oBaseController.getPartnerProducts())
				// .done(function(data, textStatus, oResponse){
				// 	if(data){
				// 		let prdModel = new sap.ui.model.json.JSONModel({
				// 			ProductCollection: data
				// 		});
				// 		oBaseController.setModel(prdModel, 'PartnerPrdCollection');
				// 	}
				// })
				// .fail(function(a,b,c){
				// 	console.log(a,b,c);
				// })
				// .always(function(){
				// 	oBaseController.getView().setBusy(false);
				// });
			// },

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
			},

			/**
			 * Internal helper method to apply both filter and search state together on the list binding
			 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
			 * @private
			 */
			_applySearch: function(aTableSearchState) {
				var oList = this.byId("list"),
					oViewModel = this.getModel("productListView");
				oList.getBinding("items").filter(aTableSearchState, "Application");
				// changes the noDataText of the list in case there are no filter results
				// if (aTableSearchState.length !== 0) {
				// 	oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
				// }
			}
		});

	});