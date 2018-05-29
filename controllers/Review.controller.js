sap.ui.define([
	"gourmeo/resources/main/controllers/Base"
	], function (Base) {
		"use strict";

		var oBaseController;

		return Base.extend("gourmeo.resources.main.controllers.Review", {

			onInit: function(){
				oBaseController = this;
			},

			getTopProducts: function(){

				let authToken = window.sessionStorage.getItem('Authorization');

				return $.ajax({
					type:'GET',
					url:oBaseController.getServiceApi()+'products/top',
					beforeSend:function(oRequest){
						oRequest.setRequestHeader(authToken);
					}
				});
			},

			onNavButtonPress:function(){
				oApplication.app.back();
			},
		});

	});