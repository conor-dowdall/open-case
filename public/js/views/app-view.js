jQuery(function () {
  window.AppView = Backbone.View.extend({
    el: ".addNewCaseAndRecentContainer",

    initialize: function () {
      this.addCaseView = new AddCaseView({ casesCollection: casesCollection });
      this.caseListView = new CaseListView({
        casesCollection: casesCollection,
      });
      this.$caseItemListContainer = $("#caseItemListContainer"); // Container for the list
      this.render();
    },

    render: function () {
      // this.addCaseView.render(); // The AddCaseView might not need explicit rendering if it's already in the DOM
      this.$caseItemListContainer.html(this.caseListView.render().el);
      return this;
    },
  });
});
