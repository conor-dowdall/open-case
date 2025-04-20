jQuery(function () {
  window.AddCaseView = Backbone.View.extend({
    el: "#addCaseForm", // Target the existing addCaseForm element
    events: {
      submit: "createCase",
    },

    initialize: function (options) {
      this.casesCollection = options.casesCollection; // Receive the collection
      this.$titleInput = this.$("#title");
      this.$descriptionInput = this.$("#description");
    },

    createCase: function (event) {
      event.preventDefault();
      const title = this.$titleInput.val().trim();
      const description = this.$descriptionInput.val().trim();

      if (title) {
        this.casesCollection.create(
          { title: title, description: description },
          { wait: true }
        );
        this.$titleInput.val("");
        this.$descriptionInput.val("");
      }
    },
  });
});
