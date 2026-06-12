interface StarRatingProps {
  stars: 0 | 1 | 2 | 3
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }

export default function StarRating({ stars, size = 'md' }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map(i => (
        <span key={i} className={`${sizeMap[size]} ${i <= stars ? 'text-yellow-400' : 'text-gray-600'}`}>
          ★
        </span>
      ))}
    </div>
  )
}
