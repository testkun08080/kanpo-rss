function RSSItem({ item, viewMode }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getItemType = (title) => {
    if (title.includes('本紙')) return { type: '本紙', color: 'badge-primary' }
    if (title.includes('号外')) return { type: '号外', color: 'badge-secondary' }
    if (title.includes('政府調達')) return { type: '政府調達', color: 'badge-accent' }
    if (title.includes('告示')) return { type: '告示', color: 'badge-info' }
    if (title.includes('政令')) return { type: '政令', color: 'badge-success' }
    if (title.includes('省令')) return { type: '省令', color: 'badge-warning' }
    return { type: 'その他', color: 'badge-neutral' }
  }

  const itemType = getItemType(item.title)

  const handleLinkClick = (url) => {
    // 新しいタブで開く
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className={`badge ${itemType.color} badge-sm`}>
                {itemType.type}
              </div>
              <div className="text-sm opacity-70">
                {formatDate(item.pub_date)}
              </div>
            </div>
            
            <h3 className="card-title text-lg mb-3 leading-relaxed">
              {item.title}
            </h3>
            
            <p className="text-base-content/80 mb-4 leading-relaxed">
              {item.description}
            </p>
            
            <div className="card-actions justify-between items-center">
              <div className="flex items-center gap-2 text-sm opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>官報公式サイト</span>
              </div>
              
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleLinkClick(item.link)}
              >
                📄 閲覧する
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* サムネイル的な要素 */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-base-200 rounded-lg flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="官報" 
                className="w-10 h-10 opacity-60"
              />
            </div>
          </div>
        </div>
        
        {/* 詳細版の場合の追加情報 */}
        {viewMode === 'detailed' && (
          <div className="mt-4 pt-4 border-t border-base-300">
            <div className="flex flex-wrap gap-2">
              <div className="badge badge-outline badge-sm">詳細版</div>
              <div className="text-xs opacity-60">
                目次項目別に分割された情報
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RSSItem