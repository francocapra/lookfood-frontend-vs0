sap.ui.define([	
	"lookfood/resources/main/controllers/Base",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	'jquery.sap.global'
	], function (BaseController, JSONModel, MessageToast, jQuery) {
		"use strict";

		var oThisController;

		var oViewModel = new JSONModel({
			email : null,
			password : null
		});
		 	
		return BaseController.extend("lookfood.resources.main.controllers.Login", {
			
			onInit: function(){
				this.setModel(oViewModel, "modelLogin");
			},

			onNavBack : function() {
				history.go(-1);
			},

			onChangedEmail: function(oEvent){
				if (oEvent.getParameters("value")){
					oViewModel.setProperty("/email", oEvent.getParameters("value").value );	
				}else{
					MessageToast.show(this.getResourceBundle()
					.getText("userInputPlaceholder"));
				}
			},

			onChangedPassword: function(oEvent){
				if (oEvent.getParameters("value")){
					oViewModel.setProperty("/password", oEvent.getParameters("value").value );
				}else{
					MessageToast.show(this.getResourceBundle()
					.getText("passwordInputPlaceholder"));
				}
			},

			onExit:function(){

			},

			closeDialog:function(event){
				event.getSource().getParent().close();
			},

			destroyDialog:function(event){
				event.getSource().destroy();
			},

			onLoginBtnPress: function (event) {

				this.showGlobalLoader();				
				
				jQuery.when(this.fnLogin(oViewModel.oData))
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

				oThisController.showGlobalLoader();

				let oData = {
					email:this.byId('txtNewUserEmail').getValue(),
					password:this.byId('txtNewUserPass').getValue()
				}

				$.ajax({
					type:'POST',
					url:oThisController.getServiceApi()+'partners',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){

						oThisController.hideGlobalLoader();

						if(jqXHR.status == 200 || jqXHR.status == 201){
							let succDialog = new sap.m.Dialog({
								title: oThisController.getResourceBundle().getText('createUserSuccTitle'),
								content:[
								new sap.m.HBox({
									justifyContent:'Center',
									alignItems:'Center',
									items:[
									new sap.m.Text({
										text: oThisController.getResourceBundle().getText('createUserSuccText')
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
						oThisController.hideGlobalLoader();
						console.log(jqXHR, textStatus, errorThrown);
					}
				});
			},

			onRecoverPass:function(){

				oThisController.showGlobalLoader()

				let email = this.byId('txtForgotEmail').getValue();

				var oData = {
					email:email
				}

				$.ajax({
					type:'POST',
					url:oThisController.getServiceApi()+'auth/forgot',
					contentType:'application/json',
					data:JSON.stringify(oData),
					success:function(data, textStatus, jqXHR){
						oThisController.hideGlobalLoader()
						if(jqXHR.status == 200 || jqXHR.status == 201){
							alert('email recuperado')
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						oThisController.hideGlobalLoader()
						console.log(jqXHR, textStatus, errorThrown);
					}
				});

			}

		});

});