import { Link } from 'react-router-dom'
import '../css/header.css'

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="title">eFlea</h1>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/vendor/1">Vendor</Link>
      </nav>
      <div className="menu">Menu</div>
    </header>
  )
}
