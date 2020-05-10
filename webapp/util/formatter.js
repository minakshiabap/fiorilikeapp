sap.ui.define(["sap/ui/core/format/NumberFormat"],function(NumberFormat){
	return {
		currencyFormat: function(amount, curr){
			var oCurrencyFormat = NumberFormat.getCurrencyInstance({
			    currencyCode: false
			});	
			return oCurrencyFormat.format(amount, curr);
		},
		someFunction1: function(amount, curr){
			var oCurrencyFormat = NumberFormat.getCurrencyInstance();	
			return oCurrencyFormat.format(amount, curr);
		},
		someFunction2: function(amount, curr){
			var oCurrencyFormat = NumberFormat.getCurrencyInstance({
			    currencyCode: true
			});	
			return oCurrencyFormat.format(amount, curr);
		}
	}	;
});