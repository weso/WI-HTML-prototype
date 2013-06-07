var wesCountryMap = function() 
{
	this.tableIdList = {};
	this.lastHover = null;
	
	var regionStyle = {
		initial : {
			fill : '#ccc'
		},
		selected : {
			fill : '#99CA3C'
		},
		hover : {
			fill: '#000'
		}
	};
			
	var options = {
		backgroundColor : '#fff', 
		map: 'world_merc_en',
		series: {
	    	regions: [{
		    	values: webIndexRank,
		    	scale: ['#81F79F', '#669900'],
		    	normalizeFunction: 'polynomial'
		    }]
		},
		onRegionLabelShow: function(e, el, code) {
	    	el.html(el.html() + ' ' + webIndexRank[code]);
	    	wesCountryMap.highlightCountryText(code);
	    },
	    onRegionOut: function(e, code) {
		    wesCountryMap.highlightOutCountryText(code);
	    },
	    selectedRegions : [ ],
	    regionStyle: regionStyle
	};
  
	var countryIndex = [];
	var selectedPath = null;
	var countryColour = null;
	
	this.init = function()
	{
		var map_table = document.getElementById('map-table');
		
		var regions = processCountries(countries);
		var orderedRegions = regions.sort(
								function(a,  b) 
								{ 
									if (a.name < b.name)
										return -1; 
										
									if (a.name > b.name)
										return 1;
										
									return 0;
								});
		
		for (var i = 0; i < orderedRegions.length; i++)
		{
			var div = createwesCountryMap(orderedRegions[i].name, orderedRegions[i].countries);			
			map_table.appendChild(div);
		}
		
		var div = createwesCountryMap("Organizations", organizations);			
		map_table.appendChild(div);
	}
	
	function processCountries(countries)
	{
		var regions = [];
		
		for (var i = 0; i < countries.length; i++)
		{
			var country = countries[i];
		
			var regionIndex = indexOfRegion(regions, country.region);
		
			if (regionIndex == -1)
			{
				var region = new Object();
				region.name = country.region
				region.countries = [];
				
				regions.push(region);
				regionIndex = regions.length - 1;
			}
		
			regions[regionIndex].countries.push(country);
		}
		
		return regions;
	}
	
	function indexOfRegion(regions, region)
	{
		for (var i = 0; i < regions.length; i++)
			if (regions[i].name == region)
				return i;
				
		return -1;
	}
	
	function createwesCountryMap(region, countries)
	{
		var div = document.createElement('div');
		div.className = 'country-table large-2 small-4';
		
		var orderedCountries = countries.sort(
												function(a,  b) 
												{ 
													if (a.name < b.name)
														return -1; 
														
													if (a.name > b.name)
														return 1;
														
													return 0;
												});
		
		var table = document.createElement('table');
		div.appendChild(table);
		
		var tbody = document.createElement('tbody')
		table.appendChild(tbody);
		
		var tr = document.createElement('tr');
		tbody.appendChild(tr);
		
		var td = document.createElement('td');
		td.className = 'region';
		tr.appendChild(td);
		
		text(td, region);
		
		for (var i = 0; i < orderedCountries.length; i++)
		{
			tr = document.createElement('tr');
			tbody.appendChild(tr);
		
			td = document.createElement('td');
			td.className = 'country';
			td.code = orderedCountries[i].code;
			tr.appendChild(td);
			
			td.onmouseover = function()
			{
				wesCountryMap.highlightCountryPath(this.code);
			};
			
			td.onmouseout = function()
			{
				wesCountryMap.highlightOutCountryPath();
			};
			
			text(td, orderedCountries[i].name);
			
			this.tableIdList[orderedCountries[i].code] = td;
		}
		
		return div;
	}
	
	function text(obj, content)
	{
		if (obj.innerText)
			obj.innerText = content;
		else
			obj.textContent = content;
	}
	
	this.highlightCountryText = function (countryCode)
	{
		var field = this.tableIdList[countryCode];
		
		field.className = 'country-hover';
		
		this.lastHover = countryCode;
	}
	
	this.highlightOutCountryText = function ()
	{
		if (this.lastHover)
		{
			var field = this.tableIdList[this.lastHover];
		
			field.className = 'country';
		}	
		
		this.lastHover = null;
	}
	
	this.highlightCountryPath = function (countryCode)
    {
	    selectedPath = countryIndex[countryCode];
	    countryColour = selectedPath.getAttribute('fill');

	    selectedPath.setAttribute('fill', '#333333');
    }
    
    this.highlightOutCountryPath = function ()
    {
	    selectedPath.setAttribute('fill', countryColour);
    }
	
	// Ready
	
	$(function()
	{
    	$('#world-map').vectorMap(options);
      
    	$('#world-map path').each(function (key, value) 
    						{
	    						var countryCode = value.getAttribute('data-code');
	    						countryIndex[countryCode] = value;
    						});
    						
    	wesCountryMap.init();
    });
	
	return this;
}();