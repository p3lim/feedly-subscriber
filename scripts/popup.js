var openFeedly = function(url){
	chrome.tabs.create({url: 'https://feedly.com/i/subscription/feed/' + escape(url)});
};

var onClick = function(event){
	openFeedly(event.target.href);
};

document.addEventListener('DOMContentLoaded', function(){
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tabs){
		chrome.runtime.getBackgroundPage(function(page){
			var feeds = page.feeds[tabs[0].id];
			if(feeds.length > 1){
				var table = document.createElement('table');
				for(var index = 0; index < feeds.length; index++){
					var a = document.createElement('a');
					a.href = feeds[index].href;
					a.addEventListener('click', onClick);

					var img = document.createElement('img');
					img.src = tabs[0].favIconUrl;

					a.appendChild(img);
					a.appendChild(document.createTextNode(feeds[index].title));

					var item = document.createElement('tr');
					item.appendChild(a);
					table.appendChild(item);
				};

				document.querySelector('span').innerHTML = 'Click to subscribe:';
				document.querySelector('div').appendChild(table);
			} else
				openFeedly(feeds[0].href);
		});
	});
});
