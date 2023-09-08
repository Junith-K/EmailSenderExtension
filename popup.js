import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
  
    if (activeTab.url.includes("mail.google.com")) {
        const container = document.getElementsByClassName("container")[0];
  
        container.textContent = 'This is a gmail page';
        const myDiv = document.getElementById('composeButton');
        myDiv.addEventListener('click', function (){
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { action: "runMyFunction" });
            });
        });
    } else {
      const container = document.getElementsByClassName("container")[0];
  
      container.textContent = 'This is not a gmail page';
    }
});