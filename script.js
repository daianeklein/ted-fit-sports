document.addEventListener('DOMContentLoaded', function () {
  fetch('events.json')
    .then(response => response.json())
    .then(events => {
      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        displayEventTime: false,
        events: events.map(e => ({
          title: e.Event,
          start: e.Date,
          extendedProps: e,
        })),
        eventClick: function(info) {
          info.jsEvent.preventDefault();

          const event = info.event.extendedProps;

          document.getElementById('modal-title').textContent = event.Event ?? 'Sem título';
          document.querySelector('#modal-date span').textContent = event.Date ?? 'Não informado';
          document.querySelector('#modal-state span').textContent = event.State ?? 'Não informado';
          document.querySelector('#modal-location span').textContent = event.Location ?? 'Não informado';
          document.querySelector('#modal-distance span').textContent = event.Distances ?? 'Não informado';

          const inscricoesSpan = document.querySelector('#modal-inscricoes span');
          if (inscricoesSpan) {
            if (event.Inscricoes) {
              inscricoesSpan.innerHTML = `<a href="${event.Inscricoes}" target="_blank" rel="noopener noreferrer">Clique aqui</a>`;
            } else {
              inscricoesSpan.textContent = 'Não informado';
            }
          }

          document.getElementById('event-modal').style.display = 'flex';
        }
      });

      calendar.render();

      document.getElementById('modal-close-btn').onclick = () => {
        document.getElementById('event-modal').style.display = 'none';
      };

      document.getElementById('modal-return-btn').onclick = () => {
        document.getElementById('event-modal').style.display = 'none';
      };
    });
});