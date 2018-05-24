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

			onSelectionChange: function(oEvent) {
				let oSelectedItem = oEvent.getParameter("listItem");
				let oModel = oSelectedItem.getBindingContext('PartnerPrdCollection').getObject();
				
				let oDialog = new sap.m.Dialog({
					title:oBaseController.getResourceBundle().getText('itemDialogHeader'),
					content:[
					new sap.m.HBox({
						items:[
						new sap.m.FlexBox({
							alignItems:'Start',
							justifyContent:'Center',
							items:[
							new sap.m.Image({
								src:'imgs/food.png',
								width:'128px',
								height:'128px'
							}).addStyleClass('productPicture')
							]
						}),
						new sap.m.VBox({
							items:[
							new sap.m.Label({
								text: oBaseController.getResourceBundle().getText('tableColumnItem')
							}),
							new sap.m.Text({
								text: oModel.id
							}).addStyleClass('sapUiSmallMarginBottom'),
							new sap.m.Label({
								text:oBaseController.getResourceBundle().getText('tableColumnDesc'),
								labelFor:'txtItemDesc'
							}),
							new sap.m.Input('txtItemDesc',{
								value:oModel.description
							}),
							new sap.m.Label({
								text: oBaseController.getResourceBundle().getText('tableColumnChef'),
								labelFor:'txtItemChef'
							}),
							new sap.m.Input('txtItemChef',{
								value: oModel.chef
							}),
							new sap.m.Label({
								text: oBaseController.getResourceBundle().getText('tableColumnAux'),
								labelFor:'txtItemAux'
							}),
							new sap.m.Input('txtItemAux',{
								value: oModel.aux
							})
							]
						})
						]
					}).addStyleClass('sapUiTinyMargin sapUiMediumMarginEnd')
					],
					beginButton:new sap.m.Button({
						type:'Emphasized',
						text: oBaseController.getResourceBundle().getText('btnSave')
					}),
					endButton:new sap.m.Button({
						text: oBaseController.getResourceBundle().getText('btnCancel'),
						press:function(){
							oDialog.close();
						}
					}),
					afterClose:function(){
						oDialog.destroy();
					}
				});

				oDialog.open();
			}
		});

	});