/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"cap/fin/ar/test/integration/arrangement/arrangements",
	"cap/fin/ar/test/integration/pages/Master"
], function(opaTest,Arrangement) {
	"use strict";

	QUnit.module("All tests related to master screen");
	

	opaTest("Check if product search works", function(Given, When, Then) {
		//debugger;
		// Arrangements
		Given.startAnubhavApp();

		// Actions
		When.Master.searchMyProduct();

		// Assertions
		Then.Master.checkIfListShowYourProduct();

		// Cleanup
		Given.stopMyApp();
	});

});