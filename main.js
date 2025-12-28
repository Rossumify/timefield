const field = document.getElementById("timefield");

/*
  Concept:
  - Horizontal axis = longitude
  - Center of light = current UTC solar position
  - No seconds (too noisy)
*/

function getUTCDecimalHour() {
  const now = new Date();
  return now.getUTCHours() + now.getUTCMinutes() / 60;
}

function updateTimefield() {
  const utcHour = getUTCDecimalHour();

  // Convert time → percentage across the field
  const center = (utcHour / 24) * 100;

  const leftNight  = Math.max(center - 35, 0);
  const leftDusk   = Math.max(center - 15, 0);
  const rightDusk  = Math.min(center + 15, 100);
  const rightNight = Math.min(center + 35, 100);

  field.style.background = `
    linear-gradient(
      90deg,
      #020111 ${leftNight}%,
      #0b1d3a ${leftDusk}%,
      #f6d365 ${center}%,
      #0b1d3a ${rightDusk}%,
      #020111 ${rightNight}%
    )
  `;
}

// Initial render
updateTimefield();

// Update once per minute — calm, human
setInterval(updateTimefield, 60 * 1000);
