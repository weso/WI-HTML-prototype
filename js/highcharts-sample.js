/**
 * @author Alejandro Montes García
 */
var data = [{
	"name" : "SE",
	"data" : [100]
}, {
	"name" : "US",
	"data" : [97.42]
}, {
	"name" : "GB",
	"data" : [93.81]
}, {
	"name" : "CA",
	"data" : [93.56]
}, {
	"name" : "FI",
	"data" : [91.97]
}, {
	"name" : "CH",
	"data" : [90.59999999999999]
}, {
	"name" : "NZ",
	"data" : [89.23]
}, {
	"name" : "AU",
	"data" : [88.55]
}, {
	"name" : "NO",
	"data" : [87.86]
}, {
	"name" : "IE",
	"data" : [87.39]
}, {
	"name" : "SG",
	"data" : [86.23999999999999]
}, {
	"name" : "IS",
	"data" : [86.17]
}, {
	"name" : "KR",
	"data" : [81.04000000000001]
}, {
	"name" : "FR",
	"data" : [79.06]
}, {
	"name" : "IL",
	"data" : [78.63]
}, {
	"name" : "DE",
	"data" : [74.95999999999999]
}, {
	"name" : "PT",
	"data" : [72.42]
}, {
	"name" : "ES",
	"data" : [72.04000000000001]
}, {
	"name" : "CL",
	"data" : [69.64]
}, {
	"name" : "JP",
	"data" : [68.65000000000001]
}, {
	"name" : "QA",
	"data" : [60.82]
}, {
	"name" : "MX",
	"data" : [57.77]
}, {
	"name" : "IT",
	"data" : [56.5]
}, {
	"name" : "BR",
	"data" : [56.37]
}, {
	"name" : "PL",
	"data" : [54.87]
}, {
	"name" : "CO",
	"data" : [53.8]
}, {
	"name" : "TR",
	"data" : [53.62]
}, {
	"name" : "KZ",
	"data" : [53.56]
}, {
	"name" : "CN",
	"data" : [51.28]
}, {
	"name" : "TN",
	"data" : [50.63]
}, {
	"name" : "RU",
	"data" : [47.37]
}, {
	"name" : "PH",
	"data" : [46.59]
}, {
	"name" : "IN",
	"data" : [46.37]
}, {
	"name" : "ID",
	"data" : [46.29]
}, {
	"name" : "JO",
	"data" : [44.43]
}, {
	"name" : "ZA",
	"data" : [44.39]
}, {
	"name" : "TH",
	"data" : [43.87]
}, {
	"name" : "AR",
	"data" : [42.15]
}, {
	"name" : "EG",
	"data" : [40.78]
}, {
	"name" : "VE",
	"data" : [39.74]
}, {
	"name" : "MU",
	"data" : [36.52]
}, {
	"name" : "KE",
	"data" : [32.6]
}, {
	"name" : "EC",
	"data" : [32.35]
}, {
	"name" : "PK",
	"data" : [28.06]
}, {
	"name" : "GH",
	"data" : [27.27]
}, {
	"name" : "SN",
	"data" : [25.25]
}, {
	"name" : "VN",
	"data" : [24.24]
}, {
	"name" : "NG",
	"data" : [23.33]
}, {
	"name" : "UG",
	"data" : [20.11]
}, {
	"name" : "MA",
	"data" : [19.3]
}, {
	"name" : "TZ",
	"data" : [18.52]
}, {
	"name" : "NP",
	"data" : [18.28]
}, {
	"name" : "CM",
	"data" : [15.1]
}, {
	"name" : "BD",
	"data" : [13.49]
}, {
	"name" : "ML",
	"data" : [13.41]
}, {
	"name" : "NA",
	"data" : [13.39]
}, {
	"name" : "ET",
	"data" : [10.91]
}, {
	"name" : "BJ",
	"data" : [9.960000000000001]
}, {
	"name" : "BF",
	"data" : [8.119999999999999]
}, {
	"name" : "ZW",
	"data" : [1.96]
}, {
	"name" : "YE",
	"data" : [0]
}]

