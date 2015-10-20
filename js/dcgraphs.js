/*var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");*/
// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
var spendData = [
    {Name: 'Mr A', Spent: '$40', Year: "2011"},
    {Name: 'Mr B', Spent: '$10', Year: "2011"},
    {Name: 'Mr C', Spent: '$40', Year: "2011"},
    {Name: 'Mr A', Spent: '$70', Year: "2012"},
    {Name: 'Mr B', Spent: '$20', Year: "2012"},
    {Name: 'Mr B', Spent: '$50', Year: "2013"},
    {Name: 'Mr C', Spent: '$30', Year: "2013"}
];

var spendData1 = [
{key: 'country', value: 64},
{key: 'country1', value: 52},
{key: 'country2', value: 47},
{key: 'country3', value: 35},
{key: 'love', value: 89}
];
// normalize/parse data
spendData.forEach(function(d) {
    d.Spent = d.Spent.match(/\d+/);
});


//
   function graphEach(arr) {
       var scale = d3.scale.linear()
           .range([0,10]);


       arr.forEach(function(d) {
           d.value = scale(parseFloat(d.value));
           if(isNaN(d.value)) {d.value = 0;}
           console.log(d.value);
       });

 var ndx1 = crossfilter(arr),
     headDim = ndx1.dimension(function(d) { return +d.key;}),
     valDim = ndx1.dimension(function(d) {console.log(Math.floor(parseFloat(d.value))); return Math.floor(parseFloat(d.value))/1000000;}),
     keyDim = ndx1.dimension(function(d) {return d.key;}),
     head_val = headDim.group().reduceSum(function(d) {return +parseFloat(d.value);}),
     key_val = keyDim.group().reduceSum(function (d) {return +parseFloat(d.value); }),
     val_count = valDim.group().reduceCount();
    //console.log(headDim);
       var pie = d3.select("#graphhere").append('div').attr('id', 'name-pie'),
       hist = d3.select("#graphhere").append('div').attr('id', 'name-hist'),
       //row = d3.select("#graphhere").append('div').attr('id', 'name-row'),
       ringChart = dc.pieChart("#name-pie"),
       histChart = dc.barChart("#name-hist");
       //rowChart = dc.rowChart("#name-row");

   ringChart
       .width(200).height(200)
       .dimension(headDim)
       .group(head_val)
       .innerRadius(50);

       histChart
           .width(600).height(200)
           .dimension(keyDim)
           .group(val_count)
           .x(d3.scale.linear().domain([0,100]))
           .elasticY(true);
       /*rowChart
           .width(350).height(200)
           .dimension(headDim)
           .group(key_val)
           .elasticX(true);*/

dc.renderAll();
   }

   function dcgraph(data) { 
    for(var i=0; i<data.length; i++) {
        graphEach(select[i]); 
    }
}

// set crossfilter
//example set
/*var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.Year;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendHist    = spendDim.group().reduceCount();

console.log(yearDim);
    yearRingChart
    .width(200).height(200)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);
spendHistChart
    .width(300).height(200)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true);
spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);
spenderRowChart
    .width(350).height(200)
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true);
dc.renderAll();*/

function graphBar (arr) {
    arr.forEach(function(d) {
        d.value = +parseFloat(d.value);
        console.log(d.value);
        if(isNaN(d.value)){d.value = 0; }
    });

    d3.select("#graphhere").append("div").attr("id", "test11");

    var chart = dc.barChart("#test11");

    var ndxb = crossfilter(arr),
        max = d3.max(arr, function(d) {return d.value;}),
        valDim = ndxb.dimension(function(d) {return 2*d.value/max;}),
        keyDim = ndxb.dimension(function(d) {return d.key;}),
        valbykey = keyDim.group().reduceSum(function(d){console.log(2*d.value/max); return 2*d.value/max;}),
        what = valDim.group().reduceSum(function(d) {return 2*d.value/max}),
        topTypes = valbykey.top(1);
console.log(topTypes[0].key, topTypes[0].value);

    chart
        .width(768)
        .height(480)
        .x(d3.scale.linear().domain([0, 2]))
        .brushOn(false)
        .yAxisLabel("This is the Y Axis!")
        .dimension(valDim)
        .group(what)
        .gap(100);
    chart.render();
}
