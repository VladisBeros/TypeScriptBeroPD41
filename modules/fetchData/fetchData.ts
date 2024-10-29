import { FetchButton } from "../../types/types";

export function setupFetchData(fetchDataBtn: FetchButton): void {
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
}