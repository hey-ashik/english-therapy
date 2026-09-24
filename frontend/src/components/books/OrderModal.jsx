import { useState } from 'react';

import Modal from '../ui/Modal.jsx';
import DistrictField from '../ui/DistrictField.jsx';
import { BOOK_PRICE, SHIPPING_INSIDE_DHAKA, SHIPPING_OUTSIDE_DHAKA } from '../../data/books.js';
import { trackEvent } from '../../lib/analytics.js';
import { submitOrder } from '../../lib/api.js';

function shippingLabel(shipping) {
  const area = shipping === SHIPPING_INSIDE_DHAKA ? 'Inside' : 'Outside';
  return `Delivery Charge (${area} Dhaka): ${shipping.toFixed(2)}৳`;
}

/**
 * Cash-on-delivery order form for a single book.
 */
export default function OrderModal({ book, onClose, onPlaced }) {
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(SHIPPING_OUTSIDE_DHAKA);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const subtotal = BOOK_PRICE * quantity;
  const total = subtotal + shipping;

  function handleDistrict(district) {
    setShipping(district === 'Dhaka' ? SHIPPING_INSIDE_DHAKA : SHIPPING_OUTSIDE_DHAKA);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');

    const form = event.currentTarget;
    const fields = form.elements;
    const orderNumber = `ET-${Date.now().toString(36).toUpperCase()}`;

    const order = {
      orderNumber,
      name: fields.name.value,
      phone: fields.phone.value,
      altPhone: fields.altPhone.value,
      email: fields.email.value,
      district: fields.district.value,
      address: fields.address.value,
      deliveryNote: fields.deliveryNote.value,
      product: book.title,
      quantity,
      unitPrice: BOOK_PRICE,
      subtotal,
      shipping,
      shippingMethod: shippingLabel(shipping).split(':')[0],
      total,
      currency: 'BDT',
    };

    trackEvent('book_order_submit', { book_name: book.title, quantity, value: total, currency: 'BDT' });

    try {
      await submitOrder(order);
      onPlaced(order);
    } catch {
      setError('We could not send your order. Please try again or contact us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      backdropClass="order-modal-backdrop"
      panelClass="order-modal"
      closeClass="order-close"
      closeLabel="Close order form"
      labelledBy="order-title"
      onClose={onClose}
    >
      <header className="order-modal-header">
        <p className="eyebrow eyebrow--gold">Your next page</p>
        <h2 id="order-title">Complete your order</h2>
        <p>Share your details and our team will call shortly to confirm your book order.</p>
      </header>

      <div className="order-modal-body">
        <form className="order-form" id="book-order-form" onSubmit={handleSubmit}>
          <label>
            Full name <sup>*</sup>
            <input name="name" required placeholder="Enter first name" />
          </label>
          <div className="order-form-row">
            <label>
              Phone <sup>*</sup>
              <input name="phone" required type="tel" placeholder="Enter phone number" />
            </label>
            <label>
              Alternative Mobile Number
              <input name="altPhone" type="tel" placeholder="Enter alternative mobile number" />
            </label>
          </div>
          <div className="order-form-row">
            <label>
              Email Address
              <input name="email" type="email" placeholder="Enter email address" />
            </label>
            <DistrictField onChange={handleDistrict} />
          </div>
          <label>
            Street address <sup>*</sup>
            <input name="address" required placeholder="House number and street name" />
          </label>
          <div className="order-form-row">
            <label>
              Quantity <sup>*</sup>
              <input
                name="quantity"
                required
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              />
            </label>
            <div className="shipping-note">
              <span>Shipping</span>
              <strong>{shippingLabel(shipping)}</strong>
            </div>
          </div>
          <label>
            Delivery Note (Optional)
            <textarea name="deliveryNote" placeholder="Write delivery note" />
          </label>
          {error && <p className="order-error">{error}</p>}
          <button className="mobile-place-order button button--dark" type="submit" disabled={submitting}>
            {submitting ? 'Placing order…' : 'Place order'} <span>{total}.00৳</span>
          </button>
        </form>

        <aside className="order-summary">
          <h3>Your order</h3>
          <div className="summary-card">
            <div className="summary-labels">
              <span>PRODUCT</span>
              <span>SUBTOTAL</span>
            </div>
            <div className="summary-product">
              <img src={book.image} alt="" />
              <div>
                <strong>{book.title}</strong>
                <span>× {quantity}</span>
              </div>
              <b>{subtotal.toFixed(2)}৳</b>
            </div>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}৳</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>{shippingLabel(shipping)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{total.toFixed(2)}৳</strong>
            </div>
            <div className="cash-box">
              <strong>Cash on delivery</strong>
              <span>Pay with cash upon delivery.</span>
            </div>
            <p className="privacy-note">
              Your personal data will be used to process your order and support your experience throughout
              this website.
            </p>
            <button
              className="place-order button"
              type="submit"
              form="book-order-form"
              disabled={submitting}
            >
              ▣ {submitting ? 'Placing order…' : 'Place order'} {total.toFixed(2)}৳
            </button>
          </div>
        </aside>
      </div>
    </Modal>
  );
}
