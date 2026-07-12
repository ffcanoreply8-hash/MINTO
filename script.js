const TOTAL_SLOTS = 81;

const packages = [
  { robux: 100, price: 0.99 },
  { robux: 200, price: 1.49 },
  { robux: 400, price: 2.99 },
  { robux: 600, price: 4.49 },
  { robux: 800, price: 5.99 },
  { robux: 1000, price: 7.49 },
  { robux: 1200, price: 8.99 },
  { robux: 1700, price: 11.99 },
  { robux: 2500, price: 17.99 },
  { robux: 3500, price: 23.99 },
  { robux: 4500, price: 29.99 },
  { robux: 6000, price: 38.99 },
  { robux: 8000, price: 49.99 },
  { robux: 10000, price: 59.99 },
  { robux: 15000, price: 84.99 },
  { robux: 22500, price: 119.99 }
];

function formatSlot(number) {
  return String(number).padStart(2, "0");
}

function formatRobux(amount) {
  return new Intl.NumberFormat("en-CA").format(amount);
}

function formatPrice(price) {
  return `$${price.toFixed(2)} CAD`;
}

function getPackage(slotNumber) {
  return packages[slotNumber - 1] || null;
}

function openCheckout(slotNumber) {
  const url = new URL("checkout.html", window.location.href);

  url.searchParams.set("slot", slotNumber);

  window.location.assign(url.href);
}

function createSlot(slotNumber) {
  const product = getPackage(slotNumber);
  const button = document.createElement("button");

  button.type = "button";
  button.className = product
    ? "slot-card package-slot"
    : "slot-card";

  button.setAttribute(
    "aria-label",
    `Open slot ${formatSlot(slotNumber)}`
  );

  button.innerHTML = product
    ? `
      <span class="slot-number">${formatSlot(slotNumber)}</span>

      <span class="slot-symbol" aria-hidden="true">
        <i></i>
      </span>

      <strong>${formatRobux(product.robux)} R$</strong>
      <small>${formatPrice(product.price)}</small>
    `
    : `
      <span class="slot-number">${formatSlot(slotNumber)}</span>

      <span class="slot-symbol" aria-hidden="true">
        <i></i>
      </span>

      <strong>Coming soon</strong>
      <small>Future package</small>
    `;

  button.addEventListener("click", () => {
    openCheckout(slotNumber);
  });

  return button;
}

function renderGrid() {
  const grid = document.getElementById("productGrid");

  if (!grid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let slot = 1; slot <= TOTAL_SLOTS; slot += 1) {
    fragment.appendChild(createSlot(slot));
  }

  grid.appendChild(fragment);
}

function loadCheckout() {
  const checkoutSlot = document.getElementById("checkoutSlot");

  if (!checkoutSlot) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSlot = Number(params.get("slot"));

  const slotNumber =
    Number.isInteger(requestedSlot) &&
    requestedSlot >= 1 &&
    requestedSlot <= TOTAL_SLOTS
      ? requestedSlot
      : 1;

  const product = getPackage(slotNumber);

  const checkoutProduct =
    document.getElementById("checkoutProduct");

  const checkoutPrice =
    document.getElementById("checkoutPrice");

  const summaryCode =
    document.getElementById("summaryCode");

  const summaryNote =
    document.getElementById("summaryNote");

  checkoutSlot.textContent = formatSlot(slotNumber);
  summaryCode.textContent = `MINTO / ${formatSlot(slotNumber)}`;

  if (product) {
    checkoutProduct.textContent =
      `${formatRobux(product.robux)} Robux`;

    checkoutPrice.textContent =
      formatPrice(product.price);

    summaryNote.textContent =
      "Review the username carefully before continuing to payment.";
  } else {
    checkoutProduct.textContent = "Coming soon";
    checkoutPrice.textContent = "$0.00 CAD";

    summaryNote.textContent =
      "This slot is reserved for a package you can add later.";
  }
}

function setupPageActions() {
  const exploreButton =
    document.getElementById("exploreButton");

  const checkoutForm =
    document.getElementById("checkoutForm");

  const checkoutMessage =
    document.getElementById("checkoutMessage");

  const closeMessage =
    document.getElementById("closeCheckoutMessage");

  const year =
    document.getElementById("year");

  if (exploreButton) {
    exploreButton.addEventListener("click", () => {
      document.getElementById("outlet")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  if (checkoutForm && checkoutMessage) {
    checkoutForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
      }

      checkoutMessage.classList.add("visible");
    });
  }

  if (closeMessage && checkoutMessage) {
    closeMessage.addEventListener("click", () => {
      checkoutMessage.classList.remove("visible");
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      checkoutMessage?.classList.remove("visible");
    }
  });

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

renderGrid();
loadCheckout();
setupPageActions();
