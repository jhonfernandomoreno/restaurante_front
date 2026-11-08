interface AccordionItem {
  header: string
  children: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion mt-3" id="accordionMain">
      {items.map((item, index) => (
        <div key={index} className="accordion-item border">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
            >
              {item.header}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            data-bs-parent="#accordionMain"
          >
            <div className="accordion-body">{item.children}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
