         // Width and height of xAxis and yAxis
			var w = 650;
			var h = 450;
			var padding = 40;
			var xScale, yScale, rScale, xAxis, yAxis, svg, dataEntriesX = Array(), dataEntriesY = Array();
            var format = d3.format(".00f");
function createXaxis(xLabel) {
	//alert("axis");
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.style({ "stroke": "Black", "fill": "none", "stroke-width": "1px"})
					.call(xAxis)
					.append("text")
					.attr("transform", "rotate(0)")
					.attr("x", 6)
      					//.attr("dx", "40em")
      					.style("text-anchor", "end")
						.attr("font-family","sans-serif")
      					.text(xLabel);
			} 
			
			// Define function: used to create Y axis
			function createYaxis(yLabel) {
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.style({ "stroke": "Black", "fill": "none", "stroke-width": "1px"})
					.call(yAxis)
					.append("text")
					.attr("transform", "rotate(0)")
					.attr("y", 6)
      					//.attr("dy", ".90em")
      					.style("text-anchor", "end")
      					.text(yLabel);
			} 

	function setAxis(xScale, yScale) {		
	// Define X axis
	 			xAxis = d3.svg.axis()
	 							  .scale(xScale)
	 							  .orient("bottom")
	 							  .ticks(5);
	 
	 			//  Define Y axis
	 			yAxis = d3.svg.axis()
	 							  .scale(yScale)
	 							  .orient("left")
	 							  .ticks(5);
	                               
	             $('#graphhere').empty();
	             // Create SVG element
	            svg = d3.select("#graphhere").append("svg")
	                         .attr("width", 700)
	                         .attr("height", 500)
	 						.append("g")
	 						// move 0,0 slightly down and right to accomodate axes
	 						.attr("transform", "translate(40,20)");
	             
	 			// Create X-axis grid lines
	 			svg.selectAll("line.x")
	 				.data(xScale.ticks(10))
	 				.enter().append("line")
	 				.attr("class", "x")
	 				.attr("x1", xScale)
	 				.attr("x2", xScale)
	 				.attr("y1", 40)
	 				.attr("y2", 410)
	 				.style("stroke", "#ccc");
	 			// Create Y-axis grid lines
	             svg.selectAll("line.y")
	 				.data(yScale.ticks(10))
	 				.enter().append("line")
	 				.attr("class", "y")
	 				.attr("x1", 40)
	 				.attr("x2", 570)
	 				.attr("y1", yScale)
	 				.attr("y2", yScale)
	 				.style("stroke", "#ccc");
	 			
	 			};
function tod3Entries(data, index, array) {
	if(array==xArray) {
		dataEntriesX = [];
		dataEntriesX.push(d3.entries(data)); 
	} else if (array == yArray) {
		dataEntriesY = [];
		dataEntriesY.push(d3.entries(data)); 
	}
	
	//console.log(dataEntries);
}
            
            // Create scale functions
	function graph (xArray, yArray, chart){		
				if(yArray == null) {
					xArray.forEach(tod3Entries);
				console.log(dataEntriesX, dataEntriesX[0].length);

				xScale = d3.scale
								.linear()
								.domain([0, d3.max(dataEntriesX, function(d) { return d[0].value; })])
								.range([padding, w - padding * 2]);
	
				yScale = d3.scale
								.linear()
								.domain([0, d3.max(dataEntriesX, function(d,i) { return d[i].value; })])
								.range([h - padding, padding]);
	
				rScale = d3.scale
								.linear()
							 	.domain([0, d3.max(dataEntriesX, function(d,i) { return d[i].value; })])
								.range([0, 5]);
	
				} else {
					xArray.forEach(tod3Entries);
					yArray.forEach(tod3Entries);
					console.log(dataEntriesX, dataEntriesY);

					xScale = d3.scale
								.linear()
								.domain([0, d3.max(dataEntriesX, function(d) { return d[0].value; })])
								.range([padding, w - padding * 2]);
	
				yScale = d3.scale
								.linear()
								.domain([0, d3.max(dataEntriesY, function(d) { return d[0].value; })])
								.range([h - padding, padding]);
	
				rScale = d3.scale
								.linear()
							 	.domain([0, d3.max(dataEntriesY, function(d,i) { return d[i].value; })])
								.range([0, 5]);
				}
				
		setAxis(xScale, yScale);
		if (chart == "bar") {
			//alert('bar');
			barChart(dataEntriesX);
		} else if (chart == "scatter") {
			var scatterData = Array(); 
			scatterData.push(dataEntriesX, dataEntriesY);
			scatterPlot(scatterData);
		}
				
	}

			// Bar Chart
			function barChart(data) {
				

				var rect = svg.selectAll(".bar")
			   		.data(data[0])
			   		.enter().append("g")
					.attr("class", "bar")
					.append("rect")
			   		.attr("x", function(d,i) {return i*(w/data[0].length); })
			   		.attr("y", h)
			   		.attr("width", function(d) { return w / data[0].length; }) 
			  		.attr("height", 0);
					
	
					/*var tipBar = d3.tip()
					.attr("class", "d3-tipBar")
						.html(function(d) { return d.key + " : "+format(d.value); });
					
					rect.on("mouseover", tipBar.show)
					.on("mouseout", tipBar.hide);*/

					rect.transition()
					.attr("y", function(d){ return yScale(d.value); })
					.attr("height", function(d) { return h - yScale(d.value) - padding - 1;});

			}// End of Bar Chart*/
			
			
			// Bubble Chart
			function bubbleChart(data) {
				 		svg.selectAll("circle")
			  				.data(data)
			   				.enter().append("circle")
			   				.attr("cx", function(d) { return xScale(d[0].value); })
			   				.attr("cy", function(d) { return yScale(d[1].value); })
			   				.attr("r", function(d) { return Math.sqrt(h - d[1]); })
							//.on("mouseover", tipBubble.show)
							//.on("mouseout", tipBubble.hide)
					
			}// End of Bubble Chart
			
			
			// Scatter Plot
			function scatterPlot(data) {
				svg.selectAll("circle")
			  				.data(data)
			   				.enter().append("circle")
							.attr("class", "point")
			   				.attr("cx", function(d) { 
			   					console.log(xScale(d[0].value));
			   					return xScale(d[0].value); })
			   				.attr("cy", function(d) { return yScale(d[1].value); })
			   				.attr("r", function(d) { return 2; });
			}// End of Scatter Plot
			
      		// Remove all plots
			function removeAll() {
				svg.selectAll("circle").remove();
				svg.selectAll(".bar").remove();
			}
			