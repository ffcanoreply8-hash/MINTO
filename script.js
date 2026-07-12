const TOTAL_SLOTS = 81;

const grid = document.getElementById("productGrid");
const slotCount = document.getElementById("slotCount");
const selectionPanel = document.getElementById("selectionPanel");
const selectedSlot = document.getElementById("selectedSlot");
const closePanel = document.getElementById("closePanel");
const menuButton = document.getElementById("menuButton");
const year = document.getElementById("year");

const checkoutSlot = document.getElementById("checkoutSlot");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");
const closeCheckoutMessage = document.getElementById(
  "closeCheckoutMessage"
);

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
    openCheckout(slotNumber);
  });

  return button;
}

function renderGrid() {
  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let number = 1; number <= TOTAL_SLOTS; number += 1) {
    fragment.appendChild(createSlotButton(number));
  }

  grid.appendChild(fragment);

  if (slotCount) {
    slotCount.textContent = `${TOTAL_SLOTS} available`;
  }
}

function openCheckout(slotNumber) {
  window.location.href = `checkout.html?slot=${slotNumber}`;
}

function loadCheckoutSlot() {
  if (!checkoutSlot) {
    return;
  }

  const parameters = new URLSearchParams(window.location.search);
  const slotFromUrl = parameters.get("slot");

  const slotNumber = Number(slotFromUrl);

  const isValidSlot =
    Number.isInteger(slotNumber) &&
    slotNumber >= 1 &&
    slotNumber <= TOTAL_SLOTS;

  checkoutSlot.textContent = isValidSlot
    ? formatSlotNumber(slotNumber)
    : "01";
}

function showSelectedSlot(slotNumber) {
  if (!selectedSlot || !selectionPanel) {
    return;
  }

  selectedSlot.textContent = slotNumber;
  selectionPanel.classList.add("visible");
}

function hideSelectedSlot() {
  if (selectionPanel) {
    selectionPanel.classList.remove("visible");
  }
}

function showCheckoutMessage() {
  if (checkoutMessage) {
    checkoutMessage.classList.add("visible");
  }
}

function hideCheckoutMessage() {
  if (checkoutMessage) {
    checkoutMessage.classList.remove("visible");
  }
}

if (closePanel) {
  closePanel.addEventListener("click", hideSelectedSlot);
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const productGrid = document.getElementById("productGrid");

    if (productGrid) {
      productGrid.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    showCheckoutMessage();
  });
}

if (closeCheckoutMessage) {
  closeCheckoutMessage.addEventListener(
    "click",
    hideCheckoutMessage
  );
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSelectedSlot();
    hideCheckoutMessage();
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

renderGrid();
loadCheckoutSlot();
