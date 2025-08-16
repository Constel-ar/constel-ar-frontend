import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="py-24 lg:py-36 px-20 sm:px-24 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-left lg:text-left">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[color:#113021]">
              Next-Gen
              <br />
              Social impact
              <br />
              Platform
            </h1>

            <div className="flex justify-start">
              <Button className="bg-[color:var(--base-2)] text-[color:var(--impact-1)] hover:bg-[color:var(--base-3)] rounded-full px-8 py-4 text-xl font-semibold shadow-none">
                Donar ahora
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <Image
                src="/images/hero-image.webp"
                alt="Hero Section Image"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
