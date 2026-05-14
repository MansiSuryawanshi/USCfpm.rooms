// Room and Equipment Data
const roomsData = [
    {
        name: "FPM101",
        equipment: ["ZoomTV", "Projector", "Keyboard & Mouse"]
    },
    {
        name: "CDF 105",
        equipment: ["Projector", "Keyboard & Mouse", "Monitor"]
    },
    {
        name: "VP Conference Room",
        equipment: ["ZoomTV"]
    },
    {
        name: "CDF 116",
        equipment: ["Projector", "Keyboard & Mouse", "Monitor"]
    },
    {
        name: "FPM150 Meeting Room 3",
        equipment: ["BigScreen TV"]
    },
    {
        name: "FHR",
        equipment: ["BigScreen TV", "Keyboard & Mouse"]
    },
    {
        name: "CDF 147",
        equipment: ["Projector", "BigScreen TV", "Keyboard & Mouse"]
    },
    {
        name: "CDF 145",
        equipment: ["BigScreen TV", "Wireless Keyboard & Mouse"]
    }
];

// State management
const state = {};

// Initialize state
roomsData.forEach(room => {
    state[room.name] = {
        equipment: {},
        comment: ""
    };
    room.equipment.forEach(item => {
        state[room.name].equipment[item] = "Yes"; // Default to working
    });
});

// DOM Elements
const roomsContainer = document.getElementById('rooms-container');
const doneBtn = document.getElementById('done-btn');
const reportModal = document.getElementById('report-modal');
const reportText = document.getElementById('report-text');
const copyBtn = document.getElementById('copy-btn');
const closeBtn = document.querySelector('.close-btn');

// Render Rooms
function renderRooms() {
    roomsContainer.innerHTML = '';
    
    roomsData.forEach(room => {
        const card = document.createElement('div');
        card.className = 'room-card status-all-clear';
        card.id = `card-${room.name.replace(/\s+/g, '-')}`;
        
        const title = document.createElement('div');
        title.className = 'room-title';
        title.textContent = room.name;
        card.appendChild(title);
        
        const eqList = document.createElement('div');
        eqList.className = 'equipment-list';
        
        room.equipment.forEach(item => {
            const eqItem = document.createElement('div');
            eqItem.className = 'equipment-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'equipment-name';
            nameSpan.textContent = item;
            eqItem.appendChild(nameSpan);
            
            const toggleGroup = document.createElement('div');
            toggleGroup.className = 'toggle-group';
            
            const yesBtn = document.createElement('button');
            yesBtn.className = 'toggle-btn yes active';
            yesBtn.textContent = 'Yes';
            yesBtn.onclick = () => setStatus(room.name, item, 'Yes', yesBtn, noBtn, card);
            
            const noBtn = document.createElement('button');
            noBtn.className = 'toggle-btn no';
            noBtn.textContent = 'No';
            noBtn.onclick = () => setStatus(room.name, item, 'No', yesBtn, noBtn, card);
            
            toggleGroup.appendChild(yesBtn);
            toggleGroup.appendChild(noBtn);
            eqItem.appendChild(toggleGroup);
            eqList.appendChild(eqItem);
        });
        
        card.appendChild(eqList);
        
        // Comment Box
        const commentContainer = document.createElement('div');
        commentContainer.className = 'comment-container';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'comment-box';
        textarea.placeholder = 'Add a comment...';
        textarea.oninput = (e) => {
            state[room.name].comment = e.target.value;
        };
        
        commentContainer.appendChild(textarea);
        card.appendChild(commentContainer);
        
        roomsContainer.appendChild(card);
    });
}

// Set Status
function setStatus(roomName, item, status, yesBtn, noBtn, card) {
    state[roomName].equipment[item] = status;
    
    if (status === 'Yes') {
        yesBtn.classList.add('active');
        noBtn.classList.remove('active');
    } else {
        noBtn.classList.add('active');
        yesBtn.classList.remove('active');
    }
    
    updateCardStatus(roomName, card);
}

// Update Card Color based on status
function updateCardStatus(roomName, card) {
    const roomState = state[roomName];
    const hasNo = Object.values(roomState.equipment).includes('No');
    
    if (hasNo) {
        card.classList.remove('status-all-clear');
        card.classList.add('status-has-issue');
    } else {
        card.classList.remove('status-has-issue');
        card.classList.add('status-all-clear');
    }
}

