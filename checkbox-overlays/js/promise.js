/**
 * Promise for checkbox overlay example.
 * Created by TF 01/05/18
 * Will need massive improvements
 * 
 */
var urls = [
    // 'data/air-quality-test.geojson',
    // 'data/flooding_data.geojson',
    'data/Older people social work team offices.geojson',
    'data/Older people social work team areas.geojson',
    'data/Lets talk hubs gp.geojson',
    'data/Lets talk hubs wcc.geojson',
    'data/Proposed place based teams gp surgeries coventry rugby ccg option 1.geojson',
    'data/Proposed place based teams gp surgeries coventry rugby ccg option 2.geojson',
    'data/Proposed place based teams gp surgeries north warwickshire ccg option 1.geojson',
    'data/Proposed place based teams gp surgeries south warwickshire ccg option 1.geojson',
    'data/Proposed place based teams gp surgeries south warwickshire ccg option 2.geojson',
    'data/Proposed place based teams gp surgeries south warwickshire ccg option 3.geojson'
]
var data;
var geoJSONLayer = L.geoJSON();

function geoJSONLeafletPromise(url) {
    let geoJSONPromise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });

    geoJSONPromise.then(success => {
        console.log('Checkbox promise worked?' + success);
        var data = success;
        // This now adds data to the layer itself creating one layer.
        geoJSONLayer.addData(data).addTo(map);
        // geoJSONLayers = L.geoJSON(data).addTo(map);
    }).catch(
        (rejection) => {
            console.log(rejection);
        }
    )
}

//grab the checkboxes by the leaflet-checkbox class
var checkBoxes = document.getElementsByClassName('leaflet-checkbox');

//array of bools which will be the length of the urls.
// this will need changing later.
var checkBoxBools = [];
for (var i = 0; i < urls.length; i++) {
    checkBoxBools.push(false);
}

function tester(checkBox, i) {
    var geoJSONLayer = L.geoJSON()
    checkBox.addEventListener('change', function(e) {
        console.log(i);
        if (this.checked) {
            if (checkBoxBools[i] === false) {
                checkBoxBools[i] = true;
                geoJSONLeafletPromise(urls[i]);
            }
            geoJSONLayer.addTo(map);
        }
        else {
            geoJSONLayer.remove();
            geoJSONLayer.clearLayers();
            map.removeLayer(geoJSONLayer);

        }
    })
}

var checkBoxContainer = document.getElementById('checkbox-container');
checkBoxContainer.addEventListener('change', function(e) {
    for (var i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i].firstElementChild;
        if (checkBox.checked) {
            geoJSONLeafletPromise(urls[i]);
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
 * We want to load all files as a promise. However we don't want to call the files again.
 * So there it should only be returned once.
 * 
 * Then we want to move that file and it's loaded objects so that we only remove the ones related
 * to the index in getLayers
 * There by only removing the objects that are not needed.
 * 
 * It's all about calling the promise once.
 */

