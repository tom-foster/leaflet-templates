/** Created by TF 01/05/18
 * This will form the basis of a simple geojson, and only displays it and nothing more.
 * You should look at extending the geoJSONLayer via leaflet.js
 * This version relies on 1.3.1 of leaflet.
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
        //geoJSONLayer can be extended to add a popup as well
        var geoJSONLayer = L.geoJSON(data).addTo(map);
    }
}