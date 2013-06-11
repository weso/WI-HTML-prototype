function D3Connector() {
	this.drawBarchart = function(params) {
		var data = [];
		params = composeParams(params);
		data[0] = {
			key : "Key",
			values : []
		};
		for (var i = 0; i < params.regions.length; i++) {
			data[0].values[i] = {
				label : params.regions[i].name,
				value : params.regions[i].data[0]
			};
		}
		$(params.container).empty();
		$(params.container).append('<svg></svg>')
		var chart = nv.models.discreteBarChart().x(function(d) {
			return d.label
		}).y(function(d) {
			return d.value
		}).staggerLabels(true).tooltips(false).showValues(true)
		d3.select(params.container + ' svg').datum(data).transition().duration(500).call(chart);
		nv.utils.windowResize(chart.update);
		return chart;
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
		$(params.container).empty();
		$(params.container).append('<svg></svg>')
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
		$(params.container).empty();
		$(params.container).append('<svg></svg>');
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
		var series, indicators, minVal, maxVal, w = 400, h = 400, vizPadding = {
			top : 10,
			right : 0,
			bottom : 15,
			left : 0
		}, radius, radiusLength, mean, colours, ruleColor = "#CCC";
		var loadData = function(countries) {
			series = [];
			indicators = [];
			for (var i = 0; i < countries[0].ranks.length; i++) {
				indicators[i] = countries[0].ranks[i].name;
			}
			for (var i = 0; i < countries.length; i++) {
				var country = countries[i];
				series[i] = [];
				for (var j = 0; j < country.ranks.length; j++) {
					series[i][j] = country.ranks[j];
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
			var viz = d3.select(params.container).append('svg:svg').attr('width', w).attr('height', h).attr('class', 'vizSvg');
			viz.append("svg:rect").attr('id', 'axis-separator').attr('x', 0).attr('y', 0).attr('height', 0).attr('width', 0).attr('height', 0);
			vizBody = viz.append("svg:g").attr('id', 'body');
		};

		var setScales = function() {
			var heightCircleConstraint, widthCircleConstraint, circleConstraint, centerXPos, centerYPos;
			heightCircleConstraint = h - vizPadding.top - vizPadding.bottom;
			widthCircleConstraint = w - vizPadding.left - vizPadding.right;
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
			}).attr("class", "circle").style("stroke", ruleColor).style("fill", "none");

			circleAxes.append("svg:text").attr("text-anchor", "middle").attr("dy", function(d) {
				return -1 * radius(d);
			}).text(String);

			lineAxes = vizBody.selectAll('.line-ticks').data(indicators).enter().append('svg:g').attr("transform", function(d, i) {
				return "rotate(" + ((i / indicators.length * 360) - 90) + ")translate(" + radius(maxVal) + ")";
			}).attr("class", "line-ticks");

			lineAxes.append('svg:line').attr("x2", -1 * radius(maxVal)).style("stroke", ruleColor).style("fill", "none");

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
				}//close the line
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
				}//close the line
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
		var countries = [];
		for (var i = 0; i < params.regions.length; i++) {
			countries[i] = new Country(params.regions[i].name, params.regions[i].data);
		}
		loadData(countries);
		buildBase();
		setScales();
		addAxes();
		draw(countries[0].ranks.length);
	}
}

function Rank(name, value) {
	this.name = name;
	this.value = value;
}

function Country(name, ranks) {
	this.name = name;
	this.ranks = ranks;
}

function Region(name, data) {
	this.name = name;
	this.data = data;
}

function Params() {
	this.indexes = null;
	this.regions = [];
	this.container = null;
	this.options = new Options();
}

function Options() {
	this.width = 100;
	//Ajustar al contenedor en vez de 100
	this.height = 100;
	//Ajustar al contenedor en vez de 100
	this.margins = [0, 0, 0, 0];
	this.title = 'My awesome wesCountry chart';
	this.bgColour = '#ffffff';
	this.colours = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
	this.colourGradient = false;
	//Indica si la transición entre colores ha de hacerse mediante degradado
	this.legend = false;
	this.legendPosition = 'bottom';
	this.tooltip = "";
	//HTML que se mostrará al hacer hover sobre un dato
	this.onClickDatum = function() {
	};
	//Evento al hacer click sobre un dato
	this.min = 0;
	//Calcular
	this.max = 100;
	//Calcular
	this.yAxisName = 'Value';
	this.xAxisName = 'Domain';
}

function composeParams(params) {
	var result = new Params();
	if (params && params != null) {
		if (params.indexes && params.indexes != null) {
			result.indexes = params.indexes;
		} else {
			result.indexes = [];
			for (var i = 0; i < params.regions[0].data.length; i++) {
				result.indexes[i] = "Indicator " + i;
			}
		}
		for (var i = 0; i < params.regions.length; i++) {
			result.regions[i] = params.regions[i];
		}
	}
	if (!params || params == null || !params.container || params.container == null) {
		var div = document.createElement("div");
		div.id = "container" + Math.floor(Math.random() * 10000);
		document.body.appendChild(div);
		result.container = "#" + div.id;
	} else {
		result.container = params.container;
	}
	return result;

}

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