import styles from "@/components/Modal/modal.module.scss"

interface ModalProps {
    message: string;
    onClose: () => void;
    color?: string;
    background?: string;
}

const Modal: React.FC<ModalProps> = ({message, onClose, color, background}) => {
    return (
        <div className={styles.modalBackDrop} onClick={onClose}>
            <div 
                className={styles.modalContent}  
                style={{ backgroundColor: background }} 
                onClick={(e) => e.stopPropagation()}>
            <p 
                className={styles.modalMessage} 
                style={{color}}>{message}
            </p>
            </div>
        </div>
    );
};

export default Modal;

