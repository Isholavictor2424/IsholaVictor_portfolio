function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top" aria-label="Decodius home">
          DECODIUS.
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Nav;