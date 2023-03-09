const loadPhones = async (searchField, dataLImit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLImit);
}

const displayPhones = (phones, dataLImit) => {

    const phoneContainer = document.getElementById("phone-contaiiner");
    phoneContainer.innerHTML = "";
    const showBtn = document.getElementById("btn-ShowAll");
    if (dataLImit && phones.length > 10) {
        phones = phones.slice(0, 12);
        showBtn.classList.remove("d-none");
    }
    else {
        showBtn.classList.add("d-none");
    };

    const noPhone = document.getElementById("no-found-message");
    if (phones.length === 0) {
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }
    phones.forEach(phone => {

        // console.log(phone)
        const divCreate = document.createElement("div");
        divCreate.classList.add("col");
        divCreate.innerHTML = `
        
            
         <div class="card p-4">
            <img class="img-fluid w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                     <h5 class="card-title">${phone.phone_name}</h5>
                     <p class="card-text">This is a longer card with supporting text below as a natural
                     lead-in to additional content. This content is a little bit longer.</p>
                     <button onclic="loadPhoneDetails('${phone.slug}'" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal")">Go somewhere</button>
                </div>
         </div>
            
        
        `

        phoneContainer.appendChild(divCreate);
    });
    toggleSpinner(false);
}

const processSearch = (dataLImit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("searchField").value;
    loadPhones(searchField, dataLImit);
};

document.getElementById("btn-search").addEventListener("click", function () {
    processSearch(10);
});

document.getElementById("searchField").addEventListener("keypress" , function(e){
if(e.key === 'Enter'){
    processSearch(10);
}
});

const toggleSpinner = isToggle => {
    const loaderSection = document.getElementById("loader");
    if (isToggle) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
};

document.getElementById("button-showAll").addEventListener("click", function () {
    toggleSpinner(true);
    const searchField = document.getElementById("searchField").value;
    loadPhones(searchField);
});

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data);
};

const displayPhonesDetails = phone => {
    const modelTitle = document.getElementById("phoneModalLabel");
    modelTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.innerHTML =`
    <p> Realse Date : ${phone.realseDate} </p>
    `
}

loadPhones('apple');