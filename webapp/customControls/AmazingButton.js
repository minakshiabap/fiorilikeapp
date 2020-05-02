sap.ui.define([],function(){
	
	return sap.m.Button.extend("cap.fin.ar.customControls.AmazingButton",{
		metadata :{
			events: {
				"hover": {}
			}
		},
		onmouseover: function(){
			this.fireHover();	
		},
		renderer: {}
	});	
		
});