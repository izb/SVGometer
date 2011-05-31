/**
* SVGometer: SVG-based general purpose shiny meter.
* Author: Ian Beveridge
* Email: ian.beveridge@gmail.com
* URL: http://kupio.com/svgometer
* Version: 1.0
*/

var SVGometer = (function() { /* Begin class definition */
	
	/*
	 * Config object values:
	 * 
	 * {
	 *     min: The minimum value for the meter	
	 *     max: The maximum value for the meter	
	 *     label: The label for the meter	
	 * }
	 * 
	 */
	
	function SVGometer($ele, url, config)
	{
		$ele.load(url, function() {
			
			$('#txtMin').text(""+config.min);
			$('#txtMax').text(""+config.max);
			$('#txtTitle').text(config.label);
			
			document.getElementById("needle").setAttribute("transform", "translate(100,100) rotate(20)");
			document.getElementById("markers").setAttribute("transform", "translate(100,100) rotate(0)");
			
			setRange(document.getElementById("redpath"), 0, 270);
			setRange(document.getElementById("greenpath"), 10, 90);
		});
		
		function setRange(ele, from, to)
		{
			var longarc = (to - from >= 180)? 1:0;
			
			from += 135;
			to += 135;
			
			from *= (Math.PI/180);
			to *= (Math.PI/180);
			
			var fx = (Math.cos(from) * 64) + 100;
			var fy = (Math.sin(from) * 64) + 100;
			var tx = (Math.cos(to) * 64) + 100;
			var ty = (Math.sin(to) * 64) + 100;
			
			ele.setAttribute("d", "M "+fx+","+fy+" A 64,64 0 "+longarc+" 1 "+tx+","+ty);
			
			console.log(ele);
		}
	};
	
return SVGometer;})(); /* End class definition */
