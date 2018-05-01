/** Created by TF 01/05/18
 * This will form the basis of a simple
 */
var requestURL = 'data/flooding_data.geojson';
//global scope for data since this feels like a lot of quick projects
var data;
var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function () {
    if (request.status === 200) {
        data = request.response;
        var geoJSONLayer = L.geoJSON(data, {
            pointToLayer: function(geoJSONPoint, latlng) {
                return L.marker(latlng);
            },
            style : function(geoJSONFeature) {
                if (geoJSONFeature.properties['Public Total'] == '1 to 2') {
                    return {
                        // Colour to light map
                        // color : 'rgba(208, 255, 255, 1)'
                        color : 'rgba(92, 213, 213, 1)'
                    }
                }
                else if (geoJSONFeature.properties['Public Total'] == '3 to 6') {
                    return {
                        color : 'rgba(255,179,102, 1)'
                    }
                }
                else if (geoJSONFeature.properties['Public Total'] == '7 to 12') {
                    return {
                        //Colour not as clear
                        // color : 'rgba(255, 102, 102, 1)'
                        // color : 'rgba(251, 117, 100, 1)'
                        // color : 'rgba(250, 90, 50, 1)'
                        color : 'rgba(255, 87, 45, 1)'
                    }
                }
                else if (geoJSONFeature.properties['Public Total'] == '13 to 20') {
                    return {
                        //Colour not as clear on light map
                        // color : 'rgba(179,102,102,1)'
                        color : 'rgba(224, 0, 0, 1)'
                    }
                }
                else {
                    console.log(geoJSONFeature.properties);
                    return {
                        color : 'blue'
                    }
                }
            }
        }).bindPopup(function(layer) {
            text = '<div> \
                        <span><strong>District:</strong> ' + layer.feature.properties['District'] + '</span><br/> \
                        <span><strong>Ward:</strong> ' + layer.feature.properties['Ward'] + '</span><br/> \
                        <span><strong>Parish:</strong> ' + layer.feature.properties['Parish'] + '</span><br/> \
                        <span><strong>Reports received: </strong> ' + layer.feature.properties['Public Total'] + '</span><br/> \
                    </div>';
            return text;
        }).addTo(map);
    }
}