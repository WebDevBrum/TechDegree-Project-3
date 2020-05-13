const NAME_FIELD = document.getElementById("name");
NAME_FIELD.focus(); // sets focus on the first text field

const OTHER_JOB = document.getElementById("other-title");
OTHER_JOB.type = 'hidden'; //makes Other job role entry hidden

const JOB_ROLE = document.getElementById("title");

const DESIGN_THEME = document.getElementById("design");
const DESIGN_COLOR = document.getElementById("color");
const THEME_OPTIONS = document.getElementById("design").children;
const COLOR_OPTIONS = document.getElementById("color").children;

//locks color select and changes default value text content for indication purposes

COLOR_OPTIONS[0].textContent = "Please select a T-shirt theme";
DESIGN_COLOR.disabled = true; 

const CHECKBOXES = document.querySelectorAll("input[type='checkbox']");

//addition of total cost element and ability to calculate value

const TOTAL_COST = createElement('p');
const ACTIVITIES = document.querySelector(".activities");
ACTIVITIES.appendChild(TOTAL_COST);
let costCount = 0;

//Common functions

function createElement(elementName) {

    const element = document.createElement(elementName);
    
    return element;
}

//disables list of color options (helper for event listener )

function colorListDisabled(boolean) {

  for (let i = 0; i < COLOR_OPTIONS.length; i++){
  
    COLOR_OPTIONS[i].disabled = boolean;
  }
}

// updates the total cost for activities attended based on the cost counter

function updateCost() {

  TOTAL_COST.textContent = `Total: $${costCount}`; 
}

updateCost();

// text field reveal when job role - other selected

JOB_ROLE.addEventListener('change', (event) => {
   
  let selected= event.target.value;
  
  if(selected === "other") {
  
    OTHER_JOB.type = 'text';
    
  } else {
  
    OTHER_JOB.type = 'hidden';
    
    }
});

// Selection of available colours based on design 

DESIGN_THEME.addEventListener('change', (event) => {
   
  let selected= event.target.value;
  
  if(selected === "js puns") {
  
    colorListDisabled(true);
  
    DESIGN_COLOR.disabled = false;
    COLOR_OPTIONS[0].textContent = "Cornflower Blue (JS Puns shirt only)";
    
    COLOR_OPTIONS[0].disabled = false;
    COLOR_OPTIONS[1].disabled = false;
    COLOR_OPTIONS[2].disabled = false;
    
    COLOR_OPTIONS[0].selected = true;
    
  } else if (selected === "heart js") {
  
    colorListDisabled(true);
  
    DESIGN_COLOR.disabled = false;
    COLOR_OPTIONS[0].textContent = "Cornflower Blue (JS Puns shirt only)";
      
    COLOR_OPTIONS[3].disabled = false;
    COLOR_OPTIONS[4].disabled = false;
    COLOR_OPTIONS[5].disabled = false;
  
    COLOR_OPTIONS[3].selected = true;
  
  } else {
    
     COLOR_OPTIONS[0].textContent = "Please select a T-shirt theme";
     DESIGN_COLOR.disabled = true;
     
     COLOR_OPTIONS[0].selected = true;
    
    }
});

//event listener for checkboxes along with checks for competing activities on a given date/time

for (let i = 0; i < CHECKBOXES.length; i++) {

  let checkBox = CHECKBOXES[i];

  checkBox.addEventListener('click', (event) => {
  
    let cost = event.target.dataset.cost;
    let dateAndTime = event.target.getAttribute("data-day-and-time");
    
    function disableCompeting(state) {
    
      for (let i = 0; i< CHECKBOXES.length; i++) {
      
          let checkDate = CHECKBOXES[i].getAttribute("data-day-and-time");
        
          if ((dateAndTime === checkDate) && (event.target != CHECKBOXES[i])){
        
            CHECKBOXES[i].disabled = state;
          }
       }
    }
    
    if (event.target.checked === true) {
    
      costCount+= parseInt(cost);
      updateCost();
      disableCompeting(true);
      
    } else if (event.target.checked === false) {
        
      costCount -= parseInt(cost);
      updateCost();
      disableCompeting(false);
    }
  });
}

