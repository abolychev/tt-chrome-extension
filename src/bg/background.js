(function() {

	var OK = false;

	function Start() {

		$.get( "http://reactt.ru/extension/getUserIdv2", function( data ) {
		  console.log( "Data Loaded: " + data );
		  var userId = (JSON.parse(data)).userId;
		  console.log(userId);


			// Attach DDP to your local app
			var ddp = new MeteorDdp("ws://reactt.ru/websocket");

			var tasks = 0;

			//Connect to App
			var ddpcon = ddp.connect(function() {
				OK = false;
			});
			ddpcon.done(function(){

				// console.log("Connected");

				//Subscribe to a publication - in this case I publish the collection 'posts' as 'all_posts'
				ddp.subscribe('task-counts', [userId] );
				console.log(ddp.getCollection('tasks'));
				OK = true;
				//Watch that collection
				ddp.watch('counts', function (changedDoc, message){

					// console.log(changedDoc);

					// if (message === "added")
						// tasks++;
					// if (message === "removed")
						// tasks--;

					//Update the browser badge to show how many posts there are
					// chrome.browserAction.setBadgeText({text: tasks.toString()});
					if (changedDoc.count == 0) {
						text = '';
					} else {
						text = changedDoc.count.toString();
					}
					chrome.browserAction.setBadgeText({text: text});
				});
			});
			ddpcon.fail(function(){
				OK = false;
			});
		});
	}

	Start();
	var timerId = setInterval( function() {
		if (!OK) {
			console.log("reconnecting"); 
			Start();
		}
	}, 1000*30 );
})();
