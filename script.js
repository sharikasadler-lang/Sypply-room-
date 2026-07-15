// Supply Room Inventory Management App

class InventoryManager {
    constructor() {
        this.items = this.loadItems();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('itemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => this.render());
        document.getElementById('categoryFilter').addEventListener('change', () => this.render());
        document.getElementById('statusFilter').addEventListener('change', () => this.render());
    }

    addItem() {
        const name = document.getElementById('itemName').value.trim();
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        const category = document.getElementById('itemCategory').value || 'Other';
        const minThreshold = parseInt(document.getElementById('itemMinThreshold').value) || 0;

        if (!name || quantity < 1) {
            alert('Please fill in all required fields with valid values.');
            return;
        }

        // Check for duplicates
        if (this.items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            alert('This item already exists. Please update the existing item instead.');
            return;
        }

        const item = {
            id: Date.now(),
            name,
            quantity,
            category,
            minThreshold,
            dateAdded: new Date().toLocaleDateString(),
            lastUpdated: new Date().toLocaleDateString()
        };

        this.items.push(item);
        this.saveItems();
        this.resetForm();
        this.render();
        this.showNotification(`"${name}" added successfully!`, 'success');
    }

    updateItemQuantity(id, change) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity >= 0) {
                item.quantity = newQuantity;
                item.lastUpdated = new Date().toLocaleDateString();
                this.saveItems();
                this.render();
            }
        }
    }

    deleteItem(id) {
        const item = this.items.find(i => i.id === id);
        if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
            this.items = this.items.filter(i => i.id !== id);
            this.saveItems();
            this.render();
            this.showNotification(`"${item.name}" deleted successfully!`, 'success');
        }
    }

    getFilteredItems() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        return this.items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || item.category === categoryFilter;
            const matchesStatus = !statusFilter || 
                (statusFilter === 'low' && item.quantity <= item.minThreshold) ||
                (statusFilter === 'in-stock' && item.quantity > item.minThreshold);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    updateStats() {
        const totalItems = this.items.length;
        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const lowStockCount = this.items.filter(item => item.quantity <= item.minThreshold && item.minThreshold > 0).length;

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalQuantity').textContent = totalQuantity;
        document.getElementById('lowStockCount').textContent = lowStockCount;
    }

    render() {
        this.updateStats();
        this.renderInventoryList();
    }

    renderInventoryList() {
        const inventoryList = document.getElementById('inventoryList');
        const filteredItems = this.getFilteredItems();

        if (filteredItems.length === 0) {
            inventoryList.innerHTML = '<p class="empty-state">No items match your filters.</p>';
            return;
        }

        inventoryList.innerHTML = filteredItems.map(item => this.createItemElement(item)).join('');
    }

    createItemElement(item) {
        const isLowStock = item.quantity <= item.minThreshold && item.minThreshold > 0;
        const stockBadge = isLowStock 
            ? `<span class="low-stock-badge">⚠️ Low Stock</span>` 
            : `<span class="normal-stock-badge">✓ In Stock</span>`;

        return `
            <div class="inventory-item ${isLowStock ? 'low-stock' : ''}">
                <div class="item-header">
                    <div class="item-name">${this.escapeHtml(item.name)}</div>
                    <span class="item-category">${this.escapeHtml(item.category)}</span>
                </div>

                <div class="item-details">
                    <div class="detail-row">
                        <span class="detail-label">Quantity:</span>
                        <span class="detail-value">${item.quantity}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Min. Threshold:</span>
                        <span class="detail-value">${item.minThreshold || '—'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span>
                        <span>${stockBadge}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Last Updated:</span>
                        <span class="detail-value" style="font-size: 0.9em;">${item.lastUpdated}</span>
                    </div>
                </div>

                <div class="quantity-controls">
                    <button class="btn-small" onclick="inventoryManager.updateItemQuantity(${item.id}, -1)">−</button>
                    <div class="quantity-display">${item.quantity}</div>
                    <button class="btn-small" onclick="inventoryManager.updateItemQuantity(${item.id}, 1)">+</button>
                </div>

                <div class="item-actions">
                    <button class="btn-edit" onclick="inventoryManager.deleteItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    resetForm() {
        document.getElementById('itemForm').reset();
    }

    saveItems() {
        localStorage.setItem('supplyRoomItems', JSON.stringify(this.items));
    }

    loadItems() {
        const saved = localStorage.getItem('supplyRoomItems');
        return saved ? JSON.parse(saved) : [];
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#16a34a' : '#2563eb'};
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
let inventoryManager;
document.addEventListener('DOMContentLoaded', () => {
    inventoryManager = new InventoryManager();
});
