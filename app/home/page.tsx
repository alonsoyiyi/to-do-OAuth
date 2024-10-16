import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function ToDo() {
    return (
        <>
            <h1>Mi lista de quehaceres</h1>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                        <Button variant="outline">Button</Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
        // usuario ponga una tarea (form) .post
        // Lista de tarea (accordion) en otro file que sea la base y llame a la base de datos
        // quitar tareas (button) .delete
    )
};