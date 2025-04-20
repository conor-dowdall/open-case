jQuery(function () {
  window.Case = Backbone.Model.extend({
    defaults: {
      title: "",
      description: "",
    },
    urlRoot: "/api/cases",
  });
});
