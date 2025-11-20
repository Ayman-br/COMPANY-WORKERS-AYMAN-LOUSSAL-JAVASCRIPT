// function id(num){
//     num = 1;
//     return function () {
//         num++;
//     }
// }

// FIX: remove unused React import (it breaks createElement)
// const { createElement } = require("react");

// let userId = id();
// userId();
// userId();
// userId();


// FIX: if localStorage empty → workers must be []
const workers = JSON.parse(localStorage.getItem("workers")) || [];

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