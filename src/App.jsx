import GalleryGrid from "./components/Gallery/GalleryGrid"

function App() {
 

  return (
    <div  className="flex h-screen">
          <div className="overflow-y-scroll border-r">
            <GalleryGrid/>
          </div>

    </div>
  )
}

export default App
