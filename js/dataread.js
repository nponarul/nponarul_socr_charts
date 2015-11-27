var dataEntry, type, headers = [], dataArray= [], dLabs;
window.onload = function() {

		//on submit of whole table, returns data
	$('#toArray').on('click', function() {
		type = 1;
		//alert(type);
		//$("#accordion").accordion("activate", 2);newhtml
		//dataProcess(1);

	});

$('#submit-parse').click(function() {
		 	//console.log(chosen); 
		 	type = 2; 
		 	//$("#accordion").accordion("activate", 2);
	//alert(type);
	//dataProcess(2);
	});
//alert(type);
$("#submit-final").click(function() {
	if (type==1) {
		//alert(type);
		dataEntry = $dataTable.data('handsontable').getData();
		//console.log(dataEntry);
			datatoJSON(dataEntry)
	
		if (chosen) {
			//$('#data').hide();new html
		  //$('#chart1').show();new html
			$("#modal-panel1").hide();
			$("#modal-panel2").show();
		} else {
			alert("Choose variable grouping");
			$("#accordion").accordion("activate", 0);
		}
	} else if (type == 2) {
		if (chosen) {
			//$('#data').hide();new html
			//$('#chart1').show();new html
			$("#modal-panel1").hide();
			$("#modal-panel2").show();
		} else {
			alert("Choose variable grouping");
			$("#accordion").accordion("activate", 1);
		}

if(filetype_ == "csv") {
	stepped = 0;
	chunks = 0;
	rows = 0;

	var txt = $('#files').val();
	var localChunkSize = $('#localChunkSize').val();
	var remoteChunkSize = $('#remoteChunkSize').val();
	var files = $('#files')[0].files;
	var config = buildConfig();


	// NOTE: Chunk size does not get reset if changed and then set back to empty/default value
	if (localChunkSize)
		Papa.LocalChunkSize = localChunkSize;
	if (remoteChunkSize)
		Papa.RemoteChunkSize = remoteChunkSize;

	pauseChecked = $('#step-pause').prop('checked');
	printStepChecked = $('#print-steps').prop('checked');


	if (files.length > 0)
	{
		if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
		{
			for (var i = 0; i < files.length; i++)
			{
				if (files[i].size > 1024 * 1024 * 10)
				{
					alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
					return;
				}

			}
		}

		start = performance.now();


			$('#files').parse({
				config: config,
				before: function(file, inputElem)
				{
					console.log("Parsing file:", file);
				},
				complete: function()
				{
					console.log("Done with all files.");
				}
			});

	}
	else
	{

		start = performance.now();
		var results = Papa.parse(txt, config);
		console.log("Synchronous parse results:", results);
	}
}
}

});
};


function createVars(headers) {
    $('.span6 #chooseFrom').empty();
    for (var i=0; i<headers.length; i++) {
    var opt = document.createTextNode(headers[i]);
    var optbody = document.createElement("option");
    optbody.appendChild(opt);
    $('.span6 #chooseFrom').append(optbody);
  }
}

function datatod3 (dataArray, headers) {
	var d3data = Array(); 
	dataArray.forEach(function(d,i) {
		//var obj = {};
		//obj.header = headers[i];
		//obj.datad3 = d3.entries(d);
		//d3data.push(obj);
		var d3prep = d3.entries(d);
		for (var j=0; j<d3prep.length; j++) {
			d3prep[j].head = headers[i];
		}
		d3data.push(d3prep);
	});
	//console.log(d3data);
	return d3data;
}

function dataIn (dataLabels, data) {
	dLabs = Array();
	if(rowLab || colLab) {
		for (var i=0; i<dataLabels.length-1; i++) {
					dLabs[i] = dataLabels[i+1]; 
				}
	} else {
		for (var i=0; i<dataLabels.length-1; i++) {
					dLabs[i] = i; 
				}	
	}

	for (var i=0; i<data.length; i++) {
				if(data[i][0] != "") {
					headers[i] = data[i][0]; 
				}
				var obj = {};
				for (var j=0; j<data[i].length-1; j++) {
					if(data[i][j+1] !="") {
						obj[dLabs[j]] = data[i][j+1]; 
					}
				}
				dataArray.push(obj); 
			}
//console.log(dataArray);
//console.log(headers);
createVars(headers);
//console.log(d3.entries(dataArray[0]));
dataArray = datatod3(dataArray, headers);
	//$dataTable.populateFromArray({start:0},dataArray,true,source="populatefromArray");
	console.log(dataArray);
return dataArray;
}

