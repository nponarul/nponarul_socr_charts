

function createGraph(input, name) {
    d3.select("#addbody").append("div").attr("id",input).attr("class","tab-pane fade");
    var id = "#"+input;
    $("#addtop").append("<li><a data-toggle='tab' href="+id+">"+name+"</a></li>");
   // d3.select("#graphhere").append("div").attr("id", input);newhtml

}
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

       var ndxb = crossfilter(arr),
           valDim = ndxb.dimension(function(d) {return d.value;}),
           keyDim = ndxb.dimension(function(d) {return d.key;}),
           valbykey = keyDim.group().reduceSum(function(d){return d.value;}),
           barGroup = valDim.group().reduceSum(function(d) {return d.value}),
           topTypes = valbykey.top(1);
       console.log(topTypes[0].key, topTypes[0].value);
       console.log(max);
       if(type ==1) {
           createGraph("bar","Bar Chart");
           var bar = dc.barChart("#bar");

           bar
               .width(760)
               .height(480)
               .x(d3.scale.linear().domain([0, topTypes[0].key]))
               .brushOn(false)
               .xAxisLabel(xArrLab[0])
               .dimension(valDim)
               .group(barGroup)
               .gap(200);
       } else if (type == 2) {
           createGraph("scatter", "Scatter Plot");
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
           createGraph("pie", "Pie Chart");
           var pie = dc.pieChart("#pie");

           pie
               .width(650)
               .height(450)
               .dimension(valDim)
               .group(barGroup)
               //.slicesCap(10)
               .innerRadius(10)
               .legend(dc.legend());

       }


dc.renderAll();
   }


