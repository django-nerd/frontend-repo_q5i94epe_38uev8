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
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [playing, setPlaying] = useState(null)

  const categories = useMemo(() => {
    return Array.from(new Set(SAMPLE_VIDEOS.map((v) => v.category)))
  }, [])

  const filtered = useMemo(() => {
    return SAMPLE_VIDEOS.filter((v) => {
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory
      const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar onSearch={setSearch} />
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

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Built as a tasteful, safe video showcase using public‑domain and sample videos.
      </footer>
    </div>
  )
}
