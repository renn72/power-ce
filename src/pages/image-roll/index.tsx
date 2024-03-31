import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { api } from '~/utils/api'

import { useEffect } from 'react'

const PriceBoard = () => {
  const { data: files } = api.files.getAll.useQuery();

  const utils = api.useUtils()

  useEffect(() => {
    setTimeout(() => {
      console.log('Files Refreshed')
      console.log(new Date().toLocaleTimeString(
        'en-US', { hour12: false }
      ))
      utils.files.getAll.invalidate();
    }, 1000 * 60 * 1) // 5 minutes
  }, [files])

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 15000,
        }),
      ]}
    >
      <CarouselContent
        className='h-screen w-screen'
      >
        {
          files?.files.map((file) => (
            <CarouselItem key={file.id}>
              <img
                src={`https://utfs.io/f/${file.key}`}
                alt={file.name}
                className="h-full w-full object-fill"
              />
            </CarouselItem>
          ))
        }
      </CarouselContent>
    </Carousel>
  )
}

export default PriceBoard
