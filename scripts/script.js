
function afficherProposition(element) {
	let zoneProposition = document.getElementById("zoneProposition")
	zoneProposition.innerText = element
	}

function genererProposition(listeValues) {
	let indexAleatoire = Math.floor(Math.random() * listeValues.length); // Génère un index aléatoire
    let element = listeValues[indexAleatoire];
	afficherProposition(element)
	return element
}

function afficherResultat(score, nbPropositions) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbPropositions}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}


// Fonction pour afficher une div temporairement
function afficherDivTemporaire(contenu, color) {
    // Sélectionner ou créer la div
    let divTemporaire = document.getElementById("info-div");
    if (!divTemporaire) {
        divTemporaire = document.createElement("div");
        divTemporaire.id = "info-div";
        divTemporaire.style.position = "absolute";
        divTemporaire.style.bottom = "10px";
        divTemporaire.style.left = "50%";
		divTemporaire.style.transform = "translate(-50%, 0)";
        divTemporaire.style.padding = "10px";
        divTemporaire.style.color = "white";
        divTemporaire.style.borderRadius = "5px";
        divTemporaire.style.zIndex = "1000";
        // Ajouter la div temporaire à l'intérieur de la div parent (carte)
        const parentDiv = document.getElementById("map"); // ID de votre conteneur carte
        parentDiv.appendChild(divTemporaire);
    }

    // Modifier le contenu de la div
    divTemporaire.innerHTML = "<b>Guess :</b> " + contenu;
	divTemporaire.style.backgroundColor = color;
    // Afficher la div
    divTemporaire.style.display = "block";

    // Masquer la div après 5 secondes
    setTimeout(function () {
        divTemporaire.style.display = "none";
    }, 5000);
}

// Gestion de l'événement change sur les boutons radios. 
let listeBtnRadio = document.querySelectorAll(".optionSource input")
let layerToLoad = ''
if (listeBtnRadio[0].checked === true){
	console.log("eee")
	console.log(listeBtnRadio[0].value)
	layerToLoad = country
} else {
	layerToLoad = cacp_communes
}
for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
        // Si c'est le premier élément qui a été modifié, alors nous voulons
        // jouer avec la listeMots. 
        if (event.target.value === "1") {
            layerToLoad = country
			lancerJeu(layerToLoad)
        } else {
            // Sinon nous voulons jouer avec la liste des phrases
            layerToLoad = cacp_communes
			lancerJeu(layerToLoad)
        }
    })
}


function lancerJeu(layerToLoad) {
initAddEventListenerPopup()

let userProposition =""
console.log(userProposition)

let correspondance = ''
let score=0
let i=0
let nb_round=5
afficherResultat('-', '-')
            
//Initialisation de la carte
let webmap = initMap(layerToLoad)
let map = webmap.webmap
let LayerCountry = webmap.layer1
let valeurs = webmap.listValues
let proposition = genererProposition(valeurs)
console.log("Élément aléatoire :", proposition);




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
		if (i>=nb_round ||  valeurs[i] === undefined) {
			afficherProposition('le jeu est fini');
			// Gérer l'affichage de la div lors d'un clic
			afficherDivTemporaire(feature.properties.name, "#555555");
			}
		else {
									// Attribuer une valeur à une variable
		userProposition = feature.properties.name; // Exemple d'attribution
		if (userProposition === proposition) {
			correspondance = 'Bravo';
			score++
			// Gérer l'affichage de la div lors d'un clic
			afficherDivTemporaire(feature.properties.name, "#00FF00");
			} else {
			correspondance = 'Faux'
			// Gérer l'affichage de la div lors d'un clic
			afficherDivTemporaire(feature.properties.name, "#FF0000");
			}
		console.log(correspondance)
		i++
		proposition = genererProposition(valeurs)
		if (i>=nb_round ||  valeurs[i] === undefined) {
			afficherProposition('le jeu est fini');
			afficherPopup()
			}
		afficherResultat(score, i)
		}
		}
		);
	};
					
	// Ajouter onEachFeature dynamiquement
	LayerCountry.eachLayer(function(layer) {
		if (layer.feature) { // Vérifier que la couche a une propriété 'feature'
			SurChaqueEntite(layer.feature, layer);
		}
	});

    //ajustement du zoom de la carte sur les couches
            map.fitBounds(LayerCountry.getBounds())
}

let btnRecommencer = document.querySelectorAll(".btnRecommencer")
// Gestion de l'événement click sur les boutons "recommencer"
btnRecommencer.forEach(btn => {
	btn.addEventListener("click", () => {
        lancerJeu(layerToLoad)
		cacherPopup()
    })
});


