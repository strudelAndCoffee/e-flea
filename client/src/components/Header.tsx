import { Link } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import '../css/header.css'

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="title">eFlea</h1>

      <Popover className="cart">
        <Popover.Button>Cart</Popover.Button>
        <Popover.Panel className="cart-panel"></Popover.Panel>
      </Popover>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/vendor/1">Vendor</Link>
      </nav>
    </header>
  )
}
