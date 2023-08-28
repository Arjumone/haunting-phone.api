const loadPhone = async(searchText,isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText ='';

    const btnShowAll = document.getElementById('btn-show-all') 
    if(phones.length >12 && !isShowAll){
        btnShowAll.classList.remove('hidden')
    }
    else{
        btnShowAll.classList.add('hidden')
    }

    if(!isShowAll){
        phones= phones.slice(0,6);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div')
        phoneCard.classList= `card bg-base-100 shadow-xl`
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchText = document.getElementById('searchText').value;
    // console.log(searchField);
    loadPhone(searchText,isShowAll);
    
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else(
        loadingSpinner.classList.add('hidden')
    )
}

const handleShowAll = () =>{
    handleSearch(true)
}

const handleShowDetails =async(id) =>{
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone)=>{
    // console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name')
    phoneName.innerText=phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML=`
    <img src="${phone.image}"/>
    <p>${phone.mainFeatures?.storage}</p>
    `
    show_details_modal.showModal()

}

// loadPhone()




