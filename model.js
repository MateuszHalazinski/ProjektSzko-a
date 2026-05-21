export class Model {
    constructor() {
        this.items = [];
        this.load();
    }

    // Dodano parametr category
    addItem(name, expiryDate, details, category) {
        this.items.push({ name: name, expiryDate: expiryDate, details: details, category: category });
        this.save();
    }
    
    editItem(index, name, expiryDate, details, category) {
        this.items[index] = { name: name, expiryDate: expiryDate, details: details, category: category };
        this.save();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.save();
    }

    getItems() {
        return this.items.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    }

    count() {
        return this.items.length;
    }

    save() {
        localStorage.setItem("fridge_items", JSON.stringify(this.items));
    }

    load() {
        const data = localStorage.getItem("fridge_items");
        this.items = data ? JSON.parse(data) : [];
    }
}