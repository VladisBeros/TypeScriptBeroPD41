import { ModalElements } from "../../types/types";

export function setupModal({ modal, openModalBtn, closeBtn }: ModalElements): void {
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
}