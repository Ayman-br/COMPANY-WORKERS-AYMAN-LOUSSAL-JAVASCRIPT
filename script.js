// Get workers from browser storage or start with empty array
const workers = JSON.parse(localStorage.getItem("workers")) || [];

// Get important HTML elements
const body = document.getElementById('body');
const workersContainer = document.getElementById("workersContainer");
const overlay = document.getElementById('overlay');
const modal = overlay.querySelector('.modal');

const roomCapacity = {
    'conférence': 4,      // Conference room fits 4 people
    'Réception': 3,       // Reception fits 3 people
    'serveurs': 2,        // Server room fits 2 people
    'Security': 2,        // Security room fits 2 people
    'personnel': 5,       // Personnel room fits 5 people
    'archives-room': 1    // Archives room fits 1 person
};

// Which job roles can work in each room
const roomRoles = {
    'conférence': ["Manager", "Receptionist", "IT Technician", "Security Agent"],
    'Réception': ["Receptionist", "Manager", "Cleaning", "other"],
    'serveurs': ["IT Technician", "Manager", "Cleaning"],
    'Security': ["Security Agent", "Manager", "Cleaning"],
    'personnel': ["Manager", "Receptionist", "IT Technician", "Security Agent", "Cleaning", "other"],
    'archives-room': ["Manager"]
};

// =============================================
// 2. DISPLAY WORKERS IN SIDEBAR
// =============================================

