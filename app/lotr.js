window.lotr = window.lotr || {}
lotr = {
  // baseMap: 'http://www.elfenomeno.com/gme/getI.php?x={x}&y={y}&z={z}&m=3EN',
  //baseMap: 'http://localhost:8000/guerra/{z}/{x}/{y}.jpg',
  baseMap: 'http://listify.es/var/arda/{z}/{x}/{y}.jpg',
  baseLayer: 'http://xabel.cartodb.com/api/v1/viz/13827/viz.json',
  round: 1,
  interval: 3000,
  init: function(){
  // initiate leaflet map
    this.initBaseMap();
    this.initLayers();
    this.bindActions();
  },
  initBaseMap: function() {
    var self = this;
    this.map = new L.Map('middleEarth', {
      center: [-60,-95],
      zoom: 4,
      maxZoom:4,
      minZoon:5
    });
    this.map.setZoom(4);
    L.tileLayer(self.baseMap, {
      attribution: ''
    }).addTo(self.map);
  },
  initLayers: function() {
    this.drawCurrentLayer();
  },
  drawCurrentLayer: function() {
    var self = this;

    cartodb.createLayer(self.map,
      self.getCurrentLayer(),
      {
        query: 'select * from lotr where round = ' + self.round,
      }
    ).on('done', function(layer) {

        self.map.addLayer(layer);
        if(self.currentLayer) {
          self.currentLayer.remove();
        }
        self.currentLayer = layer;
        document.getElementById('date').innerHTML = self.getDate();
    });


  },
  getCurrentLayer: function() {
    var link = this.baseLayer;
    return link;
  },
  nextRound: function() {
    this.round++;
    this.drawCurrentLayer();
  },
  prevRound: function() {
    this.round--;
    this.drawCurrentLayer();
  },
  autoPlay: function() {
    this.stop();
    document.getElementById('autoPlay').className = 'playing';
    setInterval(this.nextRound.bind(this), this.interval)
  },
  stop: function() {
    document.getElementById('autoPlay').className = '';
    clearInterval();
  },
  bindActions: function() {
    document.getElementById('nextRound').addEventListener('click', this.nextRound.bind(this));
    document.getElementById('prevRound').addEventListener('click', this.prevRound.bind(this));
    document.getElementById('autoPlay').addEventListener('click', this.autoPlay.bind(this));
    document.getElementById('stop').addEventListener('click', this.stop.bind(this));
  },
  getDate: function() {
    var day = (this.round+21) % 30;
    var month = (Math.floor(this.round / 30)+8) % 12;
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

    return day + ' - ' + month_names[month] + ' 3001 of the third age'
  }

}

window.onload = lotr.init.bind(lotr);