// Generate Report
function generateReport() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let report = `Date: ${dateStr}\n\n`;
    
    roomsData.forEach(room => {
        report += `${room.name}:\n`;
        const roomState = state[room.name];
        
        room.equipment.forEach((item, index) => {
            const letter = String.fromCharCode(97 + index); // a, b, c...
            const status = roomState.equipment[item];
            
            let statusText = 'Operational';
            
            if (status === 'No') {
                statusText = roomState.comment || 'Issue reported';
            } else if (status === 'Yes' && roomState.comment && index === 0) {
                // If it's yes but there's a comment, maybe attach it to the first item or the room?
                // The prompt example says: "Projector: Operational but requires Lamp Replacement."
                // This implies the comment is associated with the item or the room.
                // Let's assume the comment applies to the room generally if it's "Yes" but has a comment,
                // or we can just append it to the item if we had per-item comments.
                // Since we have per-room comments, let's append it to the first item if the room is OK but has a comment?
                // Or let's check if the user wanted per-item comments.
                // "Each room must have a comment box for notes about issues." -> Per room.
                // So if the room has a comment, where do we put it?
                // Let's look at the example again:
                // "Projector: Operational but requires Lamp Replacement."
                // This looks like it was entered in the comment box for the room and the user knows it refers to the projector.
                // Let's just append the room comment to the first item if all are Yes, or to the specific item if it's No?
                // Wait, if an item is No, it says "Monitor: 2 White line on display."
                // This implies the comment is the status for the failed item.
                // Let's use this logic:
                // If all items are Yes, and there is a comment, append the comment to the first item (or just output it).
                // If any item is No, use the comment as the status for the FIRST No item found?
                // Or just use the comment as the status for ALL No items?
                // Let's try to be smart:
                // If an item is No: Status is the comment. If no comment, "Issue reported".
                // If an item is Yes: Status is "Operational".
                
                // Let's stick to the simplest interpretation that matches the example:
                // If Yes: "Operational"
                // If No: The comment.
                
                // Let's try to handle the "Projector: Operational but requires Lamp Replacement." case.
                // This looks like it was marked Yes (Operational) but has a comment.
                // So if Yes and has comment -> "Operational " + comment.
                // Let's do that for the item if there is a comment.
                // Wait, if the comment is for the whole room, which item does it go to?
                // The example shows it on specific items.
                // Since we only have one comment box per room (as per instructions), let's append the comment to the FIRST item if there's only one comment, or to the items marked No.
                
                // Let's try this logic:
                // 1. If any item is No, the comment applies to the No items. If multiple No items, they all get the same comment or the first one gets it?
                // Let's assume the user enters the comment for the failed item.
                // Let's make it simple:
                // For each item:
                // If Yes:
                //   If there are NO items marked "No" and there is a room comment, and this is the FIRST item:
                //     `Operational ${roomState.comment}`
                //   Else:
                //     `Operational`
                // If No:
                //   `Operational ${roomState.comment}` if it looks like a note, or just `roomState.comment`
                // Let's look at the example again:
                // "Projector: Operational but requires Lamp Replacement." -> This starts with "Operational".
                // "Monitor: 2 White line on display." -> This does NOT start with "Operational".
                // This suggests the user types the full text they want to see after the colon!
                // Ah! "For any item marked No, include the comment if available."
                // So if the user marks No on Monitor, and types "2 White line on display", the output is "Monitor: 2 White line on display."
                // If the user marks Yes on Projector, and types "Operational but requires Lamp Replacement.", the output is "Projector: Operational but requires Lamp Replacement."
                // This implies the comment box replaces the status or appends to it?
                // Let's assume the user just types the specific status they want if it's not standard "Operational".
                // So:
                // If item is Yes:
                //   If there is a comment and it's the first item (or we just apply it to all? No, that would duplicate).
                //   Let's assume the comment applies to the room. If there are No items, it applies to the No items.
                //   Let's do this:
                //   If item is No: use comment. If comment empty, "Issue reported".
                //   If item is Yes: "Operational".
                //   Wait, what if they mark Yes but want to add a note like "Operational but needs cleaning"?
                //   Let's just use the comment for the item if it's marked No, OR if it's marked Yes and there are no No items, append it to the first item.
                
                // Let's implement this:
                // If item is No: Use comment as status.
                // If item is Yes: "Operational". If this is the first item and there are NO "No" items in this room, AND there is a comment, use comment as status (or append it).
                // Let's look at the example again:
                // "Projector: Operational but requires Lamp Replacement." -> This looks like the user typed "Operational but requires Lamp Replacement."
                // Let's assume the logic is:
                // If there is a comment, and the item is No, use the comment.
                // If there is a comment, and the item is Yes, and there are NO No items, use the comment.
                // This covers both cases!
                // Let's try that.
            }
            
            let finalStatus = 'Operational';
            const hasNoItems = Object.values(roomState.equipment).includes('No');
            
            if (status === 'No') {
                finalStatus = roomState.comment || 'Issue reported';
            } else { // status === 'Yes'
                if (!hasNoItems && roomState.comment && index === 0) {
                    // Apply comment to first item if all are Yes
                    finalStatus = roomState.comment;
                } else {
                    finalStatus = 'Operational';
                }
            }
            
            report += `  ${letter}. ${item}: ${finalStatus}\n`;
        });
        
        report += '\n';
    });
    
    return report.trim();
}

// Event Listeners
doneBtn.onclick = () => {
    const report = generateReport();
    reportText.value = report;
    reportModal.classList.add('open');
};

closeBtn.onclick = () => {
    reportModal.classList.remove('open');
};

window.onclick = (e) => {
    if (e.target === reportModal) {
        reportModal.classList.remove('open');
    }
};

copyBtn.onclick = () => {
    reportText.select();
    document.execCommand('copy');
    
    // Visual feedback for copy
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
};

// Initial Render
renderRooms();

// Update Date and Time on Page
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const datetimeEl = document.getElementById('datetime');
    if (datetimeEl) {
        datetimeEl.textContent = now.toLocaleDateString('en-US', options);
    }
}
updateDateTime();
