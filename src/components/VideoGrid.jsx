import VideoCard from './VideoCard'

export default function VideoGrid({ videos, onPlay }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} onPlay={onPlay} />
      ))}
    </div>
  )
}
