sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gourmeo/resources/main/controllers/Base"
	], function (Controller, Base) {
		"use strict";

		var oBaseController;

		var showGlobalLoader = function () {
			sap.ui.core.BusyIndicator.show(0);
		};

		var hideGlobalLoader = function () {
			sap.ui.core.BusyIndicator.hide();
		};

		return Base.extend("gourmeo.resources.main.controllers.PartnerProfile", {

			onNavButtonPress:function(){
				oApplication.app.back();
			},

			onInit: function(){
				oBaseController = this;
			},

			onBeforeRendering:function(){
				
			},

			uploadPartnerPicture:function(file, authToken){

				let formData = new FormData();

				formData.append('file', file, file.name);

				return $.ajax({
					type:'POST',
					url:oBaseController.getServiceApi()+'partners/picture',
					data: formData,
					async:true,
					cache:false,
					contentType:false,
					processData:false,
					beforeSend:function(request){
						request.setRequestHeader('Authorization', authToken)
					}
				})
			},

			setPartnerPicture:function(){

				let fileUploader = new sap.ui.core.HTML({
					content: '<input type="file" id="partnerPicUploader" accept="image/*" style="display: none;" />'
				});

				let pictureDialog = new sap.m.Dialog({
					title: oBaseController.getResourceBundle().getText('partnerPicDialogTitle'),
					draggable: true,
					content:[
					new sap.m.VBox({
						justifyContent:'Center',
						alignItems:'Center',
						items:[
						new sap.m.Image('partnerProfilePicture',{
							src: oBaseController.getBucketApi()+'partner'+oBaseController.getModel('PartnerProfile').getProperty('/id')+'.jpg',
							width:'128px',
							height:'128px',
							error:function(event){
								event.getSource().setSrc('imgs/boss.png');
							},
							press:function(){

								let _uploader = $('#partnerPicUploader');

								_uploader.on('change', function(){
									let file = this.files[0];
									let authToken = window.sessionStorage.getItem('Authorization');

									if(!file)
										return;

									pictureDialog.setBusyIndicatorDelay(0).setBusy(true);

									$.when(oBaseController.uploadPartnerPicture(file, authToken)).done(function(data,textStatus,jqXHR){
										let location = jqXHR.getResponseHeader('location')

										sap.ui.getCore().byId('partnerProfilePicture').setSrc(location);

										pictureDialog.setBusy(false);
									}).fail(function(a,b,c){
										console.log(a,b,c);
										pictureDialog.setBusy(false);
									});
								});

								_uploader.trigger('click');
							}
						}).addStyleClass('partnerProfilePicture'),
						fileUploader
						]
					}).addStyleClass('sapUiSmallMargin')
					],
					beginButton: new sap.m.Button({
						text:oBaseController.getResourceBundle().getText('btnSave'),
						type:'Emphasized'
					}),
					endButton: new sap.m.Button({
						text: oBaseController.getResourceBundle().getText('btnCancel'),
						press:function(){
							pictureDialog.close();
						}
					}),
					afterClose:function(){
						pictureDialog.destroy();
					}
				}).open();
			}
		});

	});