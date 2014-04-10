var feeds = {}
chrome.runtime.onMessage.addListener(function(message, sender, respond){
	feeds[sender.tab.id] = message;
	chrome.pageAction.show(sender.tab.id);
});

chrome.tabs.onRemoved.addListener(function(tabId){
	delete feeds[tabId];
})
