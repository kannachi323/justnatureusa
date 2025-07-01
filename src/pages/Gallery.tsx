import { useState } from 'react';

export default function Gallery() {
  const [images] = useState<string[]>([
    '/IMG_5493.jpeg',
    '/IMG_6856.jpg',
    '/IMG_6906.jpg',    
  ]);

  return (
    <>
      {images.map((url, idx) => (
        <div
          key={idx}
          className="bg-center bg-cover h-screen"
          style={{ backgroundImage: `url(${url})` }}
        >
        </div>
      ))}
    </>
  );
}
