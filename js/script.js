const NAME_FIELD = document.getElementById("name");
NAME_FIELD.focus(); // sets focus on the first text field

const OTHER_JOB = document.getElementById("other-title");
OTHER_JOB.type = 'hidden'; //makes Other job role entry hidden

const JOB_ROLE = document.getElementById("title");

// text field reveal when job role - other selected

JOB_ROLE.addEventListener('change', (event) => {
   
  let selected= event.target.value;
  
  if(selected === "other") {
  
    OTHER_JOB.type = 'text';
    
  } else {
        OTHER_JOB.type = 'hidden';
    }
});

const DESIGN_THEME = document.getElementById("design");
const DESIGN_COLOR = document.getElementById("color");
//maybe get option list for each 
const THEME_OPTIONS = document.getElementById("design").children;
const COLOR_OPTIONS = document.getElementById("color").children;

console.log(COLOR_OPTIONS[0].textContent);

//locks color select and changes default value text content for indication purposes

COLOR_OPTIONS[0].textContent = "Please select a T-shirt theme";
DESIGN_COLOR.disabled = true; 











