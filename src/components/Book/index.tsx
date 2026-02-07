import HTMLFlipBook from 'react-pageflip';

import { useRef } from 'react';
import { OrchidCareOne, OrchidCareTwo } from './OrchidCare';
import { WhatWeOfferOne, WhatWeOfferTwo } from './WhatWeOffer';
import { FrontCover } from './FrontCover';
import { OrchidDefinition, TableOfContents } from './TableOfContents';
import { getBookDimensions, useOnStateChange, handlePageFlip, type BookState, type HTMLFlipBookRef } from './helper';


export interface Props {
  handleBookState: (bookState: BookState) => void;
  bookState: BookState;
}

export function Book({handleBookState, bookState} : Props) {

  const { width, height } = getBookDimensions();

  const book = useRef<HTMLFlipBookRef | null>(null);

  const onChangeState = useOnStateChange(book, bookState, handleBookState);

  return (
    <HTMLFlipBook
      ref={book} width={width} height={height} size="fixed" minWidth={100} maxWidth={600} minHeight={400}
      maxHeight={800} drawShadow={true} flippingTime={600} usePortrait={false} startZIndex={100} autoSize={true}
      maxShadowOpacity={0.2} showCover={true} mobileScrollSupport={true} clickEventForward={true} useMouseEvents={true}
      swipeDistance={100} showPageCorners={true} disableFlipByClick={false} className="" style={{ margin: 'auto' }} startPage={0}
      onChangeState={onChangeState}
    >
      {/*Front Cover*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <div className="absolute left-0 w-1/12 h-full bg-[#685749]" />
        <FrontCover />
      </div>
      
      {/*Page 1*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <TableOfContents handlePageFlip={handlePageFlip} book={book} />
        <b className="absolute bottom-0 left-0 m-3">1</b>
        <h2 className="absolute bottom-0 right-1/2 translate-x-1/2 text-[#685749] text-sm m-3">*click on any section to jump to it</h2>
      </div>

      {/*Page 2*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        
        {<OrchidDefinition />}
        <b className="absolute bottom-0 right-0 m-3">2</b>
      </div>

      {/*Page 3*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <WhatWeOfferOne />
        <b className="absolute bottom-0 left-0 m-3">3</b>
      </div>

      {/*Page 4*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <WhatWeOfferTwo />
        <b className="absolute bottom-0 left-0 m-3">4</b>
      </div>

      {/*Page 5*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <OrchidCareOne />
        <b className="absolute bottom-0 right-0 m-3">5</b>
      </div>

      {/*Page 6*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
        <OrchidCareTwo />
        <b className="absolute bottom-0 right-0 m-3">6</b>
      </div>

      {/*Page 7*/}
      <div className="relative w-full h-full bg-[#fbdcc5] border-[#ad9179] border-2">
      </div>


    </HTMLFlipBook>
  );
}