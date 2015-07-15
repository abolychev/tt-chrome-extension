

$.get( "http://localhost:3000/extension/getUserId", function( data ) {
  console.log( "Data Loaded: " + data );
  var userId = data;


	// Attach DDP to your local app
	var ddp = new MeteorDdp("ws://localhost:3000/websocket");

	var tasks = 0;

	// TEST CONNECTION IS MADE
	// ddp.connect().done(function() {
	//   console.log('Connected!');
	// });

	//Connect to App
	ddp.connect().then(function(){

		// console.log("Connected");

		//Subscribe to a publication - in this case I publish the collection 'posts' as 'all_posts'
		ddp.subscribe('task-counts', [userId] );
		console.log(ddp.getCollection('tasks'));

		//Watch that collection
		ddp.watch('counts', function (changedDoc, message){

			// console.log(changedDoc);

			// if (message === "added")
				// tasks++;
			// if (message === "removed")
				// tasks--;

			//Update the browser badge to show how many posts there are
			// chrome.browserAction.setBadgeText({text: tasks.toString()});
			chrome.browserAction.setBadgeText({text: changedDoc.count.toString()});
		});
	});
});