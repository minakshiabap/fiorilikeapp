sap.ui.define([],function(){
	
	return sap.ui.core.Control.extend("cap.fin.ar.customControls.Heading",{
		metadata :{
			properties: {
				"text" : "",
				"color": "",
				"back" : "",
				"outline" : ""
			},
			aggregations: {
				"demo" : new sap.ui.core.Control()
			}
		},
		init: function(){
			this.setColor("grey");
		},
		renderer: function(oRm,oControl){
			oRm.write("<h1");
			oRm.addStyle("color", oControl.getColor());
			oRm.addStyle("background-color", oControl.getBack());
			oRm.addStyle("border", oControl.getOutline());
			oRm.writeStyles();
			oRm.write(">" + oControl.getText() + "<h1>");
		}
	});	
		
});