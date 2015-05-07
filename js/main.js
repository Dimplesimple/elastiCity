function load(city,lg,lt){
	initializeGraph();
	addNode(city,{},function(data){
		wiki();
		getCategories(function(category){
			edges.add([{
				from: data['nodeId'], 
				to: addNode(
					category['name'],
					category,
					function(){
						wiki();
						getVenues(category['id'],
						lg,
						lt,
						function(data){
							edges.add([{
								from: category['nodeId'],
							to: addNode(data,data,expandRec())
							}]);
							

						})})
					//getVenues(addNode(name,'',''),category['id'],lg,lt)})
			}]);

		})
	});
	

	
}

function expandRec(){
	return function(){
		edges.add([{
			from: clicked,
			to: addNode("hello",{nodeId:clicked},expandRec(clicked))
		}]);
		wiki();
	};
}


function addCityNode(city,lg,lt){
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


