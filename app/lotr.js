window.lotr = window.lotr || {}
window.lotr = {
  baseMap: 'http://johnhackworth.github.com/middle-earth-tiles/{z}/{x}/{y}.jpg',
  baseLayer: 'http://xabel.cartodb.com/api/v1/viz/13827/viz.json',
  baseLayerGeo: 'http://xabel.cartodb.com/api/v1/viz/15029/viz.json',
  narrationUrl: 'http://xabel.cartodb.com/api/v1/sql?q=select%20*%20from%20lotr_narration',
  round: 1,
  step: 3,
  stepMovie: 1,
  showingOptions: false,
  showingGeo: false,
  synchedMovie: false,
  maxRound: 366,
  interval: 3000,
  intervalMovie: 30000,
  characters: {},
  init: function(){
    $('.loader').remove();
    this.viewRef = {
      drawer: $('#options'),
      drawerHandle: $('#handle'),
      geo: $('#geopolitical'),
      timeline: $('#timeline'),
      movie: $('#movieSynch'),
      help: $('#help'),
      helpClose: $('.helpWindow')
    }

    this.initBaseMap();
    this.initLayers();
    this.initTimeline();
    this.bindActions();
    this.toggleOptions();
    this.openPopUp();

  },
  getSQLApiUrl: function(query) {
    return 'http://xabel.cartodb.com/api/v1/sql?q=' + query + '&api_key=' + this.api_key
  },
  initTimeline: function() {
    this.viewRef.timeline.on('slidestop', this.goToTimePoint.bind(this))
    this.viewRef.timeline.slider();
    $('.timeLegend .origin').html(this.getDate(1, true));
    $('.timeLegend .end').html(this.getDate(this.maxRound, true));

  },
  initBaseMap: function() {
    var self = this;
    this.map = new L.Map('middleEarth', {
      // center: [-55,-98],
      center: [-55.45, -107],
      maxBounds: [[-85.058705, -176.165771], [-19.311143, 24.521484]],
      zoom: 5,
      maxZoom:8,
      minZoon:4,
      fadeAnimation: false,

    });
    this.map.setZoom(5);
    L.tileLayer(self.baseMap, {
      attribution: ''
    }).addTo(self.map);
  },
  initLayers: function() {
    this.drawCurrentLayer();
  },
  bindActions: function() {
    this.viewRef.helpClose.on('click', this.closePopUp.bind(this));
    document.getElementById('nextRound').addEventListener('click', this.nextRound.bind(this));
    document.getElementById('prevRound').addEventListener('click', this.prevRound.bind(this));
    document.getElementById('autoPlay').addEventListener('click', this.autoPlay.bind(this));
    document.getElementById('stop').addEventListener('click', this.stop.bind(this));
    this.viewRef.drawerHandle.on('click', this.toggleOptions.bind(this));
    this.viewRef.geo.on('click', this.toggleGeo.bind(this));
    this.viewRef.movie.on('click', this.toggleMovie.bind(this));
    this.viewRef.help.on('click', this.openPopUp.bind(this));

  },
  closePopUp: function(ev) {
    if($('body').attr('data-helpOpen') == 'true') {
      $('body').attr('data-helpOpen', "false")
      $('.helpWindow').addClass('hidden')
    }
  },
  openPopUp: function() {
    console.log(1);
    $('.helpWindow').removeClass('hidden')
    $('body').attr('data-helpOpen', "true")
  },
  goToTimePoint: function(ev) {
    var position = this.viewRef.timeline.slider('value');
    var nextRound = Math.floor(this.maxRound * position / 100)
    this.round = nextRound
    this.nextRound();
  },
  drawGeoLayer: function() {
    var self = this;
    if(!this.showingGeo) {
      this.showingGeo = true;
      cartodb.createLayer(self.map,
        self.baseLayerGeo,
        {
          query: 'select * from lotr_realms where entity_type = \'city\' OR entity_type = \'place\' ',
          infowindow: self.infowindow.places
        }
      ).on('done', function(layer) {
          self.map.addLayer(layer);
          self.geoLayer = layer;
      })
    }
  },
  removeGeoLayer: function() {
    if(this.showingGeo) {
      this.showingGeo = false;
      this.geoLayer.remove();
      this.geoLayer = null;
    }
  },
  drawCurrentLayer: function() {
    var self = this;
    $.ajax({
      url: self.getSQLApiUrl('SELECT *, ST_AsGeoJSON(the_geom,5) as the_geom from lotr WHERE round = '+self.round),
      dataType:'json',
      success: self.processCurrentLayer.bind(this)
    })
    // cartodb.createLayer(self.map,
    //   self.getCurrentLayer(),
    //   {
    //     query: 'select * from lotr where round = ' + self.round,
    //     infowindow: self.infowindow.character
    //   }
    // ).on('done', function(layer) {
    //   self.map.addLayer(layer);
    //   if(self.currentLayer) {
    //     self.map.removeLayer(self.currentLayer)
    //     self.currentLayer.remove();
    //     delete self.currentLayer;
    //   }
    //   self.currentLayer = layer;
    //   self.updateSlider();
    //   document.getElementById('date').innerHTML = self.getDate(self.round);
    // });
  },
  processCurrentLayer: function(res) {
    for(var i in res.rows) {
      if(res.rows[i].the_geom) {
        var pos = JSON.parse(res.rows[i].the_geom);
        var name = res.rows[i].character;
        if(name in this.characters) {
          this.characters[name].setLatLng(pos.coordinates.reverse());
        } else {
          this.characters[name] = L.CircleMarker(pos.coordinates.reverse()).addTo(lotr.map);
        }
      }
    }
  },
  updateSlider: function() {
    var percentage = 100 * this.round / this.maxRound
    this.viewRef.timeline.slider('value', percentage);
  },
  getCurrentLayer: function() {
    var link = this.baseLayer;
    return link;
  },
  nextRound: function() {
    if(this.round === 1) {
      this.showCurrentNarration(1)
    }
    var prevRound = this.round;
    var step = this.step;
    if(this.synchedMovie) { step = this.stepMovie }
    this.round = this.round + step;
    if(this.round <= this.maxRound) {
      this.drawCurrentLayer();
    } else {
      this.stop();
    }
    this.updateNarration(this.round, this.round - prevRound);
  },
  prevRound: function() {
    var prevRound = this.round;
    var step = this.step;
    if(this.synchedMovie) { step = this.stepMovie }
    this.round = this.round - step;
    if(this.round > 0) {
      this.drawCurrentLayer();
    } else {
      this.stop();
    }
    this.updateNarration(this.round, this.round - prevRound);
  },
  updateNarration: function(currentRound, variation) {
    if(variation > 0) {
      for(i = 1; i<=variation; i++) {
        if((currentRound + i) in this.narration) {
          this.showCurrentNarration(currentRound + i)
        }
      }
    } else {
      for(i = -1; i>=variation; i--) {
        if((currentRound + i) in this.narration) {
          this.showCurrentNarration(currentRound + i)
        }
      }
    }
  },
  showCurrentNarration: function(round) {
    $('#vizTitle p').html(this.narration[round]);
  },
  getInterval: function() {
    if(this.synchedMovie) {
      return this.intervalMovie;
    }
    return this.interval;
  },
  autoPlay: function() {
    this.stop();
    $('#stop').removeClass('hidden');
    $('#autoPlay').addClass('hidden');
    this.currentInterval = setInterval(this.nextRound.bind(this), this.getInterval())
    this.toggleOptions();
  },
  stop: function() {
    $('#stop').addClass('hidden');
    $('#autoPlay').removeClass('hidden');
    clearInterval(this.currentInterval);
  },
  toggleOptions: function() {
    if(this.showingOptions) {
      this.showingOptions = false;
      this.viewRef.drawer.addClass('replegated')
    } else {
      this.showingOptions = true;
      this.viewRef.drawer.removeClass('replegated')
    }
  },
  toggleMovie: function() {
     if(this.synchedMovie) {
      this.viewRef.movie.removeClass('enabled');
      this.viewRef.movie.addClass('disabled');
      this.synchedMovie = false;
    } else {
      this.viewRef.movie.addClass('enabled')
      this.viewRef.movie.removeClass('disabled');
      this.synchedMovie = true;
    }
  },
  toggleGeo: function() {
    if(this.showingGeo) {
      this.viewRef.geo.removeClass('enabled');
      this.viewRef.geo.addClass('disabled');
      this.removeGeoLayer();
    } else {
      this.viewRef.geo.addClass('enabled')
      this.viewRef.geo.removeClass('disabled');
      this.drawGeoLayer();
    }
  },
  getDate: function(round, short) {
    var day = Math.floor(((round/5)+20) % 30) +1;
    var month = (Math.floor(((round/5) + 22) / 30)+8) % 12;
    var month_names = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ]
    if(short) {
      return month_names[month] + ' ' + day;
    }
    return day + ' - ' + month_names[month] + ' 3001 of the third age'
  }

}
lotr.narration = {};
$.ajax({
  url: 'http://xabel.cartodb.com/api/v1/sql?q=select%20*%20from%20lotr_narration',
  dataType: 'json',
  success: function(res) {
    for(var i in res.rows) {
      lotr.narration[res.rows[i].round] = res.rows[i].description;
    }
  }
})
window.onload = lotr.init.bind(lotr);
