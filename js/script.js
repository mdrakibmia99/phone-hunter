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
