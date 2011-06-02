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
		this.$root = $ele;
		
		this.setRange = function($ele, from, to)
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
			
			//$('.rootmeter', $('#example2')).attr('transform', 'rotate(5)')
			
			$ele.attr("d", "M "+fx+","+fy+" A 64,64 0 "+longarc+" 1 "+tx+","+ty);
		}
		
		function drawTicks(size, bigevery, nextbig)
		{
			var $markers = $('.markers', this.$root);
			var $mbig = $('.markerBig', $markers);
			var $msmall = $('.markerSmall', $markers);
			
			var pos = meter.min;
			var idx = 0;
			while(pos <= meter.max)
			{
				var $clone;
				if (idx == nextbig)
				{
					$clone = $mbig.clone().attr('id', 'marker'+idx);
					nextbig += bigevery;
				}
				else
				{
					$clone = $msmall.clone().attr('id', 'marker'+idx);
				}
				
				$clone
					.attr('transform', 'rotate('+((pos - meter.min) * meter.factor - 135)+')')
					.appendTo($markers);

				idx++;
				pos+=size;
			}
			
			$mbig.hide();
			$msmall.hide();
		};
		
		$ele.load(url, function() {
			
			var $this = $(this);
			
			$('.rootmeter', $this).attr('transform',
					'scale('+$this.width()/200+','+$this.height()/200+')');

			$('.svgoMin', $this).text(""+config.min);
			$('.svgoMax', $this).text(""+config.max);
			$('.svgoLabel', $this).text(config.label);
			
			$('.glow', $this).hide();
			
			meter.min = config.min;
			meter.max = config.max;
			
			meter.greenmin = Math.max(config.min, config.greenmin);
			meter.greenmax = Math.min(config.max, config.greenmax);
			meter.redmin = Math.max(config.min, config.redmin);
			meter.redmax = Math.min(config.max, config.redmax);
			
			var range = config.max - config.min;
			
			meter.factor = 270/range;
			
			drawTicks(config.ticksize, config.bigtickevery, config.bigtickfirst);
			
			meter.setRange($('.redpath', $this), meter.redmin, meter.redmax);
			meter.setRange($('.greenpath', $this), meter.greenmin, meter.greenmax);
			
			meter.setValue(config.initial);
		});
	};
	
	SVGometer.prototype.setValue = function(val) {
		
		$('.svgoVal', this.$root).text(""+val);
		
		val = Math.max(val, this.min);
		val = Math.min(val, this.max);
		
		val = (val - this.min) * this.factor - 135;
		
		$('.needle', this.$root).attr('transform', 'translate(100,100) rotate('+val+')');
	}
	
return SVGometer;})(); /* End class definition */
