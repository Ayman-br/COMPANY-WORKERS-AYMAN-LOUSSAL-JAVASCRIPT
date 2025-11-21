// const workers = JSON.parse(localStorage.getItem("workers")) || [];
const workers = [
  {
    id: 1,
    name: "Ayman Lousal",
    role: "Receptionist",
    email: "ayman.lousal@example.com",
    phone: "+212 600 001 001",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    experiences: [
      { role: "Assistant", company: "Hotel Atlas", start: "2019-01-10", end: "2020-05-20" }
    ]
  },
  {
    id: 2,
    name: "Kendra Smith",
    role: "Manager",
    email: "kendra.smith@example.com",
    phone: "+212 600 001 002",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    experiences: [
      { role: "Supervisor", company: "Morocco Resorts", start: "2018-03-01", end: "2021-09-15" },
      { role: "Assistant Manager", company: "RedHotel", start: "2021-10-01", end: "2023-04-12" }
    ]
  },
  {
    id: 3,
    name: "Oracle Touzani",
    role: "Cleaning",
    email: "oracle.touzani@example.com",
    phone: "+212 600 001 003",
    photo: "https://randomuser.me/api/portraits/women/35.jpg",
    experiences: [
      { role: "Cleaner", company: "Tanger Hotel", start: "2020-02-15", end: "2022-08-03" }
    ]
  },
  {
    id: 4,
    name: "Badre Oxaam",
    role: "IT Technician",
    email: "badreoxaam@example.com",
    phone: "+212 600 001 004",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    experiences: [
      { role: "Junior IT Tech", company: "DataPlus", start: "2017-06-01", end: "2019-12-20" },
      { role: "IT Support", company: "MegaTech", start: "2020-01-01", end: "2023-10-18" }
    ]
  },
  {
    id: 5,
    name: "Imane Baraka",
    role: "Security Agent",
    email: "imanebara@example.com",
    phone: "+212 600 001 005",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    experiences: [
      { role: "Security Officer", company: "Marjane", start: "2016-03-01", end: "2019-08-01" }
    ]
  },
  {
    id: 6,
    name: "Simo Amrani",
    role: "Manager",
    email: "simo@example.com",
    phone: "+212 600 001 006",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    experiences: [
      { role: "Team Leader", company: "Novotel", start: "2018-07-01", end: "2020-01-01" },
      { role: "Operations Manager", company: "Ibis Hotel", start: "2020-01-15", end: "2024-06-01" }
    ]
  },
  {
    id: 7,
    name: "Sara Idrissi",
    role: "Receptionist",
    email: "sarai@example.com",
    phone: "+212 600 001 007",
    photo: "https://randomuser.me/api/portraits/women/14.jpg",
    experiences: [
      { role: "Front Desk", company: "Royal Hotel", start: "2021-02-01", end: "2023-07-30" }
    ]
  },
  {
    id: 8,
    name: "Mouad El Filali",
    role: "Cleaning",
    email: "mouad@example.com",
    phone: "+212 600 001 008",
    photo: "https://randomuser.me/api/portraits/men/66.jpg",
    experiences: [
      { role: "Housekeeper", company: "Oasis Hotel", start: "2019-05-01", end: "2022-12-10" }
    ]
  },
  {
    id: 9,
    name: "Nadia Rami",
    role: "IT Technician",
    email: "nadia@example.com",
    phone: "+212 600 001 009",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
    experiences: [
      { role: "IT Helpdesk", company: "Inwi", start: "2020-03-01", end: "2024-01-01" }
    ]
  },
  {
    id: 10,
    name: "Zakaria Harrouchi",
    role: "Security Agent",
    email: "zakaria@example.com",
    phone: "+212 600 001 010",
    photo: "https://randomuser.me/api/portraits/men/77.jpg",
    experiences: [
      { role: "Security Guard", company: "Carrefour", start: "2019-01-01", end: "2023-11-20" }
    ]
  }
];


const workersContainer = document.getElementById("workersContainer");

