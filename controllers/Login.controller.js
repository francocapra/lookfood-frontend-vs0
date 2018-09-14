sap.ui.define([	
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	], function (BaseController, JSONModel, MessageToast) {
		"use strict";

		return BaseController.extend("lookfood.resources.Lookfood.controllers.Login", {
			
			onInit: function(){

				this._oViewModel = new JSONModel({
					email : null,
					password : null
				});

				this.setModel(this._oViewModel, "loginView");
			},


			onNavBack : function() {
				history.go(-1);
			},

			onChangedEmail: function(oEvent){
				
				if (oEvent.getParameters("value")){
					this._oViewModel.setProperty("/email", oEvent.getParameters("value").value );	
				}else{
					MessageToast.show(this.getResourceBundle().getText("userInputPlaceholder"));
				}
			},

			onChangedPassword: function(oEvent){
				
				if (oEvent.getParameters("value")){
					this._oViewModel.setProperty("/password", oEvent.getParameters("value").value );
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

			_fnValidData: function(oViewModel){	
				var inputUser = this.byId("inputUser").getValue();
				var inputPassword = this.byId("inputPassword").getValue();
				
				this._oViewModel.setProperty("/email", inputUser );
				this._oViewModel.setProperty("/password", inputPassword );
					
				if (!this._oViewModel.oData.email){
					MessageToast.show(this.getResourceBundle().getText("userInputPlaceholder"));
					return false;
				}
				if (!this._oViewModel.oData.password){
					MessageToast.show(this.getResourceBundle().getText("passwordInputPlaceholder"));
					return false;
				}
				return true;				
			},

			onLoginBtnPress: function (oEvent) {
				
				if (this._fnValidData()){				
					this.showGlobalLoader();				
					$.when(this.fnLogin(this._oViewModel.oData))
						.done(function(){
							this.getRouter().navTo('appCockpit');	
						}.bind(this))										
						.fail(function(){
							MessageToast.show(this.getResourceBundle().getText('loginErrInvalidLogin'));						
							this.hideGlobalLoader();
						}.bind(this))
				}
			},

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

			onPressCreateUser:function(oEvent){

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