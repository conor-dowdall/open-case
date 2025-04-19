jQuery(function () {
  const Case = Backbone.Model.extend({
    defaults: {
      title: "",
      description: "",
    },
    urlRoot: "/api/cases",
  });

  const Cases = Backbone.Collection.extend({
    model: Case,
    url: "/api/cases",
  });

  const casesCollection = new Cases();

  const CaseView = Backbone.View.extend({
    tagName: "li",
    className: "list-group-item p-4",
    template: _.template(
      '<a class="fs-3" href="api/cases/<%= id %>"><%= title %></a> <br /> <%= description || "No description" %>'
    ),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  const AppView = Backbone.View.extend({
    el: ".container", // The main container element
    events: {
      "submit #addCaseForm": "createCase",
    },

    initialize: function () {
      this.$caseList = $("#caseList");
      this.$titleInput = $("#title");
      this.$descriptionInput = $("#description");
      this.listenTo(casesCollection, "add", this.renderCase);
      this.listenTo(casesCollection, "reset", this.renderAllCases);
      casesCollection.fetch({ reset: true }); // Fetch initial cases
    },

    renderCase: function (caseVal) {
      const caseView = new CaseView({ model: caseVal });
      this.$caseList.prepend(caseView.render().el); // Add new cases to the top
    },

    renderAllCases: function () {
      this.$caseList.empty();
      casesCollection.each(this.renderCase, this);
    },

    createCase: function (event) {
      event.preventDefault();
      const title = this.$titleInput.val().trim();
      const description = this.$descriptionInput.val().trim();

      if (title) {
        casesCollection.create(
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
