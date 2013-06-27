$(function() 
{
	//generateIndicatorScoreBar_NoSVG("indicator-score-bar", 67);
	generateIndicatorScoreBar_SVG("indicator-score-bar", 67);
	
	//generateIndicatorTendencyArrow_NoSVG("tendency-arrow", 1);
	generateIndicatorTendencyArrow("tendency-arrow", 1);
	//rotateIndicatorTendencyArrow_SVG("tendency-arrow", -1, 1);
	//turnArrowIntoEqual_SVG("tendency-arrow", 0, 1);
});


function indicador_creciente()
{
	changeIndicatorScoreBar_SVG("indicator-score-bar", 92);
	changeIndicatorTendency("tendency-arrow", 1, -1);
}

function indicador_decreciente()
{
	changeIndicatorScoreBar_SVG("indicator-score-bar", 67);
	changeIndicatorTendency("tendency-arrow", -1, 1);
}

function indicador_constante()
{
	changeIndicatorScoreBar_SVG("indicator-score-bar", 67);
	changeIndicatorTendency("tendency-arrow", 0, 1);
}

//////////////////////////////////////////////////////////////

function setIndicatorValueText(container, value)
{
	document.getElementById(container).textContent = value;
}

function generateIndicatorScoreBar_SVG(container, value)
{
	var scoreBar = document.getElementById(container);

	var svg = d3.select(scoreBar).append("svg").attr("class", "indicator-score-bar-svg");

	svg.append("rect").attr("id", container + "_progressBar")
 	   	.attr("x", 0)
	    .attr("y", 0)
	    .attr("height", scoreBar.offsetHeight)
	    .attr("fill", "#91bf39")
	    .transition().duration(1000).delay(200)
	    .attr("width", scoreBar.offsetWidth * value / 100);  
	    
	setIndicatorValueText("indicator-value-text", value);
}

function changeIndicatorScoreBar_SVG(container, value)
{
	var scoreBar = document.getElementById(container);

	var bar = document.getElementById(container + "_progressBar");

	d3.select(bar)
	.transition().duration(1000)
	.attr("width", 0)
	.transition().duration(1000).delay(1200)
	.attr("width", scoreBar.offsetWidth * value / 100);
	
	setIndicatorValueText("indicator-value-text", value);
}

function generateIndicatorScoreBar_NoSVG(container, value)
{
	var scoreBar = document.getElementById(container);
	
	var interval = null;
	var width = 0;
	
	var span = document.createElement('span');
	span.style.width = "0%";
	scoreBar.appendChild(span);
	
	window.setTimeout(function() 
	{
		interval = setInterval(function() 
		{
			span.className = "score-progress";
			span.style.width = width + "%";
			
			width++;
			
			if (width > value)
				window.clearInterval(interval);
		}, 1000 / value);
		
	}, 200);
	
	setIndicatorValueText("indicator-value-text", value);
}
						
function generateIndicatorTendencyArrow(container, value)
{
	var cObj = document.getElementById(container);
	
	var imgArrow = new Image();
	imgArrow.src = getTendencyImage(value);
	cObj.appendChild(imgArrow);
	
	var tendencyText = getTendencyText(value);
	setIndicatorValueText("tendency-text", tendencyText);
}

function changeIndicatorTendency(container, value, previousValue)
{
	var cObj = document.getElementById(container);
	cObj.innerHTML = "";
	
	var previousArrow = new Image();
	previousArrow.src = getTendencyImage(previousValue);
	cObj.appendChild(previousArrow);
	
	var currentArrow = new Image();
	currentArrow.src = getTendencyImage(value);
	
	// Si el valor es 0 mostramos un igual
	if (value != 0 && previousValue != 0)
	{
		$(previousArrow).rotate({
		      angle: 0, 
		      animateTo: 180,
		      // Por si la animación no se muestra, ocultamos la imagen previa
		      // y mostramos la actual
		      callback: function() {
			      cObj.removeChild(previousArrow);
			      cObj.appendChild(currentArrow);
		      }
		});
	}
	else
	{
		$(previousArrow).fadeOut("slow", function() {
														cObj.removeChild(previousArrow);
														
														currentArrow.style.display = "none";
														cObj.appendChild(currentArrow);
														
														$(currentArrow).fadeIn("slow");
													});
	}
	
	var tendencyText = getTendencyText(value);
	setIndicatorValueText("tendency-text", tendencyText);
}

function getTendencyImage(value)
{
	switch(value)
	{
		case 0:
			return "img/equal.png";
		case 1:
			return "img/arrow-up.png";
		case -1:
			return "img/arrow-down.png";
	}
}

function getTendencyText(value)
{
	switch(value)
	{
		case 0:
			return "constant";
		case 1:
			return "upward";
		case -1:
			return "downward";
	}
}