var fif = "example/example.json";
var fif_array = [];
	
function loadFIF(){
	$.ajaxSetup({ async: false, dataType: "json" });
       	$.getJSON( fif, function( data ) {
		fif_array = data;
	});
	return fif_array;
}
