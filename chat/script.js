const url = "http://localhost:3000/data";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#data-table tbody");

    data.forEach(row => {
      const tr = document.createElement("tr");
      
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.words}</td>
      `;
      
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error("Error fetching data:", err);
  });