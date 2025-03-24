document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[name="event-type"]');
  const sortSelect = document.getElementById('sort');
  const events = document.querySelectorAll('.event');

  // Add event listeners to checkboxes for filtering
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterEvents);
  });

  // Add event listener to sort dropdown
  sortSelect.addEventListener('change', sortEvents);

  // Function to filter events based on selected checkboxes
  function filterEvents() {
    const checkedBoxes = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    events.forEach(event => {
      const eventType = event.querySelector('h3').textContent;
      // Show event if no checkbox is selected or if the event type matches any selected checkbox
      if (checkedBoxes.length === 0 || checkedBoxes.some(type => eventType.includes(type))) {
        event.style.display = 'block';
      } else {
        event.style.display = 'none';
      }
    });
  }

  // Function to sort events based on selected sorting option
  function sortEvents() {
    const sortBy = sortSelect.value;
    const eventsArray = Array.from(events);

    // Sorting by date
    if (sortBy === 'date') {
      eventsArray.sort((a, b) => {
        const dateA = new Date(a.querySelector('p').textContent.replace('Date: ', ''));
        const dateB = new Date(b.querySelector('p').textContent.replace('Date: ', ''));
        return dateA - dateB;
      });
    }
    // Sorting by name
    else if (sortBy === 'name') {
      eventsArray.sort((a, b) => {
        const nameA = a.querySelector('h3').textContent.toLowerCase();
        const nameB = b.querySelector('h3').textContent.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }

    // Update the DOM with the newly sorted events
    const parent = document.querySelector('.events');
    parent.innerHTML = ''; // Clear existing events
    eventsArray.forEach(event => parent.appendChild(event)); // Append sorted events
  }
});
