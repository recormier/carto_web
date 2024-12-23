// liste de fonds de carte
let baseLayers={
        osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
        osmfr:L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'),
        ocsge:L.tileLayer.wms('https://www.geograndest.fr/geoserver/geograndest/wms',                                                               {layers:'geograndest:ocsge2_d54_2019'}),
        OpenTopoMap:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
        EsriWorldImagery:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
        };