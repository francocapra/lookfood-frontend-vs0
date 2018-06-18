sap.ui.define([	
	"lookfood/resources/main/controllers/Base",
	"sap/ui/core/routing/History"
	], function (Base,History) {
		"use strict";

		var oBaseController;

		return Base.extend("lookfood.resources.main.controllers.PartnerProfile", {

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

									$.when(oBaseController.uploadPartnerPicture(file, authToken))
									.done(function(data,textStatus,oResponse){
										let location = oResponse.getResponseHeader('location')

										sap.ui.getCore().byId('partnerProfilePicture').setSrc(location);
									})
									.fail(function(a,b,c){
										console.log(a,b,c);
									})
									.always(function(){
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