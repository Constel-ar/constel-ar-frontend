"use client"

import { Button } from "@/components/ui/button"
import { Menu, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full py-4 px-4 sm:px-6 bg-transparent">
      <nav className="max-w-5xl mx-auto flex items-center justify-between rounded-full bg-[color:var(--base-3)] border border-[color:var(--base-4)] px-6 py-3 shadow-none">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[color:var(--impact-1)]">trace</span>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 space-x-10">
          <a href="#" className="text-[color:var(--impact-1)] font-semibold transition-colors">
            Home
          </a>
          <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
            Campañas
          </a>
          <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
            Quienes somos
          </a>
          <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
            Testimonios
          </a>
          <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
            Contacto
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" className="rounded-full border border-[color:var(--impact-1)] text-[color:var(--impact-1)] bg-[color:var(--base-1)] hover:bg-[color:var(--base-3)] font-semibold px-4">
            <Link href="/login">
              Log-In
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 px-4 border-t border-[color:var(--base-4)]">
          <div className="flex flex-col space-y-4 pt-4">
            <a href="#" className="text-[color:var(--impact-1)] font-semibold transition-colors">
              Home
            </a>
            <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
              Campañas
            </a>
            <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
              Quienes somos
            </a>
            <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
              Testimonios
            </a>
            <a href="#" className="text-[color:var(--impact-1)] opacity-70 hover:opacity-100 transition-colors font-medium">
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
