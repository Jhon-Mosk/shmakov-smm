import './style.css';

export default function Modal(message) {
    const handleClose = () => {
        document.getElementById('modal').classList.toggle('modal__show');
        /*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
        location.reload();
    }

    return (
        <div id="modal" className="modal modal__show">
            <div className="modal__backdrop" data-dismiss="modal">
                <div className="modal__content">
                    <div className="modal__header">
                        <div className="modal__body" data-modal="content">{message.message}</div>
                        <span className="modal__btn-close" onClick={handleClose} data-dismiss="modal" title="Закрыть">×</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
