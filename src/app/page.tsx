import Hero from '@/components/home/Hero'
import ImageCarousel from '@/components/home/ImageCarousel'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ImageCarousel />
      <WhyChooseUs />
    </main>
  )
}
