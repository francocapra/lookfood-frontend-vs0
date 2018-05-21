sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base",
	"sap/ui/model/json/JSONModel"
	], function (Controller, Base) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";
		var oController;

		return Base.extend("gourmeo.resources.main.controllers.Login", {

			onInit: function(){
				oController = this;
			},

			performLogin: function(email, password){
				
				let oData = {
					email: email,
					password: password,
				}

				return $.ajax({
					type: 'POST',
					url: service+'login',
					contentType: 'application/json',
					data: JSON.stringify(oData)
				});
			},

			getPartnerDetails:function(email){

				return $.ajax({
					type:'GET',
					url:oController.getServiceApi()+'partners/email?value='+email,
					beforeSend:function(request){
						request.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
					}
				});
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

				let email = this.byId('txtUserId').getValue();
				let password = this.byId('txtPassword').getValue();

				$.when(oController.performLogin(email, password)).then(function(data, textStatus, jqXHR){
					
					if(jqXHR.status == 200){

						window.sessionStorage.setItem('Authorization', jqXHR.getResponseHeader('Authorization'))
						window.sessionStorage.setItem('PartnerEmail', oController.byId('txtUserId').getValue());

						oController.byId('txtUserId').setValue(null);
						oController.byId('txtPassword').setValue(null);

						$.when(oController.getPartnerDetails(email)).then(function(data, textStatus, jqXHR){

							if(jqXHR.status == 200)
							{
								let partnerModel = new sap.ui.model.json.JSONModel(data);

								oController.setModel(partnerModel, 'PartnerProfile');
							}

							oController.hideGlobalLoader();
							oApplication.app.to('viewCockpit');

						});

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