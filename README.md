# pbggloballexim

A simple static website scaffold has been added to this repository.

## Files

- `index.html` — homepage layout
- `styles.css` — responsive styling
- `script.js` — button interaction

Open `index.html` in your browser to view the site.

## Store Enquiries in Google Sheets

The contact form is configured to POST to a Google Apps Script web app URL.

1. Create a Google Sheet with header row:
	 - `Timestamp`
	 - `Name`
	 - `Email`
	 - `Product`
	 - `Message`
2. Open **Extensions -> Apps Script** in that sheet.
3. Paste this script and save:

```javascript
function doPost(e) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
	var p = e.parameter;

	sheet.appendRow([
		p.submittedAt || new Date().toISOString(),
		p.name || '',
		p.email || '',
		p.product || '',
		p.message || ''
	]);

	return ContentService
		.createTextOutput(JSON.stringify({ ok: true }))
		.setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy it as a web app:
	 - **Deploy -> New deployment -> Web app**
	 - Execute as: `Me`
	 - Who has access: `Anyone`
5. Copy the web app URL and set it in `script.js`:

```javascript
const GOOGLE_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/your_script_id/exec';
```

After this, each enquiry is added to your Google Sheet.
