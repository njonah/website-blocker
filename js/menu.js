//console.log("Loaded Extension");
document.addEventListener('DOMContentLoaded', documentEvents, false);


function onoff(input) {


  //update storage with value from check box
  chrome.storage.sync.set({ "on_off": input }).then(() => {
    //console.log("Value is set to " + input);
  });


}

function documentEvents() {
  chrome.storage.sync.get(["on_off"]).then((result) => { //get the state of the popup switch

    if (result.on_off === true) {
      document.getElementById("on_off").checked = true; //set the checkbox to checked if the saved value is true
    }
  });
  

  //listen for events on toggle on/off
  document.getElementById('on_off').addEventListener('change',
    function () {

      onoff(document.querySelector('#on_off').checked) //collect data toggle button
      
    }

  );

  //listen for events to oppen settings page
  document.getElementById('opensettings').addEventListener('click',
    function () {

      chrome.tabs.create({
        url: '/html/settings.html'
      });

    }

  );
  

}