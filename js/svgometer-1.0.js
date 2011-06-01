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
	 *     greenmin: }
	 *     greenmax: } Indicator for good/bad values on the meter.
	 *     redmin:   } Overlap these to create a yellow area
	 *     redmax:   }
	 * 	   initial: The initial meter value
	 * }
	 * 
	 */
	
	function SVGometer($ele, url, config)
	{
		var meter = this;
		
		this.setRange = function(ele, from, to)
		{
			from *= this.factor;
			to *= this.factor;
			
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
		
		$ele.load(url, function() {
			
			$('#txtMin').text(""+config.min);
			$('#txtMax').text(""+config.max);
			$('#txtTitle').text(config.label);
			
			meter.min = config.min;
			meter.max = config.max;
			
			meter.greenmin = Math.max(config.min, config.greenmin);
			meter.greenmax = Math.min(config.max, config.greenmax);
			meter.redmin = Math.max(config.min, config.redmin);
			meter.redmax = Math.min(config.max, config.redmax);
			
			document.getElementById("markers").setAttribute("transform", "translate(100,100) rotate(0)");
			
			var range = config.max - config.min;
			
			meter.factor = 270/range;
			
			meter.setRange(document.getElementById("redpath"), meter.redmin, meter.redmax);
			meter.setRange(document.getElementById("greenpath"), meter.greenmin, meter.greenmax);
			
			meter.setValue(config.initial);
		});
	};
	
	SVGometer.prototype.setValue = function(val) {
		val = Math.max(val, this.min);
		val = Math.min(val, this.max);
		/* TODO: Set the text of the needle value too */
		document.getElementById("needle").setAttribute("transform", "translate(100,100) rotate("+(val * this.factor - 135)+")");
	}
	
return SVGometer;})(); /* End class definition */
