
places = {
  'thranduils palace': { 'lon':-21.621094, 'lat':-53.225768},
  'tharbad': { 'lon': -77.695312, 'lat':-69.09994},
  'minas tirith': { 'lon':-23.378906, 'lat':-80.703997},
  'gladden fields': { 'lon':-39.375, 'lat':-64.923542},
  'buckland': { 'lon':-95.009766, 'lat':-61.227957},
  'barad-dur': { 'lon':-0.878906, 'lat':-79.592349},
  'minas morgul': { 'lon':-14.0625, 'lat':-80.760615},
  'edoras': { 'lon':-49.746094, 'lat':-78.836065},
  'tom bombadil': { 'lon':-91.40625, 'lat':-61.648162},
  'old forest road end': { 'lon':-13.623047, 'lat':-58.309489},
  'erebor': { 'lon':-14.677734, 'lat':-52.749594},
  'brandywine bridge': { 'lon':-95.405273, 'lat':-59.998986},
  'last bridge': { 'lon':-64.995117, 'lat':-59.866883},
  'rivendell': { 'lon':-53.217773, 'lat':-59.534318},
  'bree': { 'lon':-86.220703, 'lat':-60.326948},
  'khazad-dum': { 'lon':-52.119141, 'lat':-68.815927},
  'hobbiton': { 'lon':-98.525391, 'lat':-60.500525},
  'caradhas': { 'lon':-53.085938, 'lat':-64.244595},
  'tuckburrow': { 'lon':-99.84375, 'lat':-62.226996},
  'lorien': { 'lon':-44.121094, 'lat':-70.612614},
  'moria gate': { 'lon':-59.150391, 'lat':-69.380313},
  'moria': { 'lon':-55.195312, 'lat':-69.287257},
  'ford of bruinen': { 'lon':-55.766602, 'lat':-60.348696},
  'gap of rohan': { 'lon':-70.927734, 'lat':-76.840816},
  'goblin town': { 'lon':-46.40625, 'lat':-58.813742},
  'bree road': { 'lon':-76.948242, 'lat':-60.802064},
  'weathertop': { 'lon':-77.036133, 'lat':-59.040555},
  'shire road': { 'lon':-96.28418, 'lat':-61.079544},
  'shire fields': { 'lon':-96.328125, 'lat':-60.823494},
  'breeland': { 'lon':-88.59375, 'lat':-56.36525},
  'hornburg': { 'lon':-56.601562, 'lat':-77.934055},
  'isengard': { 'lon':-62.666016, 'lat':-75.737303},
  'rivendell road': {'lon':-62.578125, 'lat':-63.860036},
  'nen hithoel': {'lon': -31.904297, 'lat': -77.399095}
}
options = {}
options['rounds'] = {
  1: {
  },
  10: {
    'sauron': places['barad-dur']
  },
  20: {
    'elrond': places['barad-dur'],
    'isildur': places['barad-dur'],
    'siege of barad-dur': {'lon': places['barad-dur']['lon'], 'lat': places['barad-dur']['lat'], 'type': 'battle'}
  },
  30: {
    'sauron': {'hidden': False},
  },
  40: {
    'sauron': {'hidden': True},
    'siege of barad-dur': {'hiden': True},
    'elrond': places['barad-dur'],
    'isildur': places['barad-dur'],
  },
  45: {
    'isildur': places['gladden fields'],
    'elrond': places['rivendell']
  },
  50: {
    'isildur': {'hidden': True},
    'gollum': places['gladden fields'],
  },
  55: {
    'gollum': places['goblin town'],
    'bilbo': places['hobbiton']
  },
  60: {
    'gollum': {'hidden': True},
    'bilbo': places['goblin town'],
  },
  65: {
    'bilbo': places['erebor']
  },
  70: {
    'bilbo': places['hobbiton'],
    'frodo': places['buckland']
  },
  75: {
    'sauron': {'hidden': False},
    'gandalf': places['buckland'],
    'frodo': places['buckland']
  },
  110: {
    'gandalf': places['hobbiton'],
    'frodo': places['hobbiton']
  },
  150: {
    'pippin': places['hobbiton'],
    'merry': places['hobbiton'],
    'sam': places['hobbiton'],
    'bilbo': places['hobbiton'],
    'gandalf': places['hobbiton'],
    'frodo': places['hobbiton']
  },
  225: {
    'bilbo': places['hobbiton']
  },
  230: {
    'bilbo': places['brandywine bridge'],
    'gandalf': places['hobbiton']
  },
  240: {
    'bilbo': places['rivendell']
  },
  241: {
    'bilbo': {'hidden': True},
    'boromir': places['minas tirith'],
    'gandalf': places['tharbad']
  },
  260: {
    'nazgul1': places['barad-dur'],
    'nazgul2': places['barad-dur'],
    'nazgul3': places['minas morgul'],
  },
  264: {
    'nazgul1': places['minas morgul'],
    'nazgul2': places['minas morgul'],
    'nazgul3': places['minas morgul'],
  },
  265: {
    'gandalf': places['minas tirith']
  },
  270: {
    'gandalf': places['minas tirith']
  },
  275: {
    'nazgul1': places['isengard'],
    'nazgul2': places['isengard'],
    'nazgul3': places['isengard'],
  },
  280: {
    'gandalf': places['hobbiton'],
    'sam': places['hobbiton'],
    'frodo': places['hobbiton'],
    'merry': places['tuckburrow'],
    'pippin': places['tuckburrow'],
    'boromir': places['edoras']
  },
  325: {
    'nazgul1': places['brandywine bridge'],
    'nazgul2': places['brandywine bridge'],
    'nazgul3': places['brandywine bridge'],
  },
  350: {
    'gandalf': places['hobbiton'],
    'sam': places['hobbiton'],
    'frodo': places['hobbiton'],
  },
  360: {
    'gandalf': places['tharbad']
  },
  370: {
    'gandalf': places['isengard']
  },
  380: {
    'nazgul1': places['hobbiton'],
    'nazgul2': places['tuckburrow'],
    'nazgul3': places['buckland'],
  },
  405: {
    'gandalf fights saruman': {'type': 'battle', 'lon': places['isengard']['lon'], 'lat': places['isengard']['lat'] }
  },
  420: {
    'pippin': places['shire fields'],
    'merry': places['shire fields'],
    'frodo': places['shire fields'],
    'sam': places['shire fields'],
  },
  440: {
    'pippin': places['shire fields'],
    'merry': places['shire fields'],
    'frodo': places['shire fields'],
    'sam': places['shire fields'],
    'nazgul3': places['shire fields'],
  },
  450: {
    'pippin': places['shire fields'],
    'merry': places['shire fields'],
    'frodo': places['shire fields'],
    'sam': places['shire fields'],
    'nazgul3': places['shire fields'],
    'legolas': places['thranduils palace'],
  },
  455: {
    'nazgul3': places['shire road']
  },
  470: {
    'gimli': places['erebor'],
    'pippin': places['buckland'],
    'merry': places['buckland'],
    'frodo': places['buckland'],
    'sam': places['buckland'],
    'nazgul1': places['buckland'],
    'nazgul2': places['buckland'],
    'nazgul3': places['buckland'],
  },
  475: {
    'nazgul1': places['brandywine bridge'],
    'nazgul2': places['brandywine bridge'],
    'nazgul3': places['brandywine bridge'],
  },
  480: {
    'aragorn': places['bree'],
    'pippin': places['bree'],
    'merry': places['bree'],
    'frodo': places['bree'],
    'sam': places['bree'],
    'nazgul1': places['buckland'],
    'nazgul2': places['buckland'],
    'nazgul3': places['buckland'],
  },
  515: {
    'legolas': places['old forest road end'],
    'nazgul1': places['buckland'],
    'nazgul2': places['buckland'],
    'nazgul3': places['buckland'],
  },
  530: {
    'nazgul1': places['bree'],
    'nazgul2': places['bree'],
    'nazgul3': places['bree'],
  },
  535: {
    'nazguls attack hobbits': {'type': 'battle', 'lat': places['bree']['lat'], 'lon': places['bree']['lon']},
  },
  540: {
    'nazgul1': places['bree'],
    'nazgul2': places['bree'],
    'nazgul3': places['bree'],
    'nazguls attack hobbits': {'hidden': True}
  },
  545: {
    'gimli': places['old forest road end'],
    'aragorn': places['bree'],
    'pippin': places['bree'],
    'merry': places['bree'],
    'frodo': places['bree'],
    'sam': places['bree'],
  },
  560: {
    'nazgul1': places['breeland'],
    'nazgul2': places['breeland'],
    'nazgul3': places['breeland'],
  },
  580: {
    'aragorn': places['weathertop'],
    'pippin': places['weathertop'],
    'merry': places['weathertop'],
    'frodo': places['weathertop'],
    'sam': places['weathertop'],
    'nazgul1': places['bree road'],
    'nazgul2': places['bree road'],
    'nazgul3': places['bree road'],
    'boromir': places['tharbad']
  },
  585: {
    'nazgul1': places['bree road'],
    'nazgul2': places['bree road'],
    'nazgul3': places['bree road'],
    'nazgul4': places['bree road'],
    'nazgul5': places['bree road'],
  },
  590: {
    'nazgul1': places['weathertop'],
    'nazgul2': places['weathertop'],
    'nazgul3': places['weathertop'],
    'nazgul4': places['weathertop'],
    'nazgul5': places['weathertop'],
  },
  595: {
    'Nazgul attack hobbits on dol guldur': {'type': 'battle', 'lon': places['weathertop']['lon'], 'lat': places['weathertop']['lat']},
  },
  620: {
    'nazgul1': places['weathertop'],
    'nazgul2': places['weathertop'],
    'nazgul3': places['weathertop'],
    'nazgul4': places['weathertop'],
    'nazgul5': places['weathertop'],
    'aragorn': places['weathertop'],
    'pippin': places['weathertop'],
    'merry': places['weathertop'],
    'frodo': places['weathertop'],
    'sam': places['weathertop'],
    'arwen': places['rivendell'],
    'Nazgul attack hobbits on dol guldur': {'hidden': True}
  },
  655: {
    'aragorn': places['last bridge'],
    'pippin': places['last bridge'],
    'merry': places['last bridge'],
    'frodo': places['last bridge'],
    'sam': places['last bridge'],
    'arwen': places['last bridge'],
  },
  670: {
    'aragorn': places['last bridge'],
    'pippin': places['last bridge'],
    'merry': places['last bridge'],
    'frodo': places['last bridge'],
    'sam': places['last bridge'],
    'arwen': places['last bridge'],
  },
  673: {
    'nazgul1': places['last bridge'],
    'nazgul2': places['last bridge'],
    'nazgul3': places['last bridge'],
    'nazgul4': places['last bridge'],
    'nazgul5': places['last bridge'],
    'nazgul6': places['last bridge'],
    'nazgul7': places['last bridge'],
    'nazgul8': places['last bridge'],
    'nazgul9': places['last bridge'],
  },
  680: {
    'gandalf': places['isengard']
  },
  690: {
    'nazgul1': places['ford of bruinen'],
    'nazgul2': places['ford of bruinen'],
    'nazgul3': places['ford of bruinen'],
    'nazgul4': places['ford of bruinen'],
    'nazgul5': places['ford of bruinen'],
    'nazgul6': places['ford of bruinen'],
    'nazgul7': places['ford of bruinen'],
    'nazgul8': places['ford of bruinen'],
    'nazgul9': places['ford of bruinen'],
    'frodo': places['ford of bruinen'],
    'arwen': places['ford of bruinen'],
    'arwen faces nazgul': {'type': 'battle', 'lon': places['ford of bruinen']['lon'], 'lat': places['ford of bruinen']['lat']}
  },
  710: {
    'nazgul1': places['ford of bruinen'],
    'nazgul2': places['ford of bruinen'],
    'nazgul3': places['ford of bruinen'],
    'nazgul4': places['ford of bruinen'],
    'nazgul5': places['ford of bruinen'],
    'nazgul6': places['ford of bruinen'],
    'nazgul7': places['ford of bruinen'],
    'nazgul8': places['ford of bruinen'],
    'nazgul9': places['ford of bruinen'],
    'frodo': places['ford of bruinen'],
    'arwen': places['ford of bruinen'],
  },
  715: {
    'arwen faces nazgul': {'hidden': True},
    'nazgul1': {'hidden': True},
    'nazgul2': {'hidden': True},
    'nazgul3': {'hidden': True},
    'nazgul4': {'hidden': True},
    'nazgul5': {'hidden': True},
    'nazgul6': {'hidden': True},
    'nazgul7': {'hidden': True},
    'nazgul8': {'hidden': True},
    'nazgul9': {'hidden': True},
    'aragorn': places['ford of bruinen'],
    'pippin': places['ford of bruinen'],
    'merry': places['ford of bruinen'],
    'sam': places['ford of bruinen'],
    'arwen': places['rivendell'],
    'frodo': places['rivendell'],
    'gandalf': places['rivendell']
  },
  720: {
    'aragorn': places['rivendell'],
    'pippin': places['rivendell'],
    'merry': places['rivendell'],
    'sam': places['rivendell'],
    'boromir': places['last bridge']
  },
  770: {
    'boromir': places['rivendell'],
  },
  775: {
    'gimli': places['rivendell'],
    'legolas': places['rivendell'],
  },
  900: {
    'arwen': places['rivendell']
  },
  910: {
    'arwen': {'hidden': True},
    'aragorn': places['rivendell'],
    'pippin': places['rivendell'],
    'merry': places['rivendell'],
    'sam': places['rivendell'],
    'frodo': places['rivendell'],
    'gandalf': places['rivendell'],
    'legolas': places['rivendell'],
    'boromir': places['rivendell'],
    'gimli': places['rivendell'],
  },
  940: {
    'aragorn': places['rivendell road'],
    'pippin': places['rivendell road'],
    'merry': places['rivendell road'],
    'sam': places['rivendell road'],
    'frodo': places['rivendell road'],
    'gandalf': places['rivendell road'],
    'legolas': places['rivendell road'],
    'boromir': places['rivendell road'],
    'gimli': places['rivendell road'],
  },
  985: {
    'aragorn': places['caradhas'],
    'pippin': places['caradhas'],
    'merry': places['caradhas'],
    'sam': places['caradhas'],
    'frodo': places['caradhas'],
    'gandalf': places['caradhas'],
    'legolas': places['caradhas'],
    'boromir': places['caradhas'],
    'gimli': places['caradhas'],
  },
  1020: {
    'aragorn': places['moria gate'],
    'pippin': places['moria gate'],
    'merry': places['moria gate'],
    'sam': places['moria gate'],
    'frodo': places['moria gate'],
    'gandalf': places['moria gate'],
    'legolas': places['moria gate'],
    'boromir': places['moria gate'],
    'gimli': places['moria gate'],
  },
  1045: {
    'aragorn': places['moria'],
    'pippin': places['moria'],
    'merry': places['moria'],
    'sam': places['moria'],
    'frodo': places['moria'],
    'gandalf': places['moria'],
    'legolas': places['moria'],
    'boromir': places['moria'],
    'gimli': places['moria'],
  },
  1110: {
    'moria orcs attack the fellowship': {'type': 'battle', 'lon': places['moria']['lon'], 'lat': places['moria']['lat']}
  },
  1170: {
    'balrog': places['moria']
  },
  1175: {
    'moria orcs attack the fellowship': {'hidden': True}
  },
  1220: {
    'balrog fights gandalf': {'type': 'battle', 'lon': places['khazad-dum']['lon'], 'lat': places['khazad-dum']['lat']}
  },
  1225: {
    'aragorn': places['khazad-dum'],
    'pippin': places['khazad-dum'],
    'merry': places['khazad-dum'],
    'sam': places['khazad-dum'],
    'frodo': places['khazad-dum'],
    'gandalf': places['khazad-dum'],
    'legolas': places['khazad-dum'],
    'boromir': places['khazad-dum'],
    'gimli': places['khazad-dum'],
    'balrog': places['khazad-dum']
  },
  1240: {
    'aragorn': places['khazad-dum'],
    'pippin': places['khazad-dum'],
    'merry': places['khazad-dum'],
    'sam': places['khazad-dum'],
    'frodo': places['khazad-dum'],
    'gandalf': places['khazad-dum'],
    'legolas': places['khazad-dum'],
    'boromir': places['khazad-dum'],
    'gimli': places['khazad-dum'],
    'balrog': places['khazad-dum'],
    'balrog fights gandalf': {'hidden': True}
  },
  1280: {
    'galadriel': places['lorien'],
    'aragorn': places['lorien'],
    'pippin': places['lorien'],
    'merry': places['lorien'],
    'sam': places['lorien'],
    'frodo': places['lorien'],
    'legolas': places['lorien'],
    'boromir': places['lorien'],
    'gimli': places['lorien'],
    'gandalf': places['khazad-dum'],
    'balrog': places['khazad-dum']
  },
  1380: {
    'white hand army': {'type': 'army', 'lon': places['isengard']['lon'], 'lat': places['isengard']['lat']}
  },
  1390: {
    'galadriel': places['lorien'],
    'aragorn': places['lorien'],
    'pippin': places['lorien'],
    'merry': places['lorien'],
    'sam': places['lorien'],
    'frodo': places['lorien'],
    'legolas': places['lorien'],
    'boromir': places['lorien'],
    'gimli': places['lorien'],
    'gandalf': places['khazad-dum'],
    'balrog': places['khazad-dum']
  },
  1430: {
    'aragorn': places['nen hithoel'],
    'pippin': places['nen hithoel'],
    'merry': places['nen hithoel'],
    'sam': places['nen hithoel'],
    'frodo': places['nen hithoel'],
    'legolas': places['nen hithoel'],
    'boromir': places['nen hithoel'],
    'gimli': places['nen hithoel'],
  },
  1480: {
    'aragorn': places['nen hithoel'],
    'pippin': places['nen hithoel'],
    'merry': places['nen hithoel'],
    'sam': places['nen hithoel'],
    'frodo': places['nen hithoel'],
    'legolas': places['nen hithoel'],
    'boromir': places['nen hithoel'],
    'gimli': places['nen hithoel'],
    'white hand army': places['nen hithoel']
  },
  1490: {
    'white hand orcs attack the fellowship': {'type': 'battle', 'lat': places['nen hithoel']['lat'], 'lon': places['nen hithoel']['lon']}
  },
  1540: {
    'boromir': places['nen hithoel'],
    'pippin': places['nen hithoel'],
    'merry': places['nen hithoel'],
    'legolas': places['nen hithoel'],
    'gimli': places['nen hithoel'],
    'aragorn': places['nen hithoel'],
    'white hand army': places['nen hithoel']
  },
  1570: {
    'boromir': places['nen hithoel'],
    'legolas': places['nen hithoel'],
    'gimli': places['nen hithoel'],
    'aragorn': places['nen hithoel'],
  },
  1575: {
    'boromir': {'hidden': True}
  },
  1600: {
    'sam': places['nen hithoel'],
    'frodo': places['nen hithoel'],
  },
  1625: {
    'boromir': places['nen hithoel'],
    'legolas': places['nen hithoel'],
    'gimli': places['nen hithoel'],
  },
  1900: {
    'aragorn': places['isengard'],
    'legolas': places['isengard'],
    'gimli': places['isengard'],
    'sam': places['barad-dur'],
    'frodo': places['barad-dur'],
    'elrond': places['rivendell'],
    'arwen': places['rivendell'],
    'bilbo': places['rivendell'],
    'galadriel': places['lorien'],
    'aragorn': places['rivendell'],
    'pippin': places['isengard'],
    'merry': places['isengard'],
    'gandalf': places['lorien'],
    'balrog': places['moria'],
    'boromir': places['minas tirith'],
    'white hand army': places['isengard']
  }
}
options['roundsShort'] = {
  1: {
    'elrond': places['rivendell'],
    'sauron': places['barad-dur'],
    'galadriel': places['lorien'],
    'frodo': places['hobbiton'],
    'merry': places['tuckburrow'],
    'sam': places['hobbiton'],
    'pippin': places['tuckburrow'],
    'gandalf': places['hobbiton'],
    'arangorn': places['bree'],
    'legolas': places['thranduils palace'],
    'gimli': places['erebor'],
    'boromir': places['minas tirith'],
    'nazgul1': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul2': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul3': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul4': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul5': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'nazgul6': {'hidden': True, 'lon': -115.3125, 'lat': -57.73935},
    'arwen': {'hidden': True, 'lon': -89.208983, 'lat': -54.927142},
    'saruman': {'hidden': True, 'lon': -89.824218, 'lat': -71.059798},
    'balrog': {'hidden': True, 'lon': -84.990233, 'lat': -62.144976},
    'white hand uruk hais': {'type': 'army', 'hidden': True, 'lon': -89.824218, 'lat': -71.059798},
    'saruman fighting gandalf': {'hidden': True, 'lon': -89.824218, 'lat': -71.059798, 'type': 'battle'},
    'nazgul chases hobbits': {'hidden': True, 'lon': -89.824218, 'lat': -71.059798, 'type': 'battle'},
    'nazgul attacks hobbits': {'hidden': True, 'lon': -106.918944, 'lat': -55.40407, 'type': 'battle'},
    'weathertop squirmish': {'hidden': True, 'lon': -100.722655, 'lat': -54.41893, 'type': 'battle'},
    'ford of bruinen squirmish': {'hidden': True, 'lon': -90.878906, 'lat': -55.329144, 'type': 'battle'},
    'moria battle': {'hidden': True, 'lon': -84.990233, 'lat': -62.144976, 'type': 'battle'},
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
  32: {
    'nazgul chases hobbits': {'hidden': True}
  },
  33: {
    'nazgul chases hobbits': {'hidden': False},
    'saruman': {'hidden': True},
  },
  35: {
    'saruman': {'hidden': False},
    'frodo': places['shire road'],
    'merry': places['shire road'],
    'sam': places['shire road'],
    'pippin': places['shire road'],
    'nazgul1': places['shire road'],
    'nazgul2': places['hobbiton'],
    'nazgul3': places['tuckburrow'],
    'gimli': places['old forest road end'],
  },
  39: {
    'nazgul chases hobbits': {'hidden': False}
  },
  40: {
    'nazgul chases hobbits': {'hidden': True}
  },
  50: {
    'frodo': places['tom bombadil'],
    'merry': places['tom bombadil'],
    'sam': places['tom bombadil'],
    'pippin': places['tom bombadil'],
  },
  59: {
    'saruman fighting gandalf': {'hidden': True},
  },
  60: {
    'saruman fighting gandalf': {'hidden': False},
    'gandalf': places['isengard'],
    'boromir': places['edoras'],
  },
  74: {
    'saruman fighting gandalf': {'hidden': False},
    'nazgul attacks hobbits': {'hidden': True},
  },
  75: {
    'frodo': places['bree'],
    'merry': places['bree'],
    'sam': places['bree'],
    'pippin': places['bree'],
    'arangorn': places['bree'],
    'legolas': places['old forest road end'],
    'boromir': places['hornburg'],
    'saruman fighting gandalf': {'hidden': True},
    'nazgul attacks hobbits': {'hidden': False},
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
  84: {
    'nazgul attacks hobbits': {'hidden': False},
  },
  85: {
    'nazgul attacks hobbits': {'hidden': True},
    'nazgul1': places['breeland'],
    'nazgul2': places['breeland'],
    'nazgul3': places['breeland'],
    'boromir': places['tharbad'],
  },
  93: {
    'nazgul4': {'hidden': True},
    'nazgul5': {'hidden': True},
    'nazgul6': {'hidden': True},
  },
  94: {
    'nazgul4': {'hidden': False},
    'nazgul5': {'hidden': False},
    'nazgul6': {'hidden': False},
  },
  95: {
    'nazgul1': places['bree'],
    'nazgul2': places['bree'],
    'nazgul3': places['bree'],
    'nazgul4': places['breeland'],
    'nazgul5': places['tharbad'],
    'nazgul6': places['breeland'],
    'arwen': {'hidden': True},
  },
  99: {
    'arwen': {'hidden': False},
  },
  100: {
    'arwen': places['rivendell'],
  },
  119: {
    'weathertop squirmish': {'hidden': True},
  },
  120: {
    'weathertop squirmish': {'hidden': False},
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
    'nazgul4': places['weathertop'],
    'nazgul5': places['weathertop'],
    'nazgul6': places['weathertop'],
  },
  129: {
    'weathertop squirmish': {'hidden': False},
  },
  130: {
    'weathertop squirmish': {'hidden': True},
  },
  140: {
    'frodo': places['last bridge'],
    'merry': places['last bridge'],
    'sam': places['last bridge'],
    'arwen': places['last bridge'],
    'pippin': places['last bridge'],
    'arangorn': places['last bridge'],
    'legolas': places['rivendell'],
  },
  141: {
    'nazgul1': places['last bridge'],
    'nazgul2': places['last bridge'],
    'nazgul3': places['last bridge'],
    'nazgul4': places['last bridge'],
    'nazgul5': places['last bridge'],
    'nazgul6': places['last bridge'],
  },
  149: {
    'ford of bruinen squirmish': {'hidden': True},
  },
  150: {
    'ford of bruinen squirmish': {'hidden': False},
    'frodo': places['ford of bruinen'],
    'arwen': places['ford of bruinen'],
  },
  151: {
    'nazgul1': places['ford of bruinen'],
    'nazgul2': places['ford of bruinen'],
    'nazgul3': places['ford of bruinen'],
    'nazgul4': places['ford of bruinen'],
    'nazgul5': places['ford of bruinen'],
    'nazgul6': places['ford of bruinen'],
  },
  159: {
    'ford of bruinen squirmish': {'hidden': False},
    'nazgul1': {'hidden': False},
    'nazgul2': {'hidden': False},
    'nazgul3': {'hidden': False},
    'nazgul4': {'hidden': False},
    'nazgul5': {'hidden': False},
    'nazgul6': {'hidden': False},
  },
  160: {
    'frodo': places['ford of bruinen'],
    'arwen': places['ford of bruinen'],
    'nazgul1': {'hidden': True},
    'nazgul2': {'hidden': True},
    'nazgul3': {'hidden': True},
    'nazgul4': {'hidden': True},
    'nazgul5': {'hidden': True},
    'nazgul6': {'hidden': True},
    'ford of bruinen squirmish': {'hidden': True},
  },
  165: {
    'merry': places['ford of bruinen'],
    'sam': places['ford of bruinen'],
    'pippin': places['ford of bruinen'],
    'arangorn': places['ford of bruinen'],
  },
  170: {
    'frodo': places['rivendell'],
    'merry': places['rivendell'],
    'sam': places['rivendell'],
    'pippin': places['rivendell'],
  },
  180: {
    'gandalf': places['isengard'],
    'gimli': places['rivendell'],
  },
  200: {
    'boromir': places['rivendell'],
  },
  210: {
    'frodo': places['rivendell'],
    'merry': places['rivendell'],
    'sam': places['rivendell'],
    'pippin': places['rivendell'],
    'gandalf': places['rivendell'],
    'arangorn': places['rivendell'],
    'gimli': places['rivendell'],
    'boromir': places['rivendell'],
    'legolas': places['rivendell'],
  },
  220: {
    'frodo': places['rivendell'],
    'merry': places['rivendell'],
    'sam': places['rivendell'],
    'pippin': places['rivendell'],
    'gandalf': places['rivendell'],
    'arangorn': places['rivendell'],
    'gimli': places['rivendell'],
    'boromir': places['rivendell'],
    'legolas': places['rivendell'],
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
  269: {
    'balrog': {'hidden': True},
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
    'balrog': {'hidden': False},
    'moria battle': {'hidden': True},
  },
  280: {
    'moria battle': {'hidden': False},
    'white hand uruk hais': {'hidden': True},
  },
  290: {
    'frodo': places['khazad-dum'],
    'merry': places['khazad-dum'],
    'sam': places['khazad-dum'],
    'pippin': places['khazad-dum'],
    'gandalf': places['khazad-dum'],
    'arangorn': places['khazad-dum'],
    'gimli': places['khazad-dum'],
    'boromir': places['khazad-dum'],
    'legolas': places['khazad-dum'],
    'white hand uruk hais': {'hidden': False},
  },
  329: {
    'moria battle': {'hidden': False},
  },
  330: {
    'frodo': places['lorien'],
    'merry': places['lorien'],
    'sam': places['lorien'],
    'pippin': places['lorien'],
    'gandalf': places['khazad-dum'],
    'arangorn': places['lorien'],
    'gimli': places['lorien'],
    'boromir': places['lorien'],
    'legolas': places['lorien'],
    'balrog': {'hidden': True},
    'moria battle': {'hidden': True},
  },
  340: {
    'white hand uruk hais': places['lorien'],
  }
}
options['last_round'] = 350

