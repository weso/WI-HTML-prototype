var data = [{"code":"SE", "value": 100},
{"code":"US", "value": 97.42},
{"code":"GB", "value": 93.81},
{"code":"CA", "value": 93.56},
{"code":"FI", "value": 91.97},
{"code":"CH", "value": 90.59999999999999},
{"code":"NZ", "value": 89.23},
{"code":"AU", "value": 88.55},
{"code":"NO", "value": 87.86},
{"code":"IE", "value": 87.39},
{"code":"SG", "value": 86.23999999999999},
{"code":"IS", "value": 86.17},
{"code":"KR", "value": 81.04000000000001},
{"code":"FR", "value": 79.06},
{"code":"IL", "value": 78.63},
{"code":"DE", "value": 74.95999999999999},
{"code":"PT", "value": 72.42},
{"code":"ES", "value": 72.04000000000001},
{"code":"CL", "value": 69.64},
{"code":"JP", "value": 68.65000000000001},
{"code":"QA", "value": 60.82},
{"code":"MX", "value": 57.77},
{"code":"IT", "value": 56.5},
{"code":"BR", "value": 56.37},
{"code":"PL", "value": 54.87},
{"code":"CO", "value": 53.8},
{"code":"TR", "value": 53.62},
{"code":"KZ", "value": 53.56},
{"code":"CN", "value": 51.28},
{"code":"TN", "value": 50.63},
{"code":"RU", "value": 47.37},
{"code":"PH", "value": 46.59},
{"code":"IN", "value": 46.37},
{"code":"ID", "value": 46.29},
{"code":"JO", "value": 44.43},
{"code":"ZA", "value": 44.39},
{"code":"TH", "value": 43.87},
{"code":"AR", "value": 42.15},
{"code":"EG", "value": 40.78},
{"code":"VE", "value": 39.74},
{"code":"MU", "value": 36.52},
{"code":"KE", "value": 32.6},
{"code":"EC", "value": 32.35},
{"code":"PK", "value": 28.06},
{"code":"GH", "value": 27.27},
{"code":"SN", "value": 25.25},
{"code":"VN", "value": 24.24},
{"code":"NG", "value": 23.33},
{"code":"UG", "value": 20.11},
{"code":"MA", "value": 19.3},
{"code":"TZ", "value": 18.52},
{"code":"NP", "value": 18.28},
{"code":"CM", "value": 15.1},
{"code":"BD", "value": 13.49},
{"code":"ML", "value": 13.41},
{"code":"NA", "value": 13.39},
{"code":"ET", "value": 10.91},
{"code":"BJ", "value": 9.960000000000001},
{"code":"BF", "value": 8.119999999999999},
{"code":"ZW", "value": 1.96},
{"code":"YE", "value": 0}]

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

$(window).resize(function() {
	drawGraph("#barchart", data, {
		marginTop : 0,
		marginRight : 0,
		marginBottom : 0,
		marginLeft : 0,
		width : $(".row").width() ,
		height : 150
	});
	function drawGraph(selector, data, config) {
		$("#barchart").empty();
		var top = data.sort(function(a, b) {
			return b.value - a.value;
		});
		var x = d3.scale.ordinal().rangeRoundBands([0, config.width], .1, 1);

		var y = d3.scale.linear().range([config.height, 0]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left");

		this.svg = d3.select(selector).append("svg").attr("width", config.width + config.marginLeft + config.marginRight).attr("height", config.height + config.marginTop + config.marginBottom).append("g").attr("transform", "translate(" + config.marginLeft + "," + config.marginTop + ")");

		x.domain(top.map(function(d) {
			return d.code;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

		var ramp=d3.scale.linear().domain([100,75,50,25,0]).range(["#343465","#269e45","#deb722","#e65e22","#8b2c30"]);

		this.svg.selectAll(".bar").data(top).enter().append("rect").attr("class", "bar").attr("x", function(d) {
			return x(d.code);
		}).attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.value);
		}).attr("height", function(d) {
			return config.height - y(d.value);
		}).attr("fill", function(d) {
			return ramp(d.value);
		});
	}

});