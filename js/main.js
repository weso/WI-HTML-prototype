var graphData = [{"code":"SE", "value": 100},
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
{"code":"YE", "value": 0}];

$(function() 
{
	//var accordion = $("#accordion");
	
	var autocompleteTags = [];

	//var indicatorList = indicators.indicators;

	//new IndicatorList(accordion, indicatorList, autocompleteTags);
	
	autocomplete(autocompleteTags) 
});

$(window).resize(function() {

	var p = new Params();

	for (var i = 0; i < graphData.length; i++)
		p.regions[i] = new Region(graphData[i].code, [graphData[i].value]);	

	p.container = "#country-webindex";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 1;
	p.options.margins = [10, 10, 4, 30];
	p.options.height = 123;
	p.options.showLabels = false;
	p.options.showXAxisLabel = false;
	p.options.showYAxisLabel = true
	p.options.yAxisName = "WEB INDEX";
	
	var numberOfColours = graphData.length;
	var colours = [];

	while(numberOfColours) 
		colours[--numberOfColours]= "#c9e1ab";

	colours[17] = "#91bf39";

	p.options.colours = colours;
	p.options.ticks = 2;
	
	$(p.container).html("");
	new D3Connector().drawBarChart(p);
});


// Listado de indicadores

/*
var indicators = { indicators : [
									{
										title: "Impact",
										indicators: [{title: "Indicator 1"}, {title: "Indicator 2"}]
									},
									{
										title: "Readiness",
										indicators: [{title: "Indicator 3"}, {title: "Indicator 4"}]
									},
									{
										title: "The Web",
										indicators: [{title: "Web Content", indicators: [{title: "Indicator 5"}]}, 
										{title: "Web Use", indicators: [{title: "Indicator 5"}]}]
									}									
								] };



$(function() 
{
	var accordion = $("#accordion");
	
	var autocompleteTags = [];

	var indicatorList = indicators.indicators;

	new IndicatorList(accordion, indicatorList, autocompleteTags);
	
	autocomplete(autocompleteTags) 
}); */

function text(obj, content)
{
	if (obj.innerText)
		obj.innerText = content;
	else
		obj.textContent = content;
}

// Autocompletar

function autocomplete(availableTags) 
{
	$( "#autocomplete" ).autocomplete({
		source: availableTags
	});
	
	// Hover states on the static widgets
	$( "#dialog-link, #icons li" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);
}

var barCharts = [];
var auxRegions = [];

// Indicadores

