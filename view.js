export class View {
    constructor() {
        this.inputName = document.getElementById("inputName");
        this.inputDate = document.getElementById("inputDate");
        this.inputDetails = document.getElementById("inputDetails"); 
        this.button = document.getElementById("btn");
        this.list = document.getElementById("list");
        this.counter = document.getElementById("counter");
    }

    getInputValue() { //Odsłyanie danych do kontrolera
        return {
            name: this.inputName.value,
            expiryDate: this.inputDate.value,
            details: this.inputDetails.value 
        };
    }

    clearInput() { //Czyszczenia danych z formularza
        this.inputName.value = "";
        this.inputDate.value = "";
        this.inputDetails.value = "";
        this.button.textContent = "Dodaj"; 
    }

    setFormForEdit(name, date, details) { //Pobieranie danych do edycji
        this.inputName.value = name;
        this.inputDate.value = date;
        this.inputDetails.value = details || "";
        this.button.textContent = "Zapisz zmiany"; 
    }

    bindAdd(handler) { //Nasłuchiwanie głównego przycisku
        this.button.addEventListener("click", handler);
    }

    bindDelete(handler) { //Przycisk delete
        this.list.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                handler(e.target.dataset.index);
            }
        });
    }

    bindEdit(handler) { //Przycisk eddit
        this.list.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit-btn")) {
                handler(e.target.dataset.index);
            }
        });
    }

    render(items) {
        this.list.innerHTML = "";
        const today = new Date();
        today.setHours(0,0,0,0); 

    items.forEach((item, index) => {
    const li = document.createElement("li");
    const itemDate = new Date(item.expiryDate);

    // Kontener na teksty (nazwa + szczgóły)
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("item-info");

    const spanName = document.createElement("span");
    spanName.textContent = `${item.name} (Data: ${item.expiryDate})`;
    if (itemDate < today) {
        spanName.classList.add("expired"); // Czerwony kolor 
    }

    const spanDetails = document.createElement("span");
    spanDetails.classList.add("details-text");
    spanDetails.textContent = item.details ? item.details : "";

    //Składnie diva w całość
    infoDiv.appendChild(spanName);
    infoDiv.appendChild(spanDetails);

    // Kontener na przyciski akcji
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("item-actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.dataset.index = index;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.index = index;

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    // Składanie LI w całość
    li.appendChild(infoDiv);
    li.appendChild(actionDiv);

    this.list.appendChild(li);
});
    }

    updateCounter(count) {
        this.counter.textContent = "Liczba produktów: " + count;
    }
}