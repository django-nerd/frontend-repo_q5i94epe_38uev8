export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-2 py-3">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${
              active === c
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
