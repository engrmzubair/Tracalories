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
      { id: 2, name: 'Cookie', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public data
  return {
    logData: data
  }



})();


//UI Controller
const UI = (function () {

})();


//App Controller
const App = (function (ItemCtrl, UI) {

console.log(ItemCtrl.logData);

})(ItemCtrl, UI);

