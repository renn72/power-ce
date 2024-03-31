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
  console.log("Files: ", files);

  const utils = api.useUtils()

  useEffect(() => {
    setTimeout(() => {
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
          delay: 5000,
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
