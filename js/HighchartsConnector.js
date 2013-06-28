function HighchartsConnector() {
	var getDefaultConstructor = function(params, data) {
		return {
			chart : {
				width : params.options.width,
				height : params.options.height,
				margin : params.options.margin,
				backgroundColor : params.options.bgColour
			},
			title : {
				text : params.options.title
			},
			xAxis : {
				title : {
					text : params.options.xAxisName
				},
				lineColor : params.options.axisColour
			},
			yAxis : {
				title : {
					text : params.options.yAxisName
				},
				max : params.options.max,
				min : params.options.min,
				lineColor : params.options.axisColour
			},
			colors : params.options.colours,
			legend : {
				enabled : params.options.legend,
				align : params.options.legendAlign,
				verticalAlign : params.options.legendVerticalPosition
			},
			credits : {
				enabled : false
			},
			tooltip : {
				enabled : params.options.tooltipEnabled,
				useHTML : true,
				pointFormat : params.options.tooltipMessage({
					indicator : "{point.x}",
					region : "{series.name}",
					value : "{point.y}"
				}),
				headerFormat : ""
			},
			plotOptions : {
				column : {
					events : {
						click : params.options.onClickDatum
					}
				},
				scatter : {
					events : {
						click : params.options.onClickDatum
					}
				},
				line : {
					events : {
						click : params.options.onClickDatum
					}
				}
			},
			series : data
		};
	}

	this.drawBarchart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				name : params.regions[i].name,
				data : params.regions[i].data
			};
		}
		var constructor = getDefaultConstructor(params, data);
		constructor.chart.type = 'column';
		constructor.xAxis.categories = params.indexes;
		$(params.container).highcharts(constructor);
	}
	this.drawScatterplot = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				name : params.regions[i].name,
				data : params.regions[i].data
			};
		}
		var constructor = getDefaultConstructor(params, data);
		constructor.chart.type = 'scatter';
		constructor.chart.zoomType = 'xy';
		$(params.container).highcharts(constructor);
	}
	this.drawLineChart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				name : params.regions[i].name,
				data : params.regions[i].data
			};
		}
		var constructor = getDefaultConstructor(params, data);
		constructor.chart.type = 'line';
		$(params.container).highcharts(constructor);
	}
	this.drawPolarChart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				name : params.regions[i].name,
				type : 'line',
				data : params.regions[i].data
			};
		}
		var constructor = getDefaultConstructor(params, data);
		constructor.chart.polar = true;
		constructor.xAxis.title.text = "";
		constructor.xAxis.categories = params.indexes;
		constructor.yAxis.title.text = "";
		$(params.container).highcharts(constructor);
	}
}