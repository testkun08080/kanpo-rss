import { useState, useEffect } from 'react'
import RSSItem from './RSSItem'

function RSSFeedList({ data, viewMode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date') // 'date' or 'title'
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const itemsPerPage = 10

  // タグの種類を抽出
  const getItemType = (title) => {
    if (title.includes("本紙")) return "本紙";
    if (title.includes("号外")) return "号外";
    if (title.includes("政府調達")) return "政府調達";
    if (title.includes("告示")) return "告示";
    if (title.includes("政令")) return "政令";
    if (title.includes("省令")) return "省令";
    return "その他";
  };

  // 利用可能なタグを取得
  const availableTags = [...new Set(data.map(item => getItemType(item.title)))];

  // フィルタリング
  const filteredData = data.filter(item => {
    // テキスト検索
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // タグフィルタリング
    const matchesTag = selectedTag ? getItemType(item.title) === selectedTag : true;
    
    // 日付フィルタリング
    const itemDate = new Date(item.pub_date);
    const matchesStartDate = startDate ? itemDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? itemDate <= new Date(endDate) : true;
    
    return matchesSearch && matchesTag && matchesStartDate && matchesEndDate;
  })

  // ソート
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0
    
    if (sortBy === 'date') {
      const dateA = new Date(a.pub_date)
      const dateB = new Date(b.pub_date)
      comparison = dateA - dateB
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title, 'ja')
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // ページネーション
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    })
  }

  return (
    <div className="space-y-6">
      {/* 検索・ソート */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">🔍 検索</span>
              </label>
              <input
                type="text"
                placeholder="タイトルや内容で検索..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">📊 ソート</span>
              </label>
              <div className="flex gap-2">
                <select
                  className="select select-bordered"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">日付順</option>
                  <option value="title">タイトル順</option>
                </select>
                <button
                  className="btn btn-outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>

          <div className="divider my-2"></div>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* タグフィルター */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">🏷️ タグでフィルター</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedTag}
                onChange={(e) => {
                  setSelectedTag(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="">すべてのタグ</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            {/* 日付フィルター */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text">📅 期間でフィルター</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
                <span className="self-center">～</span>
                <div className="flex-1">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm opacity-70">
              {viewMode === 'simple' ? '簡易版' : '詳細版'} - 
              全{data.length}件中 {filteredData.length}件を表示
            </div>
            {(searchTerm || selectedTag || startDate || endDate) && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('')
                  setStartDate('')
                  setEndDate('')
                  setCurrentPage(1)
                }}
              >
                ✕ フィルターをクリア
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RSS項目リスト */}
      <div className="space-y-4">
        {paginatedData.length === 0 ? (
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body text-center">
              <p className="text-lg">該当する項目が見つかりませんでした</p>
              <p className="text-sm opacity-70">検索条件を変更してお試しください</p>
            </div>
          </div>
        ) : (
          paginatedData.map((item, index) => (
            <RSSItem 
              key={`${item.link}-${index}`} 
              item={item} 
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              «
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  className={`join-item btn ${currentPage === pageNum ? 'btn-active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RSSFeedList