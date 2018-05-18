sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
	], function (Controller, MessageToast) {
		"use strict";

		var service = "https://app-lookfood.herokuapp.com/";

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Controller.extend("gourmeo.resources.main.controllers.App", {

			onInit: function(){

				var oBundle = this.getView().getModel('i18n');

				var loginView = new sap.ui.xmlview('viewLogin','gourmeo.resources.main.views.Login').setModel(oBundle);
				var cockpitView = new sap.ui.xmlview('viewCockpit', 'gourmeo.resources.main.views.Cockpit').setModel(oBundle);
				var itemMgmtView = new sap.ui.xmlview('viewItemMgmt','gourmeo.resources.main.views.ItemManagement').setModel(oBundle);
				var profMgmtView = new sap.ui.xmlview('viewProfMgmt','gourmeo.resources.main.views.ProfessionalManagement').setModel(oBundle);
				var newReviewItemView = new sap.ui.xmlview('viewNewItem','gourmeo.resources.main.views.NewReviewItem').setModel(oBundle);
				var newReviewProfView = new sap.ui.xmlview('viewNewProfessional','gourmeo.resources.main.views.NewReviewProfessional').setModel(oBundle);
				var reviewView = new sap.ui.xmlview('viewReviewMode','gourmeo.resources.main.views.Review').setModel(oBundle);
				var partnerProfileView = new sap.ui.xmlview('viewPartnerProfile','gourmeo.resources.main.views.PartnerProfile').setModel(oBundle);

				oApplication.app = this.byId('gourmeoApp');

				oApplication.app.addPage(loginView)
				.addPage(cockpitView)
				.addPage(itemMgmtView)
				.addPage(profMgmtView)
				.addPage(newReviewItemView)
				.addPage(newReviewProfView)
				.addPage(reviewView)
				.addPage(partnerProfileView);

			},

			onNavButtonPress: function(){
				this.getAppObj().back();
			},



			onNewUserLinkPress: function () {

				var newUserDialog = sap.ui.xmlfragment('gourmeo.xml.fragments.NewUserDialog');
				this.getView().addDependent(newUserDialog);

				newUserDialog.open();
			},

			onForgotPassLinkPress: function () {

				var oBundle = this.getView().getModel('i18n').getResourceBundle();

				var forgotPassDialog = new sap.m.Dialog({
					title: oBundle.getText('forgotPassDialogTitle'),
					content: [
					new sap.m.HBox({
						justifyContent: 'Center',
						alignItems: 'Center',
						items: [
						new sap.ui.core.Icon({
							src: 'sap-icon://email',
							size: '2em',
							color: '#d52941'
						}).addStyleClass('sapUiTinyMargin'),
						new sap.m.Input({
							placeholder: oBundle.getText('forgotPassField'),
							type: sap.m.InputType.Email
						})
						]
					})
					],
					beginButton: new sap.m.Button({
						type: 'Emphasized',
						text: oBundle.getText('btnRecoverPass'),
						press: function () {

						}
					}),
					endButton: new sap.m.Button({
						text: oBundle.getText('btnCancel'),
						press: function () {
							forgotPassDialog.close();
						}
					}),
					afterClose: function () {
						forgotPassDialog.close();
					}
				}).addStyleClass('sapUiContentPadding');

				forgotPassDialog.open();
			},

		//Cockpit Page
		onLogoffBtnPress: function () {
			var app = this.getAppObj();
			var oBundle = this.getView().getModel('i18n').getResourceBundle();
			var controller = this;

			var logOffDialog = new sap.m.Dialog({
				title: oBundle.getText('logoffDialogTitle'),
				type: 'Message',
				content: [
				new sap.m.Text({
					text: oBundle.getText('logoffDialogMessage')
				})
				],
				beginButton: new sap.m.Button({
					text: oBundle.getText('logoffConfirmBtn'),
					press: function () {
						logOffDialog.close();
						app.to(controller.createId('pageLogin'));
					}
				}),
				endButton: new sap.m.Button({
					text: oBundle.getText('logoffCancelBtn'),
					type: 'Emphasized',
					press: function () {
						logOffDialog.close();
					}
				}),
				afterClose: function () {
					logOffDialog.destroy();
				}
			}).open();
		},

		onTileItemMgmtPress: function(){
			this.getAppObj().to(this.createId('pageItemsMgmt'));
		},

		onTileProfMgmtPress: function(){
			this.getAppObj().to(this.createId('pageProfMgmt'));
		},

		onTilePartProfPress: function(){
			this.getAppObj().to(this.createId('pagePartnerProfile'));
		},

		onTileReviewModePress: function(){
			this.getAppObj().to(this.createId('pageReview'));
		},

		onAddItemPress: function(){
			this.getAppObj().to(this.createId('pageNewItem'));
		},

		onAddProfPress: function(){
			this.getAppObj().to(this.createId('pageNewProfessional'));
		}
	});

});