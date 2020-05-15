sap.ui.define([
		"sap/ui/test/Opa5"
	], function(Opa5) {
		"use strict";
		return Opa5.extend("cap.fin.ar.test.integration.arrangement.arrangements",{
			startAnubhavApp: function(){
				return this.iStartMyAppInAFrame('../runAppMockServer.html#AnubhavTraining-lookup');
			},
			
			stopMyApp: function(){
				return this.iTeardownMyApp('../runAppMockServer.html');
			}
		});
		
	}
);