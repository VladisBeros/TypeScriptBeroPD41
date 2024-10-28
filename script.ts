const modal: HTMLElement | null = document.getElementById('modal');
const openModalBtn: HTMLElement | null = document.getElementById('openModalBtn');
const closeBtn: HTMLElement | null = document.querySelector('.close-btn');
const header: HTMLElement | null = document.querySelector('header');
const fetchDataBtn: HTMLElement | null = document.getElementById('fetchDataBtn');

if (openModalBtn && closeBtn && modal) {
    openModalBtn.addEventListener('click', (): void => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', (): void => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event: MouseEvent): void => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

if (header) {
    window.addEventListener('scroll', (): void => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#555';
        } else {
            header.style.backgroundColor = '#333';
        }
    });
}

if (fetchDataBtn) {
    fetchDataBtn.addEventListener('click', (): void => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then((response: Response): Promise<any> => response.json())
            .then((json: { title: string }): void => {
                console.log(json);
                alert(`Данні: ${json.title}`);
            })
            .catch((error: any): void => console.error('Помилка:', error));
    });
}