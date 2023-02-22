import { useState } from 'react'

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)

  return (
    <div className="cart-container">
      <button onClick={() => setOpenCart((prev) => !prev)}>Cart</button>

      <div className={openCart ? 'cart-panel-overlay' : 'hide'}>
        <div className="cart-panel">
          <button className="close-cart-btn" onClick={() => setOpenCart(false)}>
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}
