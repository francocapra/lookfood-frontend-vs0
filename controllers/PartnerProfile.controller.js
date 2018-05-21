sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Base.extend("gourmeo.resources.main.controllers.PartnerProfile", {

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onInit: function(){
				oController = this;
			},

			onBeforeRendering:function(){
				
			},

			setPartnerPicture:function(){
				let pictureDialog = new sap.m.Dialog({
					title: oController.getResourceBundle().getText('partnerPicDialogTitle'),
					draggable: true,
					content:[
					new sap.m.HBox({
						justifyContent:'Center',
						alignItems:'Center',
						items:[
						new sap.m.Image({
							src:'imgs/boss.png'
						}).addStyleClass('partnerProfilePicture')
						]
					}).addStyleClass('sapUiSmallMargin')
					],
					beginButton: new sap.m.Button({
						text:oController.getResourceBundle().getText('btnSave'),
						type:'Emphasized'
					}),
					endButton: new sap.m.Button({
						text: oController.getResourceBundle().getText('btnCancel'),
						press:function(){
							pictureDialog.close();
						}
					}),
					afterClose:function(){
						pictureDialog.destroy();
					}
				}).open();
			}
		});

	});