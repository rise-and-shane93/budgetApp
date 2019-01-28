/*To Do List
1) Add event handler
2) Get input values
3) Add the new item to our data structure
4) Add the new item to the UI
5) Calculate budget
6) Update the UI

Structuring out Code with Modules
- Import aspect of any robust application's architecture
- Keep the units of code for a project both cleanly separated and organized
- Encapsulate some data into privacy and expose other data publicly

Modules for our Project

= We want to create modules because we want to keep pieces of code that are related
  to one another inside of separate, independent, and organized units.
= In addition, in each of these modules, we'll have variables and functions that
  are private, which means that they are only accessible inside of the module.
= We will also have public data, which means that we expose them to the public so 
  that other functions or modules can have access to them. This is called...
  - Data Encapsulation
    > Allows us to hide the implementation details of a specific module from the outside scope 
      so that we only expose a public interface. AKA an API.
= The secret of the module pattern is that it return an object containing all of the functions
  that we want to be public.

- UI Module
	+ Get unput values
	+ Add the new item to the UI
	+ Update the UI

- Data Module
	+ Add the new item to our data structure
	+ Calculate budget

- Controller Module
	+ Add event handler

=============================
What I will learn:
- How to use the module pattern
- More about private and public data, encapsulation and separation of concerns


*/

// BUDGET CONTROLLER
var budgetController = (function () {

    var x = 23;

    var add = function(a) {
        return x + a;
    }
    return {
        publicTest: function(b) {
            return add(b);
        }
    }

})();

// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {

       // 1. Get the field input data
       var input = UICtrl.getInput();
       console.log(input);

       // 2. Add the item to the budget contorller
       // 3. Add the new item to the UI
       // 4. Calculate the budget 
       // 5. Display the budget on the UI. 

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        
        if (event.keyCode === 13 || event.which === 13) {
            //console.log('enter was pressed.');
            ctrlAddItem();
        }

    });

})(budgetController, UIController);