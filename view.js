export class View {
    constructor() {
        this.inputName = document.getElementById("inputName");
        this.inputDate = document.getElementById("inputDate");
        this.inputDetails = document.getElementById("inputDetails"); 
        this.inputCategory = document.getElementById("inputCategory"); // NOWE
        this.filterCategory = document.getElementById("filterCategory"); // NOWE
        
        this.button = document.getElementById("btn");
        this.list = document.getElementById("list");
        this.counter = document.getElementById("counter");
    }

    getInputValue() { 
        return {
            name: this.inputName.value,
            expiryDate: this.inputDate.value,
            details: this.inputDetails.value,
            category: this.inputCategory.value // Zbieramy kategorie
        };
    }

    clearInput() { 
        this.inputName.value = "";
        this.inputDate.value = "";
        this.inputDetails.value = "";
        this.inputCategory.value = "Inne"; // Reset na domyślną
        this.button.textContent = "Dodaj"; 
    }

    setFormForEdit(name, date, details, category) { 
        this.inputName.value = name;
        this.inputDate.value = date;
        this.inputDetails.value = details || "";
        this.inputCategory.value = category || "Inne"; // Ustawienie kategorii
        this.button.textContent = "Zapisz zmiany"; 
    }

    bindAdd(handler) { 
        this.button.addEventListener("click", handler);
    }

    bindDelete(handler) { 
        this.list.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                handler(e.target.dataset.index);
            }
        });
    }

    bindEdit(handler) { 
        this.list.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit-btn")) {
                handler(e.target.dataset.index);
            }
        });
    }

    // NOWE: Funkcja nasłuchująca zmiany na dropdownie filtra
    bindFilter(handler) {
        this.filterCategory.addEventListener("change", (e) => {
            handler(e.target.value);
        });
    }

    render(items) {
        this.list.innerHTML = "";
        const today = new Date();
        today.setHours(0,0,0,0); 

        items.forEach((item, index) => {
            const li = document.createElement("li");
            const itemDate = new Date(item.expiryDate);

            const infoDiv = document.createElement("div");
            infoDiv.classList.add("item-info");

            const spanName = document.createElement("span");
            // Dodajemy mały badge z kategorią przed nazwą
            const categoryHTML = `<span class="category-badge">${item.category || "Inne"}</span>`;
            spanName.innerHTML = `${categoryHTML} ${item.name} (Data: ${item.expiryDate})`;
            
            if (itemDate < today) {
                spanName.classList.add("expired"); 
            }

            const spanDetails = document.createElement("span");
            spanDetails.classList.add("details-text");
            spanDetails.textContent = item.details ? item.details : "";

            infoDiv.appendChild(spanName);
            infoDiv.appendChild(spanDetails);

            const actionDiv = document.createElement("div");
            actionDiv.classList.add("item-actions");

            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.classList.add("edit-btn");
            // Uwaga techniczna: w filtrach index z tablicy przefiltrowanej może nie zgadzać się z indeksem w oryginalnej bazie. 
            // Najbezpieczniej przypisać oryginalny indeks z modelu, który obliczymy w kontrolerze.
            editBtn.dataset.index = item.originalIndex; 

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.dataset.index = item.originalIndex;

            actionDiv.appendChild(editBtn);
            actionDiv.appendChild(deleteBtn);

            li.appendChild(infoDiv);
            li.appendChild(actionDiv);

            this.list.appendChild(li);
        });
    }

    updateCounter(count) {
        this.counter.textContent = "Liczba: " + count;
    }
}