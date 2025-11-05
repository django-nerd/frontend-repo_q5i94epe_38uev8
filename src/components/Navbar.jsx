import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">VH</div>
          <span className="text-xl font-semibold tracking-tight">VideoHub</span>
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 w-full max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            Search
          </button>
        </form>
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">Upload</a>
          <a href="#" className="hover:text-gray-900">Login</a>
        </div>
      </div>
    </header>
  )
}
