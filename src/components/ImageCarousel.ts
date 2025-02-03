import { create } from "axios";
import { info } from "console";

export default class ImageCarousel {

    private element: HTMLElement;

    private format: string = "jpeg";
    private size: string = "250x150";
    private watermarkFormat = "png";
    private watermarkSize = "75x50";

    constructor(items: any) {
        this.element = document.createElement('div');
        this.element.classList.add("image-carousel-grid");

        items.forEach(async (item: any) => {
            const container = document.createElement('div');
            const imagesDiv = document.createElement('div');
            container.classList.add("image-info-container");
            imagesDiv.classList.add("image-container");

            const imgElement = this.createImageElement(item);
            imagesDiv.appendChild(imgElement);

            if (item.visuals?.primary_branding?.artwork !== undefined) {
                const watermark = this.createWatermarkElement(item);
                imagesDiv.appendChild(watermark);
            }

            container.appendChild(imagesDiv);

            const infoContainerDiv = this.createInfoContainerElement(item);

            container.appendChild(infoContainerDiv);
            this.element.appendChild(container);
        });

    }

    extractYear(date: string): string {
        return date.split('-')[0];
    }

    getFirstGenreName(genreArray: string[]): string {
        return genreArray[0];
    }

    createImageElement(item: any): HTMLImageElement {
        const imgElement = document.createElement('img');
        imgElement.src = `${item.visuals.artwork.horizontal_tile.image.path}&format=${this.format}&size=${this.size}`;
        imgElement.alt = item.visuals.artwork.horizontal_tile.text;
        imgElement.classList.add("image");

        return imgElement;
    }

    createWatermarkElement(item: any): HTMLImageElement {
        const watermark = document.createElement('img');
        watermark.src = `${item.visuals?.primary_branding?.artwork["brand.watermark"]?.path}&format=${this.watermarkFormat}&size=${this.watermarkSize}`;
        watermark.alt = "Hulu Ogs";
        watermark.classList.add("watermark");
        return watermark;
    }

    createSubInfoString(item: any): string {
        const year = this.extractYear(item.entity_metadata.premiere_date);
        const genreInfo = this.getFirstGenreName(item.entity_metadata.genre_names);
        const rating = item.entity_metadata.rating.code;

        return `${rating} • ${genreInfo} • ${year}`;
    }

    createInfoContainerElement(item: any): HTMLDivElement {
        const infoContainerDiv = document.createElement('div');

        infoContainerDiv.classList.add('info-container');

        const titlePElement = document.createElement('p');
        titlePElement.classList.add('title');
        titlePElement.textContent = item.visuals.headline;

        const subInfoPElement = document.createElement('p');
        subInfoPElement.classList.add('sub-info');
        subInfoPElement.textContent = this.createSubInfoString(item);

        infoContainerDiv.appendChild(titlePElement);
        infoContainerDiv.appendChild(subInfoPElement);
        infoContainerDiv.appendChild(this.createInvisibleInfoForModal(item));

        return infoContainerDiv;
    }

    createInvisibleInfoForModal(item: any): HTMLDivElement {
        const modalInfo = document.createElement('div');
        modalInfo.classList.add('modal-info');
        const seriesDescriptionPElement = document.createElement('p');
        seriesDescriptionPElement.id = 'series-description';
        seriesDescriptionPElement.textContent = item.entity_metadata.series_description;

        modalInfo.appendChild(seriesDescriptionPElement)

        return modalInfo;
    }


    render(): HTMLElement {
        return this.element
    }
}