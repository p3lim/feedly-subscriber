var feeds = {};
chrome.runtime.onMessage.addListener(function(message, sender){
	feeds[sender.tab.id] = message;
	chrome.pageAction.show(sender.tab.id);
	chrome.pageAction.setTitle({
		tabId: sender.tab.id,
		title: 'Found ' + message.length + ' feed' + (message.length > 1 ? 's' : '') + '!'
	});
});

chrome.tabs.onRemoved.addListener(function(tabId){
	delete feeds[tabId];
});
