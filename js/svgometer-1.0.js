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
			document.getElementById("greenlevel").setAttribute("transform", "translate(100,100)");
			document.getElementById("redlevel").setAttribute("transform", "translate(100,100)");
			document.getElementById("markers").setAttribute("transform", "translate(100,100) rotate(0)");
			
			setRange(document.getElementById("greenpath"), 80, 100);
		});
		
		function setRange(ele, from, to)
		{
			var startx = -101.09433; /* TODO: parse the existing path data */
			var starty = 40.768728;
			
			var c = (Math.cos(from) * 80) + startx - 64.25;
			var s = (Math.sin(from) * 80) + starty - 64.25;
			
			console.log("m "+startx+","+starty+" a 64.25,64.25 0 1 1 "+c+","+s);
			
			ele.setAttribute("d", "m "+startx+","+starty+" a 64.25,64.25 0 1 1 "+c+","+s);
		}
	};
	
return SVGometer;})(); /* End class definition */
