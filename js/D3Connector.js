function D3Connector() {
	
	var createContainer = function(params) {
		$(params.container).empty();
		$(params.container).append('<svg></svg>');
		$(params.container + ' svg').width(params.options.width);
		$(params.container + ' svg').height(params.options.height);
	}
	
	this.drawBarchart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				key : params.regions[i].name,
				values : []
			};
			for (var j = 0; j < params.regions[i].data.length; j++) {
				data[i].values[j] = {
					x : j,
					y : params.regions[i].data[j],
				}
			}
		}
		createContainer(params);
		nv.addGraph(function() {
			var chart = nv.models.multiBarChart();
			chart.yAxis.axisLabel(params.options.yAxisName);
			chart.xAxis.axisLabel(params.options.xAxisName).tickFormat(function(d, i) {
				return params.indexes[i]
			});
			chart.forceY([params.options.min, params.options.max]);

			d3.select(params.container + ' svg').datum(data).transition().duration(500).call(chart);
			d3.select(params.container + ' svg').append("text").attr("y", 15).attr("x", params.options.width / 2).attr("text-anchor", "middle").text(params.options.title);
			nv.utils.windowResize(chart.update);
			return chart;
		});
	}

	this.drawScatterplot = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				key : params.regions[i].name,
				values : []
			};
			for (var j = 0; j < params.regions[i].data.length; j++) {
				data[i].values[j] = {
					x : params.regions[i].data[j][0],
					y : params.regions[i].data[j][1],
					size : 0.5
				}
			}
		}
		createContainer(params);
		nv.addGraph(function() {
			chart = nv.models.scatterChart().showDistX(true).showDistY(true).useVoronoi(true).color(d3.scale.category10().range());
			d3.select(params.container + ' svg').datum(data).transition().duration(500).call(chart);
			nv.utils.windowResize(chart.update);
			chart.dispatch.on('stateChange', function(e) {
				nv.log('New State:', JSON.stringify(e));
			});
			return chart;
		});
	}

	this.drawLineChart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				key : params.regions[i].name,
				values : []
			};
			for (var j = 0; j < params.regions[i].data.length; j++) {
				data[i].values[j] = {
					x : j,
					y : params.regions[i].data[j]
				}
			}
		}
		createContainer(params);
		var chart;
		nv.addGraph(function() {
			chart = nv.models.lineChart();
			chart.x(function(d, i) {
				return i
			})
			d3.select(params.container + ' svg').datum(data).transition().duration(500).call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
	}

	this.drawPolarChart = function(params) {
		params = composeParams(params);
		var series, indicators, minVal, maxVal, vizPadding = {
			top : 10,
			right : 0,
			bottom : 15,
			left : 0
		}, radius, radiusLength;
		var loadData = function(countries) {
			series = [];
			indicators = params.indexes;
			for (var i = 0; i < countries.length; i++) {
				var country = countries[i];
				series[i] = [];
				for (var j = 0; j < country.data.length; j++) {
					series[i][j] = country.data[j];
				}
			}
			var mergedArr = [];
			for (var i = 0; i < series.length; i++) {
				mergedArr = mergedArr.concat(series[i]);
			}
			minVal = d3.min(mergedArr);
			maxVal = d3.max(mergedArr);
			maxVal = maxVal + ((maxVal - minVal) * 0.25);
			minVal = 0;
			for (var i = 0; i < series.length; i++) {
				series[i].push(series[i][0]);
			}
		};

		var buildBase = function() {
			var viz = d3.select(params.container).append('svg:svg').attr('width', params.options.width).attr('height', params.options.height).attr('class', 'vizSvg');
			viz.append("svg:rect").attr('id', 'axis-separator').attr('x', 0).attr('y', 0).attr('height', 0).attr('width', 0).attr('height', 0);
			vizBody = viz.append("svg:g").attr('id', 'body');
		};

		var setScales = function() {
			var heightCircleConstraint, widthCircleConstraint, circleConstraint, centerXPos, centerYPos;
			heightCircleConstraint = params.options.height - vizPadding.top - vizPadding.bottom;
			widthCircleConstraint = params.options.width - vizPadding.left - vizPadding.right;
			circleConstraint = d3.min([heightCircleConstraint, widthCircleConstraint]);
			radius = d3.scale.linear().domain([minVal, maxVal]).range([0, (circleConstraint / 2)]);
			radiusLength = radius(maxVal);
			centerXPos = widthCircleConstraint / 2 + vizPadding.left;
			centerYPos = heightCircleConstraint / 2 + vizPadding.top;
			vizBody.attr("transform", "translate(" + centerXPos + ", " + centerYPos + ")");
		};

		var addAxes = function() {
			var radialTicks = radius.ticks(5), i, circleAxes, lineAxes;

			vizBody.selectAll('.circle-ticks').remove();
			vizBody.selectAll('.line-ticks').remove();

			circleAxes = vizBody.selectAll('.circle-ticks').data(radialTicks).enter().append('svg:g').attr("class", "circle-ticks");

			circleAxes.append("svg:circle").attr("r", function(d, i) {
				return radius(d);
			}).attr("class", "circle").style("stroke", params.options.axisColour).style("fill", "none");

			circleAxes.append("svg:text").attr("text-anchor", "middle").attr("dy", function(d) {
				return -1 * radius(d);
			}).text(String);

			lineAxes = vizBody.selectAll('.line-ticks').data(indicators).enter().append('svg:g').attr("transform", function(d, i) {
				return "rotate(" + ((i / indicators.length * 360) - 90) + ")translate(" + radius(maxVal) + ")";
			}).attr("class", "line-ticks");

			lineAxes.append('svg:line').attr("x2", -1 * radius(maxVal)).style("stroke", params.options.axisColour).style("fill", "none");

			lineAxes.append('svg:text').text(String).attr("text-anchor", "middle").attr("transform", function(d, i) {
				return (i / indicators.length * 360) < 180 ? null : "rotate(180)";
			});
		};

		var getLines = function(series, ranks, dashed) {
			var line = series.append('svg:path').attr("class", "line").attr("d", d3.svg.line.radial().radius(function(d) {
				return 0;
			}).angle(function(d, i) {
				if (i === ranks) {
					i = 0;
				}
				return (i / ranks) * 2 * Math.PI;
			})).style("stroke-width", 3).style("fill", "none")
			return dashed ? line.style("stroke-dasharray", ("3, 3")) : line;
		}
		var drawLines = function(lines, ranks) {
			lines.attr("d", d3.svg.line.radial().radius(function(d) {
				return radius(d);
			}).angle(function(d, i) {
				if (i === ranks) {
					i = 0;
				}
				return (i / ranks) * 2 * Math.PI;
			}));
		}
		var draw = function(ranks) {
			var groups, lines, means;
			groups = vizBody.selectAll('.series').data(series);
			groups.enter().append("svg:g").attr('class', 'series').style('fill', function(d, i) {
				return params.options.colours[i % params.options.colours.length];
			}).style('stroke', function(d, i) {
				return params.options.colours[i % params.options.colours.length];
			});
			groups.exit().remove();
			lines = getLines(groups, ranks, false);
			drawLines(lines, ranks);
		};
		loadData(params.regions);
		buildBase();
		setScales();
		addAxes();
		draw(params.regions[0].data.length);
	}
}