$(function() {
	$('#column').highcharts({
		chart : {
			type : 'column',
			height : 250,
			width : $(".row").width() / 2
		},
		title : {
			text : 'Web Index 2011'
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		xAxis : {
			categories : [""]
		},
		yAxis : {
			title : {
				text : 'Web Index score'
			},
			max : 100
		},
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		tooltip : {
			headerFormat : '<p style="font-size:10px">Web Index for</p>',
			useHTML : true
		},
		legend : {
			enabled : false
		},
		plotOptions : {
			column : {
				pointPadding : 0.2,
				borderWidth : 0
			}
		},
		series : data
	});

	$('#line').highcharts({
		chart : {
			type : 'line',
			height : 250,
			width : $(".row").width() / 2
		},
		title : {
			text : 'Web Index evolution'
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		xAxis : {
			categories : ["2007", "2008", "2009", "2010", "2011"]
		},
		yAxis : {
			title : {
				text : 'Web Index score'
			},
			max : 100
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : -10,
			y : 100,
			borderWidth : 0
		},
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		series : [{
			name : 'Spain',
			data : [66, 70.2, 74, 68.6, 72.1]
		}, {
			name : 'France',
			data : [86.3, 85.6, 84.8, 82.8, 78.9]
		}, {
			name : 'Germany',
			data : [77.2, 80.7, 84.9, 84.3, 74.8]
		}, {
			name : 'United Kingdom',
			data : [87.6, 90.1, 94.8, 92.4, 93.8]
		}],
	});

	$('#polar').highcharts({
		chart : {
			type : 'line',
			height : 250,
			width : $(".row").width() / 2,
			polar : true
		},
		title : {
			text : 'Web Index evolution'
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		xAxis : {
			categories : ["The Web", "Impact", "Readiness"]
		},
		yAxis : {
			max : 100,
			min : 50
		},
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		series : [{
			type : 'area',
			name : 'World',
			data : [86.3, 80.6, 84.8]
		}, {
			name : 'Spain',
			data : [77.2, 90.7, 83]
		}],
	});
});

$(function() {
	$('#gauge').highcharts({

		chart : {
			type : 'gauge',
			alignTicks : false,
			plotBackgroundColor : null,
			plotBackgroundImage : null,
			plotBorderWidth : 0,
			plotShadow : false,
			height : 250,
			width : $(".row").width() / 2
		},

		title : {
			text : 'Political rights'
		},

		pane : {
			startAngle : -90,
			endAngle : 90
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		yAxis : [{
			min : 0,
			max : 10,
			lineColor : '#339',
			tickColor : '#339',
			minorTickColor : '#339',
			offset : -25,
			lineWidth : 2,
			labels : {
				distance : -20,
				rotation : 'auto'
			},
			tickLength : 5,
			minorTickLength : 5,
			endOnTick : false
		}, {
			min : -1,
			max : 1,
			tickPosition : 'outside',
			lineColor : '#933',
			lineWidth : 2,
			minorTickPosition : 'outside',
			tickColor : '#933',
			minorTickColor : '#933',
			tickLength : 5,
			minorTickLength : 5,
			labels : {
				distance : 12,
				rotation : 'auto'
			},
			offset : -20,
			endOnTick : false
		}],
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		series : [{
			name : 'ITUE',
			data : [6],
			dataLabels : {
				formatter : function() {
					var normalised = this.y, raw = Math.round((normalised / 5 - 1) * 100) / 100;
					return '<span style="color:#339">Normalised: ' + normalised + '</span><br/>' + '<span style="color:#933">Raw: ' + raw + '</span>';
				},
				backgroundColor : {
					linearGradient : {
						x1 : 0,
						y1 : 0,
						x2 : 0,
						y2 : 1
					},
					stops : [[0, '#DDD'], [1, '#FFF']]
				}
			}
		}]

	});
});

$(function() {
	$('#group').highcharts({
		chart : {
			type : 'columnrange',
			inverted : true
		},
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		title : {
			text : 'Group comparison'
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		xAxis : {
			categories : ['Europe', 'Africa', 'Mercosur']
		},
		series : [{
			name : 'Indicator 1',
			data : [[-9.7, 9.4], [-8.7, 6.5], [-3.5, 9.4]]
		}, {
			name : 'Indicator 2',
			data : [[-3.7, 5.4], [-2.7, 4.5], [-1.5, 0.4]]
		}]
	});
});

$(function() {
	$('#twocomparison').highcharts({
		chart : {
			type : 'bar'
		},
		credits : {
			href : "http://thewebindex.org/",
			text : "thewebindex.org"
		},
		title : {
			text : 'Comparison between two items'
		},
		subtitle : {
			text : 'Source: thewebindex.org'
		},
		yAxis : {
			labels : {
				formatter : function() {
					return Math.abs(this.value);
				}
			},
			min : -100,
			max : 100
		},
		xAxis : [{
			categories : ['Indicator 1', 'Indicator 2', 'Indicator 3'],
			reversed : false
		}, {
			opposite : true,
			reversed : false,
			categories : ['Indicator 1', 'Indicator 2', 'Indicator 3'],
			linkedTo : 0
		}],
		plotOptions : {
			series : {
				stacking : 'normal'
			}
		},
		series : [{
			name : 'Spain',
			data : [90, 40, 70]
		}, {
			name : 'France',
			data : [-100, -70, -65]
		}]
	});
});
