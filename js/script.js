///Function to create elements

function createElement(elementName) {

    const element = document.createElement(elementName);
    return element;
}

// sets focus on the first text field

function fieldFocus(field) {

    const FOCUS_FIELD = document.getElementById(field);
    FOCUS_FIELD.focus(); 
}

fieldFocus("name");

//Immediately-invoked Function to add text box if job role 'other' selected

const OTHER_JOB = ( () => {

    const OTHER_JOB = document.getElementById("other-title");
    const JOB_ROLE = document.getElementById("title");
    OTHER_JOB.type = 'hidden';

    JOB_ROLE.addEventListener('change', (event) => {
   
        let selected= event.target.value;
  
        if (selected === "other") {
  
            OTHER_JOB.type = 'text';
    
        } else {
  
            OTHER_JOB.type = 'hidden';
        }
});
})();

//Immediately-invoked Function to manage T-Shirt info elements and locking color selection until theme selected.

const SELECT_DESIGN = ( () => {
    const DESIGN_THEME = document.getElementById("design");
    const DESIGN_COLOR = document.getElementById("color");
    const THEME_OPTIONS = document.getElementById("design").children;
    const COLOR_OPTIONS = document.getElementById("color").children;
    //locks color select and changes default value text content for indication purposes
    COLOR_OPTIONS[0].textContent = "Please select a T-shirt theme";
    DESIGN_COLOR.disabled = true; 

    function colorListDisabled(boolean) {

        for (let i = 0; i < COLOR_OPTIONS.length; i++){
  
            COLOR_OPTIONS[i].disabled = boolean;
        }
    }

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
})();

//Immediately-invoked Function to manage Activity section and update total price accordingly 

const SELECT_ACTIVITY = ( () => {

    const CHECKBOXES = document.querySelectorAll("input[type='checkbox']");

    //addition of total cost element and ability to calculate value
    const TOTAL_COST = createElement('p');
    const ACTIVITIES = document.querySelector(".activities");
    let costCount = 0;
    ACTIVITIES.appendChild(TOTAL_COST);
    
    // updates the total cost for activities attended based on the cost counter
    function updateCost() {

        TOTAL_COST.textContent = `Total: $${costCount}`; 
    }

    updateCost();

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
})();

//Immediately-invoked Function to manage payment info section based on option selection

const PAYMENT_SELECT = ( () => {

    const SELECT_PAYMENT = document.getElementById("payment");
    const PAYMENT_OPTIONS = document.getElementById("payment").children;

    const CARD_INFO =document.getElementById("credit-card");
    const PAYPAL_INFO = document.getElementById("paypal");
    const BITCOIN_INFO = document.getElementById("bitcoin");

    PAYMENT_OPTIONS[0].hidden = true; // hides 'select payment method' on dropdown

    function hidePaymentMethod(card = true, paypal = true, bitcoin = true) {

        CARD_INFO.hidden = card;
        PAYPAL_INFO.hidden = paypal;
        BITCOIN_INFO.hidden = bitcoin;
    }

    hidePaymentMethod(card = true, paypal = true, bitcoin = true);

    SELECT_PAYMENT.addEventListener('change', (event) => {
    
        let selected= event.target.value;
        
        if (selected === "credit card") {
            hidePaymentMethod(card = false, paypal = true, bitcoin = true);

        } else if (selected === "paypal") {
            hidePaymentMethod(card = true, paypal = false, bitcoin = true);

        } else if (selected === "bitcoin") {
            hidePaymentMethod(card = true, paypal = true, bitcoin = false);
        } 
    });
})();



  //form validation need to test all these
  // maybe remove returns and test each value against existing input as per pdf
  
let invalidEntry = createElement('h6');
invalidEntry.textContent = "";
invalidEntry.style.color = 'red';
invalidEntry.style.margin = "0px";


  function validName() {
  
    const name = document.getElementById("name");
   
    if (/^[a-z ,.'-]+$/i.test(name.value)){
    
      invalidEntry.style.display = 'none';
      return true;
      
    } else {
    
        invalidEntry.style.display = '';
        name.insertAdjacentElement('beforebegin', invalidEntry);
        invalidEntry.textContent = "Please enter a valid user name";
        
       return false;
      }
   }
  
  function validEmail() {
  
    const mail = document.getElementById("mail");
  
    if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(mail)){
    
      invalidEntry.style.display = 'none';
      return true;
      
    } else {
    
        invalidEntry.style.display = '';
        mail.insertAdjacentElement('beforebegin', invalidEntry);
        invalidEntry.textContent = "Please enter a valid email";
        
       return false;
      }
  }
  
  function validActivities() {
  
    let counter = 0;
  
    for (let i = 0; i< CHECKBOXES.length; i++) {
      
       if (CHECKBOXES[i].checked = true) {
      
       counter+=1;
       
      } 
    }
    
    if (counter > 0) {
      return true;
    } else {
      return false;
    }
  } 
  
  
  //only utilised if payment option is crrdit card
  
  //accepts 16 digit card number
  function validCreditCardNum(number) {
    return 	/^(\d{4}[- ]){3}\d{4}|\d{16}$/.test(number);
  }
  
  function validZipCode(zip) {
    return 	/^\d{5}$/.test(zip);
  }
  
  function validCVV(cvv) {
    return /^([0-9]{3})$/.test(cvv);
  }
  
  // formatters and linters??
  const test = document.querySelector("label[for='name']");
  
  console.log(test.textContent);
  