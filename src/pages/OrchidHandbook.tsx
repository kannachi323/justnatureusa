import { Book, type BookState } from '../components/Book';
import { useState } from 'react';

export default function OrchidHandbook() {

  function handleBookState(bookState: BookState) {
    setBookState({
      currPageNum: bookState.currPageNum,
      isOpen: bookState.isOpen,
    })
  }

  

  const [bookState, setBookState] = useState({
    currPageNum: 0, 
    isOpen: false,
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 flex flex-col justify-center items-center"
        style={bookState.isOpen ? { display: 'none' } : { display: 'flex'}}
      >
        <h1 className="text-9xl font-bold text-[#e3bc9e]">Welcome.</h1>
        <h2 className="text-lg text-gray-600 mt-2">Explore the beauty and care of orchids</h2>
      </div>

      <Book handleBookState={handleBookState}/>
    </div>
  );
}
