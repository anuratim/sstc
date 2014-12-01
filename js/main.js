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

    /**
     * Search for matching patient uuid in PATIENT_KEYS. It is called by
     * typeahead every time a character is entered in the input field
     *
     * @param query search query from input field
     * @param callback call with results
     */
    function findPatients (query, callback) {
      var matches = [];
      PATIENT_KEYS.forEach(
        function testPatient (patientID) {
          // polyfill of ES6 startsWith
          var isMatch = patientID.lastIndexOf(query) === 0;
          if (isMatch) {
            // typeahead is expecting objects with a key named value
            matches.push({value: patientID})
          }
        }
      );
      callback(matches);
    }

    /**
     * Called anytime a patient is selected from typeahead
     *
     * @param event unused jQuery event
     * @param object value created by findPatients
     */
    function onSelected (event, object) {
      var patientID = object.value;
      var patientMPR = PATIENT_DATA[patientID];
      $('#patientID').text(patientID);
      $('#patientMPR').text(patientMPR);
    }
  }
);
