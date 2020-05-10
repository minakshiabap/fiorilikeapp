sap.ui.define([
		"sap/ui/test/Opa5",
		"sap/ui/test/actions/Press",
		"sap/ui/test/matchers/AggregationLengthEquals"
	], function(Opa5, Press, AggregationLengthEquals) {
		"use strict";

		var sViewName = "View1";

		Opa5.createPageObjects({
			Master: {
				actions: {
					searchMyProduct: function() {
						return this.waitFor({
							id: "mySearch",
							viewName: sViewName,
							success: function(oSearch){
								oSearch.setValue("Ananya").fireSearch();
							},
							errorMessage: "Was not able to find the control with the id controlId"
						});
					}
				},
				assertions: {
					checkIfListShowYourProduct: function() {
						return this.waitFor({
							id: "idLedo",
							viewName: sViewName,
							matchers: new AggregationLengthEquals({
								name: "items"	,
								length : 1
							}),
							success: function() {
								Opa5.assert.ok(true, "Yes the search was successful for product");
							},
							errorMessage: "Search has failed to work with list idLedo"
						});
					}
				}
			}
		});
	}
);