function renderWorker() {
    workersContainer.innerHTML = ``;
    workers.forEach(worker => {
        const card = document.createElement('div');
        card.className = "w-[20%] md:user-info w-[97%] p-3 bg-white shadow rounded-lg flex gap-4 items-center border mt-4 ml-1 mb-2";

        const img = document.createElement('img');
        img.src = worker.photo;
        img.alt = worker.nom;
        img.className = "w-16 h-16 rounded-full object-cover";

        const info = document.createElement('div');
        info.className = "flex flex-col";

        const name = document.createElement('h2');
        name.textContent = worker.nom;
        name.className = "text-lg font-semibold";

        const role = document.createElement('p');
        role.textContent = worker.role;
        role.className = "text-sm text-gray-600";

        const email = document.createElement('p');
        email.textContent = worker.email;
        email.className = "text-sm text-gray-500";

        const tel = document.createElement('p');
        tel.textContent = worker.telephone;
        tel.className = "text-sm text-gray-500";

        const renderRemoveBtn = document.createElement('button');
        renderRemoveBtn.textContent = "x";
        renderRemoveBtn.className = "";

        info.appendChild(name);
        info.appendChild(role);
        info.appendChild(email);
        info.appendChild(tel);

        card.appendChild(renderRemoveBtn);
        card.appendChild(img);
        card.appendChild(info);

        workersContainer.appendChild(card);

        renderRemoveBtn.addEventListener('click', () => {
            card.remove();
        });
    });
}

const exprienceBtn = document.getElementById('experience-btn');
const addBtn = document.getElementById("addBtn");
const form = document.getElementById("workerForm");
const experienceCountiner = document.getElementById('experience-countiner');

addBtn.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        form.setAttribute("aria-hidden", "false");
    } else {
        form.classList.add("hidden");
        form.setAttribute("aria-hidden", "true");
    }
});

exprienceBtn.addEventListener('click', () => {
    const addExprience = document.createElement('div');
    const addDateExprience = document.createElement('div');
    addDateExprience.className = "flex flex-col justify-between gap-4 mt-4";
    addExprience.className = "flex justify-between gap-4 mt-4";

    const input = document.createElement('input');
    input.type = "text";
    input.name = "experience";
    input.placeholder = "experience role";
    input.className = "experience w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300";

    const secondInput = document.createElement('input');
    secondInput.type = "text";
    secondInput.placeholder = "experience company";
    secondInput.className = "experience-company mt-4 w-[83%] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300";

    const divisExprience = document.createElement('button');
    divisExprience.textContent = "-";
    divisExprience.id = "divis-btn";
    divisExprience.className = "bg-red-600 w-8 h-8 text-center mt-6 rounded-lg text-black hover:bg-red-900 transition text-white";

    const dateInputOne = document.createElement('input');
    dateInputOne.type = "date";
    dateInputOne.className = "expDate-1 px-3 py-2 border rounded-lg mt-2";

    const dateInputTwo = document.createElement('input');
    dateInputTwo.type = "date";
    dateInputTwo.className = "expDate-2 px-3 py-2 border rounded-lg mt-2";

    divisExprience.addEventListener('click', () => {
        addExprience.remove();
        addDateExprience.remove();
        secondInput.remove();
    });

    addExprience.appendChild(input);
    addExprience.appendChild(divisExprience);
    experienceCountiner.appendChild(addExprience);
    experienceCountiner.appendChild(secondInput);
    addDateExprience.appendChild(dateInputOne);
    addDateExprience.appendChild(dateInputTwo);
    experienceCountiner.appendChild(addDateExprience);
});

const addWorker = document.getElementById('addWorker-btn');

