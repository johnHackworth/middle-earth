window.lotr = window.lotr || {}
window.lotr = {
  baseMap: 'http://johnhackworth.github.com/middle-earth-tiles/{z}/{x}/{y}.jpg',
  baseLayer: 'http://xabel.cartodb.com/api/v1/viz/13827/viz.json',
  baseLayerGeo: 'http://xabel.cartodb.com/api/v1/viz/15029/viz.json',
  narrationUrl: 'http://xabel.cartodb.com/api/v1/sql?q=select *, ST_AsGeoJSON(the_geom,5) as the_geom from lotr_narration',
  narration: [],
  narrationSource: null,
  round: 25,
  _MIN_ZOOM: 3,
  _CENTER: [-69, -80],
  step: 1,
  stepMovie: 1,
  showingOptions: false,
  showingGeo: false,
  synchedMovie: false,
  autoZoom: true,
  autoPan: true,
  maxRound: 340,
  interval: 3000,
  intervalMovie: 30000,
  transitionSpeed: 3100,
  transitionSpeedMovie: 30300,
  characters: {},
  events: {},
  /**
   * Initialize everything!!
   */
  init: function(){
    $('.loader').remove();
    this.getNarration();
    this.initCachedDOM();
    this.initBaseMap();
    this.initLayers();
    this.initTimeline();
    this.bindActions();
    this.toggleOptions();
    this.openPopUp();
    this.proccessNarration();
  },
  /**
   * Saves the references of the elements of the view we are going to need
   */
  initCachedDOM: function() {
    this.viewRef = {
      drawer: $('#options'),
      drawerHandle: $('#handle'),
      geo: $('#geopolitical'),
      timeline: $('#timeline'),
      movie: $('#movieSynch'),
      help: $('#help'),
      helpClose: $('.helpWindow'),
      autopan: $('#autopan'),
      autozoom: $('#autozoom'),
      nextRound: $('#nextRound'),
      prevRound: $('#prevRound'),
      autoPlay: $('#autoPlay'),
      stop: $('#stop')
    }
  },
  /**
   * Fetch narration from server
   */
  getNarration: function() {
    var self = this;
    $.ajax({
      url: self.narrationUrl,
      dataType: 'json',
      success: function(res) {
        self.narrationSource = res;
        self.proccessNarration();
      }
    });
  },
  /**
   * Builds the url for the current round
   * @param  {String} query [Query for the round]
   * @return {[String]}       [Url of cartodb SQL api]
   */
  getSQLApiUrl: function(query) {
    return 'http://xabel.cartodb.com/api/v1/sql?q=' + query + '&api_key=' + this.api_key
  },
  /**
   * Initialize the timeline
   */
  initTimeline: function() {
    this.viewRef.timeline.on('slidestop', this.goToTimePoint.bind(this))
    this.viewRef.timeline.slider();
    // this will work when I implement a way to calculate the date
    // $('.timeLegend .origin').html(this.getDate(1, true));
    // $('.timeLegend .end').html(this.getDate(this.maxRound, true));

  },
  /**
   * Initializes the leaflet basemap
   */
  initBaseMap: function() {
    var self = this;
    this.map = new L.Map('middleEarth', {
      center: this._CENTER,
      maxBounds: [[-85.02070, -179.648438], [-43.068888, 83.847656]],
      zoom: 4,
      maxZoom:7,
      minZoon:2,
      fadeAnimation: true,
      panAnimation: true,
    });
    // HACKATTACK!!! for some reason I need to investigate the 'load' leaflet event doesn't work
    // don't kill me for this, please, this is a spare time project ;D
    setTimeout(function(){
      self.map.panTo(self._CENTER);
      self.map.setZoom(4);
    },350);
    L.tileLayer(self.baseMap, {
      attribution: ''
    }).addTo(self.map);
    self.map._initPathRoot()
    self.map.on("viewreset", self.refreshCharacters.bind(self));
  },
  /**
   * Init layers for first round
   */
  initLayers: function() {
    this.drawGeoLayer();
    this.drawCurrentLayer();
  },
  /**
   * attach actions to events that happens in the view
   */
  bindActions: function() {
    this.viewRef.helpClose.on('click', this.closePopUp.bind(this));
    this.viewRef.nextRound.on('click', this.nextRound.bind(this));
    this.viewRef.prevRound.on('click', this.prevRound.bind(this));
    this.viewRef.autoPlay.on('click', this.autoPlay.bind(this));
    this.viewRef.stop.on('click', this.stop.bind(this));
    this.viewRef.drawerHandle.on('click', this.toggleOptions.bind(this));
    this.viewRef.geo.on('click', this.toggleGeo.bind(this));
    this.viewRef.autopan.on('click', this.toggleAuto.bind(this));
    this.viewRef.autozoom.on('click', this.toggleAutoZoom.bind(this));
    this.viewRef.movie.on('click', this.toggleMovie.bind(this));
    this.viewRef.help.on('click', this.openPopUp.bind(this));

  },

  /**
   * Select the speed of the transitions
   * @return {Number}
   */
  getTransmisionSpeed: function() {
    return this.synchedMovie ?
      this.transitionSpeedMovie :
      this.transitionSpeed;
  },
  /**
   * Create a diamond figure on the canvas
   * @param  {Number} lat  [latitude]
   * @param  {Number} lon  [longitude]
   * @param  {Number} size [Size of the object]
   * @param  {String} text [Text for the label]
   * @return {Object}
   */
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
    }).bind(feature);

    feature.move = (function() {
      this
        .transition()
        .attr("transform", function(d) { return "translate(" +
                          self.map.latLngToLayerPoint(d).x + "," +
                          self.map.latLngToLayerPoint(d).y + ")"; })
        .duration(self.getTransmisionSpeed())
        .delay(0)
        .ease('linear');
      this.label.data(this.data());
      this.label.move();
    }).bind(feature)

    feature.update();
    return feature;
  },
  /**
   * Create a label on the canvas
   * @param  {DOM} svg  [Svg where the objects are being append]
   * @param  {LatLng} LatLng [Leaflet LatLng object thiw the position info]
   * @param  {String} text [contents of the label]
   * @param  {number} radio [Size of the associated object]
   * @return {Object}
   */
  createLabel: function(svg, LatLng, text, radio) {
    if(!radio) { radio = 20 } else { radio = radio * 2; };
    var self = this;
    var className = text + ' charLabel zoom' + this.map.getZoom();
    var label = svg.append("svg:text")
    .data([LatLng])
    .attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x - radio) + "," +
                          (self.map.latLngToLayerPoint(d).y + radio - 5) + ")";
     })
    .attr("dy", ".35em")
    .attr("text-anchor", "middleclss")
    .attr('class', className)
    .text(function(d) { return text });
    label.update = (function() {
      this.attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x - radio) + "," +
                          (self.map.latLngToLayerPoint(d).y + radio - 5) + ")"; })
    }).bind(label)
    label.move = (function() {
      this
        .transition()
        .attr("transform", function(d) { return "translate(" +
                          (self.map.latLngToLayerPoint(d).x - radio) + "," +
                          (self.map.latLngToLayerPoint(d).y + radio - 5) + ")"; })
        .duration(self.getTransmisionSpeed())
        .delay(0)
        .ease('linear')
    }).bind(label)

    return label;
  },
  /**
   * Create a circle figure on the cambas
   * @param  {Number} lat  [latitude]
   * @param  {Number} lon  [longitude]
   * @param  {Number} radio [Size of the object]
   * @param  {String} text [Text for the label]
   * @return {Object}
   */
  createCircle: function(lat, lon, radio, text) {
    var self = this;
    var svg = d3.select("#middleEarth").select("svg");
    var g = svg.append("g");
    var LatLng = new L.LatLng(lat, lon)
    var feature = g.selectAll("circle")
      .data([LatLng])
      .enter().append("circle")
      .attr("r", radio)
    feature.label = this.createLabel(svg, LatLng, text, radio);
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
        .duration(self.getTransmisionSpeed())
        .delay(0)
        .ease('linear')
      this.label.data(this.data());
      this.label.move();
    }).bind(feature)

    feature.update();
    return feature;
  },
  /**
   * Closes the info popup
   * @param  {Event} ev
   */
  closePopUp: function(ev) {
    if($('body').attr('data-helpOpen') == 'true') {
      $('body').attr('data-helpOpen', "false")
      $('.helpWindow').addClass('hidden')
    }
  },
  /**
   * Opens the info popup
   */
  openPopUp: function() {
    $('.helpWindow').removeClass('hidden')
    $('body').attr('data-helpOpen', "true")
  },
  /**
   * Moves the current round to the equivalent of the position of the slider
   * @param  {Event} ev
   */
  goToTimePoint: function(ev) {
    var self = this;
    var position = this.viewRef.timeline.slider('value');
    var nextRound = Math.floor(this.maxRound * position / 100)
    this.round = nextRound
    $.when(this.nextRound()).done(function() {
      self.stop()
      self.toggleOptions();
    });
  },
  /**
   * Create a cartodb layer with geographical info
   */
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
  /**
   * Remove the geo layer
   */
  removeGeoLayer: function() {
    if(this.showingGeo) {
      this.showingGeo = false;
      this.geoLayer.remove();
      this.geoLayer = null;
    }
  },
  /**
   * Fetch the positions for the current round
   * @return {Promise}
   */
  drawCurrentLayer: function() {
    var dfd = $.Deferred();
    var self = this;
    $.when(
      $.ajax({
        url: self.getSQLApiUrl('SELECT events.*,ST_AsGeoJSON(events.the_geom,5) as the_geom, characters.color, characters.color2  , characters.description, characters.name, characters.full_name, characters.name_id, characters.type FROM lotr as events, lotr_characters as characters WHERE characters.name_id = events.character AND round = '+self.round),
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
  /**
   * Remove from the characters array all the chars that are not present in the
   * last batch retrieved from server
   * @param  {Object} res new batch
   */
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
  /**
   * Takes a new batch of char positions and a new batch of events an paints them
   * on the view
   * @param  {Object} res
   * @param  {Object} resEvents
   * @todo  Refactor and divide in a couple or more methods
   */
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
        var full_name = res.rows[i].full_name;
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
          } else if(type=='army') {
            this.characters[name_id] = lotr.createCircle(pos.coordinates[1], pos.coordinates[0], size/6, name)
          } else {
            this.characters[name_id] = lotr.createDiamond(pos.coordinates[1], pos.coordinates[0], size,name)
          }
          this.characters[name_id].description = desc;
          this.characters[name_id].name = full_name;
          this.characters[name_id].name_id = name_id;
          this.characters[name_id].latLng = new L.LatLng(pos.coordinates[1], pos.coordinates[0])
          this.characters[name_id].on('mousedown', function() {
            self.openCharPopUp.call(this, self);
          }.bind(this.characters[name_id]))
          this.characters[name_id].on('touchstart', function(ev) {
            self.openCharPopUp.call(this, self);
          }.bind(this.characters[name_id]))
          this.characters[name_id].label.on('mousedown', function() {
            self.openCharPopUp.call(this, self);
          }.bind(this.characters[name_id]))
          this.characters[name_id].label.on('touchstart', function() {
            self.openCharPopUp.call(this, self);
          }.bind(this.characters[name_id]))
          this.characters[name_id]
            .attr('fill',color)
            .attr('stroke',color2)
            .attr('class',type)
            .attr('name', name)
        }
      }
    }
  },
  /**
   * Open a character infowindow
   * @param  {Object} self [referece to this object]
   */
  openCharPopUp: function(self) {
    L.popup({autoPan: true})
      .setLatLng(this.data()[0])
      .setContent(
        _.template($('#infoTemplate').html(), {name:this.name, id: this.name_id, description: this.description})
      )
    .openOn(self.map);
  },
  /**
   * Paints on the view the current events
   * @param  {Object} res
   */
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
  /**
   * Remove an event from the view and from the memory
   * @param  {String} ev
   */
  deleteEvent: function(ev) {
    this.events[ev].label.remove();
    this.events[ev].remove();
    delete this.events[ev]
  },
  /**
   * Remove a character from the view and from memory
   * @param  {String} characterName
   */
  deleteCharacter: function(characterName) {
    this.characters[characterName].label.remove();
    this.characters[characterName].remove();
    delete this.characters[characterName]
  },
  /**
   * Repaints the characters on the view
   */
  refreshCharacters: function() {
    var self = this;
    // hack
    if(this.map.getZoom() < this._MIN_ZOOM) {
      setTimeout(function(){self.map.setZoom(self._MIN_ZOOM)},200)
    }
    // fhack
    for(var c in this.characters) {
      this.deleteCharacter(c)
    };
    this.processCurrentLayer([this.currentRes])
  },
  /**
   * Move the slider to the current position
   */
  updateSlider: function() {
    var percentage = 100 * this.round / this.maxRound
    this.viewRef.timeline.slider('value', percentage);
  },
  /**
   * Process the next round
   */
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
  /**
   * fallback to the previous round
   */
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
  /**
   * Update the narration
   * @deprecated {[type]} currentRound [description]
   * @deprecated  {[type]} variation    [description]
   */
  updateNarration: function(currentRound, variation) {
    if(this.narration[this.round]) {
      this.showCurrentNarration(this.round);
    }
    // if(variation > 0) {
    //   for(i = 1; i<=variation; i++) {
    //     if((currentRound + i) in this.narration) {
    //       this.showCurrentNarration(currentRound + i)
    //     }
    //   }
    // } else {
    //   for(i = -1; i>=variation; i--) {
    //     if((currentRound + i) in this.narration) {
    //       this.showCurrentNarration(currentRound + i)
    //     }
    //   }
    // }
  },
  /**
   * Paints on the view the narration text of a round and modify the map
   * according to the options
   * @param  {Number} round
   */
  showCurrentNarration: function(round) {
    $('#vizTitle p').html(this.narration[round].description);
    if(this.autoPan && this.narration[round].the_geom) {
      var pos = JSON.parse(this.narration[round].the_geom);
      this.map.panTo(pos.coordinates.reverse())
      if(this.narration[round].zoom && this.autoZoom) {
        this.map.setZoom(this.narration[round].zoom);
      }
    }

  },
  /**
   * Select the update interval
   * @return {Number}
   */
  getInterval: function() {
    if(this.synchedMovie) {
      return this.intervalMovie;
    }
    return this.interval;
  },
  /**
   * Begin to the play the visualization
   */
  autoPlay: function() {
    this.stop();
    $('#stop').removeClass('hidden');
    $('#autoPlay').addClass('hidden');
    this.currentInterval = setInterval(this.nextRound.bind(this), this.getInterval())
    this.toggleOptions();
  },
  /**
   * Stops the vizz
   */
  stop: function() {
    $('#stop').addClass('hidden');
    $('#autoPlay').removeClass('hidden');
    clearInterval(this.currentInterval);
    this.refreshCharacters();
  },
  /**
   * Show and hide the options panel
   */
  toggleOptions: function() {
    if(this.showingOptions) {
      this.showingOptions = false;
      this.viewRef.drawer.addClass('replegated')
    } else {
      this.showingOptions = true;
      this.viewRef.drawer.removeClass('replegated')
    }
  },
  /**
   * Toggles the sync with movie option
   */
  toggleMovie: function() {
     if(this.synchedMovie) {
      this.viewRef.movie.removeClass('enabled');
      this.viewRef.movie.addClass('disabled');
      this.synchedMovie = false;
      this.stop();
      this.round = 20;
      this.proccessNarration();
    } else {
      this.viewRef.movie.addClass('enabled')
      this.viewRef.movie.removeClass('disabled');
      this.synchedMovie = true;
      this.stop();
      this.round = 0;
      this.proccessNarration();
    }
  },
  /**
   * Toggles the auto panning on narration function
   */
  toggleAuto: function() {
     if(!this.autoPan) {
      this.viewRef.autopan.removeClass('enabled');
      this.viewRef.autopan.addClass('disabled');
      this.autoPan = true;
    } else {
      this.viewRef.autopan.addClass('enabled')
      this.viewRef.autopan.removeClass('disabled');
      this.autoPan = false;
    }
  },
  /**
   * Toggles the auto zoom on narration function
   */
  toggleAutoZoom: function() {
     if(!this.autoZoom) {
      this.viewRef.autozoom.removeClass('enabled');
      this.viewRef.autozoom.addClass('disabled');
      this.autoPan = true;
    } else {
      this.viewRef.autozoom.addClass('enabled')
      this.viewRef.autozoom.removeClass('disabled');
      this.autoZoom = false;
    }
  },
  /**
   * Toggles the geo layer
   */
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
  /**
   * EXPERIMENTAL: Gets the equivalent date of this round
   */
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
  },
  /**
   * Proccess the narration feed, selecting the events
   */
  proccessNarration: function() {
    if(this.narrationSource) {
      var res = this.narrationSource;
      this.narration = [];
      for(var i in res.rows) {
        if(
            (res.rows[i].synched === null) ||
            (this.synchedMovie && res.rows[i].synched === true) ||
            (!this.synchedMovie && res.rows[i].synched === false)
        ) {
          this.narration[res.rows[i].round] = {
            "description": res.rows[i].description,
            "the_geom": res.rows[i].the_geom,
            "zoom": res.rows[i].zoom
          }
        }
      }
    }
  }

}

window.onload = lotr.init.bind(lotr);
