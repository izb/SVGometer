$(document).ready(function () {
	new SVGometer($("#placement"), "images/guage.svg", {
		min: 0,
		max: 1500,
		label: "This is a test"
	});		
});
