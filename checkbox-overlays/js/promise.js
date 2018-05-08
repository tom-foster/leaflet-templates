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
    },
    {
        url : 'Older people social work team areas.geojson',
    },
    {
        url : 'Lets talk hubs gp.geojson',
        color : 'blue'
    },
    {
        url : 'Lets talk hubs wcc.geojson',
        // color : 'hotpink',
    },
    {
        url : 'Proposed place based teams gp surgeries coventry rugby ccg option 1.geojson',
    },
    {
        url : 'Proposed place based teams gp surgeries coventry rugby ccg option 2.geojson',
    },
    {
        url : 'Proposed place based teams gp surgeries north warwickshire ccg option 1.geojson',
    },
    {
        url : 'Proposed place based teams gp surgeries south warwickshire ccg option 1.geojson',
    },
    {
        url : 'Proposed place based teams gp surgeries south warwickshire ccg option 2.geojson',
    },
    {
        url : 'Proposed place based teams gp surgeries south warwickshire ccg option 3.geojson',
    }


]
var geoJSONLayer = L.geoJSON(false, {
    style : function(feature) {
        console.log(feature)
        if (feature.geometry.type == 'Polygon') {
            return {
                fillOpacity : 0.01
            }
        }
        switch (feature.properties.Type) {
            case 'Placed based team option 1' : 
                switch (feature.properties['Place Based Team Option 1']) {
                    case '1':
                        return {
                            fillColor: 'red',
                            fillOpacity: 0.2,
                        }
                    case '2':
                        return {
                            fillColor: 'blue',
                            fillOpacity: 0.2
                        }
                    case '3':
                        return {
                            fillColor: 'green',
                            fillOpacity: 0.2
                        }
                    case '4':
                        return {
                            fillColor: 'purple',
                            fillOpacity: 0.2
                        }
                    case '5':
                        return {
                            fillColor: 'orange',
                            fillOpacity: 0.2
                        }
                    case '6':
                        return {
                            fillColor: 'magenta',
                            fillOpacity: 0.2
                        }
                    case '7':
                        return {
                            fillColor: 'teal',
                            fillOpacity: 0.2
                        }
                    case '8':
                        return {
                            fillColor: 'maroon',
                            fillOpacity: 0.2
                        }
                    case '9':
                        return {
                            fillColor: 'navy',
                            fillOpacity: 0.2
                        }
                    default:
                        return {
                            radius: 100
                        }
                }   
            
            case 'Placed based team option 2' :
                switch (feature.properties['Place Based Team Option 2']) {
                    case '1':
                        return {
                            fillColor: 'red',
                            fillOpacity: 0.2,
                        }
                    case '2':
                        return {
                            fillColor: 'blue',
                            fillOpacity: 0.2
                        }
                    case '3':
                        return {
                            fillColor: 'green',
                            fillOpacity: 0.2
                        }
                    case '4':
                        return {
                            fillColor: 'purple',
                            fillOpacity: 0.2
                        }
                    case '5':
                        return {
                            fillColor: 'orange',
                            fillOpacity: 0.2
                        }
                    case '6':
                        return {
                            fillColor: 'magenta',
                            fillOpacity: 0.2
                        }
                    case '7':
                        return {
                            fillColor: 'teal',
                            fillOpacity: 0.2
                        }
                    case '8':
                        return {
                            fillColor: 'maroon',
                            fillOpacity: 0.2
                        }
                    case '9':
                        return {
                            fillColor: 'navy',
                            fillOpacity: 0.2
                        }
                    default:
                        return {
                            radius: 100
                        }
                }
                
            case 'Placed based team option 3' : 
                switch (feature.properties['Place Based Team Option 3']) {
                    case '1':
                        return {
                            fillColor: 'red',
                            fillOpacity: 0.2,
                        }
                    case '2':
                        return {
                            fillColor: 'blue',
                            fillOpacity: 0.2
                        }
                    case '3':
                        return {
                            fillColor: 'green',
                            fillOpacity: 0.2
                        }
                    case '4':
                        return {
                            fillColor: 'purple',
                            fillOpacity: 0.2
                        }
                    case '5':
                        return {
                            fillColor: 'orange',
                            fillOpacity: 0.2
                        }
                    case '6':
                        return {
                            fillColor: 'magenta',
                            fillOpacity: 0.2
                        }
                    case '7':
                        return {
                            fillColor: 'teal',
                            fillOpacity: 0.2
                        }
                    case '8':
                        return {
                            fillColor: 'maroon',
                            fillOpacity: 0.2
                        }
                    case '9':
                        return {
                            fillColor: 'navy',
                            fillOpacity: 0.2
                        }
                    default:
                        return {
                            radius: 100
                        }
                }
            case 'Let\'s talk hub (GP)' : return {
                fillColor: '#005eb8',
                color : '#005eb8',
                stoke : 0.2,
                fillOpacity: 0.2,
                radius: 12,
            }
            case 'Let\'s talk hub (WCC)' : return {
                fillColor : 'rgb(0,109,60)',
                color : 'rgb(0, 109, 60)',
                fillOpacity: 0.2,
                radius: 12,
            }
        }
    },
    pointToLayer : function(feature, latlng) {
        return L.circleMarker(latlng,
        {   
            color : 'inherit',
            radius : 10,
            fillOpacity : 1
        })
    }
}).addTo(map);

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
        .eachLayer(function (layer) {
            var propText = layer.feature.properties;
            console.log('layer.feature.properties.length: ',  layer.feature.properties);
            // console.log('Object.keys(layer.feature.properties.length: ', Object.keys(layer.feature.properties)[0])
            // for (var i = 0; i < layer.feature.properties.length; i++) {
            //     propText += Object.keys(layer.feature.properties)[i] + layer.feature.properties[Object.keys(layer.feature.properties)[i]];
            // }
            console.log(Object.keys(propText));
            textBox = '';
            for (var i = 0; i < Object.keys(propText).length; i++) {
                textBox += '<strong>' + Object.keys(propText)[i] + ': </strong>&#09;' 
                + propText[Object.keys(propText)[i]] + '<br/>';
            }
            layer.bindPopup(textBox);
            // console.log(Object.keys(layer.feature.properties)[i]);
            // layer.bindPopup(layer.feature.properties)
        })
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

