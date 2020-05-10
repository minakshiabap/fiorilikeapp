QUnit.module("Formatter Testcases");
sap.ui.define(["cap/fin/ar/util/formatter"], function(actualFunctionality){
	function callFunctionality(assert, price, unit, expected){
		var obtainedVal = actualFunctionality.currencyFormat(price, unit);
		assert.equal(obtainedVal, expected, "Formatter testcase passed");
	}
	QUnit.test("Testing basic EUR format for no 530", function(assert){
		callFunctionality.call(this, assert,"530","EUR","€530.00");
	});
	QUnit.test("Testing basic EUR format for no with 4 digits", function(assert){
		callFunctionality.call(this, assert, "8540", "EUR", "€8,540.00");
	});
	QUnit.test("Testing basic EUR format for no -ve no", function(assert){
		callFunctionality.call(this, assert, "50.60", "EUR", "€50.60");
	});
	
});

