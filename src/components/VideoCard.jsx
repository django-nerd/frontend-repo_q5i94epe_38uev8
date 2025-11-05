export default function VideoCard({ video, onPlay }) {
  return (
    <div className="group cursor-pointer" onClick={() => onPlay(video)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 text-xs font-medium bg-black/70 text-white px-2 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="mt-2 flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          <img src={video.avatar} alt="" className="h-full w-full object-cover"/>
        </div>
        <div>
          <h3 className="line-clamp-2 font-medium text-gray-900 group-hover:text-gray-700">
            {video.title}
          </h3>
          <p className="text-sm text-gray-500">
            {video.channel} • {video.views} views
          </p>
        </div>
      </div>
    </div>
  )
}
