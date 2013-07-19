function setBasicYearSelector(container, yeminYear, maxYearars) {
	var yearSelector = document.getElementById(container);
	
	for (var i = minYear; i <= maxYear; i++)
	{
		var option = document.createElement("option");
		yearSelector.appendChild(option);
		
		text(option, i);
	}
}

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
		
		var columnWidth = 12 / (maxYear - minYear + 1);
		
		for (var i = minYear; i <= maxYear; i++)
		{
			var div = document.createElement("div");
			div.className = "small-" + columnWidth + " large-" + columnWidth + " columns centered";
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