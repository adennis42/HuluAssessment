import ImageCarousel from "./ImageCarousel";

import { fetchAllData } from "../api";
export default class Collections {
    private element: HTMLElement;

    constructor(collections: any) {
        this.element = document.createElement('div');
        this.element.classList.add("collection-list");
        this.element.id = ('collection-list');

        collections.forEach((component: any) => {
            const collectionItem = document.createElement('div');
            collectionItem.classList.add("collection-item");
            collectionItem.innerHTML = `
                <h1>${component.name}</h1>
            `;
            const carousel = new ImageCarousel(component.items);
            collectionItem.appendChild(carousel.render());
            this.element.appendChild(collectionItem);
        });
    }

    render(): HTMLElement {
        return this.element
    }

}