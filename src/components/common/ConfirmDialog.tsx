interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: 'primary' | 'danger' | 'warning' | 'success'
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Está seguro de continuar?',
  confirmLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  confirmVariant = 'primary',
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant}`}
              onClick={() => {
                onConfirm()
                onClose()
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </div>
  )
}
