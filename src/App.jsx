import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import VideoGrid from './components/VideoGrid'
import VideoPlayer from './components/VideoPlayer'

// Curated, safe, public-domain and sample videos with reliable hosting
const SAMPLE_VIDEOS = [
  {
    id: '1',
    title: 'Big Buck Bunny — Blender Open Movie',
    channel: 'Blender Foundation',
    views: '2.3M',
    duration: '10:34',
    category: 'Animation',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: '2',
    title: 'Sintel — Durian Open Movie',
    channel: 'Blender Open Movies',
    views: '1.8M',
    duration: '14:48',
    category: 'Fantasy',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: '3',
    title: 'Elephants Dream — First Open Movie',
    channel: 'Blender Open Movies',
    views: '980K',
    duration: '10:54',
    category: 'Sci‑Fi',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '4',
    title: 'Tears of Steel — Blender Open Movie',
    channel: 'Blender Foundation',
    views: '3.1M',
    duration: '12:14',
    category: 'Sci‑Fi',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    avatar: 'https://i.pravatar.cc/100?img=23',
  },
  {
    id: '5',
    title: 'For Bigger Escape — Chromecast Ad',
    channel: 'Google Samples',
    views: '310K',
    duration: '00:59',
    category: 'Ads',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    id: '6',
    title: 'For Bigger Joyrides — Chromecast Ad',
    channel: 'Google Samples',
    views: '420K',
    duration: '01:02',
    category: 'Ads',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    avatar: 'https://i.pravatar.cc/100?img=7',
  },
]

export default function App() {
  const [videos, setVideos] = useState(SAMPLE_VIDEOS)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [playing, setPlaying] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [user, setUser] = useState(null)

  const categories = useMemo(() => {
    return Array.from(new Set(videos.map((v) => v.category)))
  }, [videos])

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory
      const q = search.trim().toLowerCase()
      const matchesSearch = !q || v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [videos, activeCategory, search])

  const handleLogout = () => {
    setUser(null)
  }

  const handleUpload = (data) => {
    const id = Date.now().toString()
    const newVideo = {
      id,
      title: data.title,
      channel: user?.name || 'You',
      views: '0',
      duration: data.duration || '00:30',
      category: data.category || 'Uncategorized',
      src: data.src,
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop',
      avatar: `https://i.pravatar.cc/100?u=${encodeURIComponent(user?.email || 'guest')}`,
    }
    setVideos((prev) => [newVideo, ...prev])
    setShowUpload(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar
        onSearch={setSearch}
        onUploadClick={() => setShowUpload(true)}
        onAuthClick={() => setShowLogin(true)}
        onLogout={handleLogout}
        user={user}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <section className="mt-4">
          <VideoGrid videos={filtered} onPlay={(v) => setPlaying(v)} />
        </section>
      </main>

      <VideoPlayer open={!!playing} video={playing} onClose={() => setPlaying(null)} />

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold">Login</h3>
              <p className="text-sm text-gray-500 mt-1">Demo-only login (no backend). Enter any name and email.</p>
            </div>
            <LoginForm
              onCancel={() => setShowLogin(false)}
              onSubmit={(vals) => {
                setUser({ name: vals.name, email: vals.email })
                setShowLogin(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold">Upload Video</h3>
              <p className="text-sm text-gray-500 mt-1">Paste a video URL to add it to your feed (demo-only).</p>
            </div>
            <UploadForm
              onCancel={() => setShowUpload(false)}
              onSubmit={(vals) => handleUpload(vals)}
            />
          </div>
        </div>
      )}

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Built as a tasteful, safe video showcase using public‑domain and sample videos.
      </footer>
    </div>
  )
}

function LoginForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handle = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email')
      return
    }
    setError('')
    onSubmit?.({ name: name.trim(), email: email.trim() })
  }

  return (
    <form onSubmit={handle} className="p-5 space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Jane Doe"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="jane@example.com"
        />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700">Continue</button>
      </div>
    </form>
  )
}

function UploadForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [src, setSrc] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState('')

  const handle = (e) => {
    e.preventDefault()
    if (!title.trim() || !src.trim()) {
      setError('Title and video URL are required')
      return
    }
    setError('')
    onSubmit?.({ title: title.trim(), category: category.trim(), src: src.trim(), thumbnail: thumbnail.trim(), duration: duration.trim() })
  }

  return (
    <form onSubmit={handle} className="p-5 space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="My clip"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Travel"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="mm:ss"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Video URL</label>
        <input
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="https://.../video.mp4"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Thumbnail URL (optional)</label>
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="https://.../thumb.jpg"
        />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700">Add Video</button>
      </div>
    </form>
  )
}
