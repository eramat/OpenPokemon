/**
 * Created by Nathan on 14/06/2016.
 */

function change_onglet(name) {
    
    document.getElementById('onglet_'+anc_onglet).className = 'onglet_0 onglet';
    document.getElementById('onglet_'+name).className = 'onglet_1 onglet';
    document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
    document.getElementById('contenu_onglet_'+name).style.display = 'block';
    anc_onglet = name;
}

var anc_onglet = 'Tous';
change_onglet(anc_onglet);