$.when (getData()).done(function (surescriptsData) { 

  var mprDict = {};
  surescriptsData.forEach (
      function (object) {
        var uid = object.uid;
        if (! (uid in mprDict)) {
            mprDict[uid] =0;
        }
        mprDict[uid] = Math.round(Number(object.mpr) * 100) / 100;
      }
    )

  var uids = Object.keys(mprDict);

  $('#typeaheadInput').typeahead(
      {
        highlight: true,
        hint: true,
        minLength: 1
      },
      {
        name: 'uids',
        displayKey: 'value',
        source: findMatch
      }
    )
      .bind('typeahead:cursorchanged', lookUp)
      .bind('typeahead:selected', lookUp)
      .bind('typeahead:autocompleted', lookUp);

  function findMatch (query, callback) {
    var matches = [];
    
    uids.forEach(
      function testPatient (uid) {
        // polyfill of ES6 startsWith
        var isMatch = uid.lastIndexOf(query) === 0;
        if (isMatch) {
          // typeahead is expecting objects with a key named value
          matches.push({value: uid})
        }
      }
    );
    callback(matches);
  }

  function lookUp (event, object) {
    var uid = object.value;
    var mpr = mprDict[uid];

    $('#patientID').text(uid);
    $('#patientMPR').text(mpr);
  }

})

function getData () {
    return $.ajax({
      dataType: 'json',
      url: '../data/surescripts.json',
      data: '',
      success: function(data) {
         return data;
        }
    });
}


