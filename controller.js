import { Model } from "./model.js";
import { View } from "./view.js";

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        
        // Zmienna trzymająca numer indeksu, jeśli jesteśmy w trybie edycji
        this.editingIndex = null; 

        this.view.bindAdd(() => this.handleAddOrEdit());
        this.view.bindDelete((index) => this.handleDelete(index));
        this.view.bindEdit((index) => this.handleEditClick(index));

        this.view.render(this.model.getItems());
        this.view.updateCounter(this.model.count());
    }

    // Odpala się po kliknięciu ikonki oówka
    handleEditClick(index) {
        this.editingIndex = index; // Zapisujemy, który element edytujemy
        const item = this.model.getItems()[index];
        this.view.setFormForEdit(item.name, item.expiryDate, item.details); // Wrzucamy do formularza
    }

    // Odpala się po kliknięciu przycisku Dodaj / Zapisz zmiany
    handleAddOrEdit() {
        const values = this.view.getInputValue();

        if (values.name.trim() === "" || values.expiryDate === "") {
            alert("Musisz podać nazwę i datę!");
            return;
        }

        if (this.editingIndex !== null) {
            // TRYB EDYCJI: Podmieniamy stare dane
            this.model.editItem(this.editingIndex, values.name, values.expiryDate, values.details);
            this.editingIndex = null; // Wychodzimy z trybu edycji
        } else {
            // TRYB DODAWANIA: Tworzymy nowy produkt
            this.model.addItem(values.name, values.expiryDate, values.details);
        }

        this.view.render(this.model.getItems());
        this.view.updateCounter(this.model.count());
        this.view.clearInput();
    }

    handleDelete(index) {
        this.model.removeItem(index);
        this.view.render(this.model.getItems());
        this.view.updateCounter(this.model.count());
        
        // Zabezpieczenie: jeśli usuwamy element, który właśnie edytujemy, przerwij edycję
        if(this.editingIndex == index) {
            this.editingIndex = null;
            this.view.clearInput();
        }
    }
}