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
        data = success;
        // This now adds data to the layer itself creating one layer.
        geoJSONLayer.addData(data).addTo(map);
        // geoJSONLayer.addData(data);
        // geoJSONLayer = L.geoJSON(data).addTo(map);
        console.log(geoJSONLayer);
        console.log(L.stamp(data));
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

// number in arrays will tell me the length, 
var positionInLayer = [];


for (var i = 0; i < checkBoxes.length; i++) {
    let checkBox = checkBoxes[i].firstElementChild;
    let index = i;
    checkBox.addEventListener('change', function(e) {
        if (this.checked){
            if (checkBoxBools[index] === false) {   
                //this isn't working
                checkBoxBools[index] = true;
                geoJSONLeafletPromise(urls[index]);
                positionInLayer.push(geoJSONLayer.getLayers());
            }
            if (!positionInLayer[index + 1]) {
                positionInLayer[index] = geoJSONLayer.getLayers().length;
            }
            // This isn't working.
            
            console.log('getLayers: ', geoJSONLayer.getLayers());
            console.log('positionInLayer', positionInLayer);
            }
        else {
            console.log('not checked')
            map.removeLayer(geoJSONLayer);

        }
    })
}

var checkBoxContainer = document.getElementById('checkbox-container');
checkBoxContainer.addEventListener('change', function(e) {
    var length = 0;
    // for (var i = 0; i < checkBoxes.length; i++) {
    //     let checkBox = checkBoxes[i].firstElementChild;
    //     let index = i;
        
    //     if (checkBox.checked) {
    //         geoJSONLeafletPromise(urls[index]);
    //     }
    //     else {
    //         map.removeLayer(geoJSONLayer);
    //     }
    // }
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

