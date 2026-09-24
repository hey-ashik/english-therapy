/**
 * Order confirmation + invoice preview shown after a book order is placed.
 */
export default function OrderInvoice({ order, onClose }) {
  async function downloadPdf() {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const element = document.querySelector('.invoice-preview');
    if (!element) return;
    pdf.html(element, {
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      callback: (doc) => doc.save(`english-therapy-invoice-${order.orderNumber}.pdf`),
    });
  }

  return (
    <div className="invoice-screen">
      <div className="invoice-card">
        <button className="invoice-close" type="button" aria-label="Close invoice" onClick={onClose}>
          ×
        </button>
        <div className="invoice-success-icon">✓</div>
        <h1>Order Placed!</h1>
        <p className="invoice-thanks">Thank you for shopping with English Therapy.</p>

        <div className="invoice-preview">
          <div className="invoice-preview-header">
            <div>
              <span>INVOICE PREVIEW</span>
              <strong>{order.total.toFixed(2)}৳</strong>
            </div>
            <b>
              English <em>Therapy</em>
            </b>
          </div>
          <div className="invoice-meta">
            <div>
              <span>CUSTOMER</span>
              <strong>{order.name}</strong>
              <p>{order.phone}</p>
            </div>
            <div>
              <span>DELIVERY</span>
              <strong>{order.district}</strong>
              <p>{order.address}</p>
            </div>
          </div>
          <div className="invoice-lines">
            <div className="invoice-product">
              <strong>{order.product}</strong>
              <b>{order.subtotal.toFixed(2)}৳</b>
              <span>
                Quantity: {order.quantity} × {order.unitPrice.toFixed(2)}৳
              </span>
            </div>
            <div className="invoice-row">
              <span>Shipping</span>
              <span>{order.shipping.toFixed(2)}৳</span>
            </div>
            <div className="invoice-row invoice-total">
              <strong>Total</strong>
              <strong>{order.total.toFixed(2)}৳</strong>
            </div>
          </div>
          <p className="invoice-message">
            We have received your order. Our team will contact you shortly to confirm delivery details.
          </p>
        </div>

        <div className="invoice-actions">
          <button className="invoice-action invoice-action--red" type="button" onClick={() => window.print()}>
            ▣ PRINT
          </button>
          <button className="invoice-action invoice-action--red" type="button" onClick={downloadPdf}>
            ⇩ DOWNLOAD
          </button>
          <button className="invoice-action invoice-action--dark" type="button" onClick={onClose}>
            Back to Home
          </button>
          <button className="invoice-action invoice-action--light" type="button" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