addWorker.addEventListener('click', (e) => {
    e.preventDefault();

    const userName = document.getElementById('userName');
    const role = document.getElementById('role');
    const mail = document.getElementById('email');
    const phone = document.getElementById('phone');
    const photo = document.getElementById('photo');

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(06|07)\d{8}$/;

    const userNameValue = userName.value.trim();
    const roleValue = role.value.trim();
    const mailValue = mail.value.trim();
    const phoneValue = phone.value.trim();
    const photoValue = photo.value || 'https://tse1.mm.bing.net/th/id/OIP.EZIxvhz9ns7cKNBMhFvJeQHaHa?pid=Api&P=0&h=180.';

    if (!userNameValue || !roleValue || !mailValue || !phoneValue) {
        alert("Please fill all input fields.");
        return;
    }

    if (!nameRegex.test(userNameValue)) {
        alert("Invalid name: only letters & spaces, min 3 characters.");
        return;
    }

    if (!emailRegex.test(mailValue)) {
        alert("Invalid email format.");
        return;
    }

    if (!phoneRegex.test(phoneValue)) {
        alert("Invalid phone format.");
        return;
    }

    const experiences = document.querySelectorAll('.experience');
    const companyInputs = document.querySelectorAll('.experience-company');
    const expDateOne = document.querySelectorAll('.expDate-1');
    const expDateTwo = document.querySelectorAll('.expDate-2');

    const experiencesArr = [];

    for (let i = 0; i < experiences.length; i++) {
        const expValue = experiences[i].value.trim();
        const companyValue = companyInputs[i]?.value?.trim();
        const start = expDateOne[i].value;
        const end = expDateTwo[i].value;

        if (!expValue || !companyValue || !start || !end) {
            alert("Please fill all experience fields.");
            return;
        }

        if (new Date(start) > new Date(end)) {
            alert("Experience start date must be before end date.");
            return;
        }

        experiencesArr.push({
            experience: expValue,
            exCompany: companyValue,
            dateStart: start,
            dateEnd: end
        });
    }

    let id = workers.length + 1;

    const newWorker = {
        id: id,
        nom: userNameValue,
        role: roleValue,
        photo: photoValue,
        email: mailValue,
        telephone: phoneValue,
        experiences: experiencesArr
    };

    workers.push(newWorker);
    localStorage.setItem("workers", JSON.stringify(workers));
    renderWorker();
});

renderWorker();

const openModalBtn = document.getElementById('conférence-btn');
const overlay = document.getElementById('overlay');

let lastFocusedElement = null;
const modal = overlay.querySelector('.modal');

openModalBtn.addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');

    modal.setAttribute("tabindex", "0");
    modal.focus();

    modalRenderCard();
});

function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) lastFocusedElement.focus();
}

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

const modalCard = document.createElement('div');

function modalRenderCard() {
    modal.innerHTML = ``;

    workers.forEach(worker => {
        const card = document.createElement('div');
        card.className = "user-info w-full p-4 bg-white shadow rounded-lg flex gap-4 items-center border mt-4";

        const img = document.createElement('img');
        img.src = worker.photo;
        img.alt = worker.nom;
        img.className = "w-16 h-16 rounded-full object-cover";

        const info = document.createElement('div');
        info.className = "flex flex-col";

        const name = document.createElement('h2');
        name.textContent = worker.nom;
        name.className = "text-lg font-semibold";

        const role = document.createElement('p');
        role.textContent = worker.role;
        role.className = "text-sm text-gray-600";

        info.appendChild(name);
        info.appendChild(role);

        card.appendChild(img);
        card.appendChild(info);

        modal.appendChild(card);
    });

}

const ResModalBtn = document.getElementById('Réception-btn');
const servModalBtn = document.getElementById('serveurs-btn');
const securetModalBtn = document.getElementById('sécurité-btn');
const personeModalBtn = document.getElementById('personnel-btn');
const archiveModalBtn = document.getElementById('archives');

ResModalBtn.addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    modal.setAttribute("tabindex", "0");
    modal.focus();

    receptionWorkers();
});

function receptionWorkers(){
const resptionRoom = workers.filter(worker => worker.role === "Receptionist" || worker.role === "Manager" || worker.role === "Cleaning");

if (resptionRoom.length === 0) {
    container.innerHTML = "<p>No workers for these roles.</p>";
    openModal?.(); 
    return;
  }

  resptionRoom.forEach(worker => {
    const card = document.createElement('div');
        card.className = "user-info w-full p-4 bg-white shadow rounded-lg flex gap-4 items-center border mt-4";

        const img = document.createElement('img');
        img.src = worker.photo;
        img.alt = worker.nom;
        img.className = "w-16 h-16 rounded-full object-cover";

        const info = document.createElement('div');
        info.className = "flex flex-col";

        const name = document.createElement('h2');
        name.textContent = worker.nom;
        name.className = "text-lg font-semibold";

        const role = document.createElement('p');
        role.textContent = worker.role;
        role.className = "text-sm text-gray-600";

        info.appendChild(name);
        info.appendChild(role);

        card.appendChild(img);
        card.appendChild(info);

        modal.appendChild(card);
    
  });

}

