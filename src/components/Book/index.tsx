import HTMLFlipBook from 'react-pageflip';
import { useCallback } from 'react';
import './styles.css';

export interface BookState {
    currPageNum: number;
    isOpen: boolean;
}

export function Book({handleBookState} : {handleBookState: (bookState: BookState) => void}) {
  function getBookDimensions() {
    const width = window.innerWidth * 0.3;
    const height = window.innerHeight * 0.8;
    return { width, height };
  }

  const { width, height } = getBookDimensions();

 

  interface FlipEvent {
    data: number | string;
  }

  const onFlip = useCallback((e: FlipEvent) => {
    console.log('Current page:', e.data);
  }, []);

  return (
    <HTMLFlipBook
      width={width}
      height={height}
      size="fixed"
      minWidth={100}
      maxWidth={600}
      minHeight={400}
      maxHeight={800}
      drawShadow={true}
      flippingTime={600}
      usePortrait={false}
      startZIndex={100}
      autoSize={true}
      maxShadowOpacity={0.1}
      showCover={true}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={30}
      showPageCorners={true}
      disableFlipByClick={false}
      className="flip-book"
      style={{ margin: 'auto' }}
      startPage={0}
      onFlip={(e) => onFlip(e)}
    >
      <div className="page">Page 1</div>
      <div className="page">Page 2</div>
      <div className="page">Page 3</div>
      <div className="page">Page 4</div>

    </HTMLFlipBook>
  );
}