function renderWorker() {
    // Clear the workers container
    workersContainer.innerHTML = ``;
    
    // If no workers, show message
    if (workers.length === 0) {
        workersContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <p>No workers added yet.</p>
                <p class="text-sm">Click "Add Worker" to get started.</p>
            </div>
        `;
        return;
    }

    // Create a card for each worker
    workers.forEach(worker => {
        const card = document.createElement('div');
        card.className = "worker-card p-3 bg-white shadow rounded-lg flex gap-3 items-center border mb-3 mt-4";
        
        // Worker photo
        const img = document.createElement('img');
        img.src = worker.photo;
        img.alt = worker.nom;
        img.className = "w-12 h-12 rounded-full object-cover";
        
        // Worker info
        const info = document.createElement('div');
        info.className = "flex flex-col";
        
        const name = document.createElement('h2');
        name.textContent = worker.nom;
        name.className = "font-semibold";
        
        const role = document.createElement('p');
        role.textContent = worker.role;
        role.className = "text-sm text-gray-600";
        
        const email = document.createElement('p');
        email.textContent = worker.email;
        email.className = "text-xs text-gray-500";
        
        info.appendChild(name);
        info.appendChild(role);
        info.appendChild(email);
        
        card.appendChild(img);
        card.appendChild(info);
        workersContainer.appendChild(card);
    });
}

// =============================================
// 3. ADD WORKER FORM FUNCTIONALITY
// =============================================

// Get form elements
const addBtn = document.getElementById("addBtn");
const form = document.getElementById("workerForm");
const experienceBtn = document.getElementById('experience-btn');
const experienceContainer = document.getElementById('experience-countiner');
const addWorkerBtn = document.getElementById('addWorker-btn');

// Show/hide the add worker form
addBtn.addEventListener("click", () => {
    form.classList.toggle("hidden");
});

// Add experience field when + button clicked
experienceBtn.addEventListener('click', addExperienceField);

function addExperienceField() {
    const experienceGroup = document.createElement('div');
    experienceGroup.className = "experience-group  p-3  mb-3 mt-4";
    
    experienceGroup.innerHTML = `
        <div class="flex justify-between mb-2">
            <label class="font-medium">Experience</label>
            <button type="button" class="remove-exp bg-red-500 text-white w-6 h-6 rounded text-sm">-</button>
        </div>
        <input type="text" placeholder="Job role" class="experience w-full p-2 border rounded mb-2">
        <input type="text" placeholder="Company" class="experience-company w-full p-2 border rounded mb-2">
        <div class="grid grid-cols-2 gap-2">
            <input type="date" class="expDate-1 p-2 border rounded">
            <input type="date" class="expDate-2 p-2 border rounded">
        </div>
    `;
    
    experienceContainer.appendChild(experienceGroup);
    
    // Remove experience field when - button clicked
    experienceGroup.querySelector('.remove-exp').addEventListener('click', () => {
        experienceGroup.remove();
    });
}


addWorkerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const role = document.getElementById('role').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const photo = document.getElementById('photo').value || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    
    if (!name || !role || !email || !phone) {
        alert("Please fill all required fields.");
        return;
    }
    
    // Create new worker object
    const newWorker = {
        id: workers.length + 1,
        nom: name,
        role: role,
        photo: photo,
        email: email,
        telephone: phone,
        experiences: [],
        isWorking: false,
        currentLocation: null
    };
    
    // Add to workers array and save
    workers.push(newWorker);
    localStorage.setItem("workers", JSON.stringify(workers));
    
    // Update display and reset form
    renderWorker();
    form.reset();
    experienceContainer.innerHTML = '';
    form.classList.add("hidden");
});

// =============================================
// 4. ROOM ASSIGNMENT MODAL SYSTEM
// =============================================

// Open modal for conference room
document.getElementById('conférence-btn').addEventListener('click', () => {
    openRoomModal('conférence');
});

// Open modal for reception room
document.getElementById('Réception-btn').addEventListener('click', () => {
    openRoomModal('Réception');
});

// Open modal for server room
document.getElementById('serveurs-btn').addEventListener('click', () => {
    openRoomModal('serveurs');
});

// Open modal for security room
document.getElementById('sécurité-btn').addEventListener('click', () => {
    openRoomModal('Security');
});

// Open modal for personnel room
document.getElementById('personnel-btn').addEventListener('click', () => {
    openRoomModal('personnel');
});

// Open modal for archives room
document.getElementById('archives').addEventListener('click', () => {
    openRoomModal('archives-room');
});

function openRoomModal(roomId) {
    // Show the modal
    overlay.classList.add('open');
    
    // Fill modal with available workers for this room
    modalRenderCard(roomId);
}

function closeModal() {
    overlay.classList.remove('open');
}

// Close modal when clicking outside or on X
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

function modalRenderCard(roomId) {
    // Clear modal content
    modal.innerHTML = ``;
    
    // Add room info
    const currentWorkers = getWorkersInRoom(roomId).length;
    const capacity = roomCapacity[roomId];
    
    modal.innerHTML = `
        <div class="mb-4 p-3 bg-blue-50 rounded-lg">
            <h3 class="font-bold text-lg">${roomId} Room</h3>
            <p>Capacity: ${currentWorkers}/${capacity}</p>
            <p class="text-sm">Allowed roles: ${roomRoles[roomId].join(', ')}</p>
        </div>
    `;
    
    // Check if room is full
    if (currentWorkers >= capacity) {
        modal.innerHTML += `
            <div class="text-center py-4 text-red-600">
                <p>Room is full! Remove workers to add more.</p>
            </div>
        `;
        return;
    }
    
    // Get available workers for this room
    const availableWorkers = workers.filter(worker => 
        roomRoles[roomId].includes(worker.role) && !worker.isWorking
    );
    
    // Show message if no workers available
    if (availableWorkers.length === 0) {
        modal.innerHTML += `
            <div class="text-center py-8 text-gray-500">
                <p>No available workers for this room.</p>
            </div>
        `;
        return;
    }
    
    // Add available workers to modal
    availableWorkers.forEach(worker => {
        const workerCard = document.createElement('div');
        workerCard.className = "worker-option p-3 border rounded-lg mb-2 flex items-center gap-3 cursor-pointer hover:bg-gray-50";
        
        workerCard.innerHTML = `
            <img src="${worker.photo}" alt="${worker.nom}" class="w-10 h-10 rounded-full">
            <div>
                <h4 class="font-semibold">${worker.nom}</h4>
                <p class="text-sm text-gray-600">${worker.role}</p>
            </div>
        `;
        
        // Assign worker when clicked
        workerCard.addEventListener('click', () => {
            assignWorkerToRoom(worker, roomId);
            closeModal();
        });
        
        modal.appendChild(workerCard);
    });
}



function assignWorkerToRoom(worker, roomId) {
    // Mark worker as working and set location
    worker.isWorking = true;
    worker.currentLocation = roomId;
    localStorage.setItem("workers", JSON.stringify(workers));
    
    // Add worker card to room
    const roomElement = document.getElementById(roomId);
    const workerCard = createWorkerCard(worker, roomId);
    roomElement.appendChild(workerCard);
    document.getElementById(roomId).classList.replace("bg-red-400/40", "bg-red-400/10");
    
    // Hide + button if room is full
    updateRoomUI(roomId);
}

function createWorkerCard(worker, roomId) {
    const card = document.createElement('div');
    card.className = "assigned-worker bg-white p-2 rounded border m-1 text-center relative";
    card.innerHTML = `
        <button class="remove-btn absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs">×</button>
        <img src="${worker.photo}" alt="${worker.nom}" class="w-8 h-8 rounded-full mx-auto mb-1">
        <p class="text-xs font-semibold truncate">${worker.nom}</p>
        <p class="text-xs text-gray-600">${worker.role}</p>
    `;
    
    // Show worker info when clicked
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-btn')) {
            showWorkerInfo(worker, roomId);
        }
    });
    
    // Remove worker when X button clicked
    card.querySelector('.remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeWorkerFromRoom(worker, roomId, card);
    });
    
    return card;
}

function removeWorkerFromRoom(worker, roomId, cardElement) {
    // Mark worker as available
    worker.isWorking = false;
    worker.currentLocation = null;
    localStorage.setItem("workers", JSON.stringify(workers));
    
    // Remove card from room
    cardElement.remove();
    
    // Show + button again
    updateRoomUI(roomId);
}

function showWorkerInfo(worker, roomId) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h2 class="text-xl font-bold mb-4">Worker Information</h2>
            <div class="space-y-3">
                <p><strong>Name:</strong> ${worker.nom}</p>
                <p><strong>Role:</strong> ${worker.role}</p>
                <p><strong>Email:</strong> ${worker.email}</p>
                <p><strong>Phone:</strong> ${worker.telephone}</p>
                <p><strong>Location:</strong> ${roomId}</p>
            </div>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when button clicked
    modal.querySelector('button').addEventListener('click', () => {
        modal.remove();
    });
}

// =============================================
// 6. HELPER FUNCTIONS
// =============================================

function getWorkersInRoom(roomId) {
    return workers.filter(worker => worker.currentLocation === roomId);
}

function updateRoomUI(roomId) {
    const roomElement = document.getElementById(roomId);
    const addButton = roomElement.querySelector('button');
    const currentWorkers = getWorkersInRoom(roomId).length;
    
    // Show or hide + button based on capacity
    if (currentWorkers >= roomCapacity[roomId]) {
        addButton.style.display = 'none';
    } else {
        addButton.style.display = 'flex';
    }
}

// =============================================
// 7. INITIALIZE APPLICATION
// =============================================

// Start the application
document.addEventListener('DOMContentLoaded', function() {
    // Display existing workers
    renderWorker();
    
    // Load any existing room assignments
    workers.forEach(worker => {
        if (worker.isWorking && worker.currentLocation) {
            const roomElement = document.getElementById(worker.currentLocation);
            if (roomElement) {
                const workerCard = createWorkerCard(worker, worker.currentLocation);
                roomElement.appendChild(workerCard);
                updateRoomUI(worker.currentLocation);
            }
        }
    });
});