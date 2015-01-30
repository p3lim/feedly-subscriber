var hasFeed = function(dom){
	var result = dom.evaluate('//*[local-name()="rss" or local-name()="feed" or local-name()="RDF"]', dom, null, 0, null);
	if(result){
		var node = result.iterateNext();
		if(node && !(node.parentElement && node.parentElement.tagName != 'BODY'))
			return true;
	};
};

if(document.body.childElementCount == 1){
	var tagName = document.body.children[0].tagName;

	if(tagName == 'RSS' || tagName == 'FEED' || tagName == 'RDF')
		location.href = 'https://feedly.com/i/subscription/feed/' + escape(location.href);
	else if(tagName == 'PRE'){
		var parser = new DOMParser();
		var dom = parser.parseFromString(document.body.textContent, 'text/xml');
		if(hasFeed(dom))
			location.href = 'https://feedly.com/i/subscription/feed/' + escape(location.href);
	};
} else {
	var feeds = [];
	[].forEach.call(document.querySelectorAll('link'), function(link){
		if(link.rel == 'alternate' && (link.type.indexOf('rss') != -1 || link.type.indexOf('atom') != -1)){
			feeds.push({
				href: link.href,
				title: link.title
			});
		};
	});

	if(feeds.length)
		chrome.runtime.sendMessage(feeds);
}
