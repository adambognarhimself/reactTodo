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
    // Close the modal when pressing the Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

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
