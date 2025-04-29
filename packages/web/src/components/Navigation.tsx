const Navigation = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold">
          MISSILE<span className="text-primary">CHAT</span>
        </a>
      </div>

      <div className="navbar-end gap-2">
        <a className="btn btn-outline">LOGIN</a>
        <a className="btn btn-primary">SIGNUP</a>
      </div>
    </nav>
  )
}

export default Navigation
