export default class HeaderImage {

    private element: HTMLElement;
    private format: string = "jpeg";
    private size: string = "1920x480";

    private changeTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('header-image');
    }

    render(): HTMLElement {
        return this.element;
    }

    updateHeaderImage(url: string | undefined) {
        if (url) {

            if (this.changeTimeout) {
                clearTimeout(this.changeTimeout);
            }

            this.changeTimeout = setTimeout(() => {
                const previousImgElement = this.element.querySelector('img');
                if (previousImgElement) {
                    this.element.removeChild(previousImgElement);
                }
                const imageElement = document.createElement('img');
                imageElement.src = `${url}&format=${this.format}&size=${this.size}`;
                this.element.appendChild(imageElement);
            }, 750);
        }
    }
}