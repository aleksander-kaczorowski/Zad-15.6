$(function() {

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('X');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		

		//Events
		$columnDelete.click(function() {
			self.removeColumn();
		});
		$columnAddCard.click(function() {
			var name = prompt("Enter the name of the card");
			if (name) {
				self.addCard(new Card(name));
			} else {
				alert('Please, enter a correct card name.')
			}
		});

		//Construction
		$column.append($columnTitle)
			   .append($columnDelete)
			   .append($columnAddCard)
			   .append($columnCardList);
		return $column;

	} 
};

Column.prototype = {
	addCard: function(card){
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('X');

		$cardDelete.click(function(){
			self.removeCard();
		});
		$card.append($cardDelete)
		 .append($cardDescription);
		return $card;
	}
};

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
};

$('.create-column').click(function(){
	var name = prompt('Enter a column name');

	if (name) {
		var column = new Column(name);
		board.addColumn(column);
	} else {
		alert('Please, enter a correct column name.')
	}	
});


//creating columns
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

//addinf columns to the borad
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

//creating cards
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

//adding cards to columns
todoColumn.addCard(card1);
doingColumn.addCard(card2);



})