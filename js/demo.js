$(document).ready(function () {
	new SVGometer($("#placement"), "images/guage.svg", {
		min: 0,
		max: 1500,
		label: "This is a test",
		greenmin: 0,
		greenmax: 500,
		redmin: 1000,
		redmax: 1500,
		initial: 500
	});		
});
