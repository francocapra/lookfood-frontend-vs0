sap.ui.define([	
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	], function (BaseController, JSONModel, MessageToast) {
		"use strict";

		return BaseController.extend("lookfood.resources.Lookfood.controllers.Login", {
			
			onInit: function(){
				var oViewModel,
					oSessionModel;
				
				oViewModel = new JSONModel({
					busy: true,
					delay: 0					
				});

				this.setModel(oViewModel, "loginView");
				
				this.byId("pageLogin").addEventDelegate({
					"onAfterRendering": function () {
						this.getView().loaded().then(function(){
							this.getModel("loginView").setProperty("/busy", false);					
						}.bind(this));
					}.bind(this)
			   	}, this);

			   	oSessionModel = new JSONModel({
					email : null,
					password : null
				});
				this.setModel(oSessionModel, "sessionModel");

			},


			onNavBack : function() {
				history.go(-1);
			},

			onChangedEmail: function(oEvent){
				var oViewModel = this.getModel("sessionModel");
				if (oEvent.getParameters("value")){
					oViewModel.setProperty("/email", oEvent.getParameters("value").value );	
				}else{
					MessageToast.show(this.getResourceBundle().getText("userInputPlaceholder"));
				}
			},

			onChangedPassword: function(oEvent){
				var oViewModel = this.getModel("sessionModel");
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

			_fnValidData: function(oViewModel){				
				if (!oViewModel.oData.email){
					MessageToast.show(this.getResourceBundle().getText("userInputPlaceholder"));
					return false;
				}
				if (!oViewModel.oData.password){
					MessageToast.show(this.getResourceBundle().getText("passwordInputPlaceholder"));
					return false;
				}
				return true;				
			},

			onLoginBtnPress: function (event) {

				var oViewModel = this.getModel("sessionModel");
				
				if (this._fnValidData(oViewModel)){				
					this.showGlobalLoader();				
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