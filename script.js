const grid = document.getElementById("productGrid");
const slotCount = document.getElementById("slotCount");
const selectionPanel = document.getElementById("selectionPanel");
const selectedSlot = document.getElementById("selectedSlot");
const closePanel = document.getElementById("closePanel");
const menuButton = document.getElementById("menuButton");
const year = document.getElementById("year");

const TOTAL_SLOTS = 81;

function formatSlotNumber(number) {
  return String(number).padStart(2, "0");
}

function createSlotButton(number) {
  const slotNumber = formatSlotNumber(number);

  const button = document.createElement("button");

  button.type = "button";
  button.className = "slot-button";
  button.dataset.slot = slotNumber;

  button.setAttribute(
    "aria-label",
    `Open outlet slot ${slotNumber}`
  );

  button.innerHTML = `
    <span class="slot-number">${slotNumber}</span>
    <span class="slot-icon" aria-hidden="true"></span>
    <span class="slot-label">Coming soon</span>
  `;

  button.addEventListener("click", () => {
    showSelectedSlot(slotNumber);
  });

  return button;
}

function renderGrid() {
  const fragment = document.createDocumentFragment();

  for (let number = 1; number <= TOTAL_SLOTS; number += 1) {
    const slotButton = createSlotButton(number);
    fragment.appendChild(slotButton);
  }

  grid.appendChild(fragment);

  slotCount.textContent = `${TOTAL_SLOTS} available`;
}

function showSelectedSlot(slotNumber) {
  selectedSlot.textContent = slotNumber;
  selectionPanel.classList.add("visible");
}

function hideSelectedSlot() {
  selectionPanel.classList.remove("visible");
}

closePanel.addEventListener("click", hideSelectedSlot);

menuButton.addEventListener("click", () => {
  document.getElementById("productGrid").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSelectedSlot();
  }
});

year.textContent = new Date().getFullYear();

renderGrid();
