/**
 * Promise for checkbox overlay example.
 * Created by TF 01/05/18
 * Will need massive improvements
 * 
 */

var urlFolder = 'data/';
var urls = [
    'Older people social work team offices.geojson',
    'Older people social work team areas.geojson',
    'Lets talk hubs gp.geojson',
    'Lets talk hubs wcc.geojson',
    'Proposed place based teams gp surgeries coventry rugby ccg option 1.geojson',
    'Proposed place based teams gp surgeries coventry rugby ccg option 2.geojson',
    'Proposed place based teams gp surgeries north warwickshire ccg option 1.geojson',
    'Proposed place based teams gp surgeries south warwickshire ccg option 1.geojson',
    'Proposed place based teams gp surgeries south warwickshire ccg option 2.geojson',
    'Proposed place based teams gp surgeries south warwickshire ccg option 3.geojson'
]

//instead of an array of urls, instead let's try passing in an array of objects,
//loaded with data. This might deal with it slightly better. This will then make it easier to write one
// time geoJSONLeafletPromise so really reusuable!
var urls = [
    {
        url : 'Older people social work team offices.geojson',
        color : 'red',
        class : 'red'
    },
    {
        url : 'Older people social work team areas.geojson',
        color : 'rebeccapurple',
    }
]
var geoJSONLayer = L.geoJSON();

function geoJSONLeafletPromise(urlFolder, url) {
    let geoJSONPromise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', (urlFolder + url.url));
        xhr.responseType = 'json';
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
    geoJSONPromise.then(success => {
        // This now adds data to the layer itself creating one layer.
        geoJSONLayer.addData(success) 
        .setStyle(
            {
                fillColor : url.color,
                color : url.color,
                className : url.class,
            }
        )
        .eachLayer(function (layer) {
            if (layer.feature.geometry.type === 'Point') {
                console.log('its point data', layer);
                console.log('layer options', layer.options._icon);
                // console.log(document.getAttribute('title'))

            }
        })
        geoJSONLayer.addData(success);
        geoJSONLayer.addTo(map);
    }).catch(
        (rejection) => {
            console.log(rejection);
        }
    )
}


//grab the checkboxes by the div leaflet-checkbox class
var checkBoxes = document.getElementsByClassName('leaflet-checkbox');

var checkBoxContainer = document.getElementById('checkbox-container');
checkBoxContainer.addEventListener('change', function(e) {
    for (var i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i].firstElementChild;
        if (checkBox.checked) {
            geoJSONLeafletPromise(urlFolder, urls[i]);
            
        }
        else {
            geoJSONLayer.clearLayers();
        }
    }
})

var deleteLayers = document.getElementById('leaflet-clear-button');
deleteLayers.addEventListener('click', function(e) {
    geoJSONLayer.clearLayers(); // works with addData(data)
    for (var i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i].firstElementChild.checked = false;
    }
});

/**
 * This could actually be extended to include all check boxes in that specific structure.
 */
function loadCheckBoxes(checkBoxes) {
    for(var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].children[1].textContent = urls[i].url.replace('.geojson', '');
    }
}

document.addEventListener('DOMContentLoaded', loadCheckBoxes(checkBoxes), true);

/**
 * We want to load all files as a promise. However we don't want to call the files again.
 * So there it should only be returned once.
 * 
 * Then we want to move that file and it's loaded objects so that we only remove the ones related
 * to the index in getLayers
 * There by only removing the objects that are not needed.
 * 
 * It's all about calling the promise once.
 */

