import FeedList from "./components/Feed/FeedList"
import GalleryGrid from "./components/Gallery/GalleryGrid"

function App() {


  return (
    <div className="flex h-screen">
      <div className="overflow-y-scroll border-r">
        <GalleryGrid />
      </div>

      <div className="w-1/4">
        <FeedList />
      </div>

    </div>
  )
}

export default App
