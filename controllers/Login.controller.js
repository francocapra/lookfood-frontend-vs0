sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;
		var oBundle;

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Controller.extend("gourmeo.resources.main.controllers.Login", {

			onInit: function(){
				oController = this;
			},

			onAfterRendering:function(){
				oBundle = this.getView().getModel("i18n").getResourceBundle();
			},

			onExit:function(){
				oController = null;
				oBundle = null;
			},

			onLoginBtnPress: function (event) {

				showGlobalLoader();

				var oData = {
					email: this.byId('txtUserId').getValue(),
					password: this.byId('txtPassword').getValue(),
				}

				$.ajax({
					type: 'POST',
					url: service+'login',
					contentType: 'application/json',
					data: JSON.stringify(oData),
					success: function (data, textStatus, jqXHR) {
						hideGlobalLoader();
						oApplication.app.to('viewCockpit');
					},
					error: function (jqXHR, textStatus, errorThrown) {
						hideGlobalLoader();
						console.log(jqXHR.responseText);
						sap.m.MessageToast.show(oBundle.getText('invalidLogin'));
					}
				})
			},

			onNewUserLinkPress: function () {

				let newUserDialog = sap.ui.xmlfragment(this.getView().getId(),
					'gourmeo.xml.fragments.NewUserDialog', this);

				this.getView().addDependent(newUserDialog);

				newUserDialog.open();
			},

			onForgotPassLinkPress: function () {

				let forgotPassDialog = sap.ui.xmlfragment(this.getView().getId(),
					'gourmeo.xml.fragments.ForgotPassword', this);

				this.getView().addDependent(forgotPassDialog);

				forgotPassDialog.open();
			},

			onPressCreateUser:function(){

				showGlobalLoader();

				let oData = {
					email:this.byId('txtNewUserEmail').getValue(),
					password:this.byId('txtNewUserPass').getValue()
				}

				$.ajax({
					type:'POST',
					url:service+'partners',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){

						hideGlobalLoader();

						if(jqXHR.status == 200 || jqXHR.status == 201){
							let succDialog = new sap.m.Dialog({
								title:oBundle.getText('createUserSuccTitle'),
								content:[
								new sap.m.HBox({
									justifyContent:'Center',
									alignItems:'Center',
									items:[
									new sap.m.Text({
										text:oBundle.getText('createUserSuccText')
									})
									]
								}).addStyleClass('sapUiSmallMarginTop')
								],
								beginButton: new sap.m.Button({
									text:'OK',
									press:function(){
										succDialog.close();
									}
								}),
								afterClose:function(){
									succDialog.destroy();
								}
							}).open();
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						hideGlobalLoader();
						console.log(jqXHR, textStatus, errorThrown);
					}
				});
			},

			onCloseDialog: function(event){
				event.getSource().getParent().close();
			},

			onDialogAfterClose:function(event){
				event.getSource().destroy();
			}

		});

	});