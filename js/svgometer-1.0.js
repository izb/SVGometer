/**
* SVGometer: SVG-based general purpose shiny meter.
* Author: Ian Beveridge
* Email: ian.beveridge@gmail.com
* URL: http://kupio.com/svgometer
* Version: 1.0
*/

var SVGometer = (function() { /* Begin class definition */
	
	function SVGometer(jqElement, url)
	{
		jqElement.load(url, function() {
			document.getElementById("needle").setAttribute("transform", "translate(100,100) rotate(20)");
			document.getElementById("greenlevel").setAttribute("transform", "translate(100,100) rotate(0)");
			document.getElementById("redlevel").setAttribute("transform", "translate(100,100) rotate(0)");
			document.getElementById("markers").setAttribute("transform", "translate(100,100) rotate(0)");
		});
	};
	
return SVGometer;})(); /* End class definition */
