import { useCallback } from "react";
import type { PageFlip } from 'page-flip'


export type HTMLFlipBookRef = {
    pageFlip: () => PageFlip;
}

interface FlipEvent {
  data: number | string;
}


export interface BookState {
    currPageNum: number;
    isOpen: boolean;
    isEnd: boolean;
    totalPages: number;
}

export function getBookDimensions() {
    const width = window.innerWidth * 0.3;
    const height = window.innerHeight * 0.8;
    return { width, height };
}

export function useOnStateChange(book: React.RefObject<HTMLFlipBookRef | null>, bookState: BookState, handleBookState: (bookState: BookState) => void) {
  return useCallback((e: FlipEvent) => {
    if (e.data === 'user_fold' || e.data === 'flipping') {
      if (book.current) {
        handleBookState({
          currPageNum: bookState.currPageNum, // 👈 Don't update yet!
          isOpen: true,
          isEnd: false,
          totalPages: book.current.pageFlip().getPageCount(),
        });
      }
    } else if (e.data === 'read') {
      if (book.current) {
        const pgNum = book.current.pageFlip().getCurrentPageIndex();
        console.log('Current page number:', pgNum);
        const isOpen = pgNum > 0;
        const isEnd = pgNum === book.current.pageFlip().getPageCount() - 1;

        handleBookState({
          currPageNum: pgNum,
          isOpen,
          isEnd,
          totalPages: book.current.pageFlip().getPageCount(),
        });
      }
    }
  }, [handleBookState, bookState.currPageNum, book]);
}


export function handlePageFlip(pageNum: number, book: React.RefObject<HTMLFlipBookRef | null>) {
  if (book.current) {
    book.current.pageFlip().turnToPage(pageNum);
  }
}
