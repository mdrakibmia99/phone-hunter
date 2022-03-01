// get for Phnone name using serach
const searchPhone = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  searchField.value = "";
  document.getElementById("phoneDetails").textContent = "";

  // spin start
  const bookLoading = document.getElementById("spinner");
  bookLoading.innerHTML = `
      <div class="spinner-border text-info m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
    `;

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayPhoneResult(
        data.data,
        data.data.length,
        data.data.slice(0, 20),
        searchText
      );
    });
};
// display all phones
const displayPhoneResult = (phones, totalPhone, customlength, searchText) => {
  if (searchText == "") {
    // spiner off
    const showTitle = document.getElementById("spinner");
    showTitle.innerHTML = "";
    document.getElementById("phone_not_avabile").innerText =
      "Please enter a phone name!!";
  } else {
    document.getElementById("showing").innerHTML = `
  <div class="text-center text-success">
    <span class="fw-bold">Total Phone Found:</span> ${totalPhone},
    <span class="fw-bold">Showing Results:</span> ${customlength.length}
  </div>`;

    const cardId = document.getElementById("card-area");
    const PhoneNotAvaileId = document.getElementById("phone_not_avabile");
    PhoneNotAvaileId.textContent = "";
    cardId.textContent = "";

    if (phones.length === 0) {
      PhoneNotAvaileId.innerText = "Result Not Founded!!";
    } else {
      customlength.forEach((phone) => {
        const div = document.createElement("div");
        div.innerHTML = `
      <div class="col " onClick="PhoneInfomation('${phone.slug}')">
        <div class="card ">
          <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <p class="card-text">Brand:${phone.brand}</p>
          </div>
        </div>
      </div>
      `;
        cardId.appendChild(div);
      });
    }
    // spiner off
    const showTitle = document.getElementById("spinner");
    showTitle.innerHTML = "";
  }
};
// phone information api get by phone Id
const PhoneInfomation = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};
// for display phone full informaiton
const displayPhoneDetails = (phone) => {
  const cardId = document.getElementById("phoneDetails");
  cardId.textContent = "";
  const div = document.createElement("div");

  div.innerHTML = `
<div class="card ">
<img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
<div class="card-body">
<h5 class="card-title fw-bold">${phone.name}</h5>
<p class="card-text"> ${phone.releaseDate}</p>
<p class="card-text">Brand:${phone.brand}</p>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    More Details..
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${phone.name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
    
         <p> Chip Set: ${phone.mainFeatures.chipSet} </p>
         <p> Display Size: ${phone.mainFeatures.displaySize} </p>
         <p> Memory: ${phone.mainFeatures.memory} </p>
         <p> Sensors: ${phone.mainFeatures.sensors} </p>
         <p> Storage: ${phone.mainFeatures.storage} </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



</div>
</div>`;
  cardId.appendChild(div);
};
