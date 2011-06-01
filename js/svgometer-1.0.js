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
	 *     ticksize: The size of one tick - the marks around the dial
	 *     bigtickevery: Every x ticks, the tick will be a little heavier
	 *     bigtickfirst: The first tick to be a heavy tick (0-based)
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
			
			from = (from + 135) * (Math.PI/180);
			to = (to + 135) * (Math.PI/180);
			
			var fx = (Math.cos(from) * 64) + 100;
			var fy = (Math.sin(from) * 64) + 100;
			var tx = (Math.cos(to) * 64) + 100;
			var ty = (Math.sin(to) * 64) + 100;
			
			ele.setAttribute("d", "M "+fx+","+fy+" A 64,64 0 "+longarc+" 1 "+tx+","+ty);
		}
		
		function drawTicks(size, bigevery, nextbig)
		{
			var mbig = document.getElementById("markerBig");
			var msmall = document.getElementById("markerSmall");
			var markers = document.getElementById("markers");
			
			var pos = meter.min;
			var idx = 0;
			while(pos <= meter.max)
			{
				var clone;
				if (idx == nextbig)
				{
					clone = mbig.cloneNode(false);
					clone.setAttribute("id", "marker"+idx);
					nextbig += bigevery;
				}
				else
				{
					clone = msmall.cloneNode(false);
					clone.setAttribute("id", "marker"+idx);
				}
				clone.setAttribute("transform", "rotate("+((pos - meter.min) * meter.factor - 135)+")");
				markers.appendChild(clone);

				idx++;
				pos+=size;
			}
			
			mbig.setAttribute('display', 'none');
			msmall.setAttribute('display', 'none');
		};
		
		$ele.load(url, function() {
			
			$('#txtMin').text(""+config.min);
			$('#txtMax').text(""+config.max);
			$('#txtTitle').text(config.label);
			
			$('#glow').hide();
			
			meter.min = config.min;
			meter.max = config.max;
			
			meter.greenmin = Math.max(config.min, config.greenmin);
			meter.greenmax = Math.min(config.max, config.greenmax);
			meter.redmin = Math.max(config.min, config.redmin);
			meter.redmax = Math.min(config.max, config.redmax);
			
			var range = config.max - config.min;
			
			meter.factor = 270/range;
			
			drawTicks(config.ticksize, config.bigtickevery, config.bigtickfirst);
			
			meter.setRange(document.getElementById("redpath"), meter.redmin, meter.redmax);
			meter.setRange(document.getElementById("greenpath"), meter.greenmin, meter.greenmax);
			
			meter.setValue(config.initial);
		});
	};
	
	SVGometer.prototype.setValue = function(val) {
		
		$('#txtValue').text(""+val);
		
		val = Math.max(val, this.min);
		val = Math.min(val, this.max);
		
		val = (val - this.min) * this.factor - 135;
		
		document.getElementById("needle").setAttribute("transform", "translate(100,100) rotate("+val+")");
	}
	
return SVGometer;})(); /* End class definition */
