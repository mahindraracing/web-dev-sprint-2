import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  export function AccordionSustentability() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How is Mahindra Racing sustainable?</AccordionTrigger>
          <AccordionContent>
          Mahindra Racing focuses on electric vehicle technology, uses renewable energy in operations, and implements recycling practices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What electric mobility initiatives does Mahindra Racing support?</AccordionTrigger>
          <AccordionContent>
          Mahindra Racing promotes electric mobility through participation in Formula E and partnerships that advocate for sustainable transportation solutions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How does Mahindra Racing reduce its carbon footprint?</AccordionTrigger>
          <AccordionContent>
          The team reduces its carbon footprint by utilizing electric powertrains, optimizing logistics, and engaging in carbon offset programs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }