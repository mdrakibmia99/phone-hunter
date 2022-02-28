const searchPhone=()=>{
    const searchField= document.getElementById("search-input");
    const searchText=searchField.value;
    searchField.value="";
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    console.log(url);
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayPhoneResult(data.data));
};

const displayPhoneResult=(phones)=>{
    const cardId=document.getElementById("card-area");
phones.forEach((phone)=>{  
    console.log(phone); 
    const div=document.createElement("div");
    div.innerHTML=`
    <div class="col" onClick="PhoneInfomation('${phone.slug}')">
      <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand.slice(0,20)}</p>
        </div>
      </div>
    </div>
    `;
    cardId.appendChild(div);

});

};
const PhoneInfomation=(id)=>{
  const url=`https://openapi.programming-hero.com/api/phone/${id}`;
  console.log(url);
  fetch(url)
  .then(response=>response.json())
  .then(data=> displayPhoneDetails(data.data));
};

const displayPhoneDetails=(phone)=>{
  console.log(phone.mainFeatures,"hasibul");
    
  const cardId=document.getElementById("phoneDetails");
  cardId.textContent="";
  const div=document.createElement("div");

div.innerHTML=`
<div class="card" style="width: 18rem;">
<img src="${phone.image}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${phone.name}</h5>
<p class="card-text">${phone.name}</p>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
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

