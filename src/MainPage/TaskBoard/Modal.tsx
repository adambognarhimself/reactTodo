import { useEffect } from 'preact/hooks';
import './Modal.less';

export function Modal({
    children,
    onClose,
    position,
}: {
    children: React.ReactNode;
    onClose: () => void;
    position: { top: number; left: number };
}) {
// Effect hook to close the modal when the Escape key is pressed
useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
// Add the event listener when the component mounts and remove it when it unmounts
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
// Return the modal overlay with the modal content
    return (
        <div className="ModalOverlay" onClick={onClose}>
            <div
                className="ModalContent"
                style={{
                    top: position.top,
                    left: position.left,
                    position: 'absolute',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {children}
            </div>
        </div>
    );
}
