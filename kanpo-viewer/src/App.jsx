import { useState, useEffect } from "react";
import Header from "./components/Header";
import RSSFeedList from "./components/RSSFeedList";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [rssData, setRssData] = useState([]);
  const [tocData, setTocData] = useState([]);
  const [viewMode, setViewMode] = useState("simple"); // 'simple' or 'detailed'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rssResponse, tocResponse] = await Promise.all([
          fetch("./rss_data.json"),
          fetch("./rss_toc_data.json"),
        ]);

        if (!rssResponse.ok || !tocResponse.ok) {
          throw new Error("データの取得に失敗しました");
        }

        const rssJson = await rssResponse.json();
        const tocJson = await tocResponse.json();

        setRssData(rssJson);
        setTocData(tocJson);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentData = viewMode === "simple" ? rssData : tocData;

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* サイドバー */}
          <aside className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* <ThemeSelector /> */}

              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-lg">表示モード</h2>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">簡易版（ページ毎）</span>
                      <input
                        type="radio"
                        name="viewMode"
                        className="radio radio-primary"
                        checked={viewMode === "simple"}
                        onChange={() => setViewMode("simple")}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">詳細版（目次毎）</span>
                      <input
                        type="radio"
                        name="viewMode"
                        className="radio radio-primary"
                        checked={viewMode === "detailed"}
                        onChange={() => setViewMode("detailed")}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-lg">RSSフィード</h2>
                  <div className="space-y-2">
                    <a
                      href="https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed.xml"
                      className="btn btn-outline btn-sm w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📥 簡易版RSS
                    </a>
                    <a
                      href="https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/feed_toc.xml"
                      className="btn btn-outline btn-sm w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📥 詳細版RSS
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-lg">統計情報</h2>
                  <div className="stats stats-vertical shadow">
                    <div className="stat">
                      <div className="stat-title">簡易版</div>
                      <div className="stat-value text-2xl">
                        {rssData.length}
                      </div>
                      <div className="stat-desc">件</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">詳細版</div>
                      <div className="stat-value text-2xl">
                        {tocData.length}
                      </div>
                      <div className="stat-desc">件</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <div className="flex-1">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && (
              <RSSFeedList data={currentData} viewMode={viewMode} />
            )}
          </div>
        </div>
      </main>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div>
          <p className="flex items-center justify-center gap-2">
            <strong>官報RSS Viewer</strong>
            <a
              href="https://github.com/testkun08080/kanpo-rss"
              className="btn btn-ghost btn-circle btn-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </p>
          <p>本RSSは非公式のものであり、正確性を保証するものではありません。</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
