sap.ui.define([	
	"lookfood/resources/Lookfood/controllers/Base",
	"sap/ui/core/routing/History",
	'jquery.sap.global',
	"sap/ui/model/json/JSONModel",
	'sap/ui/core/Fragment'
	], function (Base, History, jQuery, JSONModel, Fragment) {
		"use strict";

		var oViewModel = new JSONModel({});

		return Base.extend("lookfood.resources.Lookfood.controllers.ProfileSettings", {

			onInit: function(){
				var oSettingsModel = new JSONModel({
					currentUser: "Administrator",
					lastLogin: new Date(Date.now() - 86400000)
				});

				this.setModel(oSettingsModel, "view");
				
				var oOriginalViewModel = this.getModel('modelPartnerProfile');

				if(!oOriginalViewModel){
					this.showGlobalLoader();
					jQuery.when(this.fnPartnerDetails())
						.done(function(data, textStatus, jqXHR){
							oViewModel.setData(data);	
							this.setModel(oViewModel,"modelPartnerProfile");						
						}.bind(this))
						.always(function(){
							this.hideGlobalLoader();
						}.bind(this));
					
				}
				else{
					this.setModel(oOriginalViewModel,"modelPartnerProfile");
				}																				
				
				// this.getModel().setBindingContext("/modelPartnerProfile");
				
				this.byId('edit').setEnabled(true);
				
				// Set the initial form to be the display one
				// this._showFormFragment("DisplayProfile");
			},
			
			onExit : function () {
				for (var sPropertyName in this._formFragments) {
					if (!this._formFragments.hasOwnProperty(sPropertyName)) {
						return;
					}
	
					this._formFragments[sPropertyName].destroy();
					this._formFragments[sPropertyName] = null;
				}
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
					url:this.getServiceApi()+'partners/picture',
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
					title: this.getResourceBundle().getText('partnerPicDialogTitle'),
					draggable: true,
					content:[
						new sap.m.VBox({
							justifyContent:'Center',
							alignItems:'Center',
							items:[
							new sap.m.Image('partnerProfilePicture',{
								src: this.getBucketApi()+'partner'+ oViewModel.getProperty('/id')+'.jpg',
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

										$.when(this.uploadPartnerPicture(file, authToken))
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
								}.bind(this)
							}).addStyleClass('partnerProfilePicture'),
							fileUploader
							]
						}).addStyleClass('sapUiSmallMargin')
					],
					beginButton: new sap.m.Button({
						text:this.getResourceBundle().getText('btnSave'),
						type:'Emphasized'
					}),
					endButton: new sap.m.Button({
						text: this.getResourceBundle().getText('btnCancel'),
						press:function(){
							pictureDialog.close();
						}
					}),
					afterClose:function(){
						pictureDialog.destroy();
					}
				}).open();

				
			},
			
			// -----------------------------------------------------------------------------//
			// event handler
			//------------------------------------------------------------------------------//
			
			handleEditPress : function () {

				//Clone the data
				this._oPartnerDetails= jQuery.extend({}, oViewModel.oData );
				this._toggleButtonsAndView(true);
	
			},
	
			handleCancelPress : function () {
	
				//Restore the data
				var oData = oViewModel.getData();
	
				oData = this._oPartnerDetails;
	
				oViewModel.setData(oData);
				this._toggleButtonsAndView(false);
	
			},
	
			handleSavePress : function () {
	
				this._toggleButtonsAndView(false);
	
			},	

			// -----------------------------------------------------------------------------//
			// internal methods
			//------------------------------------------------------------------------------//
			_formFragments: {},

			_toggleButtonsAndView : function (bEdit) {
				var oView = this.getView();
	
				// Show the appropriate action buttons
				oView.byId("edit").setVisible(!bEdit);
				oView.byId("save").setVisible(bEdit);
				oView.byId("cancel").setVisible(bEdit);
	
				// Set the right form type
				this._showFormFragment(bEdit ? "ChangeProfile" : "DisplayProfile");
			},
	
			_getFormFragment: function (sFragmentName) {
				var oFormFragment = this._formFragments[sFragmentName];
	
				if (oFormFragment) {
					return oFormFragment;
				}
	
				oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "lookfood.resources.Lookfood.views." + sFragmentName);
	
				this._formFragments[sFragmentName] = oFormFragment;
				return this._formFragments[sFragmentName];
			},
	
			_showFormFragment : function (sFragmentName) {
				// var oPage = this.byId("pagePartnerProfile");
				var oPage = this.byId("shopOwnerLazyLoader");
	
				oPage.removeAllContent();
				oPage.insertContent(this._getFormFragment(sFragmentName));
			}
		});

	});