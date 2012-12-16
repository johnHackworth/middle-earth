
places = {
  'isengard': {'lon': -89.824218, 'lat': -71.059798},
  'minas tirith': {'lon': -57.128907, 'lat': -75.253057},
  'thranduils palace': {'lon': -51.987306, 'lat': -50.373496},
  'iron hills': {'lon': -17.138673, 'lat': -49.181703},
  'tharbad': {'lon': -104.72167, 'lat': -65.330178},
  'old forest road end': {'lon': -46.757811, 'lat': -55.50375},
  'edoras': {'lon': -83.935546, 'lat': -72.355789},
  'horeburg': {'lon': -87.758788, 'lat': -72.248917},
  'moria gate': {'lon': -90.395507, 'lat': -62.69431},
  'moria exit': {'lon': -84.990233, 'lat': -62.144976},
  'hobbiton': {'lon': -117.026368, 'lat': -56.12107},
  'lorien': {'lon': -77.036132, 'lat': -64.377941},
  'tuckburrow': {'lon': -119.663085, 'lat': -57.73935},
  'shire road': {'lon': -115.3124, 'lat': -57.73935},
  'shire fields': {'lon': -116.191405, 'lat': -57.480403},
  'tom bombadil': {'lon': -110.610351, 'lat': -58.516652},
  'bree': {'lon': -106.918944, 'lat': -55.40407},
  'breeland': {'lon': -107.270507, 'lat': -53.278353},
  'weathertop': {'lon': -100.722655, 'lat': -54.41893},
  'last bridge': {'lon': -95.537108, 'lat': -54.749991},
  'rivendel': {'lon': -89.208983, 'lat': -54.927142},
  'caradhas': {'lon': -87.055663, 'lat': -59.95501},
  'brandywine bridge': {'lon':-113.928222, 'lat': -56.571589},
}
options = {}
options['rounds'] = {
  1: {
    'frodo': places['hobbiton'],
    'merry': places['tuckburrow'],
    'sam': places['hobbiton'],
    'pippin': places['tuckburrow'],
    'gandalf': places['hobbiton'],
    'arangorn': places['bree'],
    'legolas': places['thranduils palace'],
    'gimli': places['iron hills'],
    'boromir': places['minas tirith'],
    'nazgul1': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul2': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul3': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
  },
  5: {
    'nazgul1': places['brandywine bridge'],
    'nazgul2': places['brandywine bridge'],
    'nazgul3': places['brandywine bridge'],
  },
  10: {
    'frodo': places['shire fields'],
    'merry': places['shire fields'],
    'sam': places['shire fields'],
    'pippin': places['shire fields'],
  },
  13: {
    'nazgul1': places['hobbiton'],
    'boromir': places['minas tirith'],
  },
  20: {
    'nazgul1': places['brandywine bridge'],
    'frodo': places['brandywine bridge'],
    'merry': places['brandywine bridge'],
    'sam': places['brandywine bridge'],
    'pippin': places['brandywine bridge'],
  },
  35: {
    'frodo': places['shire road'],
    'merry': places['shire road'],
    'sam': places['shire road'],
    'pippin': places['shire road'],
    'nazgul1': places['shire road'],
    'nazgul2': places['hobbiton'],
    'nazgul3': places['tuckburrow'],
    'gimli': places['old forest road end'],
  },
  50: {
    'frodo': places['tom bombadil'],
    'merry': places['tom bombadil'],
    'sam': places['tom bombadil'],
    'pippin': places['tom bombadil'],
  },
  60: {
    'gandalf': places['isengard'],
    'boromir': places['edoras'],
  },
  75: {
    'frodo': places['bree'],
    'merry': places['bree'],
    'sam': places['bree'],
    'pippin': places['bree'],
    'arangorn': places['bree'],
    'legolas': places['old forest road end'],
    'boromir': places['horeburg'],
  },
  78: {
    'nazgul1': places['bree'],
    'nazgul2': places['bree'],
    'nazgul3': places['bree'],
    'frodo': places['bree'],
    'merry': places['bree'],
    'sam': places['bree'],
    'pippin': places['bree'],
    'arangorn': places['bree'],
  },
  85: {
    'nazgul1': places['breeland'],
    'nazgul2': places['breeland'],
    'nazgul3': places['breeland'],
    'boromir': places['tharbad'],
  },
  95: {
    'nazgul1': places['bree'],
    'nazgul2': places['bree'],
    'nazgul3': places['bree'],
  },
  125: {
    'frodo': places['weathertop'],
    'merry': places['weathertop'],
    'sam': places['weathertop'],
    'pippin': places['weathertop'],
    'arangorn': places['weathertop'],
    'nazgul1': places['weathertop'],
    'nazgul2': places['weathertop'],
    'nazgul3': places['weathertop'],
  },
  140: {
    'frodo': places['last bridge'],
    'merry': places['last bridge'],
    'sam': places['last bridge'],
    'pippin': places['last bridge'],
    'arangorn': places['last bridge'],
    'legolas': places['rivendel'],
    'nazgul1': places['last bridge'],
    'nazgul2': places['last bridge'],
    'nazgul3': places['last bridge'],
  },
  142: {
    'nazgul1': {'hidden': True},
    'nazgul2': {'hidden': True},
    'nazgul3': {'hidden': True},
  },
  160: {
    'frodo': places['rivendel'],
    'merry': places['rivendel'],
    'sam': places['rivendel'],
    'pippin': places['rivendel'],
  },
  180: {
    'gandalf': places['isengard'],
    'gimli': places['rivendel'],
  },
  200: {
    'boromir': places['rivendel'],
  },
  210: {
    'frodo': places['rivendel'],
    'merry': places['rivendel'],
    'sam': places['rivendel'],
    'pippin': places['rivendel'],
    'gandalf': places['rivendel'],
    'arangorn': places['rivendel'],
    'gimli': places['rivendel'],
    'boromir': places['rivendel'],
    'legolas': places['rivendel'],
  },
  220: {
    'frodo': places['rivendel'],
    'merry': places['rivendel'],
    'sam': places['rivendel'],
    'pippin': places['rivendel'],
    'gandalf': places['rivendel'],
    'arangorn': places['rivendel'],
    'gimli': places['rivendel'],
    'boromir': places['rivendel'],
    'legolas': places['rivendel'],
  },
  240: {
    'frodo': places['caradhas'],
    'merry': places['caradhas'],
    'sam': places['caradhas'],
    'pippin': places['caradhas'],
    'gandalf': places['caradhas'],
    'arangorn': places['caradhas'],
    'gimli': places['caradhas'],
    'boromir': places['caradhas'],
    'legolas': places['caradhas'],
  },
  270: {
    'frodo': places['moria gate'],
    'merry': places['moria gate'],
    'sam': places['moria gate'],
    'pippin': places['moria gate'],
    'gandalf': places['moria gate'],
    'arangorn': places['moria gate'],
    'gimli': places['moria gate'],
    'boromir': places['moria gate'],
    'legolas': places['moria gate'],
  },
  290: {
    'frodo': places['moria exit'],
    'merry': places['moria exit'],
    'sam': places['moria exit'],
    'pippin': places['moria exit'],
    'gandalf': places['moria exit'],
    'arangorn': places['moria exit'],
    'gimli': places['moria exit'],
    'boromir': places['moria exit'],
    'legolas': places['moria exit'],
  },
  330: {
    'frodo': places['lorien'],
    'merry': places['lorien'],
    'sam': places['lorien'],
    'pippin': places['lorien'],
    'gandalf': places['moria exit'],
    'arangorn': places['lorien'],
    'gimli': places['lorien'],
    'boromir': places['lorien'],
    'legolas': places['lorien'],
  },
}
options['last_round'] = 330

