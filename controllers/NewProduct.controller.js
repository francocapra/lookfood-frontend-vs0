sap.ui.define([
	"lookfood/resources/main/controllers/Base"
	], function (Base) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.NewProduct", {

			onInit: function(){
				oBaseController = this;
			},

			onExit:function(){
				console.log('exiting');
			},

			onProductDescChange:function(event){
				let input = event.getSource();

				if(input.getValue() === '')
					input.setValueState(sap.ui.core.ValueState.Error);
				else
					input.setValueState(sap.ui.core.ValueState.None);
			},

			onSaveProductPress: function(){

				oBaseController.showGlobalLoader();

				let oData = {
					description : this.byId('txtNewPrdDesc').getValue(),
					price : this.byId('txtNewPrdPrice').getValue(),
					currency : this.byId('txtNewPrdPrice').getDescription(),
					chef : this.byId('txtNewPrdRespo').getValue(),
					auxiliar : this.byId('txtNewPrdAux').getValue(),
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
						sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('newPrdSuccessfullMessage'));
					},
					error:function(error, textStatus, oResponse){
						console.log(error, textStatus, oResponse);
						sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('newPrdFailureMessage'));
					},
					complete:function(){
						oBaseController.hideGlobalLoader();
					}
				});
			}
		});

	});