//Storage Controller





//Item Controller
const ItemCtrl = (function () {

  //Item Contructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Streak Dinner', calories: 1200 },
      { id: 1, name: 'Eggs', calories: 400 },
      { id: 2, name: 'Cookie', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public data
  return {
    getItems: function () {
      return data.items
    },
    logData: function () {
      return data
    }
  }



})();



//UI Controller
const UI = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',

  }

  //Public Methods
  return {
    populateItemsList: function (items) {
      let html = '';

      items.forEach(item => {
        html += `
        <li class="list-group-item ${item.id}">
            <strong>${item.name}</strong> <em><span class="badge rounded-pill bg-info text-dark ms-2">${item.calories}
                Calories</span></em>
            <a href="#" class="secondary-content float-end me-3"><i class="edit-item fas fa-pencil-alt"></i></a>
          </li>
        `;
      });

      //inser list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      }
    },
    validateInput: function (name, calories) {

      const reName = /^[a-zA-Z]{2,10}$/;
      const reCalories = /^[0-9]{2,6}$/

      //check if name is valid
      if (reName.test(name)) {
        document.querySelector(UISelectors.itemName).classList.add('is-valid');
        document.querySelector(UISelectors.itemName).classList.remove('is-invalid');
      }
      else {
        document.querySelector(UISelectors.itemName).classList.add('is-invalid');
        document.querySelector(UISelectors.itemName).classList.remove('is-valid');
      }


      //check if calories is valid
      if (reCalories.test(calories)) {
        document.querySelector(UISelectors.itemCalories).classList.add('is-valid');
        document.querySelector(UISelectors.itemCalories).classList.remove('is-invalid');
      }
      else {
        document.querySelector(UISelectors.itemCalories).classList.add('is-invalid');
        document.querySelector(UISelectors.itemCalories).classList.remove('is-valid');
      }


      if (reName.test(name) === true && reCalories.test(calories) === true)
        return true
      return false

    }
  }

})();


//App Controller
const App = (function (ItemCtrl, UI) {
  //load all events
  const loadEventsListeners = function () {
    //get UI Selectors
    const UISelectors = UI.getSelectors();

    //add an event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

  }

  //Add Item Submit
  const itemAddSubmit = function () {

    //get form input from UI
    const input = UI.getItemInput();
    const isValid = UI.validateInput(input.name, input.calories)

    //check if is valid, then proceed
    if (!isValid)
      return

    //create new item
    const newItem = ItemCtrl.addItem(input.name, input.calories);


  }

  return {
    init: function () {
      //fetch items from data structure
      const items = ItemCtrl.getItems();

      //populate list with items
      UI.populateItemsList(items);

      //load event listeners
      loadEventsListeners();
    }
  }

})(ItemCtrl, UI);

App.init();

