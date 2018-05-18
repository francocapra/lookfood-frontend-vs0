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

		});

	});