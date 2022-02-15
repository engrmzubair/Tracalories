//Storage Controller




// -------------------------------------------------------------------------------------
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
    },
    addItem: function (name, calories) {
      const id = data.items.length;
      calories = parseInt(calories);
      const items = { id, name, calories };
      data.items.push(items);
    },
    findCurrentItem: function (e, data) {
      if (e.target.classList.contains('edit-item')) {
        UI.clearEditState()
        let listId = parseInt(e.target.parentElement.parentElement.id);
        data.items.forEach(item => {
          if (item.id === listId)
            data.currentItem = item;
        });
        return data.currentItem
      }
    },
    updateItem: function (name, calories) {
      let caloriesInt = parseInt(calories)
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = caloriesInt;
        }
      });
      return data.items;
    },
    deleteItem: function () {

      data.items.forEach((item, index) => {
        if (item.id === data.currentItem.id) {
          data.items.splice(index, 1);
        }
      });
      return data.items
    },
    clearAll: function () {
      //clear all items
      data.items.splice(0, data.items.length);
      return data.items
    }
  }

})();


// ---------------------------------------------------------------------------------------
//UI Controller
const UI = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories',
    clearAllBtn: '.clear-btn'

  }

  //Public Methods
  return {
    populateItemsList: function (items) {
      let html = '';

      items.forEach(item => {
        html += `
        <li class="list-group-item" id="${item.id}">
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
    clearInput: function () {
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
      document.querySelector(UISelectors.itemName).classList.remove('is-valid');
      document.querySelector(UISelectors.itemName).classList.remove('is-invalid');
      document.querySelector(UISelectors.itemCalories).classList.remove('is-valid');
      document.querySelector(UISelectors.itemCalories).classList.remove('is-invalid');
    },

    addItemToForm: function (item) {
      document.querySelector(UISelectors.itemName).value = item.name;
      document.querySelector(UISelectors.itemCalories).value = item.calories;

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

    },
    getTotalCalories: function (items) {

      let calories = 0;

      items.forEach(item => {
        calories += item.calories;
      })

      //git totalCalories
      ItemCtrl.logData().totalCalories = calories;
      document.querySelector(UISelectors.totalCalories).innerText = calories;
    },
    clearEditState: function () {
      UI.clearInput();
      document.querySelector(UISelectors.addBtn).classList.add('d-none');
      document.querySelector(UISelectors.updateBtn).classList.remove('d-none');
      document.querySelector(UISelectors.deleteBtn).classList.remove('d-none');
      document.querySelector(UISelectors.backBtn).classList.remove('d-none');
    },
    reGainState: function () {
      UI.clearInput();
      document.querySelector(UISelectors.addBtn).classList.remove('d-none');
      document.querySelector(UISelectors.updateBtn).classList.add('d-none');
      document.querySelector(UISelectors.deleteBtn).classList.add('d-none');
      document.querySelector(UISelectors.backBtn).classList.add('d-none');
    }
  }

})();

// ------------------------------------------------------------------------------------
//App Controller
const App = (function (ItemCtrl, UI) {
  //load all events
  const loadEventsListeners = function () {
    //get UI Selectors
    const UISelectors = UI.getSelectors();

    //add an event for add button
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //add an event for edit item
    document.querySelector(UISelectors.itemList).addEventListener('click', editItem);

    //add an event for update button
    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItem);

    //add an event for delete button
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItem);

    //add an event for back button
    document.querySelector(UISelectors.backBtn).addEventListener('click', backItem);

    //add an event for clear all button
    document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAll);

  }

  //Add Item Submit
  const itemAddSubmit = function () {

    //get form input from UI
    const input = UI.getItemInput();
    const isValid = UI.validateInput(input.name, input.calories)

    //check if input is valid, then proceed
    if (!isValid)
      return

    //create new item
    const newItem = ItemCtrl.addItem(input.name, input.calories);

    UI.populateItemsList(ItemCtrl.getItems());

    //total calories
    UI.getTotalCalories(ItemCtrl.getItems());

    //clear input 
    return setTimeout(UI.clearInput, 3000);

  }

  // Edit Item
  const editItem = function (e) {
    const data = ItemCtrl.logData();

    //get currentItem
    const currentItem = ItemCtrl.findCurrentItem(e, data);

    //add item to form
    UI.addItemToForm(currentItem);
  }

  // update Item
  const updateItem = function () {
    // get updated input from form
    const updatedInput = UI.getItemInput();

    const isValid = UI.validateInput(updatedInput.name, updatedInput.calories);

    //check if input is valid, then proceed
    if (!isValid)
      return

    //update Item
    const items = ItemCtrl.updateItem(updatedInput.name, updatedInput.calories);

    //populated updated Items
    UI.populateItemsList(items);

    //total calories
    UI.getTotalCalories(items);

    //clear input after 3 seconds
    setTimeout(UI.reGainState, 3000);
  }

  //delete Item
  const deleteItem = function () {
    //delete item 
    const items = ItemCtrl.deleteItem();

    //again populate items
    UI.populateItemsList(items);

    // clear state
    UI.reGainState()
  };

  //back items data
  const backItem = function () {
    UI.reGainState();
  };

  //clear all btn  
  const clearAll = function () {
    //delete all items
    const items = ItemCtrl.clearAll();
    
    //populate
    UI.populateItemsList(items);

    //calories
    UI.getTotalCalories(items);

  };


  return {
    init: function () {
      //fetch items from data structure
      const items = ItemCtrl.getItems();

      //populate list with items
      UI.populateItemsList(items);

      //count total calories
      UI.getTotalCalories(items);

      //load event listeners
      loadEventsListeners();
    }
  }

})(ItemCtrl, UI);

App.init();

