sap.ui.define([
	"lookfood/resources/main/controllers/Base",
	"sap/ui/core/routing/History"
	], function (Base,History) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.Review", {

			onInit: function(){
				oBaseController = this;
			},
			
			onNavBack: function (oEvent) {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("appCockpit", {}, true );					
				}
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

			onTypeReviewCodePress:function(){

				let oDialog = new sap.m.Dialog({
					title:'Provide review code',
					content:[
					new sap.m.VBox({
						items:[
						new sap.m.Input({
							placeholder:'Type your review code here'
						})
						]
					}).addStyleClass('sapUiSmallMargin')
					],
					beginButton:new sap.m.Button({
						text:'OK',
						type:'Emphasized'
					}),
					endButton:new sap.m.Button({
						text:'Cancel',
						press:function(){
							oDialog.close();
						}
					}),
					afterClose:function(){
						oDialog.destroy();
					}
				})

				oDialog.open();
			},

			onScanQrCodePress:function(){
				let scanner = null;
				let reviewCode = null;

				let _previewDialog = new sap.m.Dialog({
					title: oBaseController.getResourceBundle().getText('reviewScannerTitle'),
					content: [
					new sap.ui.core.HTML({
						content: '<video id="preview" width="400" heigth="400"></video>'
					})
					],
					beginButton: new sap.m.Button({
						text: oBaseController.getResourceBundle().getText('btnClose'),
						press: function () {
							_previewDialog.close();
						}
					}),
					afterOpen: function () {
						scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
						scanner.addListener('scan', function (content) {
							reviewCode = content;
							_previewDialog.close();
						});
						Instascan.Camera.getCameras().then(function (cameras) {
                                    // alert(cameras[0].name)
                                    if (cameras.length > 0) {
                                    	scanner.activeCameraId = cameras[0].id;
                                    	scanner.start(cameras[0]);
                                    } else {
                                    	console.error('No cameras found.');
                                    	alert("No cameras foud.")
                                    }
                                }).catch(function (e) {
                                	console.error(e);
                                	alert(e);
                                });
                            },
                            beforeClose: function () {
                            	scanner.stop();
                            	scanner = null;
                            },
                            afterClose: function () {
                            	_previewDialog.destroy();
                            	console.log(reviewCode);

                            	let oModel = new sap.ui.model.json.JSONModel(
                            		jQuery.sap.getModulePath('lookfood.mockdata','/reviews/review.json')
                            		);

                            }
                        }).open();
			}
		});

	});