/**
 * Author swaraj
 * Date: 11/30/14
 */

var LineByLineReader = require('line-by-line');

var csvReader = new LineByLineReader('surescriptsmpr.csv');

var patientDict = {};

csvReader.on('line',
  function onReadLine (line) {
    line = line.split(',');
    var uuid = line[0];
    var mpr = line[1];
    patientDict[uuid] = mpr;
  }
);

csvReader.on('end',
  function onReadEnd () {
    console.log(patientDict);
    //var encoded = JSON.stringify(patientDict);
    //console.log(encoded);
  }
);
