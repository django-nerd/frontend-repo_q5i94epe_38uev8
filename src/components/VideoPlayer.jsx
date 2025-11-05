import { X } from 'lucide-react'

export default function VideoPlayer({ open, video, onClose }) {
  if (!open || !video) return null

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full p-2 bg-white/90 shadow hover:bg-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="bg-black">
          <video
            src={video.src}
            controls
            autoPlay
            poster={video.thumbnail}
            className="w-full h-auto"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{video.channel} • {video.views} views</p>
        </div>
      </div>
    </div>
  )
}
