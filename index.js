let addItemButton = document.getElementById("add-button")
let modalOverlay = document.getElementById("modal-overlay")
let nameOfItem = document.getElementById("name-of-item")
let linkToItem = document.getElementById("link-of-item")
let descriptionOfItem = document.getElementById("description-of-item")
let closeIcon = document.getElementById("close-icon")
let form = document.getElementById("form")
let itemSection = document.getElementById("item-section")



// Reveal Modal Overlay
addItemButton.addEventListener("click", revealModalOverlay)
function revealModalOverlay(){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfItem.focus()
}

// Hide Modal Overlay
closeIcon.addEventListener("click", closeModalOverlay)
function closeModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")
    }
}


let researchItems = []
// Collect And Handle Form Data 
form.addEventListener("submit", handleFormData)
function handleFormData(event){
    event.preventDefault()

    // Input Data Collection
    let itemName = nameOfItem.value
    let itemLink = linkToItem.value
    let itemDescription = descriptionOfItem.value

    // Form Validation 

    const aCreatedItem = {
        itemNAME : itemName,
        itemLINK : itemLink,
        itemDESCRIPTION : itemDescription
    }
    researchItems.push(aCreatedItem)
    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    form.reset()
    closeModalOverlay()
    fetchItems()
}

// Fetch Data from Local Storage 
function fetchItems(){
    if(localStorage.getItem("itemsOfResearch")){
        researchItems = JSON.parse(localStorage.getItem("itemsOfResearch"))
    }
    printItemToUi()
}
fetchItems()

// Print fetched Data from LocalStorage to The UI
function printItemToUi(){
    // show and hide item section container holding the cards 
    if(researchItems.length === 0){
        itemSection.style.display = "none"
    }else{
        itemSection.style.display = "flex"
    }
    itemSection.innerHTML = ""
    researchItems.forEach(function(item){
        let itemNameTOPrint = item.itemNAME
        let itemLinkToPrint = item.itemLINK
        let itemDescriptionToPrint = item.itemDESCRIPTION

        let researchItemDiv = document.createElement("div")
        researchItemDiv.classList.add("research-item")

        let titleAndDeleteContainerDiv = document.createElement("div")
        titleAndDeleteContainerDiv.classList.add("title-and-delete-container")

        let itemTitle = document.createElement("a")
        itemTitle.setAttribute("href", `${itemLinkToPrint}`)
        itemTitle.setAttribute("target", "_blank")
        itemTitle.textContent = itemNameTOPrint
        
        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute("onclick", `deleteItem('${itemLinkToPrint}')`)

        let descriptionOfItemDiv = document.createElement("div")
        descriptionOfItemDiv.classList.add("description-of-item")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = itemDescriptionToPrint

        // Append element 
        descriptionOfItemDiv.append(descriptionText)
        titleAndDeleteContainerDiv.append(itemTitle, deleteIcon)
        researchItemDiv.append(titleAndDeleteContainerDiv, descriptionOfItemDiv)
        itemSection.append(researchItemDiv)
    })
}

// Delete Item from Array 
function deleteItem(researchLink){
    researchItems.forEach(function(item, index){
        if(item.itemLINK === researchLink){
            researchItems.splice(index, 1)
        }
    })
    // Re-render the UI with the updated version 
    localStorage.setItem("itemsOfResearch", JSON.stringify(researchItems))
    fetchItems()
}