sap.ui.define(
	["sap/ui/core/UIComponent"],
	function(UIComponent){
	 return	UIComponent.extend("cap.fin.ar.Component",{
			metadata: {
				manifest:"json"
			},
			init: function(){
				//we have to call the super class contructor
				//when we call base class constructor, we are invoking default functionality
				//which is available free for us
				UIComponent.prototype.init.apply(this);
				var oRouter = this.getRouter();
				oRouter.initialize();
			},
			// createContent: function(){
			// 	var oView = new sap.ui.view({
			// 		type: "XML",
			// 		viewName: "cap.fin.ar.view.App"
			// 	});
			// 	var oView1 = new sap.ui.view({
			// 		type: "XML",
			// 		id: "idView1",
			// 		viewName: "cap.fin.ar.view.View1"
			// 	});
			// 	var oView2 = new sap.ui.view({
			// 		type: "XML",
			// 		id: "idView2",
			// 		viewName: "cap.fin.ar.view.View2"
			// 	});
				
			// 	//how we know that oApp has to function() 
			// 	oView.byId("anubhav").addMasterPage(oView1).addDetailPage(oView2);
			// 	return oView;
			// },
			destroy: function(){
				
			}
		});
});