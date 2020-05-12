const NAME_FIELD = document.getElementById("name");
NAME_FIELD.focus(); // sets focus on the first text field

const OTHER_JOB = document.getElementById("other-title");
OTHER_JOB.type = 'hidden'; //makes Other job role entry hidden

const JOB_ROLE = document.getElementById("title");


JOB_ROLE.addEventListener('change', (event) => {
   let selected= event.target.value;
   if(selected === "other") {
   
     OTHER_JOB.type = 'text';
   
   } else {
   
     OTHER_JOB.type = 'hidden';
   }
   
});