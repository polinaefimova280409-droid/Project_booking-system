function addBooking(roomName, dateText, timeText) {

    let list = JSON.parse(localStorage.getItem('myBookings')) || [];

    list.push({
        id: Date.now(),
        room: roomName,
        date: dateText,
        time: timeText
    });

    localStorage.setItem('myBookings', JSON.stringify(list));
}
function showBookings() {
    const container = document.querySelector('.bookings-list');
    if (!container) return;

    let list = JSON.parse(localStorage.getItem('myBookings')) || [];

    container.innerHTML = '';

    for (let item of list) {
        container.innerHTML += `
            <div class="booking-item">
                <div class="booking-date-box">
                    <span class="b-date">${item.date}</span>
                    <span class="b-time">${item.time}</span>
                </div>
                <div class="booking-details">
                    <h3>${item.room}</h3>
                    <p class="b-desc">Забронировано пользователем</p>
                </div>
                <div class="booking-status-col">
                    <span class="b-status confirmed">Подтверждено</span>
                    <span class="b-id">Заявка № ${String(item.id).slice(-4)}</span>
                </div>
                <div class="booking-actions">
                    <button type="button" class="btn-text-danger" onclick="removeBooking(${item.id})">
                        Отменить бронь
                    </button>
                </div>
            </div>
        `;
    }
}

function removeBooking(id) {
    let list = JSON.parse(localStorage.getItem('myBookings')) || [];

    list = list.filter(item => item.id !== id);

    localStorage.setItem('myBookings', JSON.stringify(list));
    showBookings();
}

document.addEventListener('DOMContentLoaded', () => {
    showBookings();

    const buttons = document.querySelectorAll('button, a');
    for (let btn of buttons) {
        if (btn.textContent.toLowerCase().includes('забронировать')) {
            btn.addEventListener('click', () => {
                const title = document.querySelector('h1')?.textContent.trim() || 'Аудитория 304';
                addBooking(title, '16 НОЯ ПН', '10:00 — 11:30');
                alert('Бронь сохранена в localStorage!');
            });
        }
    }
});

window.onstorage = event => {
    if (event.key === 'myBookings') {
        showBookings();
    }
};
