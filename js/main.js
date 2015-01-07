$.when (getData()).done(function (surescriptsData) { 

  console.log(surescriptsData);

  var mprDict = {};
  surescriptsData.forEach (
      function (object) {
        var uid = object.uid;
        if (! (uid in mprDict)) {
            mprDict[uid]={mpr:0, mprPercentile:0, missedRefills:0, refillPercentile:0, missedDoses:0};
        }
        mprDict[uid]['mpr'] = Math.round(Number(object.mpr) * 100) / 100;
        // added mpr above
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
    var mpr = mprDict[object.value]['mpr'];
    console.log(mpr);

    $('#mprNumber').text(mpr);
    $('#mprTag').text("MPR");
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


