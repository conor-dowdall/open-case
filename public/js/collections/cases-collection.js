jQuery(function () {
  window.Cases = Backbone.Collection.extend({
    model: Case,
    url: "/api/cases",
  });

  window.casesCollection = new Cases(); // Instantiate globally for simplicity in this example
});
