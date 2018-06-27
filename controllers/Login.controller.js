sap.ui.define([	
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	], function (BaseController, JSONModel, MessageToast) {
		"use strict";

		return BaseController.extend("lookfood.resources.Lookfood.controllers.Login", {
			
			onInit: function(){
				var oViewModel = new JSONModel({
					email : null,
					password : null
				});
				this.setModel(oViewModel, "loginView")
			},

			onNavBack : function() {
				history.go(-1);
			},

			onChangedEmail: function(oEvent){
				var oViewModel = this.getModel("loginView");
				if (oEvent.getParameters("value")){
					oViewModel.setProperty("/email", oEvent.getParameters("value").value );	
				}else{
					MessageToast.show(this.getResourceBundle().getText("userInputPlaceholder"));
				}
			},

			onChangedPassword: function(oEvent){
				var oViewModel = this.getModel("loginView");
				if (oEvent.getParameters("value")){
					oViewModel.setProperty("/password", oEvent.getParameters("value").value );
				}else{
					MessageToast.show(this.getResourceBundle().getText("passwordInputPlaceholder"));
				}
			},


			closeDialog:function(event){
				event.getSource().getParent().close();
			},

			destroyDialog:function(event){
				event.getSource().destroy();
			},

			onLoginBtnPress: function (event) {

				this.showGlobalLoader();				
				var oViewModel = this.getModel("loginView");

				$.when(this.fnLogin(oViewModel.oData))
					.done(function(){
						this.getRouter().navTo('appCockpit');	
					}.bind(this))										
					.fail(function(){
						MessageToast.show(this.getResourceBundle().getText('loginErrInvalidLogin'));						
					}.bind(this))
					.always(function(){
						this.hideGlobalLoader();
					}.bind(this));

			},
			
			// _fnLoginCompleted: function(){	

			// 	jQuery.when(this.fnPartnerDetails())	
			// 		.done(function(oData){
			// 			var oViewModel = new JSONModel(oData);
			// 			this.getOwnerComponent().setModel(oViewModel, 'modelPartnerProfile');
			// 			this.getRouter().navTo('appCockpit')
			// 		}.bind(this))				
			// 		.fail(function(){
			// 			MessageToast.show(this.getResourceBundle().getText('loginErrPartnerDetails'));
			// 		}.bind(this));
			// },
			

			onNewUserLinkPress: function () {

				var newUserDialog = sap.ui.xmlfragment(this.getView().getId(),
					'lookfood.resources.Lookfood.views.NewUserDialog', this);

				this.getView().addDependent(newUserDialog);

				newUserDialog.open();
			},

			onForgotPassLinkPress: function () {

				var forgotPassDialog = sap.ui.xmlfragment(this.getView().getId(),
					'lookfood.resources.Lookfood.views.ForgotPassword', this);

				this.getView().addDependent(forgotPassDialog);

				forgotPassDialog.open();
			},

			onPressCreateUser:function(){

				this.showGlobalLoader();

				let oData = {
					email:	this.byId('txtNewUserEmail').getValue(),
					password:	this.byId('txtNewUserPass').getValue()
				}

				$.ajax({
					type:	'POST',
					url:	this.getServiceApi()+'partners',
					contentType:	'application/json',
					data:	JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){

						this.hideGlobalLoader();

						if(jqXHR.status == 200 || jqXHR.status == 201){

							let succDialog = new sap.m.Dialog({
								title: this.getResourceBundle().getText('createUserSuccTitle'),
								content:[	new sap.m.HBox({
												justifyContent:'Center',
												alignItems:'Center',
												items:[	new sap.m.Text({
																text: this.getResourceBundle().getText('createUserSuccText')})
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
					}.bind(this),
					error:function(jqXHR, textStatus, errorThrown){
						this.hideGlobalLoader();
						console.log(jqXHR, textStatus, errorThrown);
					}.bind(this)
				});
			},

			onRecoverPass:function(){

				this.showGlobalLoader()

				var email = this.byId('txtForgotEmail').getValue();

				var oData = {
					email: email
				}

				$.ajax({
					type:'POST',
					url:this.getServiceApi()+'auth/forgot',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){
						this.hideGlobalLoader()
						if(jqXHR.status == 200 || jqXHR.status == 201){
							alert('email recuperado')
						}
					}.bind(this),
					error:function(jqXHR, textStatus, errorThrown){
						this.hideGlobalLoader()
						console.log(jqXHR, textStatus, errorThrown);
					}.bind(this)
				});

			}

		});

});