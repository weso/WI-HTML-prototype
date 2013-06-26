function D3Connector() {

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

	this.drawLineChart = function(params) {
		params = composeParams(params);
		minMargins(params.options.margins);
		params.options.width = params.options.width - params.options.margins[1] - params.options.margins[3];
		params.options.height = params.options.height - params.options.margins[0] - params.options.margins[2];
		var x = d3.scale.ordinal().domain(d3.range(params.indexes.length)).rangeRoundBands([0, params.options.width]);
		var y = d3.scale.linear().range([params.options.height, 0]);
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickValues(params.indexes);
		var yAxis = d3.svg.axis().scale(y).orient("left");
		var line = d3.svg.line().x(function(d, i) {
			return x(i) + (params.options.width / params.indexes.length) / 2;
		}).y(function(d) {
			return y(d);
		});
		var svg = d3.select(params.container).append("svg").attr("width", params.options.width + params.options.margins[1] + params.options.margins[3]).attr("height", params.options.height + params.options.margins[0] + params.options.margins[2]).append("g").attr("transform", "translate(" + params.options.margins[3] + "," + params.options.margins[0] + ")");
		y.domain([params.options.min, params.options.max]);
		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + params.options.height + ")").attr("style", "fill: none; stroke-width: 1px; stroke: " + params.options.axisColour + ";").call(xAxis);
		svg.append("g").attr("class", "y axis").attr("style", "fill: none; stroke-width: 1px; stroke: " + params.options.axisColour + ";").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end");
		var region = svg.selectAll(".region").data(params.regions).enter().append("g").attr("class", "region");
		var currentSeries = -1;
		region.append("path").attr("class", "line").style("stroke", function(d, i) {
			return params.options.colours[i % params.options.colours.length];
		}).attr("d", function(d) {
			svg.selectAll(params.container + "svg").data(d.data).enter().append("svg:circle").attr("cx", function(d, i) {
				if (i == 0) {
					currentSeries++;
				}
				return x(i) + (params.options.width / params.indexes.length) / 2;
			}).attr("cy", function(d) {
				return y(d);
			}).attr("r", 5).style("fill", params.options.colours[currentSeries % params.options.colours.length]).attr("series", currentSeries).attr("indicator", function(d, i) {
				return i;
			}).on("click", function(d, i) {
				params.options.onClickDatum(d3.event.srcElement.attributes);
			});
			return line(d.data);
		}).style("stroke-width", "2px").attr("fill", "none");
		if (params.options.legend) {
			$(params.container).append('<div class="legend"></div>');
			var labels = [];
			for (var i = 0; i < params.regions.length; i++) {
				labels[i] = params.regions[i].name;
			}
			var oScale = d3.scale.category20().domain(labels).range(params.options.colours);
			colorlegend(params.container + " .legend", oScale, "ordinal", {
				boxHeight : 10,
				boxWidth : 75
			});
			var top = $(params.container).position().top;
			if (params.options.legendVerticalPosition == 'middle') {
				top += (params.options.height + params.options.margins[0] + 10) / 2;
			} else if (params.options.legendVerticalPosition == 'bottom') {
				top += params.options.height + params.options.margins[0] + 10;
			}
			var left = $(params.container).position().left;
			if (params.options.legendAlign == 'center') {
				left += (params.options.width - (10 + labels.length * 13.5) * labels.length) / 2;
			} else if (params.options.legendAlign == 'right') {
				left += params.options.width - (37 + labels.length * 9) * labels.length;
			}
			$(params.container + " .legend").css({
				position : "absolute",
				top : top + "px",
				left : left + "px"
			});
		}
		if (params.options.tooltipEnabled) {
			$(params.container + ' circle').tipsy({
				gravity : 'sw',
				html : true,
				title : function() {
					return params.regions[this.getAttribute("series")].name + " @ " + params.indexes[this.getAttribute("indicator")] + " = " + this.__data__;
				}
			});
		}
	}
}