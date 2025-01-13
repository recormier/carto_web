let currentMap = null; // Variable globale pour stocker la référence à la carte

function initMap(layerGeojson){
    // Vérifier si une carte existe déjà
    if (currentMap) {
        currentMap.off(); // Supprime les écouteurs d'événements de la carte existante
        currentMap.remove(); // Supprime la carte existante de la page
        currentMap = null; // Réinitialise la référence
    }
//Initialisation de la carte
            let map= L.map('map',{
                            center: [48.8739,6.20093],
                            zoom :7
                        });
//Chargement de la couche OSM
            baseLayers["CartoDB Voyager"].addTo(map);
            
            
//Ajout controle
            L.control.scale().addTo(map);               // contrôle d'échelle
            L.control.layers(baseLayers).addTo(map);    // contrôle de couche

//DEFINITION DES COUCHES
            
    //Définition de la couche Geojson
    let LayerCountry=L.geoJSON(layerGeojson,{
        style:styleCountryInit,
        });
    LayerCountry.addTo(map);
	
	let valeurs = [];
	LayerCountry.eachLayer(function(LayerCountry) {
		if (LayerCountry.feature && LayerCountry.feature.properties) {
			valeurs.push(LayerCountry.feature.properties.name); // Remplacez 'nom_attribut' par le nom de votre attribut
		}
	});
	
    // Mettre à jour la carte actuelle
    currentMap = map;
	
	//ajustement du zoom de la carte sur les couches
    map.fitBounds(LayerCountry.getBounds())
	
	return {
		webmap : map,
		layer1 : LayerCountry,
	listValues : valeurs}
}