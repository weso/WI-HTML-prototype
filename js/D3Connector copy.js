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
	
	this.drawPolarChart = function(params) {
				params = composeParams(params);
				var radius = 0.4 * Math.min(params.options.width, params.options.height);
				var x = params.options.width / 2;
				var y = params.options.height / 2;
				var number_axis = params.regions[0].data.length;
				var axis_inc = radius / number_axis;
				var max_value = 100;
				
				var svg = d3.select(params.container).append("svg")
			                                    .attr("width", params.options.width)
			                                    .attr("height", params.options.height);
			    
			    // Axis Circles
			    
			    for (var i = number_axis; i >= 1; i--)
			    {
				    var circle = svg.append("circle");
				    
				    circle
				    	.attr("cx", x)
				        .attr("cy", y)
				        .attr("r", i * axis_inc)
				        .style("fill", "#efefef")
				        .style("stroke", "#ddd")
				        .style("stroke-width", 1);
			    }
			    
			    // Axis
		  
		        var angle = 2 * Math.PI / number_axis;
		        var radialPoints = []; 
		        
		        var startPoint = angle / 2;
		        
		        for (var i = 0; i < number_axis; i++) 
		        { 
		        	var x2 = radius * Math.cos(angle * i) + x;
		            var y2 = radius * Math.sin(angle * i) + y;
		            
		            radialPoints.push([x2,y2]);
		        } 
		    
		        svg.selectAll("line")
			        .data(radialPoints) 
			        .enter().append("svg:line") 
			        .attr("x1", x) 
			        .attr("y1", y) 
			        .attr("x2", function(p){ return p[0]; }) 
			        .attr("y2", function(p){ return p[1]; }) 
			        .attr("stroke", "#ddd")
			        .style("stroke-width", 1);
			        
			    for (var j = 0; j < params.regions.length; j++)
			    {
				    // Polygon
				    
				    var vertex = [];
				    var names = [];
				   
			        for (var i = 0; i < params.regions[j].data.length; i++) 
			        { 
			        	var value = params.regions[j].data[i] / max_value * radius;
			       
			        	var x2 = value * Math.cos(startPoint + angle * i) + x;
			            var y2 = value * Math.sin(startPoint + angle * i) + y;
			            
			            vertex.push({ x : x2, y : y2, colour: params.options.colours[0] });
			            
			            var namePosition = radius * 1.3;
			            
			        	x2 = namePosition * Math.cos(startPoint + angle * i) + x;
			            y2 = namePosition * Math.sin(startPoint + angle * i) + y;
			            
			            names.push({ x : x2, y : y2, name : params.regions[j].name }); 
			        }
		        
			        // First one is added to complete the path
			      
			        vertex.push(vertex[0]);
			       
			        var edge = d3.svg.line()
	                	.x(function(d) { return d.x; })
	                    .y(function(d) { return d.y; })
	                    .interpolate("linear");
			        
			        var lineGraph = svg.append("path")
	                	.attr("d", edge(vertex))
	                	.attr("stroke", params.options.colours[j])
	                    .attr("stroke-width", 2)
	                    .attr("fill", params.options.colours[j])
	                    .attr("opacity", 0.7)
	                    .on("mouseover", function() { this.setAttribute("stroke-width", 4); })
	                    .on("mouseout", function() { this.setAttribute("stroke-width", 2); });
	                    
	                // Vertex
	                
	                vertex.pop();
	               
	                svg.selectAll("body").data(vertex).enter().append("circle")
					    .attr("cx", function(p){ return p.x; })
					    .attr("cy", function(p){ return p.y; })
					    .attr("r", 5)
					    .attr("fill", params.options.colours[j])
					    .attr("stroke", params.options.colours[j])
					    .attr("stroke-width", 1)
	                    .on("mouseover", function() { this.setAttribute("stroke-width", 3); })
	                    .on("mouseout", function() { this.setAttribute("stroke-width", 1); });
               }
               // Names
               
               svg.selectAll("body").data(names).enter().append("text")
               		.text(function(p){return p.name;})
               		.attr("dx", function(p){ return p.x - this.getComputedTextLength() / 2; })
               		.attr("dy", function(p){ return p.y; });
	}
	
	this.drawBarChart = function(params) {
		params = composeParams(params);
	
	  // This is a reimplementation of the Grouped Bar Chart by Mike Bostock
	  // (http://bl.ocks.org/882152). Although useful, I found the original's
	  // minimal comments and inverted axes hard to follow, so I created the
	  // version you see here.
	
	  // First, we define sizes and colours...
	  var outerW = params.options.width;
	  var outerH = params.options.height;
	  //var padding = { t: 0, r: 0, b: 0, l: 0 };
	  var width = outerW - params.options.margins[3] - params.options.margins[1]; // inner width
	  var height = outerH - params.options.margins[0] - params.options.margins[2]; // inner height
	  var colours = params.options.colours; // ColorBrewer Set 1

	  // Second, we define our data...
	  // Create a two-dimensional array.
	  // The first dimension has as many Array elements as there are series.
	  // The second dimension has as many Number elements as there are groups.
	  // It looks something like this...
	  
	  var data = [];
	  var topValue = 0;
	  
	  for (var i = 0; i < params.regions.length; i++)
	  {
	  	data[i] = params.regions[i].data;
	  	topValue = Math.max(topValue, Math.max.apply(null, data[i]));
	  }
	
	  var numberGroups = data[0].length; // groups
	  var numberSeries = data.length;  // series in each group
	  //var data = d3.range(numberSeries).map(function () { return d3.range(numberGroups).map(Math.random); });
	
	  // Visualisation selection
	  var svg = d3.select(params.container)
	      .append("svg:svg")
	      .attr("width", outerW)
	      .attr("height", outerH)
	      .append("g")
	    .attr("transform", "translate(" + params.options.margins[3] + "," + params.options.margins[0] + ")");
	
	  // Third, we define our scales...
	  // Groups scale, x axis
	  var x0 = d3.scale.ordinal()
	      .domain(params.labels)
	      .rangeBands([0, width], params.options.groupPadding);
	
	  // Series scale, x axis
	  // It might help to think of the series scale as a child of the groups scale
	  var x1 = d3.scale.ordinal()
	      .domain(d3.range(numberSeries))
	      .rangeBands([0, x0.rangeBand()]);

	  // Values scale, y axis
	  
	   var y = d3.scale.linear()
	      .domain([0, topValue])
	      .range([height, 0]);
	
	var xAxis = d3.svg.axis()
	    .scale(x0)
	    .orient("bottom");
	
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(d3.format(".2s"))
	    .tickSize(-width, 0, 0)
	    .ticks(params.options.ticks);
	
	if (params.options.showLabels)
	{
		var xAxisContainer = svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      
		 if (params.options.showXAxisLabel)
		 {
		      xAxisContainer.append("text")
		      .attr("y", 30)
		      .attr("x", width / 2)
		      .attr("dy", ".71em")
		      .style("text-anchor", "middle")
		      .text(params.options.xAxisName);
		 }
	 }
	      
	 var yAxisContainer = svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);
	 
	 if (params.options.showYAxisLabel)
	 {
	    yAxisContainer.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -30)
	      .attr("x", - height / 2)
	      .attr("dy", ".71em")
	      .style("text-anchor", "middle")
	      .text(params.options.yAxisName);
	 }
	
	  // Series selection
	  // We place each series into its own SVG group element. In other words,
	  // each SVG group element contains one series (i.e. bars of the same colour).
	  // It might be helpful to think of each SVG group element as containing one bar chart.
	  var series = svg.selectAll("g.series")
	      .data(data)
	    .enter().append("svg:g")
	      .attr("class", "series") // Not strictly necessary, but helpful when inspecting the DOM
	      .attr("fill", function (d, i) { return colours[i]; })
	      .attr("transform", function (d, i) { return "translate(" + x1(i) + ")"; });
	
	  // Groups selection
	  var groups = series.selectAll("rect")
	      .data(Object) // The second dimension in the two-dimensional data array
	    .enter().append("svg:rect")
	        .attr("x", 0)
	        .attr("y", function (d) { return y(d); })
	        .attr("width", x1.rangeBand() - params.options.barPadding)
	        .attr("height", function (d) { return height - y(d); })
	        .attr("transform", function (d, i) { return "translate(" + x0(i) + ")"; });
	        
	 if (params.options.showValueOnBar)
	 {
		 var number = series.selectAll("text")
		      .data(Object) // The second dimension in the two-dimensional data array
		    .enter().append("text")
		        .attr("x", (x1.rangeBand() - params.options.barPadding) / 2)
		        .attr("y", function (d) { return y(d) + 15; })
		        .attr("transform", function (d, i) { return "translate(" + x0(i) + ")"; })
		        .style("text-anchor", "middle")
		        .style("fill", "#fff")
		        .text(String);
	   }
	}
}