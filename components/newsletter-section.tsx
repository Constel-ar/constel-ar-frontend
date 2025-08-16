import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="text-muted-foreground">Get in Touch</p>
          <h2 className="text-4xl font-bold">Join Our Newsletter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis nisl, elementum elit orcu amet nec non eget
            felis. Eu ut cursus luctus nunc.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Your email" className="flex-1" />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">Subscribe</Button>
        </div>
      </div>
    </section>
  )
}
