jQuery(function () {
  window.CaseListView = Backbone.View.extend({
    el: "#caseItemListContainer", // Target the container for the list
    initialize: function (options) {
      this.casesCollection = options.casesCollection; // Expect the casesCollection to be passed
      this.listenTo(this.casesCollection, "add", this.renderCaseItem);
      this.listenTo(this.casesCollection, "reset", this.renderAllCaseItems);
    },

    renderCaseItem: function (caseModel) {
      console.log("renderCaseItem");
      const caseListItemView = new CaseListItemView({ model: caseModel });
      this.$el.prepend(caseListItemView.render().el);
    },

    renderAllCaseItems: function () {
      this.$el.empty();
      this.casesCollection.each(this.renderCaseItem, this);
    },

    render: function () {
      this.renderAllCaseItems(); // Initial rendering
      return this;
    },
  });
});
