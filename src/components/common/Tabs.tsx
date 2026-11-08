interface TabItem {
  label: string
  eventKey: string
  children: React.ReactNode
}

interface TabsProps {
  activeKey: string
  onSelect: (eventKey: string) => void
  items: TabItem[]
  vertical?: boolean
}

export default function Tabs({
  activeKey,
  onSelect,
  items,
  vertical = false,
}: TabsProps) {
  return (
    <div className="d-flex">
      <div className={`nav ${vertical ? 'flex-column me-4' : 'mb-3'}`} role="tablist">
        {items.map((item) => (
          <button
            key={item.eventKey}
            type="button"
            className={`nav-link nav-tabs ${activeKey === item.eventKey ? 'active' : ''}`}
            data-bs-toggle="tab"
            onClick={() => onSelect(item.eventKey)}
            role="tab"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-content flex-fill">
        {items.map((item) => (
          <div
            key={item.eventKey}
            className={`tab-pane fade ${activeKey === item.eventKey ? 'show active' : ''}`}
            role="tabpanel"
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  )
}
