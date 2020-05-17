sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MsgToast) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.View2
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		onPress: function(){
				MsgToast.show("anubhavtrainings.com");
		},
		flag: true,
		onDelete: function(){
			//debugger;
			//step 1: we need to know which product is currently opened by user?
			var sContext = this.oRouter.getHashChanger().getHash().replace("joker","");
			//step 2: get the odata model object
			var oDataModel = this.getView().getModel();
			//step 3: pass the context of the product which is open to delete call /ProductSet('id')
			oDataModel.remove(sContext,{
				success: function(){
					MsgToast.show("deletion was success");
				},
				error: function(){
					
				}
			});
		},
		onHide: function(oEvent){
			var oTable = this.getView().byId("idTable");
			var aCol = oTable.getColumns();
			var oCity = aCol[2];
			if(this.flag === true){
				oCity.setVisible(false);
				oEvent.getSource().setText("Show");
				this.flag = false;
			}
			else{
				oCity.setVisible(true);
				oEvent.getSource().setText("Hide");
				this.flag = true;
			}
			
			
		},
		oSuppPopup: null,
		oCityPopup: null,
		myField: null,
		onConfirm: function(oEvent){
			//coda to set the value to the inp will come
			//step 1: we need to know which item was selected by user
			var sId = oEvent.getSource().getTitle();
			var aFilter = [];
			//debugger;
			if(sId.indexOf("Supplier") !== -1){
				var aItems = oEvent.getParameter("selectedItems");
				for (var i=0; i<aItems.length; i++) {
					var oSingleItem = aItems[i];
					var sLabel = oSingleItem.getLabel();
					var oFilter = new sap.ui.model.Filter("city", sap.ui.model.FilterOperator.EQ, sLabel);
					aFilter.push(oFilter);
				}
				var oFinalFilter = new  sap.ui.model.Filter({ filters: aFilter, and:false });
				this.getView().byId("idTable").getBinding("items").filter([oFinalFilter]);
			}else{
				var oSelectedItem = oEvent.getParameter("selectedItem");
				var sCityName = oSelectedItem.getLabel();
				this.myField.setValue(sCityName);
			}
			
			
		},
		onF4: function(oEvent){
			this.myField = oEvent.getSource();
			//step 1; create a brand new object of our fragment
			if(!this.oCityPopup){
				this.oCityPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.popup", this);
				this.getView().addDependent(this.oCityPopup);
				this.oCityPopup.setMultiSelect(false);
			}
			//step 2: the fragment will return a Select Dialog object
			//        we will use the same to bind it with data
			this.oCityPopup.setTitle("Cities");
			this.oCityPopup.bindAggregation("items",{
				path: '/cities',
				template: new sap.m.DisplayListItem({
					label: "{cityname}",
					value: "{state}"
				})
			});
			//step 3: open the fragment
			this.oCityPopup.open();	
		},
		onFilter: function(){
			//step 1; create a brand new object of our fragment
			if(!this.oSuppPopup){
				this.oSuppPopup = new sap.ui.xmlfragment("myguy", "cap.fin.ar.fragments.popup", this);
				this.getView().addDependent(this.oSuppPopup);
			}
			//step 2: the fragment will return a Select Dialog object
			//        we will use the same to bind it with data
			this.oSuppPopup.setTitle("Suppliers");
			this.oSuppPopup.bindAggregation("items",{
				path: '/cities',
				template: new sap.m.DisplayListItem({
					label: "{cityname}",
					value: "{state}"
				})
			});
			//step 3: open the fragment
			this.oSuppPopup.open();
		},
		herculis: function(oEvent){
			//debugger;	
			var id = oEvent.getParameter("arguments").fruitId;  /*/ProductSet('id')*/
			var sPath = "/" + id; /*address of the fruit which was selected */
			this.getView().bindElement({
				path: sPath,
				parameters: {
					expand: 'ToSupplier'
				}
			});
			
		},
		/* @memberOf sap.ui.core.Event */
		onBack: function(oEvent){
			window.history.go(-1);
			//alert("back to be implemented yet");
			//step 1: get the parent object of current view - app contaioner
			/** @type sap.m.App */
			// var oApp = this.getView().getParent();
			// debugger;
			// //step 2: navigate back to view 1
			// oApp.to("idView1");
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});