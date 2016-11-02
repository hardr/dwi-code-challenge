(function() {
  'use strict';

  console.log('Insanity, check!');

  $("#fileUpload").on('change', function(evt) {
    var file = evt.target.files[0]; // file object
    console.log(file);
    var output = '<li>' + file.name + ' - ' + (file.type || 'n/a') + '</li>';

    document.getElementById('render').innerHTML = '<ul>' + output + '</ul>';
  });

}());
