jQuery(function () {
  const Task = Backbone.Model.extend({
    defaults: {
      title: "",
      description: "",
    },
    urlRoot: "/api/tasks",
  });

  const Tasks = Backbone.Collection.extend({
    model: Task,
    url: "/api/tasks",
    parse: function (response) {
      return response; // The API returns an array of task objects
    },
  });

  const tasksCollection = new Tasks();

  const TaskView = Backbone.View.extend({
    tagName: "li",
    className: "list-group-item",
    template: _.template(
      '<%= title %> - <%= description || "No description" %>'
    ),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  const AppView = Backbone.View.extend({
    el: ".container", // The main container element
    events: {
      "submit #addTaskForm": "createTask",
    },

    initialize: function () {
      this.$taskList = $("#taskList");
      this.$titleInput = $("#title");
      this.$descriptionInput = $("#description");
      this.listenTo(tasksCollection, "add", this.renderTask);
      this.listenTo(tasksCollection, "reset", this.renderAllTasks);
      tasksCollection.fetch({ reset: true }); // Fetch initial tasks
    },

    renderTask: function (task) {
      const taskView = new TaskView({ model: task });
      this.$taskList.prepend(taskView.render().el); // Add new tasks to the top
    },

    renderAllTasks: function () {
      this.$taskList.empty();
      tasksCollection.each(this.renderTask, this);
    },

    createTask: function (event) {
      event.preventDefault();
      const title = this.$titleInput.val().trim();
      const description = this.$descriptionInput.val().trim();

      if (title) {
        tasksCollection.create(
          { title: title, description: description },
          { wait: true }
        ); // Send to server and wait for response
        this.$titleInput.val("");
        this.$descriptionInput.val("");
      }
    },
  });

  // Initialize the main application view
  new AppView();
});
