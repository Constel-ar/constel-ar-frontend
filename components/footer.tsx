import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Sweetdeli</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">Contact us</p>
              <p>sweetdeli@gmail.com</p>
              <p>+1-2345-6789</p>
              <p>123 Ave, New York, USA</p>
            </div>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Products</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Auctor volutpat.</p>
              <p>Fermentum turpis.</p>
              <p>Mi consequat.</p>
              <p>Amet venenatis.</p>
              <p>Convallis porttitor.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">About</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Egestas vitae.</p>
              <p>Viverra lorem ac.</p>
              <p>Eget ac tellus.</p>
              <p>Erat nulla.</p>
              <p>Vulputate proin.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Get the app</h4>
            <div className="space-y-3">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                📱 Download on the App Store
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                📱 Get it on Google Play
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-sm text-muted-foreground">🌐 English</span>
          </div>
          <p className="text-sm text-muted-foreground">Copyright © 2020. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
