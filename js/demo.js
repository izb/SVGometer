$(document).ready(function () {
	new SVGometer($("#example1"), "images/guage.svg", {
		min: 1000,
		max: 2500,
		label: "This is a test",
		greenmin: 1000,
		greenmax: 1500,
		redmin: 2000,
		redmax: 2500,
		initial: 1500,
		ticksize: 50,
		bigtickevery: 5,
		bigtickfirst: 0

	});
	
	new SVGometer($("#example2"), "images/guage.svg", {
		min: 0,
		max: 3000,
		label: "With amber",
		greenmin: 0,
		greenmax: 2000,
		redmin: 1000,
		redmax: 3000,
		initial: 2500,
		ticksize: 250,
		bigtickevery: 2,
		bigtickfirst: 0

	});		

});
