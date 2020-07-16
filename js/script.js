// /Function to create elements

function createElement(elementName) {
  const element = document.createElement(elementName);
  return element;
}

// sets focus on the first text field

function fieldFocus(field) {
  const FOCUS_FIELD = document.getElementById(field);
  FOCUS_FIELD.focus();
}

fieldFocus('name');

// Immediately-invoked Function to add text box if job role 'other' selected

const OTHER_JOB = (() => {
  const OTHER_JOB = document.getElementById('other-title');
  const JOB_ROLE = document.getElementById('title');
  OTHER_JOB.type = 'hidden';

  JOB_ROLE.addEventListener('change', event => {
    const selected = event.target.value;

    if (selected === 'other') {
      OTHER_JOB.type = 'text';
    } else {
      OTHER_JOB.type = 'hidden';
    }
  });
})();

// Immediately-invoked Function to manage T-Shirt info elements and locking color selection until theme selected.

const SELECT_DESIGN = (() => {
  const DESIGN_THEME = document.getElementById('design');
  const DESIGN_COLOR = document.getElementById('color');
  const THEME_OPTIONS = document.getElementById('design').children;
  const COLOR_OPTIONS = document.getElementById('color').children;
  // locks color select and changes default value text content for indication purposes
  COLOR_OPTIONS[0].textContent = 'Please select a T-shirt theme';
  DESIGN_COLOR.disabled = true;

  function colorListDisabled(boolean) {
    for (let i = 0; i < COLOR_OPTIONS.length; i += 1) {
      COLOR_OPTIONS[i].disabled = boolean;
    }
  }

  DESIGN_THEME.addEventListener('change', event => {
    const selected = event.target.value;

    if (selected === 'js puns') {
      colorListDisabled(true);

      DESIGN_COLOR.disabled = false;
      COLOR_OPTIONS[0].textContent = 'Cornflower Blue (JS Puns shirt only)';

      COLOR_OPTIONS[0].disabled = false;
      COLOR_OPTIONS[1].disabled = false;
      COLOR_OPTIONS[2].disabled = false;

      COLOR_OPTIONS[0].selected = true;
    } else if (selected === 'heart js') {
      colorListDisabled(true);

      DESIGN_COLOR.disabled = false;
      COLOR_OPTIONS[0].textContent = 'Cornflower Blue (JS Puns shirt only)';

      COLOR_OPTIONS[3].disabled = false;
      COLOR_OPTIONS[4].disabled = false;
      COLOR_OPTIONS[5].disabled = false;

      COLOR_OPTIONS[3].selected = true;
    } else {
      COLOR_OPTIONS[0].textContent = 'Please select a T-shirt theme';
      DESIGN_COLOR.disabled = true;

      COLOR_OPTIONS[0].selected = true;
    }
  });
})();

// Immediately-invoked Function to manage Activity section and update total price accordingly

