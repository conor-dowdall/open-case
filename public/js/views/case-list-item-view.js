jQuery(function () {
  window.CaseListItemView = Backbone.View.extend({
    tagName: "li",
    className: "list-group-item p-4",
    template: _.template(
      '<a class="fs-3 js-view-case" href="#/cases/<%= id %>"><%= title %></a> <br /> <%= description || "No description" %>'
    ),

    events: {
      "click .js-view-case": "viewCaseDetails",
    },

    viewCaseDetails: function (event) {
      event.preventDefault();
      const caseId = this.model.get("id");
      Backbone.history.navigate(`/cases/${caseId}`, { trigger: true }); // Use the router to navigate
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
});
