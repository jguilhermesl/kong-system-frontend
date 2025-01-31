import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { JSX } from 'react';

interface ICarouselProps {
  children: JSX.Element[];
  classNameItem?: string;
}

export const Carousel = ({ children, classNameItem }: ICarouselProps) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={16}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      className="mt-4"
    >
      {children.map((item) => (
        <SwiperSlide
          key={item.key}
          style={{
            height: 'auto',
          }}
          className={classNameItem}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
