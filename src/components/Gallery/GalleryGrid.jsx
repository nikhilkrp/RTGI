import React from 'react'
import ImageCard from './ImageCard'
import { useImages } from '../../hooks/useImages';

function GalleryGrid() {
  const { data, fetchNextPage
    , hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useImages();
  if (isLoading) {
    return <p className='text-center mt-10'>Loading images...</p>
  } if (isError) {
    return <p className="text-center text-red-500">Failed to load images</p>;
  }
  return (
    <div className='p-4'>
      <div className=' grid md:grid-cols-5  grid-cols-3 gap-3'>
        {data?.pages?.map((page) => page.map((image) => (<ImageCard key={image.id} image={image} />)))}
      </div>

      {hasNextPage && (
        <div className='flex justify-center mt-6'>
          <button onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className='px-4 py-2 bg-black text-white rounded'
            >
            {isFetchingNextPage ? "Loading ..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryGrid
