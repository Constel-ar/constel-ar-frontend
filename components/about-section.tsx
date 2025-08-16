export function AboutSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-80 h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 bg-background rounded-full mx-auto mb-4"></div>
                <div className="w-24 h-16 bg-background mx-auto"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Quienes somos?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis
              scelerisque. Eget orci integer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
