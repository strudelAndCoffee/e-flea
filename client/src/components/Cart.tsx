import { useState } from 'react'

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)

  return (
    <div className="cart-container">
      <button
        className="open-cart-btn"
        onClick={() => setOpenCart((prev) => !prev)}
      >
        Cart
      </button>

      <div className={`cart-panel-overlay ${!openCart && 'close'}`}>
        <div className={`cart-panel ${!openCart && 'close'}`}>
          <button className="close-cart-btn" onClick={() => setOpenCart(false)}>
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}
