const url = "https://dummyjson.com/users";
let currentPage = 1;
const itemsPerPage = 6;

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
  }
}

function renderData(data, page = 1) {
  const row = document.getElementById("main_row");
  row.innerHTML = ""; 

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.users.slice(start, end);

  paginatedData.forEach((result) => {
    const card = `
      <div class="col-md-4">
        <div class="wrapper_card" id="card">
          <div class="img_box">
            <img id="img" src=${result.image} alt="${result.firstName}">
          </div>
          <h2 class="Name" id="Name">${result.firstName}</h2>
          <span class="age" id="age">${result.age}</span>
          <span class="gender" id="gender">${result.gender}</span>
          <p class="birthDate" id="birthDate">${result.birthDate}</p>
          <p class="phone" id="phone">${result.phone}</p>
        </div>
      </div>
    `;
    row.innerHTML += card;
  });
}

function renderPagination(totalItems) {
  const pageNumbers = document.getElementById("pageNumbers");
  pageNumbers.innerHTML = ""; 

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      getData().then((data) => renderData(data, currentPage));
    });
    pageNumbers.appendChild(pageButton);
  }
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getData().then((data) => renderData(data, currentPage));
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  getData().then((data) => {
    const totalItems = data.users.length;
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      renderData(data, currentPage);
    }
  });
});

getData().then((data) => {
  renderData(data, currentPage);
  renderPagination(data.users.length);
});
