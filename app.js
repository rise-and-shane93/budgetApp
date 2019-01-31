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

    var Expense = function(id, description, value) {
    	this.id = id;
    	this.description = description;
    	this.value = value;
    };

    var Income = function(id, description, value) {
    	this.id = id;
    	this.description = description;
    	this.value = value;
    };

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //ID = last ID + 1
            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;

        },

        testing: function() {
            console.log(data);
        }
    };

})();

// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {

            var html, newHtml, element;
            // Create HTML strong with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            }
            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

	    var DOM = UICtrl.getDOMstrings();

	    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

	    document.addEventListener('keypress', function(event) {
	        
	        if (event.keyCode === 13 || event.which === 13) {
	            //console.log('enter was pressed.');
	            ctrlAddItem();
	        }

	    });

	};


    var ctrlAddItem = function() {

        var input, newItem; 
        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget contorller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget 
        // 5. Display the budget on the UI. 

    }

    return {
    	init: function() {
    		console.log('app has started');
    		setupEventListeners();
    	}
    }


})(budgetController, UIController);

controller.init();

alert('hey');