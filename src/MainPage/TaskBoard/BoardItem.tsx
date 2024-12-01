import { useState } from 'preact/hooks';
import './BoardItem.less';
import { Modal } from './Modal';
import { EditTitle } from './EditTitle';
import { Priority } from '../../todos';
import { ItemText } from './ItemText';

export type BoardItemProps = {
    title: string;
    onDelete: () => void;
    onMove: (state: string) => void;
    onEditTitle: (newTitle: string) => void;
    onSaveDate: (date: Date) => void;
    deadline?: Date; // Add this prop to accept the initial deadline
    prio?: Priority; // Add this prop to accept the initial deadline
    onEditPriority: (newPriority: Priority) => void;


};

export function BoardItem({ title, onDelete, onMove, onEditTitle, onSaveDate, deadline, prio, onEditPriority }: BoardItemProps) {
    const [showModal, setShowModal] = useState(false);
    const [showMoveModal, setMoveModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [moveModalPosition, setmoveModalPosition] = useState({ top: 0, left: 0 });
    const [isEditing, setIsEditing] = useState(false); // Track if the item is in edit mode
    const [editedTitle, setEditedTitle] = useState(title); // Track the edited title
    const [selectedDate, setSelectedDate] = useState(deadline ? deadline : null); // Track the selected date


    const [showPriorityModal, setPriorityModal] = useState(false);
    const [priorityModalPosition, setPriorityModalPosition] = useState({ top: 0, left: 0 });


    const openModal = (e: MouseEvent) => {
        e.preventDefault();
        const button = e.target as HTMLElement;
        const rect = button.getBoundingClientRect();
        const isCloseToRightEdge = window.innerWidth - rect.right < 200;
        const newLeft = isCloseToRightEdge
            ? rect.left + window.scrollX - 230
            : rect.right + window.scrollX + 10;

        setModalPosition({
            top: rect.top + window.scrollY,
            left: newLeft,
        });
        setShowModal(true);
    };

    const openMoveModal = (e: MouseEvent) => {
        e.preventDefault();
        const button = e.target as HTMLElement;
        const rect = button.getBoundingClientRect();
        const isCloseToRightEdge = window.innerWidth - rect.right < 200;
        const newLeft = isCloseToRightEdge
            ? rect.left + window.scrollX - 230
            : rect.right + window.scrollX + 15;

        setmoveModalPosition({
            top: rect.top + window.scrollY,
            left: newLeft,
        });
        setMoveModal(true);
    };

    const openPriorityModal = (e: MouseEvent) => {
        e.preventDefault();
        const button = e.target as HTMLElement;
        const rect = button.getBoundingClientRect();
        const isCloseToRightEdge = window.innerWidth - rect.right < 200;
        const newLeft = isCloseToRightEdge
            ? rect.left + window.scrollX - 230
            : rect.right + window.scrollX + 15;

        setPriorityModalPosition({
            top: rect.top + window.scrollY,
            left: newLeft,
        });
        setPriorityModal(true);
    };

    const closeModal = () => setShowModal(false);
    const closeMoveModal = () => setMoveModal(false);
    const closePriorityModal = () => setPriorityModal(false);

    const handleEditPriority = (newPriority: Priority) => {
        onEditPriority(newPriority);
        closePriorityModal();
    };

    const handleEditName = () => {
        setIsEditing(true); // Switch to edit mode
        setShowModal(false); // Close the modal
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            onEditTitle(editedTitle.trim()); // Save the new title
        }
        setIsEditing(false); // Exit edit mode
    };

    const handleCancelEdit = () => {
        setEditedTitle(title); // Revert changes
        setIsEditing(false); // Exit edit mode
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = new Date((e.target as HTMLInputElement).value); // Convert string to Date object
        setSelectedDate(selected); // Update state with the selected date
        console.log("Selected date:", selected.toISOString().slice(0, 10));
    };

    const saveDate = () => {
        if (selectedDate) {
            onSaveDate(selectedDate); // Call the save callback with the selected date
            setShowModal(false); // Close the modal after saving
        }
    };

    return (
        <div className={`BoardItem ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
                <EditTitle
                    value={editedTitle}
                    onChange={(e) => setEditedTitle((e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') handleCancelEdit();
                    }}
                    editTask={handleSaveEdit}
                    cancelNewTask={handleCancelEdit}
                />
            ) : (
                <>

                    <ItemText title={title} deadline={deadline} prio={prio}/>

                    <button onClick={(e) => openModal(e)}>
                        <span class="material-symbols-outlined">edit</span>
                    </button>

                    {showModal && (
                        <Modal position={modalPosition} onClose={closeModal}>
                            <ul className="DropdownOptions">
                                <li onClick={handleEditName}>Edit name</li>
                                <li onClick={() => { }}>Change date <br /> <input
                                    type="date"
                                    onChange={handleDateChange}
                                />
                                    <button onClick={saveDate}>Save Date</button> </li>
                                <li onClick={(e) => openMoveModal(e)}>Move</li>
                                <li onClick={(e) => openPriorityModal(e)}>Edit Priority</li>
                                <li onClick={onDelete}>Delete</li>
                            </ul>
                        </Modal>
                    )}

                    {showMoveModal && (
                        <Modal position={moveModalPosition} onClose={closeMoveModal}>
                            <ul className="DropdownOptions">
                                <li onClick={() => { onMove('TODO'); closeMoveModal(); }}>TODO</li>
                                <li onClick={() => { onMove('IN PROGRESS'); closeMoveModal(); }}>IN PROGRESS</li>
                                <li onClick={() => { onMove('DONE'); closeMoveModal(); }}>DONE</li>
                            </ul>
                        </Modal>
                    )}

                    {showPriorityModal && (
                        <Modal position={priorityModalPosition} onClose={closePriorityModal}>
                            <ul className="DropdownOptions">
                                <li onClick={() => handleEditPriority(Priority.LOW)}>Low</li>
                                <li onClick={() => handleEditPriority(Priority.MEDIUM)}>Medium</li>
                                <li onClick={() => handleEditPriority(Priority.HIGH)}>High</li>
                            </ul>
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
}
