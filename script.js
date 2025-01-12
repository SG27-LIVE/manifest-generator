document.addEventListener('DOMContentLoaded', () => {
  const manifestForm = document.getElementById('manifestForm');
  const awbNumberField = document.getElementById('awbNumber');
  const manifestDateField = document.getElementById('manifestDate');
  const productNameField = document.getElementById('productName');

  const updateDate = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    manifestDateField.value = formattedDate;
    return currentTime;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  updateDate(); // Set initial date

  const generateManifest = () => {
    const selectedProduct = productNameField.value;
    const awbNumbers = awbNumberField.value.split('\n').map(num => num.trim());
    const manifestDate = manifestDateField.value;
    const currentTime = getCurrentTime();

    let manifestDetails = `
      <table border="1">
        <caption><strong style="text-transform: uppercase; font-size: 18px;">Manifest - ${selectedProduct} (${manifestDate} ${currentTime})</strong></caption>
        <thead>
          <tr>
            <th>No.</th>
            <th>AWB Number</th>
            <th>No.</th>
            <th>AWB Number</th>
            <th>No.</th>
            <th>AWB Number</th>
            <th>No.</th>
            <th>AWB Number</th>
            <th>No.</th>
            <th>AWB Number</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Generate rows with 5 entries (No. and AWB Number) per row
    for (let i = 0; i < awbNumbers.length; i += 5) {
      manifestDetails += '<tr>';
      for (let j = 0; j < 5; j++) {
        if (awbNumbers[i + j]) {  // Check if there's an AWB Number
          manifestDetails += `<td>${i + j + 1}</td><td>${awbNumbers[i + j]}</td>`;
        } else {
          manifestDetails += `<td></td><td></td>`;  // Fill the remaining empty cells
        }
      }
      manifestDetails += '</tr>';
    }

    manifestDetails += `</tbody></table>`;

    // Add courier details
    manifestDetails += `
      <p><strong>Courier Person Name:</strong> ${courierName}</p>
      <p><strong>Courier Person Contact Details:</strong> ${courierContact}</p>
      <p><strong>Courier Person Signature:</strong> ${courierSignature}</p>
      <p><strong>Number of Shipment:</strong> ${awbNumbers.length}</p>
      <p><strong>Date of Pick Up:</strong> ${manifestDate}</p>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Manifest</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 0;
            margin: 0;
            line-height: 1.4;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          caption {
            text-align: left;
            font-weight: bold;
            margin-bottom: 10px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        ${manifestDetails}
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Event listener for form submission
  manifestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    generateManifest();
  });
});
