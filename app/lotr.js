window.lotr = window.lotr || {}
window.lotr = {
  // baseMap: 'http://johnhackworth.github.com/middle-earth-tiles/{z}/{x}/{y}.jpg',
  baseMap: 'http://listify.es/var/arda.big/{z}/{x}/{y}.jpg',
  baseLayer: 'http://xabel.cartodb.com/api/v1/viz/13827/viz.json',
  baseLayerGeo: 'http://xabel.cartodb.com/api/v1/viz/15029/viz.json',
  narrationUrl: 'http://xabel.cartodb.com/api/v1/sql?q=select%20*%20from%20lotr_narration',
  round: 1,
  step: 1,
  stepMovie: 1,
  showingOptions: false,
  showingGeo: false,
  synchedMovie: false,
  maxRound: 366,
  interval: 1000,
  intervalMovie: 30000,
  transitionSpeed: 3300,
  characters: {},
  events: {},
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
    this.map._initPathRoot()
    this.map.on("viewreset", this.refreshCharacters.bind(this));
  },
  createDiamond: function(lat, lon, size, text) {
    var self = this;

    var symb =  d3.svg.symbol();
    symb.type('diamond').size(size)
    var LatLng = new L.LatLng(lat, lon)
    var svg = d3.select("#middleEarth").select("svg");
    var g = svg.append("g");
    var feature = g.selectAll("path")
    .data([LatLng])
    .enter().append("svg:path")
    .attr("d", symb)
    .attr('type', 'diamond')
    feature.symbol = symb;
    feature.label = this.createLabel(svg, LatLng, text);
    feature.update = (function() {
      this.attr("transform", function(d) { return "translate(" +
                          self.map.latLngToLayerPoint(d).x + "," +
                          self.map.latLngToLayerPoint(d).y + ")"; })
      this.label.data(this.data());
      this.label.update();
    }).bind(feature)
    feature.move = (function() {
      this
        .transition()
        .attr("transform", function(d) { return "translate(" +
                          self.map.latLngToLayerPoint(d).x + "," +
                          self.map.latLngToLayerPoint(d).y + ")"; })
        .duration(self.transitionSpeed)
        .delay(0)
        .ease('linear');
      this.label.data(this.data());
      this.label.move();
    }).bind(feature)

    feature.update();
    return feature;
  },
  createLabel: function(svg, LatLng, text) {
    var self = this;
    var className = text + ' charLabel zoom' + this.map.getZoom();
    var label = svg.append("svg:text")
    .data([LatLng])
    .attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x + 18) + "," +
                          (self.map.latLngToLayerPoint(d).y - 5) + ")";
     })
    .attr("dy", ".35em")
    .attr("text-anchor", "middleclss")
    .attr('class', className)
    .text(function(d) { return text });
    label.update = (function() {
      this.attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x + 18) + "," +
                          (self.map.latLngToLayerPoint(d).y - 5) + ")"; })
    }).bind(label)
    label.move = (function() {
      this
        .transition()
        .attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x + 18) + "," +
                          (self.map.latLngToLayerPoint(d).y - 5) + ")"; })
        .duration(self.transitionSpeed)
        .delay(0)
        .ease('linear')
    }).bind(label)

    return label;
  },
  createCircle: function(lat, lon, radio, text) {
    var self = this;
    var svg = d3.select("#middleEarth").select("svg");
    var g = svg.append("g");
    var LatLng = new L.LatLng(lat, lon)
    var feature = g.selectAll("circle")
      .data([LatLng])
      .enter().append("circle")
      .attr("r", radio)
    feature.label = this.createLabel(svg, LatLng, text);
    feature.update = (function() {
      this
        .attr("cx",function(d) { return self.map.latLngToLayerPoint(d).x})
        .attr("cy",function(d) { return self.map.latLngToLayerPoint(d).y})
      this.label.data(this.data());
      this.label.update();
    }).bind(feature)
    feature.move = (function() {
      this
        .transition()
        .attr("cx",function(d) { return self.map.latLngToLayerPoint(d).x})
        .attr("cy",function(d) { return self.map.latLngToLayerPoint(d).y})
        .duration(self.transitionSpeed)
        .delay(0)
        .ease('linear')
      this.label.data(this.data());
      this.label.move();
    }).bind(feature)

    feature.update();
    return feature;
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
    var self = this;
    var position = this.viewRef.timeline.slider('value');
    var nextRound = Math.floor(this.maxRound * position / 100)
    this.round = nextRound
    $.when(this.nextRound()).done(function() {
      self.stop()
    });
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
    var dfd = $.Deferred();
    var self = this;
    $.when(
      $.ajax({
        url: self.getSQLApiUrl('SELECT events.*,ST_AsGeoJSON(events.the_geom,5) as the_geom, characters.color, characters.color2  , characters.description, characters.name, characters.name_id, characters.type FROM lotr as events, lotr_characters as characters WHERE characters.name_id = events.character AND round = '+self.round),
        dataType:'json',
      }),
      $.ajax({
        url: self.getSQLApiUrl('SELECT events.*,ST_AsGeoJSON(events.the_geom,5) as the_geom FROM lotr as events WHERE type = \'battle\' AND round = '+self.round),
        dataType:'json',
      })
    ).done(function(res, res2, res3) {
      self.processCurrentLayer(res, res2, res3)
      dfd.resolve();
    })
    return dfd.promise();
  },
  removeHiddenCharacters: function(res) {
    for(var c in this.characters) {
      var found = false;
      for(var i in res.rows) {
        if(res.rows[i].name_id == c) {
          found = true
        }
      }
      if(!found) {
        this.deleteCharacter(c)
      }
    }
  },
  processCurrentLayer: function(res, resEvents) {
    res = res[0];
    var self = this;
    this.updateSlider();
    this.currentRes = res;
    if(resEvents) {
      this.processCurrentEvents(resEvents[0]);
    }
    this.removeHiddenCharacters(res);
    for(var i in res.rows) {
      if(res.rows[i].the_geom) {
        var pos = JSON.parse(res.rows[i].the_geom);
        var name = res.rows[i].name;
        var name_id = res.rows[i].name_id;
        var desc = res.rows[i].description;
        var type = res.rows[i].type;
        var color = res.rows[i].color ? res.rows[i].color : '#FF5555';
        var color2= res.rows[i].color2 ? res.rows[i].color2 : '#333';
        if(name_id in this.characters) {
          lotr.characters[name_id]
            .data( [new L.LatLng(pos.coordinates[1],pos.coordinates[0])])
          lotr.characters[name_id].move()
          this.characters[name_id].latLng = new L.LatLng(pos.coordinates[1], pos.coordinates[0])

        } else {
          var size = ((this.map.getZoom()/3) * 100);
          if(type=='character') {
            this.characters[name_id] = lotr.createCircle(pos.coordinates[1], pos.coordinates[0], size/20, name)
          } else {
            this.characters[name_id] = lotr.createDiamond(pos.coordinates[1], pos.coordinates[0], size,name)
          }
          this.characters[name_id].description = desc;
          this.characters[name_id].name = name;
          this.characters[name_id].latLng = new L.LatLng(pos.coordinates[1], pos.coordinates[0])
          this.characters[name_id].on('mousedown', function() {
            L.popup({autoPan: true})
              .setLatLng(this.data()[0])
              .setContent(
                _.template($('#infoTemplate').html(), {name:this.name, description: this.description})
              )
            .openOn(self.map);
          }.bind(this.characters[name_id]))

          this.characters[name_id]
            .attr('fill',color)
            .attr('stroke',color2)
            .attr('class','character')
            .attr('name', name)
        }
      }
    }
  },
  processCurrentEvents: function(res) {
    for(var e in this.events) {
      this.deleteEvent(e);
    }
    for(var i in res.rows) {
      if(res.rows[i].the_geom) {
        var pos = JSON.parse(res.rows[i].the_geom);
        var name_id = res.rows[i].character;
        var desc = res.rows[i].description;
        var type = res.rows[i].type;
        var size = ((this.map.getZoom()/3) * 600);
        this.events[name_id] = lotr.createCircle(pos.coordinates[1], pos.coordinates[0], size/20, name_id)
        this.events[name_id].attr('fill',"#FF5555")
            .attr('class','event')
        }
    }
  },
  deleteEvent: function(ev) {
    this.events[ev].label.remove();
    this.events[ev].remove();
    delete this.events[ev]
  },
  deleteCharacter: function(characterName) {
    this.characters[characterName].label.remove();
    this.characters[characterName].remove();
    delete this.characters[characterName]
  },
  refreshCharacters: function() {
    for(var c in this.characters) {
      this.deleteCharacter(c)
    };
    this.processCurrentLayer([this.currentRes])
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
    var dfd = $.Deferred();
    if(this.round === 1) {
      this.showCurrentNarration(1)
    }
    var prevRound = this.round;
    var step = this.step;
    if(this.synchedMovie) { step = this.stepMovie }
    this.round = this.round + step;
    if(this.round <= this.maxRound) {
      $.when(this.drawCurrentLayer()).done(dfd.resolve)
    } else {
      this.stop();
      dfd.resolve();
    }
    this.updateNarration(this.round, this.round - prevRound);
    return dfd.promise();
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
    this.refreshCharacters();
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
