window.lotr = window.lotr || {}
$(document).ready(function(){

  window.lotr.infowindow = {
    fields: [{ name: 'image', title: false}, { name: 'character', title: false}, { name: 'description', title: false}],
    eventType: 'featureOver',
    template: $('#infoTemplate').html(),
    templateType: 'underscore',
  }
})
