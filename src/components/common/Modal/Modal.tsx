import React from 'react'
import './Modal.scss'

const Modal = ({ show, title, children, btnFunction, onClose }: any) => {

  if (!show) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn close-btn">Close</button>
          { btnFunction ? <button onClick={btnFunction.callback} className="btn close-btn">{btnFunction.name}</button> : null }
        </div>
      </div>
    </div>
  )
}

export default Modal