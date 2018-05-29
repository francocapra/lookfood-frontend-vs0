sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		return Base.extend("gourmeo.resources.main.controllers.NewReviewItem", {

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onInit: function(){
				oBaseController = this;
			},

			onItemDescChange:function(event){
				let input = event.getSource();

				if(input.getValue() === '')
					input.setValueState(sap.ui.core.ValueState.Error);
				else
					input.setValueState(sap.ui.core.ValueState.None);
			},

			onSaveItemPress: function(){

				oBaseController.showGlobalLoader();

				let oData = {
					description : this.byId('txtNewItemDesc').getValue(),
					price : this.byId('txtNewItemPrice').getValue(),
					chef : this.byId('txtNewItemRespo').getValue(),
					auxiliar : this.byId('txtNewItemAux').getValue(),
					idExternal: this.byId('txtExternalId').getValue()
				}

				$.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'products',
					contentType:'application/json',
					data:JSON.stringify(oData),
					beforeSend:function(request){
						request.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
					},
					success:function(data, statusText, oResponse){
						sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('newItemSuccessfullMessage'));
					},
					error:function(error, textStatus, oResponse){
						console.log(error, textStatus, oResponse);
						sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('newItemFailureMessage'));
					},
					complete:function(){
						oBaseController.hideGlobalLoader();
					}
				});
			}
		});

	});