function loadCharts()
{
	var connector = new D3Connector();

	var p = new Params();

	for (var i = 0; i < graphData.length; i++)
		p.regions[i] = new Region(graphData[i].code, [graphData[i].value]);	

	p.container = "#indicator-world-position";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 1;
	p.options.margins = [10, 0, 40, 30];
	p.options.height = 150;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	
	var rainbow = new Rainbow();
	rainbow.setSpectrum('#343465', '#269e45', '#deb722', '#932b2f');
	rainbow.setNumberRange(0, graphData.length);

	p.options.colours = rainbow.getColours(); 
	p.options.colours[17] = "#333";
	p.options.ticks = 2;
	p.options.showLabels = false;
	
	var chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
	// ELIMINAR
	auxRegions.push(p.regions);
	
	// Indicator
	
	p = new Params();
	
	p.regions[4] = new Region("United States", [9]);
	p.regions[3] = new Region("Spain", [7]);
	p.regions[2] = new Region("Turkey", [5]);
	p.regions[1] = new Region("Switzerland", [4]);
	p.regions[0] = new Region("Zimbabwe", [1]);
	
	p.indexes = [ "Zimbabwe", "Switzerland", "Turkey", "Spain", "United States" ];
	
	p.container = "#indicator-main-indicator";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 40;
	p.options.barPadding = 40;
	p.options.margins = [10, 0, 40, 0];
	p.options.height = 280;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	
	p.options.colours = ["#91bf39", "#91bf39", "#91bf39", "#333", "#91bf39"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.showBarLabels = true;
	p.options.mean = 5.2;
	p.options.meanColour = "#91bf39";
	p.options.median = 5;
	p.options.medianColour = "#111";

	var chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
	// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	
	p.regions[4] = new Region("United States", [9]);
	p.regions[3] = new Region("Spain", [8]);
	p.regions[2] = new Region("Turkey", [5]);
	p.regions[1] = new Region("Switzerland", [4]);
	p.regions[0] = new Region("Zimbabwe", [1]);
	
	p.indexes = [ "United States", "Spain", "Turkey", "Switzerland", "Zimbabwe" ];
	
	p.container = "#indicator-progression-indicator-1";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 40;
	p.options.barPadding = 20;
	p.options.margins = [0, 0, 0, 0];
	p.options.height = 150;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	p.options.showBarLabels = false;
	
	p.options.colours = ["#c9e1ab", "#c9e1ab", "#c9e1ab", "#444", "#c9e1ab"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.mean = 4;
	p.options.meanColour = "#91bf39";
	p.options.median = 5.2;
	p.options.medianColour = "#111";

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	
	p.regions[4] = new Region("United States", [9]);
	p.regions[3] = new Region("Spain", [7]);
	p.regions[2] = new Region("Turkey", [5]);
	p.regions[1] = new Region("Switzerland", [4]);
	p.regions[0] = new Region("Zimbabwe", [1]);
	
	p.indexes = [ "United States", "Spain", "Turkey", "Switzerland", "Zimbabwe" ];
	
	p.container = "#indicator-progression-indicator-2";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 40;
	p.options.barPadding = 20;
	p.options.margins = [0, 0, 0, 0];
	p.options.height = 150;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	p.options.showBarLabels = false;
	
	p.options.colours = ["#c9e1ab", "#c9e1ab", "#c9e1ab", "#444", "#c9e1ab"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.mean = 4;
	p.options.meanColour = "#91bf39";
	p.options.median = 5.2;
	p.options.medianColour = "#111";

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	// Progression
	
	p = new Params();
	
	p.regions[5] = new Region("2007", [8]);
	p.regions[4] = new Region("2008", [7]);
	p.regions[3] = new Region("2009", [8]);
	p.regions[2] = new Region("2010", [7]);
	p.regions[1] = new Region("2011", [7]);
	p.regions[0] = new Region("2012", [7]);
	
	p.indexes = ["2007", "2008", "2009", "2010", "2011", "2012"];
	
	p.container = "#indicator-progression-years";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 20;
	p.options.margins = [10, 0, 40, 0];
	p.options.height = 220;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	
	p.options.colours = ["#c9e1ab", "#c9e1ab", "#c9e1ab", "#c9e1ab", "#c9e1ab", "#c9e1ab"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.showBarLabels = true;
	/*
	p.options.mean = 6.84;
	p.options.meanColour = "#91bf39";
	p.options.median = 7;
	p.options.medianColour = "#111";
	*/

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	p.container = "#" + chart.svgId;
	p.indexes = ["2007", "2008", "2009", "2010", "2011", "2012"];
	p.options.min = null;
	p.options.max = null;
	p.regions[0] = new Region("Spain", [7, 7, 7, 8, 7, 8]);
	p.options.height = 220;
	p.options.ticks = 3;
	p.options.legend = false;
	p.options.margins = [10, 0, 20, 0];
	p.options.showXAxisLabel = false;
	p.options.colours = ["#91bf39", "#91bf39", "#91bf39", "#91bf39", "#91bf39", "#91bf39"];

	new connector.drawLineChart(p);
	
	// Organization comparison

	p = new Params();
	
	p.regions[4] = new Region("United States", [9]);
	p.regions[3] = new Region("Spain", [7]);
	p.regions[2] = new Region("Turkey", [5]);
	p.regions[1] = new Region("Switzerland", [4]);
	p.regions[0] = new Region("Zimbabwe", [1]);
	
	p.indexes = [ "Greece", "Portugal", "Spain", "Holland", "Finland" ];
	
	p.container = "#indicator-organization-comparison-countries";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 40;
	p.options.barPadding = 20;
	p.options.margins = [10, 0, 40, 0];
	p.options.height = 220;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	
	p.options.colours = ["#aaa", "#aaa", "#444", "#aaa", "#aaa"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.showBarLabels = true;
	p.options.mean = 5.2;
	p.options.meanColour = "#aaa";
	p.options.median = 5;
	p.options.medianColour = "#111";

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	
	p.regions[0] = new Region("Spain", [7]);
	p.regions[1] = new Region("European Union", [7.5]);


	p.indexes = [ "Spain", "European Union" ];
	
	p.container = "#indicator-organization-comparison-mean";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 40;
	p.options.barPadding = 40;
	p.options.margins = [10, 0, 40, 0];
	p.options.height = 220;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	
	p.options.colours = [ "#444", "#aaa" ];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.showBarLabels = true;

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	
	p.regions[5] = new Region("2007", [10]);
	p.regions[4] = new Region("2008", [9]);
	p.regions[3] = new Region("2009", [9]);
	p.regions[2] = new Region("2010", [8]);
	p.regions[1] = new Region("2011", [8]);
	p.regions[0] = new Region("2012", [8]);
	
	p.indexes = ["2007", "2008", "2009", "2010", "2011", "2012"];
	
	p.container = "#indicator-organization-comparison-progression";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 20;
	p.options.margins = [10, 0, 40, 0];
	p.options.height = 220;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	p.options.showValueOnBar = true;
	
	p.options.colours = ["#ccc", "#ccc", "#ccc", "#ccc", "#ccc", "#ccc"];

	p.options.showYAxisLabel = false;
	p.options.showLabels = false;
	p.options.showBarLabels = true;
	/*
	p.options.mean = 6.84;
	p.options.meanColour = "#91bf39";
	p.options.median = 7;
	p.options.medianColour = "#111";
	*/

	chart = new connector.drawBarChart(p);
	barCharts.push(chart);
	
		// ELIMINAR
	auxRegions.push(p.regions);
	
	p = new Params();
	p.container = "#" + chart.svgId;
	p.indexes = ["2007", "2008", "2009", "2010", "2011", "2012"];
	p.options.min = null;
	p.options.max = null;
	p.regions[0] = new Region("Spain", [8, 8, 8, 9, 9, 10]);
	p.options.height = 220;
	p.options.ticks = 3;
	p.options.legend = false;
	p.options.margins = [10, 0, 10, 0];
	p.options.showXAxisLabel = false;
	p.options.colours = ["#666", "#666", "#666", "#666", "#666", "#666"];

	new connector.drawLineChart(p);
	
	p = new Params();
	p.container = "#indicator-organization-comparison-both";
	p.indexes = ["2007", "2008", "2009", "2010", "2011", "2012"];
	p.options.min = null;
	p.options.max = null;
	p.regions[0] = new Region("Spain", [7, 7, 7, 8, 7, 8]);
	p.regions[1] = new Region("EU", [8, 8, 8, 9, 9, 10]);
	p.options.height = 180;
	p.options.ticks = 3;
	p.options.legend = true;
	p.options.margins = [0, 0, 30, 0];
	p.options.showXAxisLabel = true;
	p.options.colours = ["#333", "#888"];
	p.options.legendVerticalPosition = "top";

	new connector.drawLineChart(p);
}

$(function() {
	loadCharts();
})

function reloadCharts() {
	for (var i = 0; i < barCharts.length; i++) {
		barCharts[i].reload(auxRegions[i]);
	}
}