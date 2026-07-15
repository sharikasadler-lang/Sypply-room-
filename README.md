# 📦 Supply Room Inventory Manager

A simple, efficient web application to track and manage supplies in your supply room. Keep your inventory organized, monitor stock levels, and never run out of essential supplies.

## Features

✨ **Core Features**
- ➕ Add new items with categories and quantity
- 📊 Real-time statistics dashboard
- 🔍 Search and filter items by name or category
- ⚠️ Low stock alerts with customizable thresholds
- ➕➖ Quick quantity adjustments
- 💾 Automatic local storage (data persists in your browser)

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Usage

1. **Open the app**: Simply open `index.html` in your web browser
2. **Add an item**: 
   - Enter the item name (required)
   - Input the quantity (required)
   - Select a category (optional)
   - Set a minimum threshold for alerts (optional)
   - Click "Add Item"

3. **Manage inventory**:
   - Use the +/- buttons to quickly adjust quantities
   - Search items by name or category
   - Filter by category or stock status
   - Delete items you no longer need

4. **Monitor stock**:
   - View total items and quantities at a glance
   - See low stock item count
   - Items below their threshold are highlighted in red

## Categories

- Office Supplies
- Cleaning
- Technology
- Tools
- Safety
- Other

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- ✅ Your data persists even after closing the browser
- ✅ No internet connection required (offline-first)
- ⚠️ Data is specific to your browser and device
- 💡 Clearing browser data will erase your inventory

## Customization

You can customize the app by editing:
- **Categories**: Modify the `<option>` tags in `index.html`
- **Colors**: Change CSS variables in `styles.css` (`:root` section)
- **Functionality**: Extend the `InventoryManager` class in `script.js`

## Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage API
- **Responsive**: Works on desktop, tablet, and mobile devices
- **No Dependencies**: Zero external libraries required

## Keyboard Shortcuts

- Tab through form fields for quick data entry
- Enter to submit the form

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Tips for Best Use

1. **Set Minimum Thresholds**: Define when items should be reordered
2. **Regular Updates**: Keep quantities current for accurate tracking
3. **Organize Categories**: Use consistent category names
4. **Export Data**: Take screenshots for backup or sharing
5. **Regular Review**: Check low-stock alerts weekly

## Future Enhancements

Potential features for future versions:
- 📤 Import/Export functionality (CSV, JSON)
- 📊 Usage analytics and trends
- 🔔 Notifications and reminders
- 👥 Multi-user support with cloud sync
- 📱 Mobile app version
- 📈 Reorder history and forecasting

## License

This project is open source and available for personal and commercial use.

## Support

For issues, suggestions, or improvements, please open an issue in the repository.

---

**Happy organizing! 📦**
