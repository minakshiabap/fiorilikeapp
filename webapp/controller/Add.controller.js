sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MsgToast, MsgBox) {
	"use strict";
 
	return Controller.extend("cap.fin.ar.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.Add
		 */
		onInit: function() {
			var oLocalModel = new JSONModel();
			oLocalModel.setData({
				"productData": {
					    "PRODUCT_ID" : "",
					    "TYPE_CODE" : "PR",
					    "CATEGORY" : "Notebooks",
					    "NAME" : "Coronavirus 2019",
					    "DESCRIPTION" : "",
					    "SUPPLIER_ID" : "0100000047",
					    "PRICE" : "1249.00",
					    "CURRENCY_CODE" : "EUR",
					    "DIM_UNIT" : "CM"
					}
			});
			this.getView().setModel(oLocalModel,"local");
		},
		oSuppPopup: null,
		onRequest: function(){
			if(!this.oSuppPopup){
				this.oSuppPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.popup", this);
				this.getView().addDependent(this.oSuppPopup);
				this.oSuppPopup.bindAggregation("items",{
					path: '/SupplierSet',
					template: new sap.m.DisplayListItem({
						label: "{BP_ID}",
						value: "{COMPANY_NAME}"
					})
				});
				this.oSuppPopup.setMultiSelect(false);
				this.oSuppPopup.setTitle("Suppliers of your choice");
			}
			this.oSuppPopup.open();
		},
		onSave: function(){
			//step 1: get the object of odata model
			var oDataModel = this.getView().getModel();
			//step 2: fetch the data from screen - local model
			var payload = this.getView().getModel("local").getProperty("/productData");
			//step 3: call the sap odata service to post the data
			oDataModel.create("/ProductSet", payload, {
				success: function(data){
					MsgToast.show("The product is created successfully!-" , data.PRODUCT_ID);
				},
				error: function(oErr){
					MsgBox.error("Rola peh Gaya");
				}
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.Add
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.Add
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.Add
		 */
		//	onExit: function() {
		//
		//	}

	});

});