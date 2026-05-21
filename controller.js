import { Model } from "./model.js";
import { View } from "./view.js";

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        
        this.editingIndex = null; 
        this.currentFilter = "Wszystkie"; 

        this.view.bindAdd(() => this.handleAddOrEdit());
        this.view.bindDelete((index) => this.handleDelete(index));
        this.view.bindEdit((index) => this.handleEditClick(index));
        
        this.view.bindFilter((category) => {
            this.currentFilter = category;
            this.refreshList();
        });

        this.refreshList();
    }


    refreshList() {
        let items = this.model.getItems();
        let processedItems = items.map((item, index) => {
            return { ...item, originalIndex: index };
        });

        if (this.currentFilter !== "Wszystkie") {
            processedItems = processedItems.filter(item => item.category === this.currentFilter);
        }

        this.view.render(processedItems);
        this.view.updateCounter(processedItems.length);
    }

    handleEditClick(index) {
        this.editingIndex = index; 
        const item = this.model.getItems()[index];
        this.view.setFormForEdit(item.name, item.expiryDate, item.details, item.category);
    }

    handleAddOrEdit() {
        const values = this.view.getInputValue();

        if (values.name.trim() === "" || values.expiryDate === "") {
            alert("Musisz podać nazwę i datę!");
            return;
        }

        if (this.editingIndex !== null) {
            this.model.editItem(this.editingIndex, values.name, values.expiryDate, values.details, values.category);
            this.editingIndex = null; 
        } else {
            this.model.addItem(values.name, values.expiryDate, values.details, values.category);
        }

        this.refreshList(); 
        this.view.clearInput();
    }

    handleDelete(index) {
        this.model.removeItem(index);
        
        if(this.editingIndex == index) {
            this.editingIndex = null;
            this.view.clearInput();
        }
        
        this.refreshList();
    }
}