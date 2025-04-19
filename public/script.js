$(document).ready(function () {
  loadTasks();

  $("#addTaskForm").submit(function (event) {
    event.preventDefault();
    const title = $("#title").val();
    const description = $("#description").val();

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((task) => {
        loadTasks();
        $("#addTaskForm")[0].reset();
      })
      .catch((error) => console.error("Error:", error));
  });

  function loadTasks() {
    $("#taskList").empty();
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((tasks) => {
        tasks.forEach((task) => {
          $("#taskList").append(
            `<li class="list-group-item">${task.title} - ${
              task.description || "No description"
            }</li>`
          );
        });
      })
      .catch((error) => console.error("Error:", error));
  }
});
