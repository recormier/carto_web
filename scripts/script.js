let userProposition =""
console.log(userProposition)
let proposition = "France"
let correspondance = ''
let score=0
let i=0
let nb_round=5


function afficherProposition(element) {
	let zoneProposition = document.getElementById("zoneProposition")
	proposition=element
	zoneProposition.innerText = proposition
	}

function genererProposition(listeValues) {
	let indexAleatoire = Math.floor(Math.random() * listeValues.length); // Génère un index aléatoire
    let element = listeValues[indexAleatoire];
	afficherProposition(element)
}

function lancerJeu() {
            //let zoom=function(){
            //    map.fitBounds(LayerDepartement.getBounds())
            //}
            
//Initialisation de la carte
let webmap = initMap()
let map = webmap.webmap
let LayerCountry = webmap.layer1
let valeurs = webmap.listValues


//Gestion des événements sur les entités
                let SurChaqueEntite=function(feature,layer){
					
					layer.on('mouseover',function(){
                        this.setStyle(styleCountrySurPassage());
                    });
                    layer.on('mouseout',function(){
                        this.setStyle(styleCountryInit());
                    });
					
					
					// Ajouter un événement click
					layer.on('click', function() {
						// Attribuer une valeur à une variable
						userProposition = feature.properties.french_short; // Exemple d'attribution
						if (userProposition === proposition) {
							correspondance = 'Bravo';
							score++
							} else {
							correspondance = 'Faux'
							}
						i++
						console.log(score)
						genererProposition(valeurs)
						
					if (i>=nb_round ||  valeurs[i] === undefined) {afficherProposition('le jeu est fini')}
					});
				};
				
// Ajouter onEachFeature dynamiquement
LayerCountry.eachLayer(function(layer) {
    if (layer.feature) { // Vérifier que la couche a une propriété 'feature'
        SurChaqueEntite(layer.feature, layer);
    }
});

//DEFINITION DES COUCHES

    
			
	genererProposition(valeurs)
	console.log("Élément aléatoire :", proposition);
	
    //ajustement du zoom de la carte sur les couches
            map.fitBounds(LayerCountry.getBounds())
}