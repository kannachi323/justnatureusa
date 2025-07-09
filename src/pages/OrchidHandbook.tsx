import { Book } from '../components/Book';
import { type BookState } from '../components/Book/helper';
import { useState } from 'react';

export default function OrchidHandbook() {

  function handleBookState(bookState: BookState) {
    setBookState({
      currPageNum: bookState.currPageNum,
      isOpen: bookState.isOpen,
      isEnd: bookState.isEnd,
      totalPages: bookState.totalPages,
    })
  }

  const [bookState, setBookState] = useState({
    currPageNum: 0, 
    isOpen: false,
    isEnd: false,
    totalPages: 4,
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-[90vh] w-full overflow-hidden">
      <div className={`
        absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 flex flex-col justify-center items-center
        transition-transform duration-300 ease-in-out
        ${
          bookState.isEnd
            ? 'translate-x-[100%]'
            : bookState.isOpen
              ? 'translate-x-1/2'
              : 'translate-x-0'
        }
      `}>
        {bookState.currPageNum === 0 && 
          <>
            <h1 className="text-9xl font-bold text-[#e3bc9e]">Welcome.</h1>
            <h2 className="text-lg text-gray-600 mt-2">Explore our vast orchid collection and </h2>
          </>
        }
        {bookState.currPageNum === bookState.totalPages - 1 && (
          <>
            <h1 className="text-9xl font-bold text-[#e3bc9e]">Thank you.</h1>
            <h2 className="text-lg text-gray-600 mt-2">If you have any questions, check out our contact page for more info.</h2>
          </>
        )}
       
      </div>

      <Book handleBookState={handleBookState} bookState={bookState}/>
      {bookState.currPageNum === 0 && 
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-[30px] flex flex-col items-center">
          <h2 className="text-lg text-gray-600 mb-2">Click or drag to turn the pages.</h2>
          <img src="/arrow.svg" alt="Arrow" className="w-8 h-8 mb-2 rotate-90" />
        </div>
    }
    </div>
  );
}



