export default class Modal {
    private element: HTMLElement;
    private modalElement: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'modal-overlay';

        this.modalElement = document.createElement('div');
        this.modalElement.id = 'modal'
        this.modalElement.classList.add('modal')

        this.element.appendChild(this.modalElement);


    }

    render(): HTMLElement {
        return this.element;
    }

    showModal(infoForModal: HTMLElement) {
        const previousModal = this.element.querySelector('div');
        if (previousModal) {
            this.element.removeChild(previousModal);
            this.modalElement = document.createElement('div');
            this.modalElement.id = 'modal'
            this.modalElement.classList.add('modal')

            this.element.appendChild(this.modalElement);
        }
        this.element.classList.add('show');
        this.createInfoForModal(infoForModal);

    }

    hideModal() {
        this.element.classList.remove('show');
    }

    private createInfoForModal(infoForModal: HTMLElement) {
        console.log('inside create info for modal');
        const modalInfoContainer = infoForModal.getElementsByClassName('info-container');
        const imageContainer = infoForModal.getElementsByClassName('image-container')[0];

        const titleInfo = modalInfoContainer[0].getElementsByClassName('title')[0];
        const subInfo = modalInfoContainer[0].getElementsByClassName('sub-info')[0];
        const modalInfoDiv = modalInfoContainer[0].getElementsByClassName('modal-info')[0] as HTMLElement;

        const seriesInfoPElement = modalInfoDiv.querySelector('p');
        const titleInfoText = titleInfo?.textContent || undefined;
        const subInfoText = subInfo?.textContent || undefined;
        const seriesInfoText = seriesInfoPElement?.textContent || undefined;

        const imageElement = imageContainer.querySelector('img');

        const imageSrcText = imageElement?.src || undefined;

        this.createModal(imageSrcText, titleInfoText, subInfoText, seriesInfoText);


    }

    private createModal(imgSrc: string | undefined, title: string | undefined, subInfo: string | undefined, seriesInfo: string | undefined) {
        if (imgSrc && title && subInfo && seriesInfo) {
            const exitControlContainer = document.createElement('div');
            exitControlContainer.classList.add('exit-control-container');
            
            const exitControlPElement = document.createElement('p');
            exitControlPElement.textContent = 'Press Esc to exit';
            exitControlContainer.appendChild(exitControlPElement);

            const modalImageContainer = document.createElement('div');
            modalImageContainer.classList.add('modal-image-container');

            const modalImgElement = document.createElement('img');
            modalImgElement.src = imgSrc;

            modalImageContainer.appendChild(modalImgElement);

            const seriesTitleContainer = document.createElement('div')
            seriesTitleContainer.classList.add('series-title-container');
            const titlePElement = document.createElement('p');
            titlePElement.textContent = title;

            seriesTitleContainer.appendChild(titlePElement)


            const subInfoContainer = document.createElement('div');
            const subInfoPElement = document.createElement('p');
            subInfoPElement.textContent = subInfo;

            subInfoContainer.appendChild(subInfoPElement)

            seriesTitleContainer.appendChild(subInfoContainer);

            modalImageContainer.appendChild(seriesTitleContainer);

            const seriesInfoContainer = document.createElement('div');
            seriesInfoContainer.classList.add('series-info-container');
            const seriesInfoPElement = document.createElement('p');
            seriesInfoPElement.textContent = seriesInfo;

            seriesInfoContainer.appendChild(seriesInfoPElement);

            const modalContentContainer = document.createElement('div');
            modalContentContainer.classList.add('modal-content-container');

            this.modalElement.appendChild(exitControlContainer);
            this.modalElement.appendChild(modalImageContainer);
            this.modalElement.appendChild(seriesInfoContainer);
        }
    }
}