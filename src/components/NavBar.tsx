

export function NavBar() {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-row justify-end items-center gap-15 w-1/3">
        <a href="/" className="text-2xl">Home</a>
        <a href="/gallery" className="text-2xl">Gallery</a>
 
      
      </div> 

      <div className="flex flex-row w-1/3 justify-center">
        <img src="/logo_cursive.png" alt="Logo" className="w-[256px] h-[148px] p-2" />
      </div>

       
      <div className="flex flex-row gap-15 w-1/3 items-center">
        <a href="/about" className="text-2xl">Orchid Care</a>
        <a href="/contact" className="text-2xl">Contact</a>
      </div>
    </div>
  )
}
