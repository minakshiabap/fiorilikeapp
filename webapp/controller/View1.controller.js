sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"cap/fin/ar/util/formatter"
], function(Controller, MessageBox, MessageToast, formatter) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.View1
		 */
		formatter:formatter,
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		herculis: function(){
			setTimeout(function(){
				$(".sapMBtn").css("background-color", "yellow");
			}, 2000);
		},
		onNext: function(sPath){
			//alert("next to be implemented yet");
			//go to mumma and ask her to navigate to view 2
			//step 1: obtain the object of app container - who is parent of my current view
			var oApp = this.getView().getParent().getParent();
			//step 2: ask the app container control to navigate to view 2
			oApp.to("idView2");
			var sTitle = this.getView().byId("mySearch").getValue();
			var oView2 = oApp.getDetailPages()[0];
			oView2.getContent()[0].getContent()[0].bindElement(sPath);
			oView2.getContent()[0].setTitle(sTitle);
		},
		onAdd: function(){
			this.oRouter.navTo("maheshmati")	;
		},
		onMostExp: function(){
			//get the object of odata model
			var oDataModel = this.getView().getModel();
			//callFunction methods of odata model
			var that = this;
			oDataModel.callFunction("/GetMostExpensive",{
					urlParameters :{ I_CATEGORY : this.getView().byId("mySearch").getValue() },
					success: function(data){
						var lv_prod_id = data.PRODUCT_ID;
						that.oRouter.navTo("kattapa",{
							fruitId: "ProductSet('" + lv_prod_id + "')"
						});
						MessageToast.show("Most expensive one found!");
				}
			});
		},
		onSearch: function(oEvent){
			//Step 1: Read the value user type in search field
			var sVal = oEvent.getParameter("query");
			//Step 2: Get the list Object
			var oList = this.getView().byId("idLedo");
			//Step 3: Get the items agg. of list
			var oBinding = oList.getBinding("items");
			if( sVal.indexOf("-") !== -1 ){
				
				//step 1: we need the odata model object
				var oDataModel = this.getView().getModel();
				var that = this;
				//step 2: make a READ call on theobject
				oDataModel.read("/ProductSet('" + sVal + "')",{
					success: function(data){
						//alert("aa gaya");
						that.oRouter.navTo("kattapa",{
							fruitId: "ProductSet('" + sVal + "')"
						});
						MessageToast.show("Maza Aavigiyo!!");
					},
					error: function(oErr){
						//alert("Rola pe gaya");
						//MessageBox.error("The product id passed was not valid");
						MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
					}
				});
				
			}else{
				//Step 4: Create a new filter object
				var oFilter = new sap.ui.model.Filter("PRODUCT_ID",
				sap.ui.model.FilterOperator.EQ, sVal);
				// var oFilter2 = new sap.ui.model.Filter("type", 
				// sap.ui.model.FilterOperator.Contains, sVal);
				
				// var oFilterMain = new sap.ui.model.Filter({
				// 	filters:[oFilter, oFilter2],
				// 	and: false
				// });
				//Step 5: Inject the filter
				oBinding.filter([oFilter]);
			}
			
			
			
		},
		onDelete: function(oEvent){
			//step 1: get the item to be deleted
			var oItemToBeDel = oEvent.getParameter("listItem");
			console.log("i am going to delete " + oItemToBeDel.getTitle());
			//step 2: get the list object
			var oList = oEvent.getSource();
			//step 3: remove this item from the list object
			oList.removeItem(oItemToBeDel);
		},
		onItemPress: function(oEvent){
			//this.onNext(oEvent.getParameter("listItem").getBindingContextPath());
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var sIdx = sPath.split("/")[sPath.split("/").length - 1];
			this.oRouter.navTo("kattapa",{
				fruitId: sIdx
			});
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});