const SELECT_ACTIVITY = (() => {
  const CHECKBOXES = document.querySelectorAll("input[type='checkbox']");

  // addition of total cost element and ability to calculate value
  const TOTAL_COST = createElement('p');
  const ACTIVITIES = document.querySelector('.activities');
  let costCount = 0;
  ACTIVITIES.appendChild(TOTAL_COST);

  // updates the total cost for activities attended based on the cost counter
  function updateCost() {
    TOTAL_COST.textContent = `Total: $${costCount}`;
  }

  updateCost();

  // event listener for checkboxes along with checks for competing activities on a given date/time

  for (let i = 0; i < CHECKBOXES.length; i += 1) {
    const checkBox = CHECKBOXES[i];

    checkBox.addEventListener('click', event => {
      const { cost } = event.target.dataset;
      const dateAndTime = event.target.getAttribute('data-day-and-time');

      function disableCompeting(state) {
        for (let i = 0; i < CHECKBOXES.length; i += 1) {
          const checkDate = CHECKBOXES[i].getAttribute('data-day-and-time');

          if (dateAndTime === checkDate && event.target !== CHECKBOXES[i]) {
            CHECKBOXES[i].disabled = state;
          }
        }
      }
      if (event.target.checked === true) {
        costCount += parseInt(cost);
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

// Immediately-invoked Function to manage payment info section based on option selection

const PAYMENT_SELECT = (() => {
  const SELECT_PAYMENT = document.getElementById('payment');
  const PAYMENT_OPTIONS = document.getElementById('payment').children;

  const SUBMIT = document.querySelector("button[type='submit']");

  // SUBMIT.disabled = true;

  const CARD_INFO = document.getElementById('credit-card');
  const PAYPAL_INFO = document.getElementById('paypal');
  const BITCOIN_INFO = document.getElementById('bitcoin');

  PAYMENT_OPTIONS[0].hidden = true;
  PAYMENT_OPTIONS[0].disabled = true;
  PAYMENT_OPTIONS[1].selected = true;

  // hides 'select payment method' on dropdown

  function hidePaymentMethod(card = true, paypal = true, bitcoin = true) {
    CARD_INFO.hidden = card;
    PAYPAL_INFO.hidden = paypal;
    BITCOIN_INFO.hidden = bitcoin;
  }

  hidePaymentMethod((card = false), (paypal = true), (bitcoin = true));

  SELECT_PAYMENT.addEventListener('change', event => {
    const selected = event.target.value;

    if (selected === 'credit card') {
      hidePaymentMethod((card = false), (paypal = true), (bitcoin = true));
      // SUBMIT.disabled = false;
    } else if (selected === 'paypal') {
      hidePaymentMethod((card = true), (paypal = false), (bitcoin = true));
      // SUBMIT.disabled = false;
    } else if (selected === 'bitcoin') {
      hidePaymentMethod((card = true), (paypal = true), (bitcoin = false));
      // SUBMIT.disabled = false;
    } else if (selected === 'select method') {
      // SUBMIT.disabled = true;
    }
  });
})();

const FORM_VALIDATE = (() => {
  const NAME_LABEL = document.querySelector("label[for='name']");
  const MAIL_LABEL = document.querySelector("label[for='mail']");
  const ACTIVITIES_LABEL = document.querySelector('.activities');
  const CARD_LABEL = document.querySelector("label[for='cc-num']");
  const ZIP_LABEL = document.querySelector("label[for='zip']");
  const CVV_LABEL = document.querySelector("label[for='cvv']");

  function appendInvalid(element, warning, id) {
    const invalidEntry = createElement('h6');
    invalidEntry.id = id;
    invalidEntry.textContent = warning;
    invalidEntry.style.display = 'none';
    invalidEntry.style.color = 'red';
    invalidEntry.style.margin = '0px';
    element.appendChild(invalidEntry);
  }

  appendInvalid(NAME_LABEL, 'Please enter a valid name', 'nameInvalid');
  appendInvalid(MAIL_LABEL, 'Please enter a valid email', 'emailInvalid');
  appendInvalid(
    ACTIVITIES_LABEL,
    'Please select at least one actuvity',
    'activityInvalid'
  );
  appendInvalid(
    CARD_LABEL,
    'Please enter a valid 13 or 16 digit card number (no spaces)',
    'cardInvalid'
  );
  appendInvalid(
    ZIP_LABEL,
    'Please enter a valid 5 digit Zip number',
    'zipInvalid'
  );
  appendInvalid(CVV_LABEL, 'Please enter a valid 3 digit cvv', 'cvvInvalid');

  function validName() {
    const NAME = document.getElementById('name');
    const warning = document.getElementById('nameInvalid');

    if (/^[a-z ,.'-]+$/i.test(NAME.value)) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function validEmail() {
    const MAIL = document.getElementById('mail');
    const warning = document.getElementById('emailInvalid');

    if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(MAIL.value)) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function validActivities() {
    const warning = document.getElementById('activityInvalid');
    const CHECKBOXES = document.querySelectorAll("input[type='checkbox']");
    let counter = 0;

    for (let i = 0; i < CHECKBOXES.length; i += 1) {
      if (CHECKBOXES[i].checked === true) {
        counter += 1;
      }
    }

    if (counter > 0) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function validCreditCardNum() {
    const CARD = document.getElementById('cc-num');
    const warning = document.getElementById('cardInvalid');

    /* https://regular-expressions.mobi/creditcard.html?wlr=1 */

    if (/^[0-9]{13}(?:[0-9]{3})?$/.test(CARD.value)) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function validZipCode() {
    const ZIP = document.getElementById('zip');
    const warning = document.getElementById('zipInvalid');

    if (/^\d{5}$/.test(ZIP.value)) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function validCVV() {
    const CVV = document.getElementById('cvv');
    const warning = document.getElementById('cvvInvalid');

    if (/^([0-9]{3})$/.test(CVV.value)) {
      warning.style.display = 'none';
      return true;
    }
    warning.style.display = '';
    return false;
  }

  function onSubmit(event) {
    validName();
    validEmail();
    validActivities();
    validCreditCardNum();
    validZipCode();
    validCVV();

    const SELECT_PAYMENT = document.getElementById('payment');
    const VALUE = SELECT_PAYMENT.value;

    if (
      !validName() ||
      !validEmail() ||
      !validActivities() ||
      (VALUE === 'credit card' && !validCreditCardNum()) ||
      (VALUE === 'credit card' && !validZipCode()) ||
      (VALUE === 'credit card' && !validCVV())
    ) {
      event.preventDefault();
      alert('Please amend areas detailed in red');
    } else {
      alert('Thank you for your submission, enjoy the conference!');
    }
  }

  const FORM = document.querySelector('form');
  FORM.addEventListener('submit', onSubmit);
})();