function datatoJSON (dataEntry) {
	
	if(rowbool) {
		var rowLabs= dataEntry[0]; 
		var rows;
		//alert(rowLab);
		if(rowLab) {rows = dataEntry.slice(1); }
		else {rows = dataEntry;}
	dataIn(rowLabs, rows);

	} else if (colbool) {
		var colData = dataEntry[0].map(function(col, i) { 
  return dataEntry.map(function(row) { 
    return row[i] 
  });
});
		var colLabs = colData[0];
		var col;
		if(colLab) {col = colData.slice(1);} 
		else {col = colData;}
		console.log(col);
	dataIn(colLabs, col); 
	} 
}

function buildConfig()
{
	return {
		delimiter: $('#delimiter').val(),
		newline: getLineEnding(),
		header: $('#header').prop('checked'),
		//dynamicTyping: $('#dynamicTyping').prop('checked'),
		//preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		//encoding: $('#encoding').val(),
		//worker: $('#worker').prop('checked'),
		//comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn,
		//download: $('#download').prop('checked'),
		//fastMode: $('#fastmode').prop('checked'),
		skipEmptyLines: $('#skipEmptyLines').prop('checked'),
		//chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
		//beforeFirstChunk: undefined,
	};

	function getLineEnding()
	{
		if ($('#newline-n').is(':checked'))
			return "\n";
		else if ($('#newline-r').is(':checked'))
			return "\r";
		else if ($('#newline-rn').is(':checked'))
			return "\r\n";
		else
			return "";
	}
}

function stepFn(results, parserHandle)
{
	stepped++;
	rows += results.data.length;

	parser = parserHandle;
	
	if (pauseChecked)
	{
		console.log(results, results.data[0]);
		parserHandle.pause();
		return;
	}
	
	if (printStepChecked)
		console.log(results, results.data[0]);
}

function chunkFn(results, streamer, file)
{
	if (!results)
		return;
	chunks++;
	rows += results.data.length;

	parser = streamer;

	if (printStepChecked)
		console.log("Chunk data:", results.data.length, results);

	if (pauseChecked)
	{
		console.log("Pausing; " + results.data.length + " rows in chunk; file:", file);
		streamer.pause();
		return;
	}
}

function errorFn(error, file)
{
	console.log("ERROR:", error, file);
}

function completeFn()
{
	end = performance.now();
	if (!$('#stream').prop('checked')
			//&& !$('#chunk').prop('checked')
			&& arguments[0]
			&& arguments[0].data)
		rows = arguments[0].data.length;

dataEntry = arguments[0].data;

	console.log("Finished input (async). Time:", end-start, arguments);
	console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
	console.log(dataEntry);
		datatoJSON(dataEntry);
	//dataEntry = $dataTable.data('handsontable');

	 //$("#accordion").accordion("activate", 0);
}
function dataProcess(type) {
	if (type==1) {
		dataEntry = $dataTable.data('handsontable').getData();
		//console.log(dataEntry);
		datatoJSON(dataEntry)

		if (chosen) {
			$('#data').hide();
			$('#chart1').show();
		} else {
			alert("Choose variable grouping");
			$("#accordion").accordion("activate", 0);
		}
	} else if (type == 2) {
		if (chosen) {
			$('#data').hide();
			$('#chart1').show();
		} else {
			alert("Choose variable grouping");
			$("#accordion").accordion("activate", 1);
		}


		stepped = 0;
		chunks = 0;
		rows = 0;

		var txt = $('#files').val();
		var localChunkSize = $('#localChunkSize').val();
		var remoteChunkSize = $('#remoteChunkSize').val();
		var files = $('#files')[0].files;
		var config = buildConfig();

		// NOTE: Chunk size does not get reset if changed and then set back to empty/default value
		if (localChunkSize)
			Papa.LocalChunkSize = localChunkSize;
		if (remoteChunkSize)
			Papa.RemoteChunkSize = remoteChunkSize;

		pauseChecked = $('#step-pause').prop('checked');
		printStepChecked = $('#print-steps').prop('checked');


		if (files.length > 0)
		{
			if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
			{
				for (var i = 0; i < files.length; i++)
				{
					if (files[i].size > 1024 * 1024 * 10)
					{
						alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
						return;
					}
				}
			}

			start = performance.now();

			$('#files').parse({
				config: config,
				before: function(file, inputElem)
				{
					console.log("Parsing file:", file);
				},
				complete: function()
				{
					console.log("Done with all files.");
				}
			});
		}
		else
		{
			start = performance.now();
			var results = Papa.parse(txt, config);
			console.log("Synchronous parse results:", results);
		}
	}
}
	