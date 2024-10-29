import { HeaderElement } from "../../types/types";

export function setupScrollHeader(header: HeaderElement): void {
    if (header) {
        window.addEventListener('scroll', (): void => {
            header.style.backgroundColor = window.scrollY > 50 ? '#555' : '#333';
        });
    }
}