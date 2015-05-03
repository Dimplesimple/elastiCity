// create an array with nodes
var nodes = new vis.DataSet();
// create an array with edges
var edges = new vis.DataSet();
// create a network
var container = document.getElementById('searchNetwork');
var data= {
	nodes: nodes,
	edges: edges,
};
var options = {
	width: '100%',
	height: '400px'
};
var network = new vis.Network(container, data, options);

function graphReset(){
	nodes = new vis.DataSet();
	// create an array with edges
	edges = new vis.DataSet();
	network = new vis.Network(container, data, options);

}
network.on('select', function(data){console.log(data)});
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
function addVenueNode(label, category){
	nodes.add([
			{id: counter, 
				label: label, 
		color: color,
		shape: 'box',
		fontSize: 20}
		]);
	edges.add([
			{from: category, to: counter++}
			]);
}


