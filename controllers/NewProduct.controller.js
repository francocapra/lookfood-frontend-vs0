sap.ui.define([
	"lookfood/resources/main/controllers/Base",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
	], function (Base,MessageToast,History) {
		"use strict";

		var oBaseController;
		var oFile;

		return Base.extend("lookfood.resources.main.controllers.NewProduct", {

			onInit: function(){
				oBaseController = this;
			},
			
			onNavBack: function (oEvent) {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("appProductManagement", {}, true );					
				}
			},

			onExit:function(){
				console.log("exiting");
			},

			onProductDescChange: function(oEvent){
				let input = oEvent.getSource();

				if(input.getValue())
					input.setValueState(sap.ui.core.ValueState.None);
				else
					input.setValueState(sap.ui.core.ValueState.Error);
			},

			handleTypeMissmatch: function(oEvent){	
				var aFileTypes = oEvent.getSource().getFileType();
				jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
				var sSupportedFileTypes = aFileTypes.join(", ");
				MessageToast.show( this.getResourceBundle()
									   .getText("newPrdMsgTypeMissmatch" ,
									    		[oEvent.getParameter("fileType")] ,
												[sSupportedFileTypes] ));		
			},

			onSaveProductPress: function(oEvent){

				oBaseController.showGlobalLoader();
			
				let fnPostBody = function() {
					
					var body = {
						description : this.byId("txtNewPrdDesc").getValue(),
						price : this.byId("txtNewPrdPrice").getValue(),
						currency : this.byId("txtNewPrdPrice").getDescription(),
						idExternal: this.byId("txtExternalId").getValue()
					}
					return $.ajax({
							type: "POST",
							url: oBaseController.getServiceApi()+"products",
							contentType: "application/json",
							data: JSON.stringify(body),
						beforeSend:function(request){
							request.setRequestHeader("Authorization", window.sessionStorage.getItem("Authorization"));
						},
						success:function(){
							MessageToast.show(oBaseController.getResourceBundle().getText("newPrdSuccessfullMessage"));
						},
						error:function(error, textStatus, oResponse){						
							MessageToast.show(oBaseController.getResourceBundle().getText("newPrdFailureMessage"));
						},
						complete:function(){
							oBaseController.hideGlobalLoader();
						}
					});
				}
				
				let fnPostImg = function(response){

					var oFileUploader = oBaseController.getView().byId("prdPictureUploader");

					if(!oFileUploader.getValue()){ 
						MessageToast.show(this.getResourceBundle().getText("newPrdMessageMissingFile"));								
						return;
					}
					var formData = new FormData();

					var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

					if(file){
						formData.append( "file", file, file.name);
					}				
					
					var sLocation = response.getResponseHeader("location");
					var aIdProduct = location.substring(location.lastIndexOf("/")+1, sLocation.length);
					var sURL = oBaseController.getServiceApi()+"products?id="+aIdProduct;

					return $.ajax({
							type: "POST",
							url: sURL,
							data: formData,
							async:true,
							cache:false,
							contentType:false,
							processData:false,
						beforeSend:function(oRequestHeader){
							oRequestHeader.setRequestHeader("Authorization", window.sessionStorage.getItem("Authorization"));
						},
						success:function(){
							MessageToast.show(oBaseController.getResourceBundle().getText("newPrdSuccessfullMessage"));
						},
						error:function(){						
							MessageToast.show(oBaseController.getResourceBundle().getText("newPrdFailureMessage"));
						},
						complete:function(){
							oBaseController.hideGlobalLoader();
						}
					});
				};

				$.when(fnPostBody()).done(function(data,status,response){fnPostImg(response);});

			}
		});

	});