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

function createGraph(input) {
   d3.select("#graphhere").append("div").attr("id", input);

}
function scatterVals(arr) {
   for (var i=0; i<arr.length; i++) {
       for (var j=0; j<arr.length; j++) {
           if(arr[i].key == arr[j].key && arr[i].head != arr[j].head) return +arr[i].value, +arr[j].value;
       }
   }
}
//
   function graphEach(arr, type) {
       var scale = d3.scale.linear()
           .range([0,10]);
       var max = d3.max(arr,function(d) {return d.value;});

       arr.forEach(function(d) {
           d.value = +d.value;
          // console.log(d.value);
           if(isNaN(d.value)){d.value = 0; }
           if(d.value > 10000) {d.value = Math.floor(d.value/(max/10));}
       });

      // d3.select("#graphhere").append("div").attr("id", "test11");

       //var chart = dc.barChart("#test11");


       var ndxb = crossfilter(arr),

           max1 = ndxb.dimension(function(d) {return Math.max(0, d.value);}),
           valDim = ndxb.dimension(function(d) {return d.value;}),
           keyDim = ndxb.dimension(function(d) {return d.key;}),
           valbykey = keyDim.group().reduceSum(function(d){return d.value;}),
           what = valDim.group().reduceSum(function(d) {return d.value}),
           //scatterDim = ndxb.dimension(scatterVals(arr)),
           //what1 = scatterDim.group().reduceSum(function(d) {return d.value;}),
           topTypes = valbykey.top(1);
       console.log(topTypes[0].key, topTypes[0].value);
       console.log(max);
       if(type ==1) {
           createGraph("bar");
           var bar = dc.barChart("#bar");

           bar
               .width(760)
               .height(480)
               .x(d3.scale.linear().domain([0, topTypes[0].key]))
               .brushOn(false)
               .xAxisLabel(xArrLab[0])
               .dimension(valDim)
               .group(what)
               .gap(200);
       } else if (type == 2) {
           createGraph("scatter");
           var scatter = dc.scatterPlot("#scatter");
           arr.forEach(function(d) {
               for(var i=0; i<arr.length; i++) {
                   if(d.key==arr[i].key) {
                       d.value2 = arr[i].value;
                   }
               }
           });
           //console.log(arr);
           var scatterDim = ndxb.dimension(function(d) {return [+d.value , +d.value2];}),
               scatterGroup = scatterDim.group().reduceSum(function(d) {return d.value; });
           scatter
               .width(768)
               .height(480)
               .x(d3.scale.linear().domain([0,max]))
               .brushOn(true)
               .symbolSize(8)
               .clipPadding(10)
               .xAxisLabel(xArrLab[0])
               .yAxisLabel(yArrLab[0])
               .dimension(scatterDim)
               .group(scatterGroup);
       } else if (type == 5) {
           createGraph("pie");
           var pie = dc.pieChart("#pie");

           pie
               .width(650)
               .height(450)
               .dimension(valDim)
               .group(what)
               //.slicesCap(10)
               .innerRadius(10)
               .legend(dc.legend());

       }
  /*     arr.forEach(function(d) {
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
       //hist = d3.select("#graphhere").append('div').attr('id', 'name-hist'),
       //row = d3.select("#graphhere").append('div').attr('id', 'name-row'),
       ringChart = dc.pieChart("#name-pie");
       //histChart = dc.barChart("#name-hist");
       //rowChart = dc.rowChart("#name-row");*/



  /* ringChart
       .width(200).height(200)
       .dimension(headDim)
       .group(head_val)
       .innerRadius(50);*/


          /* .width(600).height(200)
           .dimension(keyDim)
           .group(val_count)
           .x(d3.scale.linear().domain([0,100]))
           .elasticY(true);*/
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
        d.value = +d.value;
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

function graphPie(xArray, yArray){
    var w = 650;
    var h = 450;

    console.log("Pie Chart");
    d3.select("#graphhere").append("div").attr("id", "test15");
    var chart = dc.pieChart("#test15");


    if(yArray.length == 0) {    // no data is in yArray

        console.log("No data in yArray!");

        xArray.forEach(function(d) {
            d.value = parseFloat(d.value);
            //console.log(d.value);
            if(isNaN(d.value)){
                d.value = 0;
            }
        });
    console.log(xArray);
        var ndx = crossfilter(xArray);
        var valDim = ndx.dimension(function(d) {return d.value;});
        var valGroup = valDim.group();

        chart
            .width(w)
            .height(h)
            .dimension(valDim)
            .group(valGroup)
            //.slicesCap(10)
            .innerRadius(10)
            .legend(dc.legend());
        chart.render();
    }
    else { // yArray contains data
        console.log("yArray contains data");

        yArray.forEach(function(d) {
            d.value = parseFloat(d.value);
            //console.log(d.value);
            if(isNaN(d.value)){
                d.value = 0;
            }
        });

        var ndx = crossfilter(xArray);
        var valDim = ndx.dimension(function(d) {return d.value;});
        var valGroup = valDim.group();

        chart
            .width(w)
            .height(h)
            .dimension(valDim)
            .group(valGroup)
            .slicesCap(10)
            .innerRadius(10)
            .legend(dc.legend());

        chart.render();

    }


}
