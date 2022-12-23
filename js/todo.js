window.todoapp = function () {
	return {
		id: 1,

		filter: "all",

		todoBody: "",

		editable: 0,

		todos: [],

		addTodo() {
			this.todos.push({
				id: this.id,
				body: this.todoBody,
				completed: false,
			});
			this.todoBody = "";
			this.id++;
		},

		deleteTodo(todo) {
			const index = this.todos.indexOf(todo);
			this.todos.splice(index, 1);
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

		clearCompleted() {
			this.todos = this.active;
		},

		editTodo(todo) {
			todo.cacheBody = todo.body;
			this.editable = todo.id;
		},

		preventEdits(todo) {
			todo.body = todo.cacheBody;
			this.finishEditing(todo);
		},

		finishEditing(todo) {
			delete todo.cacheBody;
			this.editable = 0;
		},

		markAllAsCompleted() {
			this.todos.map((todo) => (todo.completed = true));
		},
	};
};
