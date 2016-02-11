$(document).ready(function() {

  //Initiate platform to "-- Select --"
  var platform = $("#marketingPlatform option:selected").text();

  //To handle form validation:
  var urlIsValid;
  var nameIsValid;
  var lumSourceIsValid;
  var salsaTagIsValid;
  var enParamIsValid;
  var dayIsValid;
  var monthIsValid;
  var yearIsValid;

  //To show/hide CRM options
  $( "#marketingPlatform" ).change(function() {
    platform = $("#marketingPlatform option:selected").text();
    if (platform === "Luminate") {
      $("#salsa").hide();
      $("#engaging-networks").hide();
      $("#luminate").show();
    }
    else if (platform === "Salsa") {
      $("#luminate").hide();
      $("#engaging-networks").hide();
      $("#salsa").show();
    }
    else if (platform === "Engaging Networks") {
      $("#luminate").hide();
      $("#salsa").hide();
      $("#engaging-networks").show();
    }
    else if (platform === "-- Select --") {
      $("#luminate").hide();
      $("#salsa").hide();
      $("#engaging-networks").hide();
    }
  })


  //Real time input validation for URL
  $( "#initialURL" ).keyup(function() {
    var currentURL = $("#initialURL").val();

    //As long as URL contains http or https then it is valid
    if (currentURL.indexOf("http://") !== -1 || currentURL.indexOf("https://") !== -1) {
      $(this).css({"border":"2px solid #3D5CAA"});
      urlIsValid = true;
    }
    //Otherwise its invalid
    else {
      console.log("Invalid");
      $(this).css({"border":"2px solid #C87872"});
      urlIsValid = false;
    }

  });
  //Blur handler for Initual URL form
  $( "#initialURL" ).blur(function() {
    if (urlIsValid === true) {
      $(this).css({"border":"2px solid #3D5CAA"});
    }
    else if (urlIsValid === false) {
      $(this).css({"border":"2px solid #C87872"});
    }
    else if ($("#initialURL").val().length === 7) {
      $(this).css({"border":"2px solid #C87872"});
    }
  });

  //Validate Campaign Name Input Form
  $( "#campaignName" ).keyup(function() {
    var currentName = $("#campaignName").val();
    //If there are errors
    if (currentName.length < 1) {
      $(this).css({"border":"2px solid #C87872"});
      nameIsValid = false;
    }
    else {
      $(this).css({"border":"2px solid #3D5CAA"});
      nameIsValid = true;
    }
  });
  //Blur handler for Campaign Name Input Form
  $( "#campaignName" ).blur(function() {
    if (nameIsValid === true) {
      $(this).css({"border":"2px solid #eee"});
    }
    else if ($("#campaignName").val().length < 1) {
      nameIsValid === false;
      $(this).css({"border":"2px solid #C87872"});
    }
  });

  //Validate Luminate Source Input Form
  $( "#lum-source" ).keyup(function() {
    var currentLumSource = $("#lum-source").val();
    //If there are errors
    if (currentLumSource.length < 1) {
      $(this).css({"border":"1px solid #C87872"});
      lumSourceIsValid = false;
    }
    else {
      $(this).css({"border":"1px solid #3D5CAA"});
      lumSourceIsValid = true;
    }
  });
  //Blur handler for Luminate Source Input Form
  $( "#lum-source" ).blur(function() {
    if (lumSourceIsValid === true) {
      $(this).css({"border":"1px solid #eee"});
    }
    else if ($("#lum-source").val().length < 1) {
      lumSourceIsValid === false;
      $(this).css({"border":"1px solid #C87872"});
    }
  });

  //Validate Salsa Tag Input Form
  $( "#salsa-tag" ).keyup(function() {
    var currentSalsaTag = $("#salsa-tag").val();
    //If there are errors
    if (currentSalsaTag.length < 1) {
      $(this).css({"border":"1px solid #C87872"});
      salsaTagIsValid = false;
    }
    else {
      $(this).css({"border":"1px solid #3D5CAA"});
      salsaTagIsValid = true;
    }
  });
  //Blur handler for Salsa Tag Input Form
  $( "#salsa-tag" ).blur(function() {
    if (salsaTagIsValid === true) {
      $(this).css({"border":"1px solid #eee"});
    }
    else if ($("#salsa-tag").val().length < 1) {
      salsaTagIsValid === false;
      $(this).css({"border":"1px solid #C87872"});
    }
  });

  //Validate Engaing Networkings Tracking Parameter Input Form
  $( "#en-param" ).keyup(function() {
    var currentenParam = $("#en-param").val();
    //If there are errors
    if (currentenParam.length < 1) {
      $(this).css({"border":"1px solid #C87872"});
      enParamIsValid = false;
    }
    else {
      $(this).css({"border":"1px solid #3D5CAA"});
      enParamIsValid = true;
    }
  });
  //Blur handler for Engaing Networkings Tracking Parameter Input Form
  $( "#en-param" ).blur(function() {
    if (enParamIsValid === true) {
      $(this).css({"border":"1px solid #eee"});
    }
    else if ($("#en-param").val().length < 1) {
      enParamIsValid === false;
      $(this).css({"border":"1px solid #C87872"});
    }
  });


  //"Create Link" button click handler
  $("#create").click(function(){
    urlError      = false;
    lumSrcError   = false;
    salsaTagError = false;
    enError       = false;
    sourceError   = false;
    mediumError   = false;
    nameError     = false;
    dateError     = false;
    finalURL      = "";
    initURL       = $("#initialURL").val();
    selectedPlat  = platform;
    lumSource     = $("#lum-source").val();
    lumSubSource  = $("#lum-subsource").val();
    salsaTag      = $("#salsa-tag").val();
    en_param      = $("#en-param").val();
    marketSource  = $("#marketingSource option:selected").text();
    marketMedium  = $("#marketingMedium option:selected").text();
    marketName    = $("#campaignName").val();
    month         = $("#month").val();
    day           = $("#day").val();
    year          = $("#year").val();
    gaIncomplete  = false;

    //Validate Initial URL
    if (initURL === "" || initURL === "http://" || initURL === "https://") {
      urlError = true;
    }
    else {
      //initURL = initURL.replace(/\//g,"");
      finalURL = initURL;
      urlError = false;
    }

    //Validate Luminate
    if (selectedPlat === "Luminate") {
      if (lumSource === "") {
        lumSrcError = true;
      }
      else {
/*        //If finalURL contains "ACTION_REQUIRED"
        if (finalURL.indexOf("ACTION_REQUIRED") !== -1) {
          //Split the finalURL into an array
          var arrFinalURL = finalURL.split("");
          //Loop through each index of the array
          for (var i = 0; i < arrFinalURL.length; i++) {
            if (arrFinalURL[i] === "&") {
              console.log("Found an &!");

              //Replace the & with "&amp;"
              arrFinalURL[i] = "&amp;";

              //Convert back to string
              finalURL = arrFinalURL.join("");
              console.log(finalURL);

              //Break out of loop since we only want to replace the first &
              break;
            }
          }
        }
*/

        finalURL += "?s_src=" + lumSource;
        lumSrcError = false;
        if (lumSubSource !== "") {
          finalURL += "&s_subsrc=" + lumSubSource;
        }
      }
    }
    //Validate Salsa
    else if (selectedPlat === "Salsa") {
      if (salsaTag === "") {
        salsaTagError = true;
      }
      else {
        finalURL += "?tag=" + salsaTag.replace(/ /g,"+");
        salsaTagError = false;
      }
    }
    //Validate Engaging Networks
    else if (selectedPlat === "Engaging Networks") {
      if (en_param === "") {
        enError = true;
      }
      else {
        finalURL += "&ea.tracking.id=" + en_param;
        enError = false;
      }
    }



    //Validate Medium
    if (marketSource === "-- Select --") {
      sourceError = true;
    }
    else {
      finalURL += "&utm_source=" + marketSource;
      mediumError = false;
    }

    //Validate Medium
    if (marketMedium === "-- Select --") {
      mediumError = true;
    }
    else {
      finalURL += "&utm_medium=" + marketMedium;
      mediumError = false;
    }

    //Validate Name
    if (marketName === "") {
      nameError = true;
      marketName = "";
    }
    else {
      finalURL += "&utm_campaign=" + marketSource + "-" + marketMedium + "-" + marketName.replace(/ /g,"");
      nameError = false;
    }

    //Validate date
    if (month === "" || day === "" || year === "") {
      dateError = true;
    }
    else {
      finalURL += "-" + month + day + year;
      dateError = false;
    }


    //Check to make sure that EITHER a CRM is used OR GA is used
    if (selectedPlat === "-- Select --" && marketSource === "-- Select --") {
      var noPlatformSelected = true;
    }
    else {
      var noPlatformSelected = false;
    }

    //Final error check
    if (urlError === true || lumSrcError === true || salsaTagError === true || enError === true || urlIsValid === false || lumSourceIsValid === false || salsaTagIsValid === false || enParamIsValid === false || noPlatformSelected === true) {
      $("#error-message").show();

      //Scroll to top to show error message
      $('html, body').animate({
        scrollTop: $("h1").offset().top
      }, 1000);

      //Rehide generated URL and reset generated URL
      $("#generatedLinkBlock").hide();
      $("#generatedLink").empty();

      //Add error classes to fields that it is available for
      if (urlIsValid === false || initURL.length === 7) {
        $("#initialURL").css({"border":"2px solid #C87872"});
      }
    }
    else { //No errors found, output generated URL
      console.log(gaIncomplete);
      $("#error-message").hide();
      //Output final URL to DOM
      $("#generatedLinkBlock").show();
      $("#generatedLink").empty().val(finalURL);
    }
  });

  //Copy button functionality
  $("#copy-button").click(function() {
    var copyTextarea = document.querySelector('#generatedLink');
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      $("#copy-message").css("display", "block").append("Copied to clipboard!");
    } catch (err) {
      console.log('Oops, unable to copy');
      $("#copy-message").css("display", "block").append("Oops! Unable to copy.");
    }

    function removeCopyMessage(){
      $("#copy-message").css("display", "none").empty();
    }
    setTimeout(removeCopyMessage, 2000);
  })

  //Hide mobile keyboards when "GO/ENTER" button pressed on any input
  $(":input").keypress(function(e) {
    if (e.which == 13) {
      document.activeElement.blur();
    }
  });

});
