sap.ui.define([
	"lookfood/resources/main/controllers/Base"
	], function (Base) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.NewProfessional", {

			onInit: function(){
				oBaseController = this;
			}
		});

	});