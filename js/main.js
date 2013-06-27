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

function YearSelector(container, minYear, maxYear, selectedYear)
{
	var selected = null;
	var slider = null;
	
	selectYear(selectedYear ? selectedYear : maxYear);
	init();
	
	function selectYear(year)
	{
		if (selected)
			selected.className = "year-name";
			
		selected = document.getElementById(container + "-" + year);
		
		if (selected)
			selected.className = "year-name-selected";
	}
	
	function selectYearByName(year)
	{
		selectYear(year);
		$(slider).slider('value', year);
	}
	
	function init()
	{
		var parent = document.getElementById(container);
		parent.className = "year-selector";
		
		var div = document.createElement("div");
		div.className = "year-selector-wrapper";
		parent.appendChild(div);
		
		slider = document.createElement("div");
		slider.className = "year-selector-slider";
		div.appendChild(slider);
	
		$(slider).slider({
			value : selectedYear,
			min : minYear,
			max : maxYear,
			step : 1,
			slide : function(event, ui) {
				selectYear(ui.value);
			}
		});
		
		var years = document.createElement("section");
		years.className = "available-years";
		parent.appendChild(years);
		
		for (var i = minYear; i <= maxYear; i++)
		{
			var div = document.createElement("div");
			div.className = "small-2 large-2 columns centered";
			years.appendChild(div);
			
			var strong = document.createElement("strong");
			strong.id = container + "-" + i;
			text(strong, i);
			strong.year = i;
			strong.className = "year-name";
			div.appendChild(strong);
			
			strong.onclick = function() {
				selectYearByName(this.year);
			}
			
			if (i == selectedYear)
			{
				strong.className = "year-name-selected";
				selected = strong;
			}
		}
	}
}

$(function() {
	new YearSelector("year-selector", 2007, 2012, 2012)
});

$(window).resize(function() {

	var p = new Params();

	for (var i = 0; i < graphData.length; i++)
		p.regions[i] = new Region(graphData[i].code, [graphData[i].value]);	

	p.container = "#country-webindex";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 1;
	p.options.margins = [10, 10, 1, 30];
	p.options.height = 120;
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
});

function IndicatorList(accordion, indicatorList, autocompleteTags)
{
	var openedTab = [];
	var selectedTitle = [];
	
	init();

	function init()
	{
		for (var i = 0; i < indicatorList.length; i++)
		{
			var section = createIndicatorListSection(indicatorList[i], autocompleteTags, 0);
		
			accordion.append(section);
		}
	}

	function createIndicatorListSection (indicator, autocompleteTags, depth)
	{
		if (indicator.indicators)
		{	
			var section  = document.createElement('section');
			section.className = (depth == 0 ? 'indicator-section' : '');
			section.id = indicator.title;
								
			var p = document.createElement('p');
			p.className = "title" + depth;
			section.appendChild(p);
			
			var a = document.createElement('a');
			a.className = 'indicator-link';
			a.href = "#";
			text(a, indicator.title);
			
			a.paragraph = p;
			a.depth = depth;
			
			a.onclick = function() { setAsActive(this, depth); };
			
			p.appendChild(a);
			
			autocompleteTags.push(indicator.title);
			
			var content = document.createElement('div');
			content.className = "list-content";
			section.appendChild(content);
			a.content = content;
			
			var nav = document.createElement('nav');
			content.appendChild(nav);
			
			var ul = document.createElement('ul');
			ul.className = "no-bullet";
			nav.appendChild(ul);
			
			for (var i = 0; i < indicator.indicators.length; i++)
			{
				var li = document.createElement('li');
				li.className = "list-element" + (depth + 1);
				ul.appendChild(li);
				
				autocompleteTags.push(indicator.indicators[i].title);
				
				if (indicator.indicators[i].indicators)
				{
					var node = document.createElement('div');
				
					var subSection = createIndicatorListSection (indicator.indicators[i], autocompleteTags, depth + 1);
					node.appendChild(subSection);
					
					li.appendChild(node)
				}
				else
				{
					var p = document.createElement('paragraph');
					li.appendChild(p);
					
					var a = document.createElement('a');
					a.href = "#";
					a.paragraph = p;
					a.depth = depth + 1;
					text(a, indicator.indicators[i].title);
					p.appendChild(a);
					
					a.onclick = function() { setAsActive(this, depth + 1); };
				}
			}
			
			return section;
		}
	}
	
	function setAsActive(element, depth)
	{
		for (var i = element.depth; i < openedTab.length; i++)
			openedTab[i].style.display = "none";
			
		if (element.content)
		{
			openedTab[element.depth] = element.content;
			openedTab[element.depth].style.display = "block";
		}
		
		for (var i = 0; i < selectedTitle.length; i++)
			selectedTitle[i].className = "title" + i;
			
		selectedTitle[element.depth] = element.paragraph;
		selectedTitle[element.depth].className = "title" + depth + " active-node";
	}
}

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

// Indicadores

$(function() 
{
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

	p.options.colours = rainbow.getColours(); p.options.colours[17] = "#333";
	p.options.ticks = 2;
	
	new D3Connector().drawBarChart(p);
	
	p = new Params();
	
	p.container = "#indicator-main-indicator";
	p.labels = ["Indicador 1"];
	p.options.groupPadding = 0;
	p.options.barPadding = 1;
	p.options.margins = [10, 0, 40, 30];
	p.options.height = 150;
	p.options.showLabels = true;
	p.options.showXAxisLabel = true;
	p.options.showYAxisLabel = true;
	
	new D3Connector().drawBarChart(p);
});