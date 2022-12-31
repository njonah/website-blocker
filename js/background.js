async function blockedsite(url) {

  //get blocked websites list from chrome
  var blockedurls = await  chrome.storage.sync.get(["blockedarr"]).then((result) => {
    return result.blockedarr;
});

  //loop through blockedurls
  for (let i = 0; i < blockedurls.length; i ++) {
    if (url.includes(blockedurls[i])) {  //if url is among the ones that should be blocked
      return true;
    }
  }
  

  return false;
}


async function getcurrentState() {
  var value = false;
  value = await chrome.storage.sync.get(["on_off"]).then((result) => { //get the state of the popup switch
    return result.on_off;
  });
  return value;
}
function blockpage() {
  document.open();
  document.write("<html>");
  document.write("<head>");
  document.write("<link rel=\"stylesheet\" href=\"/css/blocked.css\">");
  document.write("</head>");
  document.write("<h1>This page has been blocked</h1>");
  document.write("<h4>Website Blocker extension</h4>");
  document.write("<html>");
  document.close();

}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => { //run every new tab
  if (changeInfo.status == 'complete' && tab.active && !tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
    if (await blockedsite(tab.url) && await getcurrentState()) { //get current tab url with tab.url and get current toggle state
      ;



      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: blockpage,
        args: [],
      });

      await chrome.scripting.insertCSS({
        files: ["/css/blocked.css"],
        target: { tabId: tab.id },
      });

    }

  }
return true;
});