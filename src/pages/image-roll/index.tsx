import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const PriceBoard = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent
        className='h-screen w-screen'
      >
        <CarouselItem >
          <img
            src='/images/price-board.jpg'
            alt='price-board'
            className='h-full w-full object-fill'
          />
        </CarouselItem>
        <CarouselItem className='h-screen w-screen'>
          <img
            src='/images/hiper-center.png'
            alt='hiper'
            className='h-full w-full object-fill'
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}

export default PriceBoard
