import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  export function AccordionHistory() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>When was Mahindra founded?</AccordionTrigger>
          <AccordionContent>
          Mahindra was founded in 1945 as a steel trading company in India, initially focusing on vehicle manufacturing.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What was Mahindra's first vehicle?</AccordionTrigger>
          <AccordionContent>
          Mahindra’s first vehicle was the Mahindra Jeep, produced in 1954 under license from Willys, which marked its entry into the automotive industry.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How did Mahindra expand over the years?</AccordionTrigger>
          <AccordionContent>
          Over the years, Mahindra expanded into various sectors, including agriculture, aerospace, and information technology, becoming a global conglomerate.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }