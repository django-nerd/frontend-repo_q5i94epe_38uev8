import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import VideoGrid from './components/VideoGrid'
import VideoPlayer from './components/VideoPlayer'

const SAMPLE_VIDEOS = [
  {
    id: '1',
    title: 'Big Buck Bunny — Open Movie by Blender Foundation',
    channel: 'Blender Foundation',
    views: '2.3M',
    duration: '10:34',
    category: 'Animation',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
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
    thumbnail: 'https://images.unsplash.com/photo-1526318472353-8a807b7e3a7b?q=80&w=1200&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: '3',
    title: 'Elephant Dream — First Open Movie',
    channel: 'Blender Open Movies',
    views: '980K',
    duration: '10:54',
    category: 'Sci-Fi',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '4',
    title: 'For Bigger Dreams — Chromecast Ad',
    channel: 'Google Samples',
    views: '420K',
    duration: '01:02',
    category: 'Ads',
    src: 'https://images.unsplash.com/photo-1654525481543-c4621b0bcdb0?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGb3IlMjBCaWdnZXIlMjBEcmVhbXMlMjAlRTIlODAlOTR8ZW58MHwwfHx8MTc2MjM3Mjc1N3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523935332167-3c9183d047de?q=80&w=1200&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/100?img=7',
  },
  {
    id: '5',
    title: 'For Bigger Meltdowns — Chromecast Ad',
    channel: 'Google Samples',
    views: '310K',
    duration: '00:59',
    category: 'Ads',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    id: '6',
    title: 'Tears of Steel — Blender Open Movie',
    channel: 'Blender Foundation',
    views: '3.1M',
    duration: '12:14',
    category: 'Sci-Fi',
    src: 'https://images.unsplash.com/photo-1698700918022-e146aada86e1?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUZWFycyUyMG9mJTIwU3RlZWwlMjAlRTIlODAlOTR8ZW58MHwwfHx8MTc2MjM3Mjc1OHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1528460033278-a6ba57020470?q=80&w=1200&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/100?img=23',
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
        Built as a tasteful, safe video showcase using public-domain and sample videos.
      </footer>
    </div>
  )
}
