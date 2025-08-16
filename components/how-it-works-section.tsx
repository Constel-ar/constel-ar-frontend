export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Donec vitae.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect",
    },
    {
      number: "2",
      title: "Donec vitae.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect",
    },
    {
      number: "3",
      title: "Donec vitae.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc vestibulum ect",
    },
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Como lo hacemos ?</h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center space-y-4">
              <div className="text-8xl font-bold text-foreground">{step.number}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
