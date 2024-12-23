function initMap(){

//Initialisation de la carte
            let map= L.map('map',{
                            center: [48.8739,6.20093],
                            zoom :7
                        });
//Chargement de la couche OSM
            baseLayers.osm.addTo(map);
            
            
//Ajout controle
            L.control.scale().addTo(map);               // contrôle d'échelle
            L.control.layers(baseLayers).addTo(map);    // contrôle de couche

//DEFINITION DES COUCHES
            
    //Définition de la couche Country
    let LayerCountry=L.geoJSON(country,{
        style:styleCountryInit,
        });
    LayerCountry.addTo(map);
	
	let valeurs = [];
	LayerCountry.eachLayer(function(LayerCountry) {
		if (LayerCountry.feature && LayerCountry.feature.properties) {
			valeurs.push(LayerCountry.feature.properties.french_short); // Remplacez 'nom_attribut' par le nom de votre attribut
		}
	});
	
	return {
		webmap : map,
		layer1 : LayerCountry,
	listValues : valeurs}
}