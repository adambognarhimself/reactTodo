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
// The BoardItem component is responsible for rendering a single todo item.
export function BoardItem({ title, onDelete, onMove, onEditTitle, onSaveDate, deadline, prio, onEditPriority }: BoardItemProps) {

    //States to check if the modal is open, the position of the modal, if the item is in edit mode, the edited title, 
    //the selected date, the position of the move modal, the position of the priority modal
    const [showModal, setShowModal] = useState(false);
    const [showMoveModal, setMoveModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [moveModalPosition, setmoveModalPosition] = useState({ top: 0, left: 0 });
    const [isEditing, setIsEditing] = useState(false); // Track if the item is in edit mode
    const [editedTitle, setEditedTitle] = useState(title); // Track the edited title
    const [selectedDate, setSelectedDate] = useState(deadline ? deadline : null); // Track the selected date

    
    const [showPriorityModal, setPriorityModal] = useState(false);
    const [priorityModalPosition, setPriorityModalPosition] = useState({ top: 0, left: 0 });

    // Function to open the modal for editing the task
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
// Function to open the modal for moving the task
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
// Function to open the modal for editing the task priority
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
// Function to close the modal for editing task details
    const closeModal = () => setShowModal(false);
    // Function to close the modal for moving the task
    const closeMoveModal = () => setMoveModal(false);
    // Function to close the modal for editing priority
    const closePriorityModal = () => setPriorityModal(false);
// Function to handle priority edit action and update priority
    const handleEditPriority = (newPriority: Priority) => {
        onEditPriority(newPriority);
        closePriorityModal();
    };
// Function to switch the task into editing mode
    const handleEditName = () => {
        setIsEditing(true); 
        setShowModal(false); 
    };
// Function to save the edited task title
    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            onEditTitle(editedTitle.trim()); 
        }
        setIsEditing(false); 
    };
// Function to cancel the title editing and revert changes
    const handleCancelEdit = () => {
        setEditedTitle(title); 
        setIsEditing(false);
    };

    // Function to handle the date change and update the selected date
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = new Date((e.target as HTMLInputElement).value); 
        setSelectedDate(selected); 
        console.log("Selected date:", selected.toISOString().slice(0, 10));
    };

    // Function to save the selected date and close the modal
    const saveDate = () => {
        if (selectedDate) {
            onSaveDate(selectedDate); 
            setShowModal(false); 
        }
    };
// Return the BoardItem component with the appropriate props
    return (
        <div className={`BoardItem ${isEditing ? 'editing' : ''}`}>
            {/*// If the item is in edit mode, render the EditTitle component, otherwise render the ItemText component */}
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
                    {/*// Render the ItemText component with the task details */}
                    <ItemText title={title} deadline={deadline} prio={prio}/>

                    <button onClick={(e) => openModal(e)}>
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    
                    {/*// If the modal is open, render the Modal component with the appropriate options */}
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
{/*// If the move modal is open, render the Modal component with the appropriate options */}
                    {showMoveModal && (
                        <Modal position={moveModalPosition} onClose={closeMoveModal}>
                            <ul className="DropdownOptions">
                                <li onClick={() => { onMove('TODO'); closeMoveModal(); }}>TODO</li>
                                <li onClick={() => { onMove('IN PROGRESS'); closeMoveModal(); }}>IN PROGRESS</li>
                                <li onClick={() => { onMove('DONE'); closeMoveModal(); }}>DONE</li>
                            </ul>
                        </Modal>
                    )}
{/*// If the priority modal is open, render the Modal component with the appropriate options */}
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
