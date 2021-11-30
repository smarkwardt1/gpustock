fetch("./data/search_data.json")
.then((response) => response.json())
.then((data) => {
  buildTable(data);
});

function buildTable(data) {
var table = document.getElementById("table-data");

for (var i = 0; i < data.length; i++) {
  var row = `<tr>
                    <td>${data[i].store}</td>
                    <td>${data[i].name}</td>
        <td><a href="${data[i].url}" target="_blank"><img src="./images/link.png" alt="Link Icon"></a></td>
      <td id="price">${data[i].price}</td>
              </tr>`;
  table.innerHTML += row;
}
}