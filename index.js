const url = "https://dummyjson.com/users";
let currentPage = 1;
const itemsPerPage = 5;
let totalPages = 0;

async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

function renderData(data, page = 1) {
  const row = document.getElementById("main_row");
  row.innerHTML = ""; 

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.users.slice(start, end);

  const cards = paginatedData.map((result) => `
    <div class="col-md-4">
      <div class="wrapper_card" id="card">
        <div class="img_box">
          <img id="img" src=${result.image} alt="">
        </div>
        <h2 class="Name" id="Name">${result.firstName}</h2>
        <span class="age" id="age">${result.age}</span>
        <span class="gender" id="gender">${result.gender}</span>
        <p class="birthDate" id="birthDate">${result.birthDate}</p>
        <p class="phone" id="phone">${result.phone}</p>
      </div>
    </div>
  `).join('');
  row.innerHTML = cards;

  renderPagination(data.users.length);
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; 
  totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
    <li class="link${page === currentPage ? ' active' : ''}" value="${page}" onclick="goToPage(${page})">${page}</li>
  `).join('');
  pagination.innerHTML = pageButtons;
}

function goToPage(page) {
  currentPage = page;
  getData().then((data) => renderData(data, currentPage));
}

function backBtn() {
  if (currentPage > 1) {
    currentPage--;
    getData().then((data) => renderData(data, currentPage));
  }
}

function nextBtn() {
  if (currentPage < totalPages) {
    currentPage++;
    getData().then((data) => renderData(data, currentPage));
  }
}

getData().then((data) => renderData(data, currentPage));
