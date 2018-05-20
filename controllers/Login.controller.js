sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;

		return Base.extend("gourmeo.resources.main.controllers.Login", {

			onInit: function(){
				oController = this;
			},

			onExit:function(){
				oController = null;
			},

			closeDialog:function(event){
				event.getSource().getParent().close();
			},

			destroyDialog:function(event){
				event.getSource().destroy();
			},

			onLoginBtnPress: function (event) {

				oController.showGlobalLoader();

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
						window.sessionStorage.setItem('Authorization', jqXHR.getResponseHeader('Authorization'))
						oController.hideGlobalLoader();
						oApplication.app.to('viewCockpit');
					},
					error: function (jqXHR, textStatus, errorThrown) {
						oController.hideGlobalLoader();
						console.log(jqXHR.responseText);
						sap.m.MessageToast.show(oController.getResourceBundle().getText('invalidLogin'));
					}
				});
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

				oController.showGlobalLoader();

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

						oController.hideGlobalLoader();

						if(jqXHR.status == 200 || jqXHR.status == 201){
							let succDialog = new sap.m.Dialog({
								title: oController.getResourceBundle().getText('createUserSuccTitle'),
								content:[
								new sap.m.HBox({
									justifyContent:'Center',
									alignItems:'Center',
									items:[
									new sap.m.Text({
										text: oController.getResourceBundle().getText('createUserSuccText')
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
						oController.hideGlobalLoader();
						console.log(jqXHR, textStatus, errorThrown);
					}
				});
			},

			onRecoverPass:function(){

				oController.showGlobalLoader()

				let email = this.byId('txtForgotEmail').getValue();

				var oData = {
					email:email
				}

				$.ajax({
					type:'POST',
					url:service+'auth/forgot',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){
						oController.hideGlobalLoader()
						if(jqXHR.status == 200 || jqXHR.status == 201){
							alert('email recuperado')
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						oController.hideGlobalLoader()
						console.log(jqXHR, textStatus, errorThrown);
					}
				});

			}

		});

	});