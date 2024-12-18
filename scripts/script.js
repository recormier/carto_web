function genererCarte() {
            var zoom=function(){
                map.fitBounds(LayerDepartement.getBounds())
            }
            
//Initialisation de la carte
            var map= L.map('map',{
                            center: [48.8739,6.20093],
                            zoom :7
                        });

            
            var baseLayers={
                    osm:L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
                    osmfr:L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'),
                    ocsge:L.tileLayer.wms('https://www.geograndest.fr/geoserver/geograndest/wms',                                                               {layers:'geograndest:ocsge2_d54_2019'}),
                    OpenTopoMap:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
                    EsriWorldImagery:L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
                    };

//Chargement de la couche OSM
            baseLayers.osm.addTo(map);
            
            
//Ajout controle
            L.control.scale().addTo(map);               // contrôle d'échelle
            L.control.layers(baseLayers).addTo(map);    // contrôle de couche


//Gestion des événements sur les Country
                var SurChaqueCountry=function(feature,layer){
                    layer.bindPopup("<img class='logos' alt='logo' width=50 src=img/"+ 
                                    nom_logo_defaut             //feature.properties.CODE_SIREN
                                    +".png/>"+"<span class=lien>"+(feature.properties.french_short).link(site+feature.properties.french_short)+"</span>",optionsPopup);
                         
                    layer.on('mouseover',function(){
                        this.setStyle(styleCountrySurPassage());
                    });
                     layer.on('mouseout',function(){
                        this.setStyle(styleCountryInit());
                    });
                }
                
                
                var site='https://fr.wikipedia.org/wiki/'
                var optionsPopup =
                    {
                    'className' : 'custom'
                    }
                var nom_logo_defaut = 'grand_est'

//DEFINITION DES COUCHES
            
    //Définition de la couche Country
            var LayerCountry=L.geoJSON(country,{
                style:styleCountryInit,
                onEachFeature:SurChaqueCountry,
                });
            LayerCountry.addTo(map);

    //ajustement du zoom de la carte sur les couches
            map.fitBounds(LayerCountry.getBounds())
}