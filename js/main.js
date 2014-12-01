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
    );

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
  }
);
