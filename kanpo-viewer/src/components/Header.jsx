function Header() {
  return (
    <header className="navbar bg-primary text-primary-content shadow-lg">
      <div className="container mx-auto">
        <div className="flex-1">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/images/logo.png"
              alt="官報ロゴ"
              className="object-contain w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold">官報RSS Viewer</h1>
              <p className="text-sm opacity-80">
                非公式 官報RSSフィード閲覧サイト
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="flex-none">
        <a
          href="https://www.kanpo.go.jp"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
        >
          📖 官報公式サイト
        </a>
      </div>
      <input type="checkbox" value="dark" className="toggle theme-controller" />
    </header>
  );
}

export default Header;
