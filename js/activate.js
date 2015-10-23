//rowbool and colbool: variables groups by rows or by columns. rowLab and colLab: use first row/columns as data labels. chosen: variable group chosen
var rowbool, colbool, rowLab, colLab, chosen; 
var graphtype, xArray=Array(), yArray=Array(), xArrLab = Array(), yArrLab = Array();

$(document).ready(function() {
	//Initializes accordion and tabs of data loading options
	$('#accordion').accordion({
	autoHeight: false
	}); 

	$('#tabs').tabs({
	active: false
	});

//Row variable checked; ask for row labels
	  $("input[name=var_row]").change(function() {
    if($(this).prop('checked')) {
      $('#rowOps').show(); 
      $('#col').hide();
      rowbool=true; 
      chosen=true;
    } else {
      $('#rowOps').hide();
      $('#col').show();
      rowbool=false;
      chosen=false;
    }
  });
//Column variable checked, ask for col labels
 $("input[name=var_col]").change(function() {
    if($(this).prop('checked')) {
      $('#colOps').show(); 
      $('#row').hide();
      colbool=true;
      chosen=true;
    } else {
      $('#colOps').hide();
      $('#row').show();
      colbool=false;
      chosen=false;
    }
  });

 $("input[name=rowLabs]").change(function() {
  if($(this).prop('checked')) {
    rowLab=true;
  } else {
    rowLab=false;
  }
});


$("input[name=colLabs]").change(function() {
  if($(this).prop('checked')) {
    rowLab=true;
  } else {
    rowLab=false;
  }
});


 //Goes back to data
$('#chart1 #back').click(function() {
  $('#chart1').hide();
  $('#data').show();
});

//show variable for graph functions
var graphSelect = "Choose a graph"; 
$('#oneOp, #twoOp').hide(); 

$('#chooseGraph').change(function() {
  graphSelect = parseFloat($('#chooseGraph option:selected').val());
  if(graphSelect == 1) {
    $('#oneOp').show();
    $('#twoOp').hide();
  } else if (graphSelect == 2) {
    $('#oneOp').show();
    $('#twoOp').show();
  } else if (graphSelect == 0) {
    $('#oneOp, #twoOp').hide(); 
  } else if (graphSelect == 5) {
      $('#oneOp').show();
      $('#twoOp').show();
  }


});


$('#addx').click(function() { varsSelect(1);});
$('#addy').click(function() { varsSelect(2);});

$('#removex').click(function() {varsUnselect(1);});
$('#removey').click(function() {varsUnselect(2);});

$('#obj').click(function() {

  if(graphSelect == 1) {
//graphEach(reassign(xArray));
      //graphEach(reassign(dataArray))
      graphEach(reassign(xArray), 1);
      // graphBar(reassign(xArray));
  } else if (graphSelect == 2) {
     graphEach(reassign(xArray.concat(yArray)),2);
      //console.log(reassign(xArray.concat(yArray)));
    //graphEach(reassign(yArray));
    //graph(xArray, yArray, "scatter"); 
  } else if (graphSelect == 5) {
      //graphPie(reassign(xArray), reassign(yArray));
      graphEach(reassign(xArray), 5);
  }
});

});

//Adds selected variables to 
function indexArray(index, value, remove) {
if(remove) {
  if (value == 1) {
      xArray.pop(dataArray[index]);
      xArrLab.pop(headers[index]);
} else if (value == 2) {
  yArray.pop(dataArray[index]);
}yArrLab.pop(headers[index]);
} else {
  if (value == 1) {
console.log(dataArray[index]);
  xArray.push(dataArray[index]);

      xArrLab.push(headers[index]);
} else if (value == 2) {
      console.log(dataArray[index]);
  yArray.push(dataArray[index]);
      yArrLab.push(headers[index]);
}
}
};

function varsSelect(value) {
 // alert(value);
  console.log(value);
  $('.span6 #chooseFrom :selected').each(function(i, selected){ 
  var select = $(selected).text(); 
  var index = $(selected).index();
  indexArray(index); //creates array of indexes and makes array of selected objects
  if (value == 1) {
    $("#chosenx").append('<option>'+select+'</option>');

    indexArray(index, 1, false); 
  } else if (value == 2) {
      $('#choseny').append('<option>'+select+'</option>');
      indexArray(index, 2, false);
  }
});
};

function varsUnselect(value) {
 if(value == 1) {
   $('.span6 #chosenx :selected').each(function(i, selected){ 
      var index = $(selected).index();

      $(this).remove();
      indexArray(index, 1, true);
  });
  } else if (value == 2) {
       $('.span6 #choseny :selected').each(function(i, selected){ 
      var index = $(selected).index();
      $(this).remove();
      indexArray(index, 2, true);
  });
  }

};

function toGraphs() {
  $("#data").hide(); 
  $("#chart1").show();
};

function reassign(arr) {
    var newArr = Array();
    arr.forEach(function(d) {
        for (var i=0; i< d.length; i++) {
            newArr.push(d[i]);
        }
    });
    return newArr;
}