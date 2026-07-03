// AERIUM — checkout / order completion (UI only).
// A sequenced, single-question-at-a-time flow: Contact → Shipping → Delivery → Payment,
// each step animating in with a progress stepper and an editable recap of prior answers.
// The order summary stays pinned alongside. "Place Order" swaps to a confirmation screen and
// clears the cart. Nothing is charged and no payment details are stored — this is a sample-site
// mock, consistent with the "checkout are placeholder" note in the OnePixel bar.

import { useState } from 'react';
import { Nav, Footer, OpxBar, EntryLoader, Arrow, Plus, useCart } from '../App.jsx';
import { clearCart, cartSubtotal, formatINR, lineKey } from '../cart.js';

const SHOP = '/case-studies/aerium/shop/';
const HOME = '/case-studies/aerium/';

const STEPS = [
  { key: 'contact', label: 'Contact' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'payment', label: 'Payment' },
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman & Nicobar Islands',
];

const PAY_METHODS = [['upi', 'UPI'], ['card', 'Card'], ['cod', 'Cash on Delivery']];

/* -------------------------------------------------------------------- bits -- */

function SummaryLine({ l }) {
  const meta = [l.color, l.size && `Size ${l.size}`].filter(Boolean).join(' · ');
  return (
    <div className="co-sum-line">
      <div className="co-sum-img">
        {l.img ? <img src={l.img} alt={l.name} /> : <span className="co-sum-ph" />}
        <span className="co-sum-qty">{l.qty}</span>
      </div>
      <div className="co-sum-info">
        <div className="co-sum-name">{l.name}</div>
        {meta && <div className="co-sum-meta">{meta}</div>}
      </div>
      <div className="co-sum-price">{formatINR((l.priceValue || 0) * l.qty)}</div>
    </div>
  );
}

