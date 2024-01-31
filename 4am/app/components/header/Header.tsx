import "./header.css";

export default function Header() {
    return (
      <header className="main-header">
      <nav className="navigation-links">
        <a href="#about">About</a>
        <a href="#presale">Presale</a>
        <a href="https://axxis.gitbook.io/axxis-project/token-economics">Whitepaper</a>
        <a href="#faq">F.A.Q.</a>
      </nav>
      <button className="action-button">Coming soon</button>
    </header>
    );
  }
  
