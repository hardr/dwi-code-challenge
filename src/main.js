(function() {
  'use strict';
  // sanity check
  console.log('Insanity, check!');
  // event listener watching for a change in the upload input field
  $("#fileUpload").on('change', function(evt) {
    // once fired, assigns the upload to a variable
    var file = evt.target.files[0];
    // and instantiates a new reader
    var reader = new FileReader();
    // native 'onload' method attached to reader waits for upload to complete
    reader.onload = (function(fileData) {
      return function(e) {
        // assigns parsed file to variable
        var content = JSON.parse(e.target.result);
        // and assigns returned string of html elements to variable
        var htmlContent = recursiveDigging(content);
        // renders above string to dom
        $("#render").empty().append(htmlContent);
      }
    // iife passes upload into onload method for render processing
    })(file);
    // sets behavior (what the output format is) for reader.onload
    reader.readAsText(file);
    // recursive helper function for digging deep takes parsed JSON data object
    function recursiveDigging(input) {
      // checks if input is an array, or if digging should occur
      if (Array.isArray(input)) {
        // returns string of map results(html elements) after all nested arrays have been resolved
        return input.map(recursiveDigging).join('');
      };
      // assigns the keys to a variable when an object is reached
      var tag = input.tag
        , content = input.content;
      // checks if content variable has further nested objects/arrays, maps over (recursive) if so
      if (typeof content === 'string') {
        return '<' + tag + '>' + content + '</' + tag + '>';
      } else {
        return '<' + tag + '>' + recursiveDigging(content) + '</' + tag + '>';
      }
    };
  });
}());
