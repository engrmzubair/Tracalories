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
    getItems: data.items,
    logData: data
  }



})();


//UI Controller
const UI = (function () {
const UISelector = {
  itemList: '#item-list'
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
      document.querySelector(UISelector.itemList).innerHTML = html;
    }
  }

})();


//App Controller
const App = (function (ItemCtrl, UI) {

  return {
    init: function () {
      //fetch items from data structure
      const items = ItemCtrl.getItems;
      console.log(items);

      //populate list with items
      UI.populateItemsList(items);
    }
  }

})(ItemCtrl, UI);

App.init();

