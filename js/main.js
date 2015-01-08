$.when (getData()).done(function (surescriptsData) { 

  var mprDict = {};
  surescriptsData.forEach (
      function (object) {
        var uid = object.uid;
        if (! (uid in mprDict)) {
            mprDict[uid]={mpr:0, mprPercentile:0, missedRefills:0, refillPercentile:0, missedDoses:0};
        }
        mprDict[uid]['mpr'] = Math.round(Number(object.mpr) * 100) / 100;
        mprDict[uid]['mprPercentile'] = numeral(object.mpr_percentile).format('0.0%');
        mprDict[uid]['missedRefills'] = object.missed_refills;
        mprDict[uid]['refillPercentile'] = numeral(object.refill_percentile).format('0.0%');
        mprDict[uid]['missedDoses'] = object.missed_doses;
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
    var mprPercentile = mprDict[object.value]['mprPercentile'];
    var missedRefills = mprDict[object.value]['missedRefills'];
    var refillPercentile = mprDict[object.value]['refillPercentile'];
    var missedDoses = mprDict[object.value]['missedDoses'];

    console.log(mpr);
    console.log(mprPercentile);

    $('#mprNumber').text(mpr);
    $('#mprTag').text("MPR");

    $('#mprPercentile1').text("That's better than");
    $('#mprPercentileNum').text(mprPercentile);
    $('#mprPercentile2').text("of your patients.");

    $('#refillNumber').text(missedRefills);
    $('#refillTag').text("MISSED REFILLS");

    $('#refillPercentile1').text("That's better than");
    $('#refillPercentileNum').text(refillPercentile);
    $('#refillPercentile2').text("of your patients.");
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


