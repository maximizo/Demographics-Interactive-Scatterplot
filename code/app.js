// @TODO: YOUR CODE HERE!
//set SVG width, height, and margin
var svgWidth = 800;
var svgHeight = 400;
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Get data from CSV
d3.csv("data/data.csv").then(function(stateData, err){
  if (err) throw err;
  console.log(stateData);

  //parse state data
  stateData.forEach(function(data){
    data.id = +data.id;
    data.state = +data.state;
    data.abbr = data.abbr;
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;

})

  //Create x scale for poverty 
  var xLinearScale = d3.scaleLinear()
    .domain([8.5, d3.max(stateData, d=>d.poverty)])
    .range([0, width]);

  //Create y scale for healthcare
  var yLinearScale=d3.scaleLinear()
    .domain([3.5, d3.max(stateData, d=>d.healthcare)])
    .range([height, 0]);

  //create x-axis
  var bottomAxis = d3.axisBottom(xLinearScale);

  //create y-axis
  var leftAxis = d3.axisLeft(yLinearScale);

  //append x-axis
  var xAxis=chartGroup.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  //append y-axis
  chartGroup.append('g').call(leftAxis);
  
  //create and add inital circles
  chartGroup.selectAll('circle')
    .data(stateData)
    .enter()
    .append('circle')
    .attr('r',20)
    .attr('fill','lightblue')
    .attr('opacity','.7')
    .attr('cx', d=> xLinearScale(d.poverty))
    .attr('cy', d=> yLinearScale(d.healthcare));

  
  //add text in the circle
  chartGroup.selectAll("data")
    .data(stateData)
    .enter()
    .append('text')
    .text(d=>d.abbr)
    .attr('text-anchor','middle')
    .attr('font-size','11px')
    .attr('fill','white')
    .attr('x',d=>xLinearScale(d.poverty))
    .attr('y',d=>yLinearScale(d.healthcare))
    
  //Create x-axis label
  chartGroup.append('text')
    .text('In Poverty (%)')
    .attr('transform', `translate(${width/2}, ${height + margin.top + 30})`)
    .attr('class','axisText')

  //Create y-axis label
  chartGroup.append('text')
    .text('Lacks Healthcare (%)')
    .attr('transform','rotate(-90)')
    .attr('y', 0 - margin.left + 40)
    .attr('x', 0 - (height/2))
    .attr('dy','1em')
    .attr('class','axisText')
})