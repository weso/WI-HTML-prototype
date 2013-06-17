function D3Connector() {

	var createContainer = function(params) {
		$(params.container).empty();
		d3.select(params.container).append('svg').attr("width", params.options.width).attr("height", params.options.height);
	}
	var minMargins = function(margins) {
		if (margins[0] < 15) {
			margins[0] = 15;
		}
		if (margins[2] < 35) {
			margins[2] = 35;
		}
		if (margins[3] < 35) {
			margins[3] = 35;
		}
	}
	var customize = function(params, chart, data) {
		minMargins(params.options.margins);
		chart.height(params.options.height - params.options.margins[0] - params.options.margins[2]);
		chart.width(params.options.width - params.options.margins[1] - params.options.margins[3]);
		chart.tooltipContent(function(key, y, e, graph) {
			return params.options.tooltipHeader + params.options.tooltip + params.options.tooltipFooter;
		});
		chart.margin({
			top : params.options.margins[0],
			right : params.options.margins[1],
			bottom : params.options.margins[2],
			left : params.options.margins[3]
		});
		chart.yAxis.axisLabel(params.options.yAxisName);
		chart.tooltips(params.options.tooltipsEnabled);
		chart.forceY([params.options.min, params.options.max]);
		chart.showLegend(params.options.legend);
		d3.select(params.container + ' svg').append("text").attr("x", (params.options.width / 2)).attr("y", params.options.margins[0]).attr("text-anchor", "middle").style("font-size", "16px").style("text-decoration", "underline").text(params.options.title);
		d3.select(params.container + ' svg').style("background-color", params.options.bgColour);
		d3.select(params.container + ' svg').datum(data).transition().duration(500).call(chart);
		var oldX = d3.select(params.container + ' svg g').attr("transform").split("(")[1].split(",")[0];
		var oldY = d3.select(params.container + ' svg g').attr("transform").split(",")[1].split(")")[0];
		d3.select(params.container + ' svg g').attr("transform", "translate(" + oldX + ", " + ((parseInt(oldY) + params.options.margins[0]) + ")")).attr("height", params.options.margins[0]);
		d3.select('.nv-controlsWrap').remove();
		oldX = parseInt(d3.select(params.container + ' .nv-legendWrap').attr("transform").split("(")[1].split(",")[0]);
		oldY = parseInt(d3.select(params.container + ' .nv-legendWrap').attr("transform").split(",")[1].split(")")[0]);
		var newX, newY;
		switch(params.options.legendVerticalPosition) {
			case 'middle':
				newY = oldY + chart.height() / 2;
				break;
			case 'bottom' :
				newY = chart.height() + oldY;
				break;
			default :
				newY = oldY;
				break;
		}
		switch(params.options.legendAlign) {
			case 'center':
				newX = 0;
				break;
			case 'left' :
				newX = -oldX
				break;
			default :
				newX = oldX;
				break;
		}
		d3.select(params.container + ' .nv-legendWrap').attr("transform", "translate(" + newX + ", " + newY + ")");
	}

	this.drawBarchart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				key : params.regions[i].name,
				color : params.options.colours[i % params.options.colours.length],
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
			chart.xAxis.axisLabel(params.options.xAxisName).tickFormat(function(d, i) {
				return params.indexes[i];
			});
			customize(params, chart, data);
			d3.selectAll(".nv-bar").on('click', params.options.onClickDatum);
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
				color : params.options.colours[i % params.options.colours.length],
				values : []
			};
			for (var j = 0; j < params.regions[i].data.length; j++) {
				data[i].values[j] = {
					x : params.regions[i].data[j][0],
					y : params.regions[i].data[j][1],
					size : 0.75
				}
			}
		}
		createContainer(params);
		nv.addGraph(function() {
			chart = nv.models.scatterChart().showDistX(true).showDistY(true).useVoronoi(true);
			customize(params, chart, data);
			switch(params.options.legendAlign) {
				case 'center':
					d3.select(params.container + ' .nv-legend :first-child').attr("transform", "translate(" + (chart.width() - (params.options.margins[1] + params.options.margins[3]) * 4.5) / 2 + ", 5)");
					break;
				case 'left' :
					d3.select(params.container + ' .nv-legend :first-child').attr("transform", "translate(" + (chart.width() / 1.75) + ", 5)");
					break;
				default :
					break;
			}
			nv.utils.windowResize(chart.update);
			return chart;
		});
	}

	this.drawLineChart = function(params) {
		var data = [];
		params = composeParams(params);
		for (var i = 0; i < params.regions.length; i++) {
			data[i] = {
				key : params.regions[i].name,
				color : params.options.colours[i % params.options.colours.length],
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
				return i;
			})
			customize(params, chart, data);
			switch(params.options.legendAlign) {
				case 'center':
					d3.select(params.container + ' .nv-legend :first-child').attr("transform", "translate(" + (chart.width() - (params.options.margins[1] + params.options.margins[3]) * 4.5) / 2 + ", 5)");
					break;
				case 'left' :
					d3.select(params.container + ' .nv-legend :first-child').attr("transform", "translate(" + ((chart.width() / 3) - (params.options.margins[1] + params.options.margins[3]) * 4.5) + ", 5)");
					break;
				default :
					break;
			}
			nv.utils.windowResize(chart.update);
			return chart;
		});
	}

	this.drawPolarChart = function(params) {
		params = composeParams(params);
		minMargins(params.options.margins);
		var series, indicators, vizPadding = {
			top : params.options.margins[0],
			right : params.options.margins[1],
			bottom : params.options.margins[2],
			left : params.options.margins[3]
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
			heightCircleConstraint = params.options.height - (vizPadding.top + vizPadding.bottom) * 2;
			widthCircleConstraint = params.options.width - (vizPadding.left + vizPadding.right) * 2;
			circleConstraint = d3.min([heightCircleConstraint, widthCircleConstraint]);
			radius = d3.scale.linear().domain([0, params.options.max]).range([0, (circleConstraint / 2)]);
			radiusLength = radius(params.options.max);
			centerXPos = widthCircleConstraint / 2 + vizPadding.left;
			centerYPos = heightCircleConstraint / 2 + vizPadding.top + vizPadding.bottom;
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
				return "rotate(" + ((i / indicators.length * 360) - 90) + ")translate(" + radius(params.options.max) + ")";
			}).attr("class", "line-ticks");
			lineAxes.append('svg:line').attr("x2", -1 * radius(params.options.max)).style("stroke", params.options.axisColour).style("fill", "none");
			lineAxes.append('svg:text').text(String).attr("text-anchor", "middle").attr("transform", function(d, i) {
				if ((i / indicators.length * 360) === 0) {
					return "rotate(90) translate(0, -5)";
				} else if ((i / indicators.length * 360) === 180) {
					return "rotate(-90) translate(0, 5)";
				} else if ((i / indicators.length * 360) < 180) {
					return null;
				} else {
					return "rotate(180)";
				}
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
				console.log(radius(d));
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

		d3.select(params.container + ' svg').append("text").attr("x", (params.options.width / 2)).attr("y", params.options.margins[0]).attr("text-anchor", "middle").style("font-size", "16px").style("text-decoration", "underline").text(params.options.title);
		d3.select(params.container + ' svg').style("background-color", params.options.bgColour);
		if(params.legend) {
			//TODO poner leyenda en su sitio
		}
		
		if(params.tooltipEnabled) {
			//TODO poner tooltips
		}
		//TODO onclick	
	}
}
