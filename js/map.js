L.mapbox.accessToken = 'pk.eyJ1IjoiZWRlbnppayIsImEiOiJZY1FnQ2R3In0.PiBaMDsTuZCIL9ypEK6tow';

function drawMap(lg,lt){

	L.mapbox.map('map', 'examples.map-i86nkdio').setView([lg,lt], 15);

}
