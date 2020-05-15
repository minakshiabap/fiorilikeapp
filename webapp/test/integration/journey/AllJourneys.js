sap.ui.define(["cap/fin/ar/test/integration/journey/Master",
"cap/fin/ar/test/integration/arrangement/arrangements"], 
function (MasterJourney, Arrangement) {
	sap.ui.test.Opa5.extendConfig({
			arrangements: new Arrangement(),
			viewNamespace: 'cap.fin.ar.view',
			autoWait: true
		});
		
		
});