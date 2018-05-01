/**
 * Promise for checkbox overlay example.
 * Created by TF 01/05/18
 * Will need massive improvements
 * 
 */
var urls = [
    'data/air-quality-test.geojson',
    'data/flooding_data.geojson',
]
var data;
var geoJSONLayer = L.geoJSON();

L.featureGroup([urls[0], urls[1], polyline])
    .bindPopup('Hello world!')
    .on('click', function() { alert('Clicked on a member of the group!'); })
    .addTo(map);

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
        geoJSONLayer = L.geoJSON(data).addTo(map);
    }).catch(
        (rejection) => {
            console.log(rejection);
        }
    )
}

//grab the checkboxes by the leaflet-checkbox class
var checkBoxes = document.getElementsByClassName('leaflet-checkbox');



for (var i = 0; i < checkBoxes.length; i++) {
    let checkBox = checkBoxes[i].firstElementChild;
    let index = i;

    console.log('this is a: ', i)
    console.log(checkBox);
    checkBox.addEventListener('change', function(e) {
       if (this.checked) {
           //this isn't working
           console.log(urls);
           geoJSONLeafletPromise(urls[index]);
       }
       else {
           console.log('not checked')
           map.removeLayer(geoJSONLayer);
       }
    })
}