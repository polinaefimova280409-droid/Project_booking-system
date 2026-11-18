document.addEventListener('DOMContentLoaded', () => {
    const dayBodies = document.querySelectorAll('.day-body');
    const timeSlots = 7; 
    const slotHeightPercent = 100 / timeSlots; 

    
    dayBodies.forEach(body => {
        body.addEventListener('click', (e) => {
           
            if (e.target.closest('.slot.busy')) return;

           
            const rect = body.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const clickPercent = (clickY / rect.height) * 100;

         
            let clickedHourIndex = Math.floor(clickPercent / slotHeightPercent);
            
           
            if (clickedHourIndex < 0) clickedHourIndex = 0;
            if (clickedHourIndex >= timeSlots) clickedHourIndex = timeSlots - 1;

            const startHour = 9 + clickedHourIndex;
            const startTimeStr = `${startHour.toString().padStart(2, '0')}:00`;

         
            const durationMinutes = 90; 
            let endHour = startHour + Math.floor(durationMinutes / 60);
            let endMin = durationMinutes % 60;
            const endTimeStr = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;

            
            const oldSelection = document.querySelector('.slot.selected');
            if (oldSelection) oldSelection.remove();

            
            const newSlot = document.createElement('div');
            newSlot.className = 'slot selected';
            
            
            newSlot.style.top = `${clickedHourIndex * slotHeightPercent}%`;
            
            newSlot.style.height = `${1.5 * slotHeightPercent}%`;
            newSlot.innerHTML = `Выбрано<br><span>${startTimeStr}-${endTimeStr}</span>`;
            
            body.appendChild(newSlot);

    
            const dayCol = body.closest('.day-col');
            const dateStr = dayCol.getAttribute('data-date');
            
            
            const dateObj = new Date(dateStr);
            const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;

            document.querySelector('.summary-text').textContent = `${formattedDate} • ${startTimeStr} — ${endTimeStr}`;

            
            document.getElementById('modal-date').value = dateStr;
            document.getElementById('modal-start').value = startTimeStr;
            document.getElementById('modal-end').value = endTimeStr;
            document.getElementById('modal-duration').textContent = `Длительность: 1 ч 30 мин`;

        
            window.location.hash = 'booking-modal';
        });
    });

    const closeBtns = document.querySelectorAll('.modal-close, .btn-cancel');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '';
        });
    });


    const btnConfirm = document.querySelector('.btn-submit-confirm');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            
        
            alert('Бронирование успешно создано! Проверьте раздел "Мои брони".');
            window.location.hash = '';
            
           
            const selectedSlot = document.querySelector('.slot.selected');
            if (selectedSlot) {
                selectedSlot.className = 'slot busy';
                selectedSlot.innerHTML = `Занято<br><span>${document.getElementById('modal-start').value}-${document.getElementById('modal-end').value}</span>`;
            }
        });
    }
});