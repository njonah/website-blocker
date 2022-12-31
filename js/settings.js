document.addEventListener('DOMContentLoaded', documentEvents, false);

async function documentEvents() {
    //get data from chrome
    var blockedarr = await chrome.storage.sync.get(["blockedarr"]).then((result) => {
        return result.blockedarr;
    });

    //create new array if none exists yet
    if (typeof blockedarr === 'undefined') {
        blockedarr = []; 
    }

    //populate the textarea on the setting page with the existing blocked websites
    var textarea = document.getElementById("blockedsites");
    for (let i = 0; i < blockedarr.length; i++) {
        //console.log("blocked arr data " + blockedarr[i] + "\n");
        textarea.value += blockedarr[i] + '\r\n';

    }

    //update chrome data
    chrome.storage.sync.set({ "blockedarr": blockedarr }).then(() => {
      });


    //listen for button click
    document.getElementById('submit').addEventListener('click',
    async function()  {

        var input = document.getElementById("blockedsites").value;
        //console.log("input is equal to " + input);
        if (input.trim() !== "") { //check to see if input is empty

            //get data from chrome
            var blockedarr = []

            //seperate input by new line, then append to array
            var inputarr = input.split(/\r?\n/);

            //trim whitespace in input
            for (let i = 0; i < inputarr.length; i ++) {
                var text = inputarr[i].trim();
                if (text != "") 
                    blockedarr.push(text);
            }

            
            
            //update chrome data
            chrome.storage.sync.set({ "blockedarr": blockedarr }).then(() => {
               // console.log("Value is set to " + blockedarr);
              });



        } else {

            chrome.storage.sync.set({ "blockedarr": [] }).then(() => {

               });

        }

    }

  );

}
