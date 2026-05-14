"use client";

import React, { useState, useEffect } from 'react';

// Types
interface Room {
    name: string;
    equipment: string[];
}

interface RoomState {
    equipment: Record<string, 'Yes' | 'No'>;
    comment: string;
}

const defaultRoomsData: Room[] = [
    { name: "FPM101", equipment: ["ZoomTV", "Projector", "Keyboard & Mouse"] },
    { name: "CDF 105", equipment: ["Projector", "Keyboard & Mouse", "Monitor"] },
    { name: "VP Conference Room", equipment: ["ZoomTV"] },
    { name: "CDF 116", equipment: ["Projector", "Keyboard & Mouse", "Monitor"] },
    { name: "FPM150 Meeting Room 3", equipment: ["BigScreen TV"] },
    { name: "FHR", equipment: ["BigScreen TV", "Keyboard & Mouse"] },
    { name: "CDF 147", equipment: ["Projector", "BigScreen TV", "Keyboard & Mouse"] },
    { name: "CDF 145", equipment: ["BigScreen TV", "Wireless Keyboard & Mouse"] }
];

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [appState, setAppState] = useState<Record<string, RoomState>>({});
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Modals
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportText, setReportText] = useState('');
    const [copyBtnText, setCopyBtnText] = useState('Copy to Clipboard');
    const [copyBtnBg, setCopyBtnBg] = useState('');
    
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentModalAction, setCurrentModalAction] = useState<string | null>(null);
    const [currentRoomName, setCurrentRoomName] = useState<string | null>(null);
    const [currentDeviceName, setCurrentDeviceName] = useState<string | null>(null);
    const [editInputValue, setEditInputValue] = useState('');
    const [editInputType, setEditInputType] = useState('text');
    
    const [currentDate, setCurrentDate] = useState('');

    const CORRECT_PASSWORD = 'fpmrooms2026';
    const EDIT_PASSWORD = 'fpmadmin';

    // Initialize
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedIn);
            
            const storedRooms = localStorage.getItem('roomsData');
            const initialRooms = storedRooms ? JSON.parse(storedRooms) : defaultRoomsData;
            setRoomsData(initialRooms);
            
            const initialState: Record<string, RoomState> = {};
            initialRooms.forEach((room: Room) => {
                initialState[room.name] = {
                    equipment: {},
                    comment: ""
                };
                room.equipment.forEach(item => {
                    initialState[room.name].equipment[item] = "Yes";
                });
            });
            setAppState(initialState);
        }

        const updateDateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            };
            setCurrentDate(now.toLocaleDateString('en-US', options));
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const saveRoomsToStorage = (rooms: Room[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('roomsData', JSON.stringify(rooms));
        }
    };

    const handleLogin = () => {
        if (passwordInput === CORRECT_PASSWORD) {
            sessionStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setLoginError(false);
        } else {
            setLoginError(true);
            setPasswordInput('');
        }
    };

    const handleLoginKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin();
    };

    const toggleStatus = (roomName: string, item: string, status: 'Yes' | 'No') => {
        setAppState(prev => ({
            ...prev,
            [roomName]: {
                ...prev[roomName],
                equipment: {
                    ...prev[roomName].equipment,
                    [item]: status
                }
            }
        }));
    };

    const updateComment = (roomName: string, value: string) => {
        setAppState(prev => ({
            ...prev,
            [roomName]: {
                ...prev[roomName],
                comment: value
            }
        }));
    };

    const openEditModal = (action: string, roomName: string | null = null, deviceName: string | null = null) => {
        setCurrentModalAction(action);
        setCurrentRoomName(roomName);
        setCurrentDeviceName(deviceName);
        
        if (action === 'password') {
            setEditInputValue('');
            setEditInputType('password');
        } else if (action === 'add-room') {
            setEditInputValue('');
            setEditInputType('text');
        } else if (action === 'edit-room') {
            setEditInputValue(roomName || '');
            setEditInputType('text');
        } else if (action === 'add-device') {
            setEditInputValue('');
            setEditInputType('text');
        } else if (action === 'edit-device') {
            setEditInputValue(deviceName || '');
            setEditInputType('text');
        }
        
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setCurrentModalAction(null);
        setCurrentRoomName(null);
        setCurrentDeviceName(null);
        setEditInputValue('');
        setEditInputType('text');
    };

    const saveEdit = () => {
        const value = editInputValue.trim();
        if (!value) return;

        if (currentModalAction === 'password') {
            if (value === EDIT_PASSWORD) {
                setIsEditMode(true);
                closeEditModal();
            } else {
                alert('Incorrect password!');
            }
            return;
        }

        if (window.confirm("Are you sure you want to save these changes?")) {
            let newRoomsData = [...roomsData];
            let newAppState = { ...appState };

            if (currentModalAction === 'add-room') {
                newRoomsData.push({ name: value, equipment: [] });
                newAppState[value] = { equipment: {}, comment: "" };
            } else if (currentModalAction === 'edit-room' && currentRoomName) {
                const roomIndex = newRoomsData.findIndex(r => r.name === currentRoomName);
                if (roomIndex !== -1) {
                    newRoomsData[roomIndex].name = value;
                    newAppState[value] = newAppState[currentRoomName];
                    delete newAppState[currentRoomName];
                }
            } else if (currentModalAction === 'add-device' && currentRoomName) {
                const roomIndex = newRoomsData.findIndex(r => r.name === currentRoomName);
                if (roomIndex !== -1) {
                    newRoomsData[roomIndex].equipment.push(value);
                    newAppState[currentRoomName].equipment[value] = "Yes";
                }
            } else if (currentModalAction === 'edit-device' && currentRoomName && currentDeviceName) {
                const roomIndex = newRoomsData.findIndex(r => r.name === currentRoomName);
                if (roomIndex !== -1) {
                    const eqIndex = newRoomsData[roomIndex].equipment.indexOf(currentDeviceName);
                    if (eqIndex !== -1) {
                        newRoomsData[roomIndex].equipment[eqIndex] = value;
                        newAppState[currentRoomName].equipment[value] = newAppState[currentRoomName].equipment[currentDeviceName];
                        delete newAppState[currentRoomName].equipment[currentDeviceName];
                    }
                }
            }

            setRoomsData(newRoomsData);
            setAppState(newAppState);
            saveRoomsToStorage(newRoomsData);
            closeEditModal();
        }
    };

    const deleteRoom = (roomName: string) => {
        if (window.confirm(`Are you sure you want to delete ${roomName}?`)) {
            const newRoomsData = roomsData.filter(r => r.name !== roomName);
            const newAppState = { ...appState };
            delete newAppState[roomName];
            setRoomsData(newRoomsData);
            setAppState(newAppState);
            saveRoomsToStorage(newRoomsData);
        }
    };

    const deleteDevice = (roomName: string, deviceName: string) => {
        if (window.confirm(`Are you sure you want to delete ${deviceName} from ${roomName}?`)) {
            const newRoomsData = [...roomsData];
            const roomIndex = newRoomsData.findIndex(r => r.name === roomName);
            if (roomIndex !== -1) {
                newRoomsData[roomIndex].equipment = newRoomsData[roomIndex].equipment.filter(e => e !== deviceName);
                const newAppState = { ...appState };
                delete newAppState[roomName].equipment[deviceName];
                setRoomsData(newRoomsData);
                setAppState(newAppState);
                saveRoomsToStorage(newRoomsData);
            }
        }
    };

    const generateReport = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        let report = `Date: ${dateStr}\n\n`;

        roomsData.forEach(room => {
            report += `${room.name}:\n`;
            const roomState = appState[room.name];
            
            room.equipment.forEach((item, index) => {
                const letter = String.fromCharCode(97 + index);
                const status = roomState.equipment[item];
                let finalStatus = 'Operational';
                const hasNoItems = Object.values(roomState.equipment).includes('No');
                
                if (status === 'No') {
                    finalStatus = roomState.comment || 'Issue reported';
                } else {
                    if (!hasNoItems && roomState.comment && index === 0) {
                        finalStatus = roomState.comment;
                    } else {
                        finalStatus = 'Operational';
                    }
                }
                
                report += `  ${letter}. ${item}: ${finalStatus}\n`;
            });
            report += '\n';
        });

        setReportText(report.trim());
        setReportModalOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(reportText);
        setCopyBtnText('Copied!');
        setCopyBtnBg('var(--success-color)');
        setTimeout(() => {
            setCopyBtnText('Copy to Clipboard');
            setCopyBtnBg('');
        }, 2000);
    };

    const toggleEditMode = () => {
        if (!isEditMode) {
            openEditModal('password');
        } else {
            setIsEditMode(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center w-full px-4 py-8">
                <div className="w-full max-w-sm text-center">
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="Enter password to access checks" 
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-sans text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#990000] focus:border-transparent text-center"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyPress={handleLoginKeyPress}
                        />
                        {loginError && <p className="text-red-500 text-sm mt-2 font-medium">Incorrect password. Please try again.</p>}
                    </div>
                    <button 
                        className="w-full py-4 px-6 bg-[#990000] hover:bg-[#800000] text-white rounded-xl font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#990000]" 
                        onClick={handleLogin}
                    >
                        Start Checks
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6 sm:gap-8">
            {/* Dashboard Controls */}
            <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-slate-500 text-sm font-medium">{currentDate}</p>
                <button 
                    className={`py-2 px-5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isEditMode 
                        ? 'bg-[#990000] text-white shadow-md hover:bg-[#800000]' 
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm'
                    }`}
                    onClick={toggleEditMode}
                >
                    {isEditMode ? 'Exit Edit' : 'Edit'}
                </button>
            </div>

            {/* Dashboard Grid */}
            <main>
                {isEditMode && (
                    <button 
                        className="w-full mb-6 py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-medium hover:border-[#990000] hover:text-[#990000] hover:bg-[#990000]/5 transition-all flex items-center justify-center gap-2"
                        onClick={() => openEditModal('add-room')}
                    >
                        <span className="text-xl">+</span> Add New Room
                    </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {roomsData.map(room => {
                        const roomState = appState[room.name] || { equipment: {}, comment: '' };
                        const hasNo = Object.values(roomState.equipment).includes('No');
                        
                        return (
                            <div 
                                key={room.name} 
                                className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col ${
                                    hasNo 
                                    ? 'border-red-400 bg-gradient-to-br from-white to-red-50/50' 
                                    : 'border-emerald-400 bg-gradient-to-br from-white to-emerald-50/50'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-100">
                                    <h3 className="text-lg font-semibold text-slate-800 tracking-tight">{room.name}</h3>
                                    {isEditMode && (
                                        <div className="flex gap-1">
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" 
                                                onClick={() => openEditModal('edit-room', room.name)}
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                                onClick={() => deleteRoom(room.name)}
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col gap-3 flex-1">
                                    {room.equipment.map(item => (
                                        <div key={item} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                                            <span className="text-slate-700 text-sm font-medium">{item}</span>
                                            {isEditMode ? (
                                                <div className="flex gap-1 ml-3">
                                                    <button 
                                                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors" 
                                                        onClick={() => openEditModal('edit-device', room.name, item)}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button 
                                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                                        onClick={() => deleteDevice(room.name, item)}
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-1.5 bg-slate-100/50 p-1 rounded-lg">
                                                    <button 
                                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                                                            roomState.equipment[item] === 'Yes' 
                                                            ? 'bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.25)]' 
                                                            : 'text-slate-500 hover:bg-slate-200'
                                                        }`}
                                                        onClick={() => toggleStatus(room.name, item, 'Yes')}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button 
                                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                                                            roomState.equipment[item] === 'No' 
                                                            ? 'bg-red-500 text-white shadow-[0_2px_8px_rgba(239,68,68,0.25)]' 
                                                            : 'text-slate-500 hover:bg-slate-200'
                                                        }`}
                                                        onClick={() => toggleStatus(room.name, item, 'No')}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                {isEditMode && (
                                    <button 
                                        className="mt-3 text-[#990000] text-sm font-semibold flex items-center gap-1 hover:text-[#800000] transition-colors py-2" 
                                        onClick={() => openEditModal('add-device', room.name)}
                                    >
                                        <span className="text-lg leading-none">+</span> Add Device
                                    </button>
                                )}
                                
                                <div className="mt-5 pt-4 border-t border-slate-100">
                                    <textarea 
                                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-slate-700 p-3 text-sm resize-y min-h-[70px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#990000]/20 focus:border-[#990000] focus:bg-white placeholder:text-slate-400" 
                                        placeholder="Add a comment..."
                                        value={roomState.comment}
                                        onChange={(e) => updateComment(room.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="flex justify-center py-8">
                <button 
                    className="py-3 px-8 bg-[#990000] hover:bg-[#800000] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#990000]" 
                    onClick={generateReport}
                >
                    Generate Report
                </button>
            </footer>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            className="absolute top-4 right-5 text-slate-400 hover:text-slate-700 text-2xl transition-colors" 
                            onClick={closeEditModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 pr-6">
                            {currentModalAction === 'add-room' && 'Add New Room'}
                            {currentModalAction === 'edit-room' && 'Edit Room Name'}
                            {currentModalAction === 'add-device' && `Add Device to ${currentRoomName}`}
                            {currentModalAction === 'edit-device' && `Edit Device in ${currentRoomName}`}
                            {currentModalAction === 'password' && 'Enter Edit Mode Password'}
                        </h2>
                        <div className="mb-6 text-left">
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                {currentModalAction === 'password' ? 'Password' : 
                                 (currentModalAction?.includes('room') ? 'Room Name' : 'Device Name')}
                            </label>
                            <input 
                                type={editInputType} 
                                placeholder={`Enter ${currentModalAction === 'password' ? 'password' : 'name'}`}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-sans text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#990000] focus:border-transparent focus:bg-white"
                                value={editInputValue}
                                onChange={(e) => setEditInputValue(e.target.value)}
                                onKeyPress={(e) => { if(e.key === 'Enter') saveEdit(); }}
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-3">
                            <button 
                                className="flex-1 py-3 px-4 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors" 
                                onClick={closeEditModal}
                            >
                                Cancel
                            </button>
                            <button 
                                className="flex-1 py-3 px-4 bg-[#990000] hover:bg-[#800000] text-white rounded-xl font-medium shadow-md transition-all duration-200" 
                                onClick={saveEdit}
                            >
                                {currentModalAction === 'password' ? 'Continue' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {reportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            className="absolute top-4 right-5 text-slate-400 hover:text-slate-700 text-2xl transition-colors" 
                            onClick={() => setReportModalOpen(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Generated Report</h2>
                        <p className="text-slate-500 text-sm mb-4">Copy and paste this into your message.</p>
                        <textarea 
                            className="w-full h-[250px] bg-slate-50 border border-slate-200 rounded-xl text-slate-700 p-4 font-mono text-sm mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#990000]/20 focus:border-[#990000] focus:bg-white"
                            readOnly 
                            value={reportText} 
                        />
                        <button 
                            className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                            onClick={copyToClipboard}
                            style={{ 
                                backgroundColor: copyBtnBg || '#990000',
                                transform: copyBtnBg ? 'scale(0.98)' : 'scale(1)'
                            }}
                        >
                            {copyBtnText}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
