document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.b-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.remove('active'));

            tab.classList.add('active');

            contents.forEach(c => c.style.display = 'none');

            const targetId = tab.getAttribute('data-target');

            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'flex';
            }
        });
    });
});