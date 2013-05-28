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
