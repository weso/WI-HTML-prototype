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
	this.width = 0;
	this.height = 0;
	this.margins = [0, 0, 0, 0];
	this.title = 'My awesome wesCountry chart';
	this.bgColour = '#fff';
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
	this.min = null;
	this.max = null;
	this.yAxisName = 'Value';
	this.xAxisName = 'Domain';
	this.axisColour = '#ccc'
}

function composeParams(params) {
	if (!params) {
		throw "Parameters not found";
	}
	var result = new Params();
	for (var attrname in params) {
		result[attrname] = params[attrname];
	}
	if (!params.indexes) {
		result.indexes = [];
		for (var i = 0; i < params.regions[0].data.length; i++) {
			result.indexes[i] = "Indicator " + i;
		}
	}
	if (!params.container) {
		var div = document.createElement("div");
		div.id = "container" + Math.floor(Math.random() * 10000);
		document.body.appendChild(div);
		result.container = "#" + div.id;
	}
	if (params.options.width === 0) {
		result.options.width = $(params.container).width();
	}
	if (params.options.height === 0) {
		result.options.height = $(params.container).height() === 0 ? 400 : $(params.container).height();
	}
	if (!params.options.min || !params.options.max) {
		var minDatum = Number.MAX_VALUE;
		var maxDatum = -minDatum;
		for (var i = 0; i < result.regions.length; i++) {
			for (var j = 0; j < result.regions[i].data.length; j++) {
				var datum = result.regions[i].data[j];
				if (datum < minDatum) {
					minDatum = datum;
				}
				if (datum > maxDatum) {
					maxDatum = datum;
				}
			}
		}
		if (!params.options.max) {
			result.options.max = maxDatum * 1.25;
		}
		if (!params.options.min) {
			result.options.min = minDatum * 0.75;
		}
	}
	return result;

}