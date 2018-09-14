sap.ui.define([
	"lookfood/resources/Lookfood/controllers/Base",
	'lookfood/resources/Lookfood/model/formatter',
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	'sap/ui/Device',
	"sap/m/MessageToast",
	'sap/m/ActionSheet',
	'sap/m/Button'
	], function (
		Base, 
		formatter, 
		History, 
		JSONModel, 
		Device, 
		MessageToast, 
		ActionSheet, 
		Button) {
		"use strict";

		return Base.extend("lookfood.resources.Lookfood.controllers.Cockpit", {
			
			formatter: formatter,

			onInit: function(){
				
				this.hideGlobalLoader();
				
				var oViewModel = new JSONModel({
					isPhone : Device.system.phone,
					busy: 0
				});
				this.setModel(oViewModel, "cockpitView");

				Device.media.attachHandler(function (oDevice) {
					this.getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
				}.bind(this));				

			},

			onNavBack: function (oEvent) {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("appLogin", {}, true );					
				}
			},

			onExit:function(){
				if (this._oDialog) {
					this._oDialog.destroy();
				}
			},

			onLogoffBtnPress: function (oEvent) {	
				var oBundle = this.getModel("i18n").getResourceBundle();
				var fnHandleUserMenuItemPress = function (oEvent) {
					this.fnLogOff();
					// this.getRouter().navTo('appLogin');
				}.bind(this);

				if (!this.getView().byId("userMessageActionSheet")){
				
					var oActionSheet = 
					new ActionSheet(this.getView().createId("userMessageActionSheet"), {
						title: oBundle.getText("userHeaderTitle"),
						showCancelButton: false,
						buttons: [
							new Button({
								text: 'Log Off',
								type: sap.m.ButtonType.Transparent,	
								press: fnHandleUserMenuItemPress
							}),
						],
						afterClose: function () {
							oActionSheet.destroy();
						}
					});
					// forward compact/cozy style into dialog
					jQuery.sap.syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oActionSheet);
					oActionSheet.openBy(oEvent.getSource());
				}
			},

			onPressProducts: function(){				
				this.getRouter().navTo('appProductManagement');
			},

			onPressAdminProfile: function(){
				this.getRouter().navTo('appProfileSettings');
			}

			// onTileCreateReviewPress: function(){

			// 	this.showGlobalLoader();

			// 	$.when(this.getPartnerProducts())
			// 		.done(function(data, textStatus, oResponse){
			// 			if(data){
			// 				let prdModel = new JSONModel(data);

			// 				if (!this._oDialog) {
			// 					this._oDialog = sap.ui.xmlfragment("lookfood.xml.fragments.ProductsForReview", this);
			// 					this._oDialog.setModel(prdModel, 'mProductsForReview');

			// 					this._oDialog.setTitle(this.getResourceBundle().getText('prdsForReviewTitle'));
			// 					this._oDialog.setNoDataText(this.getResourceBundle().getText('prdsForReviewNoData'));
			// 				}

			// 				this._oDialog.open();
			// 			}
			// 		}.bind(this))
			// 		.fail(function(a,b,c){
			// 			console.log(a,b,c);
			// 		})
			// 		.always(function(){
			// 			this.hideGlobalLoader();
			// 		}.bind(this)
			// 	);

			// },

			// handleSearch: function(oEvent) {
			// 	var sValue = oEvent.getParameter("value");
			// 	var oFilter = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, sValue);
			// 	var oBinding = oEvent.getSource().getBinding("items");
			// 	oBinding.filter([oFilter]);
			// },

			// handleConfirm:function(oEvent){
			// 	var aContexts = oEvent.getParameter("selectedContexts");

			// 	let oProducts = {
			// 		itemsReviewDTO:[]
			// 	};

			// 	aContexts.forEach(function(oContext){
			// 		oProducts.itemsReviewDTO.push(oContext.getObject());
			// 	});

			// 	this.showGlobalLoader();

			// 	$.when(this.startNewReview(oProducts))
			// 		.done(function(data,textStatus,oResponse){
			// 			console.log(data,textStatus,oResponse);
			// 		})
			// 		.fail(function(error,textStatus,oResponse){
			// 			console.log(error,textStatus,oResponse);
			// 		})
			// 		.always(function(){
			// 			this.hideGlobalLoader();
			// 		}.bind(this)
			// 	);
			// },

			// startNewReview:function(oProducts){
			// 	return $.ajax({
			// 		type:'POST',
			// 		url:this.getServiceApi()+'reviews',
			// 		contentType:'application/json',
			// 		data:JSON.stringify(oProducts),
			// 		beforeSend:function(oRequest){
			// 			let authToken = window.sessionStorage.getItem('Authorization');
			// 			oRequest.setRequestHeader('Authorization', authToken);
			// 		}
			// 	});
			// },


			// getTopProducts:function(){
			// 	return $.ajax({
			// 		type:'GET',
			// 		url:this.getServiceApi()+'products/top',
			// 		beforeSend:function(oRequest){
			// 			oRequest.setRequestHeader('Authorization',
			// 				window.sessionStorage.getItem('Authorization'));
			// 		}
			// 	});
			// },

			// onTileReviewModePress: function(){

			// 	this.showGlobalLoader();

			// 	$.when(this.getTopProducts())
			// 		.done(function(data,textStatus,oResponse){
			// 			let oModel = new JSONModel(data);
			// 			this.setModel(oModel, 'TopProducts');
			// 			this.getRouter().navTo('appReviewMode');
			// 		}.bind(this))
			// 		.fail(function(error,textStatus,oResponse){
			// 			MessageToast.show(this.getResourceBundle().getText('topProductsError'));
			// 		}.bind(this))
			// 		.always(function(){
			// 			this.hideGlobalLoader();
			// 		}.bind(this)
			// 	);
			// }

		});

});