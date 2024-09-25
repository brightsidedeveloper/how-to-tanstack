import { Card, CardContent } from '@/components/ui/shadcn/ui/card'
import { Carousel as RCoursel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/shadcn/ui/carousel'

export default function Carousel() {
  return (
    <RCoursel
      opts={{
        loop: true,
      }}
      className="w-[50%] max-w-xs"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem className="@lg:basis-1/3" key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </RCoursel>
  )
}
