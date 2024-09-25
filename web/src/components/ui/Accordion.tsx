import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as RAccordion } from './shadcn/ui/accordion'

export default function Accordion() {
  return (
    <RAccordion type="single" collapsible className="w-full max-w-[600px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>Yes. But you should Venmo me @Tim-Vanlerberg</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>This is so awesome</AccordionTrigger>
        <AccordionContent>Facts.</AccordionContent>
      </AccordionItem>
    </RAccordion>
  )
}
