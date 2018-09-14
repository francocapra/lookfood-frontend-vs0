sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("lookfood.resources.Lookfood.controllers.Base", {

			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			getServiceApi: function(){
				return 'https://app-lookfood-backend.herokuapp.com/';
			},

			getBucketApi: function(){
				return 'https://lookfood-backend-img.s3.sa-east-1.amazonaws.com/';
			},

			showGlobalLoader : function () {
				sap.ui.core.BusyIndicator.show(0);
			},

			hideGlobalLoader : function () {
				sap.ui.core.BusyIndicator.hide();
			},

			getResourceBundle:function(){
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},

			getModel:function(sName){
				return this.getView().getModel(sName);
			},

			setModel:function(oModel, sName){
				return this.getView().setModel(oModel, sName);
			},

			fnGetProducts: function(){

				var uri = this.getServiceApi() + "products",
					token = window.sessionStorage.getItem('Authorization');

				var oViewModel =  this.getOwnerComponent().getModel("products");
				var oHeaders = {
					"Authorization": token
				};

				return oViewModel.loadData(uri, null, true, "GET", null, false, oHeaders);

			},
			
			fnPartnerDetails:function(){
				var serviceApi = this.getServiceApi(),
					email = window.sessionStorage.getItem('PartnerEmail'),
					token = window.sessionStorage.getItem('Authorization');

				return jQuery.ajax({
					type:	'GET',
					url:	serviceApi + 'partners/email?value='+ email,
					beforeSend:function(requestHeader){
						requestHeader.setRequestHeader('Authorization', token);
					},
				});
			},

			fnLogin: function(oData){	
				var serviceApi = this.getServiceApi();

				return jQuery.ajax({
					type: 	'POST',
					url: 	serviceApi + 'login',
					contentType: 'application/json',
					data: JSON.stringify(oData),
					success: function(data, textStatus, jqXHR){					
							window.sessionStorage.setItem('Authorization', jqXHR.getResponseHeader('Authorization'))
							window.sessionStorage.setItem('PartnerEmail', oData.email);
						}
					});
			},

			fnLogOff: function(){
				window.sessionStorage.removeItem('Authorization')
				window.sessionStorage.removeItem('PartnerEmail');
				this.getRouter().navTo('appLogin');
			}

		});

	});