// import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

const CarouselImage = ({ children: imgs }) => {
  const [curr, setCurr] = useState(0);

  // const prev = () => setCurr((curr) => (curr === 0 ? imgs.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === imgs.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const slideInterval = setInterval(next, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="carousel">
        <div
          className="images-show"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {imgs}
        </div>
      </div>
    </>
  );
};

export default CarouselImage;
