sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"lookfood/resources/main/controllers/Base",
	"sap/ui/model/json/JSONModel"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.Login", {

			onInit: function(){
				oBaseController = this;
			},

			performLogin: function(email, password){
				
				let oData = {
					email: email,
					password: password,
				}

				return $.ajax({
					type: 'POST',
					url: oBaseController.getServiceApi()+'login',
					contentType: 'application/json',
					data: JSON.stringify(oData)
				});
			},

			getPartnerDetails:function(email){

				return $.ajax({
					type:'GET',
					url:oBaseController.getServiceApi()+'partners/email?value='+email,
					beforeSend:function(request){
						request.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
					}
				});
			},

			onExit:function(){
				oBaseController = null;
			},

			closeDialog:function(event){
				event.getSource().getParent().close();
			},

			destroyDialog:function(event){
				event.getSource().destroy();
			},

			onLoginBtnPress: function (event) {

				oBaseController.showGlobalLoader();

				let email = this.byId('txtUserId').getValue();
				let password = this.byId('txtPassword').getValue();

				$.when(oBaseController.performLogin(email, password)).done(function(data, textStatus, jqXHR){
					
					if(jqXHR.status == 200){

						window.sessionStorage.setItem('Authorization', jqXHR.getResponseHeader('Authorization'))
						window.sessionStorage.setItem('PartnerEmail', oBaseController.byId('txtUserId').getValue());

						oBaseController.byId('txtUserId').setValue(null);
						oBaseController.byId('txtPassword').setValue(null);

						$.when(oBaseController.getPartnerDetails(email)).done(function(data, textStatus, jqXHR){

							if(jqXHR.status == 200)
							{
								let partnerModel = new sap.ui.model.json.JSONModel(data);

								oBaseController.setModel(partnerModel, 'PartnerProfile');
							}

							oBaseController.getRouter().navTo('appCockpit'); 

						}).fail(function(a,b,c){
							console.log(a,b,c);
							sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('loginErrPartnerDetails'));
							oBaseController.getRouter().navTo('appCockpit'); 
						}).always(function(){
							oBaseController.hideGlobalLoader();
						});
					}

				}).fail(function(a,b,c){
					oBaseController.hideGlobalLoader();
					sap.m.MessageToast.show(oBaseController.getResourceBundle().getText('loginErrInvalidLogin'));
					console.log(a,b,c);
				});

			},

			onNewUserLinkPress: function () {

				let newUserDialog = sap.ui.xmlfragment(this.getView().getId(),
					'lookfood.xml.fragments.NewUserDialog', this);

				this.getView().addDependent(newUserDialog);

				newUserDialog.open();
			},

			onForgotPassLinkPress: function () {

				let forgotPassDialog = sap.ui.xmlfragment(this.getView().getId(),
					'lookfood.xml.fragments.ForgotPassword', this);

				this.getView().addDependent(forgotPassDialog);

				forgotPassDialog.open();
			},

			onPressCreateUser:function(){

				oBaseController.showGlobalLoader();

				let oData = {
					email:this.byId('txtNewUserEmail').getValue(),
					password:this.byId('txtNewUserPass').getValue()
				}

				$.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'partners',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){

						oBaseController.hideGlobalLoader();

						if(jqXHR.status == 200 || jqXHR.status == 201){
							let succDialog = new sap.m.Dialog({
								title: oBaseController.getResourceBundle().getText('createUserSuccTitle'),
								content:[
								new sap.m.HBox({
									justifyContent:'Center',
									alignItems:'Center',
									items:[
									new sap.m.Text({
										text: oBaseController.getResourceBundle().getText('createUserSuccText')
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
						oBaseController.hideGlobalLoader();
						console.log(jqXHR, textStatus, errorThrown);
					}
				});
			},

			onRecoverPass:function(){

				oBaseController.showGlobalLoader()

				let email = this.byId('txtForgotEmail').getValue();

				var oData = {
					email:email
				}

				$.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'auth/forgot',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){
						oBaseController.hideGlobalLoader()
						if(jqXHR.status == 200 || jqXHR.status == 201){
							alert('email recuperado')
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						oBaseController.hideGlobalLoader()
						console.log(jqXHR, textStatus, errorThrown);
					}
				});

			}

		});

});