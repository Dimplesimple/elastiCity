var nodes;
var edges;
var container = document.getElementById('searchNetwork');
var data;
var options;
var network;
var refreshed = false;
function initializeGraph(){
	if (refreshed){
		network.destroy();
	}
	// create an array with nodes
	nodes = new vis.DataSet();
	// create an array with edges
	edges = new vis.DataSet();
	// create a network
	data= {
		nodes: nodes,
		edges: edges,
	};
	options = {
		width: '100%',
		height: '100%'
	};
	network = new vis.Network(container, data, options);
	refreshed = true;

}
var city = "";
function addCityNode(label){
	city = label;
	nodes.add([
			{id: city, 
				label: city,
		allowedToMoveX: false,
		allowedToMoveY: false,
		color: randomColor({luminosity: 'light'}),
		shape: 'circle',
		fontSize: 30}
		]);
}
var catColor = randomColor({luminosity: 'light'});
function addCategoryNode(label){
	nodes.add([
			{id: label, 
				label: label, 
		color: catColor,
		shape: 'box',
		fontSize: 20}
		]);
	edges.add([
			{from: city, to: label}
			]);
}
var color = randomColor({luminosity: 'light'});
var counter = 0;
function addVenueNode(nameOfVenue, category){
	//console.log(counter);
	//console.log(nameOfVenue);
	nodes.add([
			{id: counter, 
				label: nameOfVenue, 
		color: color,
		shape: 'box',
		fontSize: 20}
		]);
	edges.add([
			{from: category, to: counter++}
			]);
}

function graphReset(){
	network.destroy();
	network.redraw();
}