function Stepper({ step, go }) {
  return (
    <div className="co-steps">
      {STEPS.map((s, i) => (
        <button
          key={s.key}
          type="button"
          className={`co-step-tab ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`}
          onClick={() => { if (i < step) go(i); }}
          disabled={i > step}
        >
          <span className="co-step-idx">{i < step ? '✓' : i + 1}</span>
          <span className="co-step-label">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function RecapRow({ label, value, onEdit }) {
  return (
    <div className="co-recap-row">
      <span className="co-recap-k">{label}</span>
      <span className="co-recap-v">{value || '—'}</span>
      <button type="button" className="co-recap-edit" onClick={onEdit}>Change</button>
    </div>
  );
}

function Confirmation({ order }) {
  const firstName = order.name ? order.name.split(' ')[0] : '';
  return (
    <section className="checkout-confirm">
      <div className="confirm-card">
        <span className="confirm-check" aria-hidden="true">✓</span>
        <div className="eyebrow">Order Confirmed <Plus /></div>
        <h1 className="confirm-title">Thank you{firstName ? `, ${firstName}` : ''}.</h1>
        <p className="confirm-sub">
          Your order <b>{order.orderNo}</b> is confirmed. A receipt and tracking details are on their
          way to <b>{order.email}</b>.
        </p>

        <div className="confirm-summary">
          {order.items.map((l) => <SummaryLine key={lineKey(l)} l={l} />)}
          <div className="co-sum-rows">
            <div className="co-sum-row"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
            <div className="co-sum-row"><span>Shipping</span><span>{order.shippingCost ? formatINR(order.shippingCost) : 'Free'}</span></div>
            <div className="co-sum-row co-sum-total"><span>Total Paid</span><span>{formatINR(order.total)}</span></div>
          </div>
        </div>

        <div className="confirm-actions">
          <a className="btn btn-solid" href={SHOP}>Continue Shopping <Arrow /></a>
          <a className="btn btn-ghost" href={HOME}>Back to Home</a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- app --- */

export default function CheckoutApp() {
  const items = useCart();
  const subtotal = cartSubtotal(items);

  const [step, setStep] = useState(0);
  const [ship, setShip] = useState('standard');
  const [pay, setPay] = useState('upi');
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '',
    address: '', address2: '', city: '', state: '', pin: '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [placed, setPlaced] = useState(null);

  const shippingCost = ship === 'express' ? 199 : 0;
  const total = subtotal + shippingCost;
  const methodLabel = ship === 'express' ? 'Express · ₹199' : 'Standard · Free';
  const shipTo = [form.address, form.city, form.state, form.pin].filter(Boolean).join(', ');

  const contactValid = !!form.email;
  const shippingValid = form.firstName && form.address && form.city && form.state && form.pin;
  const stepValid = [contactValid, shippingValid, true, true][step];
  const isLast = step === STEPS.length - 1;

  const go = (i) => { setStep(i); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const placeOrder = () => {
    const orderNo = 'AER-' + Math.floor(100000 + Math.random() * 900000);
    setPlaced({
      orderNo, email: form.email, name: `${form.firstName} ${form.lastName}`.trim(),
      items, subtotal, shippingCost, total,
    });
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const advance = (e) => {
    e.preventDefault();
    if (!stepValid) return;
    if (isLast) placeOrder();
    else go(step + 1);
  };

  /* current step body */
  const stepBody = () => {
    if (step === 0) {
      return (
        <>
          <h2 className="co-step-title">Contact</h2>
          <p className="co-step-sub">Where should we send your order updates?</p>
          <div className="co-grid">
            <label className="co-field co-col-2">
              <span className="co-label">Email</span>
              <input className="co-input" type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" autoFocus required />
            </label>
            <label className="co-field co-col-2">
              <span className="co-label">Phone <em>(for delivery updates)</em></span>
              <input className="co-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
            </label>
          </div>
        </>
      );
    }
    if (step === 1) {
      return (
        <>
          <h2 className="co-step-title">Shipping Address</h2>
          <p className="co-step-sub">Where are we shipping to?</p>
          <div className="co-grid">
            <label className="co-field">
              <span className="co-label">First Name</span>
              <input className="co-input" value={form.firstName} onChange={set('firstName')} placeholder="First name" autoFocus required />
            </label>
            <label className="co-field">
              <span className="co-label">Last Name</span>
              <input className="co-input" value={form.lastName} onChange={set('lastName')} placeholder="Last name" />
            </label>
            <label className="co-field co-col-2">
              <span className="co-label">Address</span>
              <input className="co-input" value={form.address} onChange={set('address')} placeholder="House no, building, street" required />
            </label>
            <label className="co-field co-col-2">
              <span className="co-label">Apartment, landmark <em>(optional)</em></span>
              <input className="co-input" value={form.address2} onChange={set('address2')} placeholder="Apartment, suite, landmark" />
            </label>
            <label className="co-field">
              <span className="co-label">City</span>
              <input className="co-input" value={form.city} onChange={set('city')} placeholder="City" required />
            </label>
            <label className="co-field">
              <span className="co-label">State</span>
              <select className="co-input co-select" value={form.state} onChange={set('state')} required>
                <option value="" disabled>Select state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="co-field">
              <span className="co-label">PIN Code</span>
              <input className="co-input" value={form.pin} onChange={set('pin')} inputMode="numeric" maxLength={6} placeholder="560001" required />
            </label>
          </div>
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <h2 className="co-step-title">Delivery Method</h2>
          <p className="co-step-sub">Choose how fast you want it.</p>
          <div className="co-delivery">
            <label className={`co-radio ${ship === 'standard' ? 'is-on' : ''}`}>
              <input type="radio" name="ship" checked={ship === 'standard'} onChange={() => setShip('standard')} />
              <div className="co-radio-body"><b>Standard</b><span>3 to 5 business days</span></div>
              <em className="co-radio-price">Free</em>
            </label>
            <label className={`co-radio ${ship === 'express' ? 'is-on' : ''}`}>
              <input type="radio" name="ship" checked={ship === 'express'} onChange={() => setShip('express')} />
              <div className="co-radio-body"><b>Express</b><span>1 to 2 business days</span></div>
              <em className="co-radio-price">₹199</em>
            </label>
          </div>
        </>
      );
    }
    return (
      <>
        <h2 className="co-step-title">Payment</h2>
        <p className="co-step-sub">How would you like to pay?</p>
        <div className="co-paytabs">
          {PAY_METHODS.map(([k, label]) => (
            <button key={k} type="button" className={`co-paytab ${pay === k ? 'is-on' : ''}`} onClick={() => setPay(k)}>{label}</button>
          ))}
        </div>

        {pay === 'upi' && (
          <div className="co-paybody co-grid">
            <label className="co-field co-col-2">
              <span className="co-label">UPI ID</span>
              <input className="co-input" placeholder="yourname@upi" />
            </label>
          </div>
        )}
        {pay === 'card' && (
          <div className="co-paybody co-grid">
            <label className="co-field co-col-2">
              <span className="co-label">Card Number</span>
              <input className="co-input" inputMode="numeric" placeholder="1234 5678 9012 3456" />
            </label>
            <label className="co-field co-col-2">
              <span className="co-label">Name on Card</span>
              <input className="co-input" placeholder="Full name" />
            </label>
            <label className="co-field">
              <span className="co-label">Expiry</span>
              <input className="co-input" placeholder="MM / YY" />
            </label>
            <label className="co-field">
              <span className="co-label">CVV</span>
              <input className="co-input" inputMode="numeric" maxLength={4} placeholder="123" />
            </label>
          </div>
        )}
        {pay === 'cod' && (
          <p className="co-cod">Pay in cash when your order arrives. Please keep exact change ready for the delivery partner.</p>
        )}

        <p className="co-secure"><span aria-hidden="true">🔒</span> Sample checkout for demonstration. No payment is processed and no card details are stored.</p>
      </>
    );
  };

  return (
    <>
      <EntryLoader mark="AERIUM" />
      <OpxBar />
      <div className="wire checkout-page">
        <Nav />

        {placed ? (
          <Confirmation order={placed} />
        ) : items.length === 0 ? (
          <section className="checkout-empty">
            <div className="eyebrow">Checkout <Plus /></div>
            <h1 className="checkout-empty-title">Your bag is empty.</h1>
            <p>Add a few pieces from the collection before checking out.</p>
            <a className="btn btn-solid" href={SHOP}>Shop the Collection <Arrow /></a>
          </section>
        ) : (
          <section className="checkout">
            <form className="checkout-main" onSubmit={advance}>
              <div className="checkout-head">
                <div className="eyebrow">Secure Checkout <Plus /></div>
              </div>

              <Stepper step={step} go={go} />

              {step > 0 && (
                <div className="co-recap">
                  <RecapRow label="Contact" value={form.email} onEdit={() => go(0)} />
                  {step > 1 && <RecapRow label="Ship to" value={shipTo} onEdit={() => go(1)} />}
                  {step > 2 && <RecapRow label="Method" value={methodLabel} onEdit={() => go(2)} />}
                </div>
              )}

              <div className="co-step" key={step}>
                {stepBody()}
              </div>

              <div className="co-nav">
                {step > 0
                  ? <button type="button" className="co-back" onClick={() => go(step - 1)}>← Back</button>
                  : <a className="co-back" href={SHOP}>← Continue Shopping</a>}
                <button type="submit" className="btn btn-acid co-next" disabled={!stepValid}>
                  {isLast ? <>Place Order · {formatINR(total)} <Arrow /></> : <>Continue <Arrow /></>}
                </button>
              </div>
            </form>

            <aside className="checkout-summary">
              <h2 className="co-sum-title">Order Summary</h2>
              <div className="co-sum-lines">
                {items.map((l) => <SummaryLine key={lineKey(l)} l={l} />)}
              </div>
              <div className="co-promo">
                <input className="co-input" placeholder="Discount code" />
                <button type="button" className="co-promo-btn">Apply</button>
              </div>
              <div className="co-sum-rows">
                <div className="co-sum-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="co-sum-row"><span>Shipping</span><span>{shippingCost ? formatINR(shippingCost) : 'Free'}</span></div>
                <div className="co-sum-row co-sum-total"><span>Total</span><span>{formatINR(total)}</span></div>
              </div>
              <p className="co-sum-tax">Inclusive of all taxes.</p>
            </aside>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
