sap.ui.define([
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("lookfood.resources.Lookfood.controllers.App", {

			onInit: function(){
				var oViewModel ;
				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});
				this.setModel(oViewModel, "appView");

				this.byId("appRoot").addEventDelegate({
					"onAfterRendering": function () {
						this.getView().loaded().then(function(){
							this.getModel("appView").setProperty("/busy", false);					
						}.bind(this));
					}.bind(this)
			   }, this);

				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

		});

	});