window.todoStore = {
	todos: JSON.parse(localStorage.getItem("todos") || "[]"),
	save() {
		localStorage.setItem("todos", JSON.stringify(this.todos));
	},
};

window.Todo = function (body) {
	this.id = Date.now();
	this.body = body;
	this.completed = false;
};

window.todoapp = function () {
	return {
		...todoStore,

		filter: "all",

		todoBody: "",

		editable: 0,

		addTodo() {
			if (!this.todoBody.trim()) {
				return;
			}
			this.todos.push(new Todo(this.todoBody));
			this.save();
			this.todoBody = "";
		},

		deleteTodo(todo) {
			const index = this.todos.indexOf(todo);
			this.todos.splice(index, 1);
			this.save();
		},

		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},

		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},

		get filteredTodos() {
			return {
				all: this.todos,
				completed: this.completed,
				active: this.active,
			}[this.filter];
		},

		toggleTodo(todo) {
			todo.completed = !todo.completed;
			this.save();
		},

		get isAllCompleted() {
			return this.todos.length == this.completed.length;
		},

		clearCompleted() {
			this.todos = this.active;
			this.save();
		},

		editTodo(todo) {
			todo.cacheBody = todo.body;
			this.editable = todo.id;
			this.save();
		},

		preventEdits(todo) {
			todo.body = todo.cacheBody;
			this.finishEditing(todo);
		},

		finishEditing(todo) {
			if (!todo.body.trim()) {
				return this.deleteTodo(todo);
			}
			delete todo.cacheBody;
			this.editable = 0;
			this.save();
		},

		toggleAll() {
			let isCompleted = this.isAllCompleted;
			this.todos.map((todo) => (todo.completed = !isCompleted));
		},
	};
};
