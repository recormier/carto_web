// liste de fonds de carte
let baseLayers={
        "CartoDB Voyager":L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'),
        "CartoDB Positron" :L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'),
		"CartoDB DarkMatter" :L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'),
        EsriWorldImagery:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
		osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
        };
