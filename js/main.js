$(function() {
	var map = new jvm.WorldMap({
		container : $("#world-map"),
		map : 'world_merc_en',
		zoomOnScroll : false,
		regionsSelectable : true,
		regionStyle : {
			initial : {
				fill : '#669900'
			},
			selected : {
				fill : '#177081'
			},
		},
		backgroundColor : '#FFFFFF',
		onRegionSelected : function(e, code, isSelected, selectedRegions) {
			$('#bt_create').removeAttr('disabled')
			if (isSelected) {
				var countryName = map.getRegionName(code);
			}
		}
	});
});

$(function() {
	$("#year-selector").slider({
		value : 2012,
		min : 2007,
		max : 2012,
		step : 1,
		slide : function(event, ui) {
			console.log(ui.value);
		}
	});
}); 