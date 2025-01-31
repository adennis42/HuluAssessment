export default class Collections {
    private element: HTMLElement;

    constructor(components: any) {
        this.element = document.createElement('div');
        this.element.classList.add("collection-list");

        components.forEach((component: any) => {
            const collectionItem = document.createElement('div');
            collectionItem.classList.add("collection-item");
            collectionItem.innerHTML = `
                <h1>${component.name}</h1>
            `;
            this.element.appendChild(collectionItem);
        });

    }

    render(): HTMLElement {
        return this.element
    }

}