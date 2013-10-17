var dataCountries = [
	{
		name: "AFRICA",
		children: []
	},
	{
		name: "EAST ASIA & PACIFIC",
		children: [
			{
				name: "JAPAN",
				code: "JPN",
				children: []
			}
		]
	},
	{
		name: "EUROPE & CENTRAL ASIA",
		children: [
			{
				name: "FRANCE",
				code: "FRA",
				children: []
			},
			{
				name: "PORTUGAL",
				code: "POR",
				children: []
			},
			{
				name: "SPAIN",
				code: "ESP",
				children: []
			},
			{
				name: "UNITED KINGDOM",
				code: "GBR",
				children: []
			}
		]
	}
];

var dataIndicators = [
	{
		name: "WEB INDEX",
		children: [
			{
				name: "UNIVERSAL ACCESS",
				code: "UA",
				children: []
			},
			{
				name: "FREEDOM & OPENNESS",
				code: "FO",
				children: []
			},
			{
				name: "RELEVANT CONTENT",
				code: "RC",
				children: []
			},
			{
				name: "EMPOWERMENT",
				code: "EM",
				children: []
			}
		]
	}
];

var dataYears = [
	{
		name: "2007",
		code: "2007",
		children: []
	},
	{
		name: "2008",
		code: "2008",
		children: []
	},
	{
		name: "2009",
		code: "2009",
		children: []
	},
	{
		name: "2010",
		code: "2010",
		children: []
	}
];

var Comparer = new (function () {
	var result = {};

	function countryCallback(element, selectedItems) {
		var elements = selectedItems.getArray();
		result.country = elements.length > 0 ? "COUNTRY(" + elements + ")" : "";
		
		var help = "You have selected <strong>" + element.name;
		help += "</strong>. There are <strong>" + elements.length + 
		"</strong> selected countries. You can click on each one to unselect.";
		showHelp(help);
	}
	
	function indicatorCallback(element, selectedItems) {
		var elements = selectedItems.getArray();
		result.indicator = elements.length > 0 ? "INDICATOR(" + elements + ")" : "";
		
		var help = "You have selected <strong>" + element.name;
		help += "</strong>. There are <strong>" + elements.length + 
		"</strong> selected indicators. You can click on each one to unselect.";
		showHelp(help);
	}
	
	function yearCallback(element, selectedItems) {
		var elements = selectedItems.getArray();
		result.year = elements.length > 0 ? "YEAR(" + elements + ")" : "";
		
		var help = "You have selected <strong>" + element.name;
		help += "</strong>. There are <strong>" + elements.length + 
		"</strong> selected years. You can click on each one to unselect.";
		showHelp(help);
	}
	
	function showHelp(text) {
		var help = document.getElementById("help")
		help.innerHTML = text;
		help.style.display = "block";
	}
	
	var countrySelector = new Selector(dataCountries, { callback: countryCallback });
	document.getElementById("countrySelector").appendChild(countrySelector.render());
	
	var indicatorSelector = new Selector(dataIndicators, { callback: indicatorCallback });
	document.getElementById("indicatorSelector").appendChild(indicatorSelector.render());
	
	var yearSelector = new Selector(dataYears, { callback: yearCallback });
	document.getElementById("yearSelector").appendChild(yearSelector.render());
	
	function clear() {
		countrySelector.clear();
		indicatorSelector.clear();
		yearSelector.clear();
		
		result = {};
		
		showHelp("Selection is empty");
	}
	
	function setToggleColumn(clickArea, showArea) {
		document.getElementById(clickArea).onclick = function() {
			var selector = document.getElementById(showArea);
			
			if (selector.className == "selector")
				selector.className = "hidden-selector";
			else
				selector.className = "selector";
		};
	}
	
	function init() {
		setToggleColumn("countryColumn", "countrySelector");
		setToggleColumn("indicatorColumn", "indicatorSelector");
		setToggleColumn("yearColumn", "yearSelector");
		
		document.getElementById("clearButton").onclick = clear;
		document.getElementById("compareButton").onclick = function () {
			var url = "";
			
			if (result.country)
				url += result.country + "/";
				
			if (result.year)
				url += result.year + "/";
				
			if (result.indicator)
				url += result.indicator + "/";
				
			alert(url);
		};
	}
	
	init();
})();