import { setupModal } from "./modules/uiEvents/uiEvents";
import { setupScrollHeader } from "./modules/scrollHeader/scrollHeader";
import { setupFetchData } from "./modules/fetchData/fetchData";
import { ModalElements, HeaderElement, FetchButton } from "./types/types";

const modal: HTMLElement | null = document.getElementById('modal');
const openModalBtn: HTMLElement | null = document.getElementById('openModalBtn');
const closeBtn: HTMLElement | null = document.querySelector('.close-btn');
const header: HTMLElement | null = document.querySelector('header');
const fetchDataBtn: HTMLElement | null = document.getElementById('fetchDataBtn');

setupModal({ modal, openModalBtn, closeBtn });

setupScrollHeader(header);

setupFetchData(fetchDataBtn);