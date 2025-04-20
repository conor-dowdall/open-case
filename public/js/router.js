jQuery(function () {
  window.AppRouter = Backbone.Router.extend({
    routes: {
      "": "showCaseList", // Default route - shows the list and add form
      "cases/:id": "showCaseDetails", // Route for individual case details
    },

    initialize: function () {
      this.appView = new AppView(); // Initialize the main app view (list and add form)
      this.caseDetailContainer = $("#caseDetailContainer"); // Container for detail view
      this.addNewCaseAndRecentContainer = $("#addNewCaseAndRecentContainer"); // Container for the main app view
      this.showCaseList(); // Call showCaseList to trigger initial fetch and rendering
    },

    showCaseList: function () {
      console.log("AppRouter: showCaseList called");
      this.caseDetailContainer.hide();
      this.addNewCaseAndRecentContainer.show();
      casesCollection.fetch({ reset: true });
    },

    showCaseDetails: function (id) {
      this.addNewCaseAndRecentContainer.hide();
      this.caseDetailContainer.show();
      const caseModel = casesCollection.get(id); // Try to get the model from the collection

      if (caseModel) {
        this.renderCaseDetailView(caseModel);
      } else {
        // If not in the collection, fetch it individually
        const newCaseModel = new Case({ id: id });
        newCaseModel.fetch({
          success: (model) => {
            this.renderCaseDetailView(model);
          },
          error: () => {
            console.error("Failed to fetch case with ID:", id);
            this.caseDetailContainer.html("<p>Case not found.</p>");
          },
        });
      }
    },

    renderCaseDetailView: function (model) {
      const caseDetailView = new CaseDetailView({ model: model });
      this.caseDetailContainer.html(caseDetailView.render().el);
    },
  });
  console.log("AppRouter initialized");
  // Initialize the router and start Backbone history
  window.appRouter = new AppRouter();
  Backbone.history.start();
});
