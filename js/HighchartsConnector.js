function HighchartsConnector() {
	this.drawBarchart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				name : params.regions[i].name,
				data : params.regions[i].data
			};
		}
		$(params.container).highcharts({
			chart : {
				type : 'column'
			},
			xAxis : {
				categories : params.indexes
			},
			series : data
		});
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
		$(params.container).highcharts({
			chart : {
				type : 'scatter',
				zoomType : 'xy'
			},
			series : data
		});
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
		$(params.container).highcharts({
			chart : {
				type : 'line',
			},
			series : data
		});
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
		$(params.container).highcharts({
			chart : {
				polar : true
			},
			series : data
		});
	}
}