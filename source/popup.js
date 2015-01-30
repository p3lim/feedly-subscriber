var openFeedly = function(url){
	chrome.tabs.create({url: 'http://feedly.com/i/subscription/feed/' + escape(url)});
}

var onClick = function(event){
	openFeedly(event.target.href);
}

document.addEventListener('DOMContentLoaded', function(){
	chrome.tabs.query({
		currentWindow: true
	}, function(tabs){
		var currentTab;
		for(var index = 0; index < tabs.length; index++){
			if(tabs[index].selected){
				currentTab = tabs[index];
			}
		}

		chrome.runtime.getBackgroundPage(function(page){
			var feeds = page.feeds[currentTab.id];
			if(feeds.length === 1){
				openFeedly(feeds[0].href);
			} else {
				var table = document.createElement('table');
				for(var index = 0; index < feeds.length; index++){
					var a = document.createElement('a');
					a.href = feeds[index].href;
					a.addEventListener('click', onClick);

					var img = document.createElement('img');
					img.src = tab.favIconUrl;

					a.appendChild(img);
					a.appendChild(document.createTextNode(feeds[index].title));

					var item = document.createElement('tr');
					item.appendChild(a);
					table.appendChild(item);
				}

				document.getElementsByTagName('span')[0].innerHTML = 'Click to subscribe:';
				document.getElementsByTagName('div')[0].appendChild(table);
			}
		})
	})
})
