// does not handle full-document feeds
var xpath = '//link[contains(@rel, "alternate")][contains(@type, "rss") or contains(@type, "atom") or contains(@type, "rdf")]';
var result = document.evaluate(xpath, document, null, 0, null);

var item, count = 0, feeds = [];
while(item = result.iterateNext()){
	feeds.push({'href': item.href, 'title': item.title});
	count++;
}

if(count > 0){
	console.log('Found ' + count + ' feeds!');
	chrome.runtime.sendMessage(feeds);
}
