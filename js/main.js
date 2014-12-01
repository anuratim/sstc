/**
 * Author swaraj
 * Date: 11/30/14
 */
"use strict";

$(
  function onReady () {

    // prepare data
    var PATIENT_KEYS = Object.keys(PATIENT_DATA);

    // init typeahead
    $('#typeaheadInput').typeahead(
      {
        highlight: true,
        hint: true,
        minLength: 1
      },
      {
        name: 'patients',
        displayKey: 'value',
        source: findPatients
      }
    )
      .bind('typeahead:cursorchanged', onSelected)
      .bind('typeahead:selected', onSelected)
      .bind('typeahead:autocompleted', onSelected);
    ;

    function findPatients (query, callback) {
      var matches = [];
      PATIENT_KEYS.forEach(
        function testPatient (patientID) {
          var isMatch = patientID.lastIndexOf(query) === 0;
          if (isMatch) {
            matches.push({value: patientID})
          }
        }
      );
      callback(matches);
    }

    function onSelected (event, object) {
      var patientID = object.value;
      var patientMPR = PATIENT_DATA[patientID];
      $('#patientID').text(patientID);
      $('#patientMPR').text(patientMPR);
    }
  }
);
