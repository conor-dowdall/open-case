jQuery(function () {
  window.CaseDetailView = Backbone.View.extend({
    tagName: "div",
    className: "case-detail",
    template: _.template(
      `
      <h1 class="mt-5 mb-2">
        <img
          src="img/logo.svg"
          alt="Open Case Logo"
          style="width: 3rem; margin: 1rem"
        />Open Case
      </h1>
      <p class="mb-4">
        Case ID: <%= id %>
      </p>

      <hr />
      
      <h3><%= title %></h3>
      <p><%= description || "No description" %></p>
      `
    ),

    initialize: function (options) {
      if (!this.model) {
        console.error("A model must be provided to CaseDetailView");
        return;
      }
      this.render();
      this.listenTo(this.model, "change", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
});
