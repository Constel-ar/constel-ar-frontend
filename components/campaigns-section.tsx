"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CampaignsSection() {
  const campaigns = [
    {
      id: 1,
      title: "Neque volutpat morbi.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      title: "Nueva campaña blockchain.",
      description: "Innovadora propuesta de financiamiento descentralizado para el futuro digital.",
    },
    {
      id: 3,
      title: "Proyecto sostenible.",
      description: "Iniciativa ecológica con tecnología blockchain para un mundo mejor.",
    },
    {
      id: 4,
      title: "Fintech revolucionario.",
      description: "Plataforma de pagos descentralizada que transformará las finanzas globales.",
    },
    {
      id: 5,
      title: "NFT Marketplace.",
      description: "Mercado de arte digital con tecnología blockchain de última generación.",
    },
    {
      id: 6,
      title: "DeFi Protocol.",
      description: "Protocolo de finanzas descentralizadas innovador para inversores modernos.",
    },
    {
      id: 7,
      title: "Smart Contracts.",
      description: "Contratos inteligentes para automatización empresarial y eficiencia operativa.",
    },
    {
      id: 8,
      title: "Crypto Exchange.",
      description: "Plataforma de intercambio de criptomonedas segura y confiable.",
    },
    {
      id: 9,
      title: "Blockchain Gaming.",
      description: "Juegos descentralizados con recompensas reales y economía digital.",
    },
    {
      id: 10,
      title: "Supply Chain.",
      description: "Trazabilidad de productos con blockchain para transparencia total.",
    },
    {
      id: 11,
      title: "Digital Identity.",
      description: "Sistema de identidad digital descentralizada para mayor seguridad.",
    },
    {
      id: 12,
      title: "Metaverse Platform.",
      description: "Mundo virtual con economía blockchain integrada y experiencias inmersivas.",
    },
    {
      id: 13,
      title: "Green Energy Token.",
      description: "Tokenización de energías renovables y sostenibles para el planeta.",
    },
    {
      id: 14,
      title: "AI Blockchain.",
      description: "Inteligencia artificial descentralizada en blockchain para el futuro.",
    },
    {
      id: 15,
      title: "IoT Integration.",
      description: "Internet de las cosas con tecnología blockchain para conectividad total.",
    },
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const itemsPerPage = 3
  const totalPages = Math.ceil(campaigns.length / itemsPerPage)

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
      setIsTransitioning(false)
    }, 150)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
      setIsTransitioning(false)
    }, 150)
  }

  const goToSlide = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const getCurrentCampaigns = () => {
    const startIndex = currentPage * itemsPerPage
    return campaigns.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <section className="py-16 px-4 bg-stone-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Campañas</h2>

        <div className="relative px-16">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full hover:bg-muted bg-white shadow-md border transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full hover:bg-muted bg-white shadow-md border transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
              isTransitioning ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
            }`}
          >
            {getCurrentCampaigns().map((campaign, index) => (
              <Card
                key={campaign.id}
                className="overflow-hidden border-0 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 bg-stone-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="h-48 bg-stone-300 flex items-center justify-center transition-all duration-300 hover:bg-stone-400">
                  <div className="w-16 h-12 bg-white rounded flex items-center justify-center transition-all duration-200 hover:scale-110">
                    <div className="text-center">
                      <div className="w-2 h-2 bg-stone-400 rounded-full mx-auto mb-1"></div>
                      <div
                        className="w-6 h-3 bg-stone-400 mx-auto"
                        style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-black">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{campaign.description}</p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button className="bg-green-700 text-white hover:bg-green-800 rounded-full px-8 py-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg">
                      Order Now
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
