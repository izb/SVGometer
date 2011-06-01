$(document).ready(function () {
	new SVGometer($("#placement"), "images/guage.svg", {
		min: 1000,
		max: 2500,
		label: "This is a test",
		greenmin: 1000,
		greenmax: 1500,
		redmin: 2000,
		redmax: 2500,
		initial: 1500,
		ticksize: 100,
		bigtickevery: 5,
		bigtickfirst: 0

	});		
});
