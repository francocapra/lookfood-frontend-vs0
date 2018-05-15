sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
	"use strict";

	return UIComponent.extend("gourmeo.resources.main.Component", {

		constructor: function(sId, mSettings) {
			UIComponent.call(this, "appComponent", mSettings);
		},

		metadata: {
			"rootView": {
				"viewName": "gourmeo.resources.main.views.App",
				"type": "XML",
				"async": true,
				"id": "appRootView"
			}
		},

		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set i18n model
			var i18nModel = new ResourceModel({
				bundleName: "gourmeo.resources.main.res.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");
		}
	});

});