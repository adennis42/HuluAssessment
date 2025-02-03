import Collections from './components/Collections';
import HeaderImage from './components/HeaderImage';
import Modal from './components/Modal';

import { fetchData, fetchAllData } from './api';

import './styles.css';

const app = document.getElementById('app') as HTMLElement;

const headerImage = new HeaderImage();
const modal = new Modal();
app.appendChild(headerImage.render());

let collectionsURls: string[] = new Array().fill(null);
let collectionsData: any[] = new Array().fill(null);

let showModal: boolean = false;

fetchData().then((data) => {
    const components = data.components;
    components.forEach((component: any) => collectionsURls.push(component.href));
}).finally(() => {
    fetchAllData(collectionsURls).then((data: any) => {
        collectionsData = data;
        console.log("Collections Data -> ", collectionsData);
        const collections = new Collections(collectionsData);
        app.appendChild(collections.render());
    })
})

function waitForElementWithObserver(selector: string): Promise<NodeListOf<Element>> {
    return new Promise((resolve) => {
        const observer = new MutationObserver((mutations, obs) => {
            const imageContainers = document.querySelectorAll(selector);
            if (imageContainers.length > 0) {
                obs.disconnect();
                resolve(imageContainers);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

waitForElementWithObserver(".collection-item").then((element) => {
    console.log("Collections found", element);
    startCarousel();

});

const startCarousel = () => {

    let currentCollectionIndex = 0;
    const collectionListElement = document.getElementById('collection-list') as HTMLElement;
    const collections = collectionListElement.querySelectorAll('.collection-item');
    const imageIndices = new Array(collections.length).fill(0);


    function updateFocus() {

        const imageContainers = collections[currentCollectionIndex].querySelectorAll('.image-carousel-grid .image-container');
        const currentImageContainerIndex = imageIndices[currentCollectionIndex];
        const currentImageContainer = imageContainers[currentImageContainerIndex] as HTMLElement;
        currentImageContainer.classList.remove('fade-out');
        currentImageContainer.classList.add('focused');

        console.log('current image container', currentImageContainer);
        setNewHeaderImage(currentImageContainer);

        if (currentImageContainerIndex > 0) {
            const previousImageContainerIndex = currentImageContainerIndex - 1;
            const previousImageContainer = imageContainers[previousImageContainerIndex] as HTMLElement;
            previousImageContainer.classList.add('fade-out');

        }

        const offSetX = currentImageContainerIndex * -200;
        const offSetY = currentCollectionIndex * -250;

        const imageContainer = collections[currentCollectionIndex].querySelectorAll('.image-carousel-grid');
        const element = imageContainer[0] as HTMLElement;
        element.style.transform = `translateX(${offSetX}px)`;
        collectionListElement.style.transform = `translateY(${offSetY}px)`;


    }

    document.addEventListener('keydown', (event) => {
        const imageContainers = collections[currentCollectionIndex].querySelectorAll('.image-carousel-grid .image-container');
        imageContainers.forEach((item) => item.classList.remove('focused'));

        let currentImageIndex = imageIndices[currentCollectionIndex];

        if (event.key === 'ArrowRight' && currentImageIndex < imageContainers.length - 1 && !showModal) {
            currentImageIndex++;
        } else if (event.key === 'ArrowLeft' && currentImageIndex > 0 && !showModal) {
            currentImageIndex--;
        } else if (event.key === 'ArrowDown' && currentCollectionIndex < collections.length - 1 && !showModal) {
            currentCollectionIndex++;
            currentImageIndex = imageIndices[currentCollectionIndex];
        } else if (event.key === 'ArrowUp' && currentCollectionIndex > 0 && !showModal) {
            currentCollectionIndex--;
            currentImageIndex = imageIndices[currentCollectionIndex];
        } else if (event.key === 'Enter' && !showModal) {
            const imageContainers = collections[currentCollectionIndex].querySelectorAll('.image-carousel-grid .image-info-container');
            const currentImageContainerIndex = imageIndices[currentCollectionIndex];
            const currentImageContainer = imageContainers[currentImageContainerIndex] as HTMLElement;

            showModal = true;
            modal.showModal(currentImageContainer);

        } else if (event.key === 'Escape' && showModal) {
            showModal = false;
            modal.hideModal();
        }

        imageIndices[currentCollectionIndex] = currentImageIndex;

        updateFocus();
    });

    function setNewHeaderImage(currentImageContainer: HTMLElement) {
        const imageElement = currentImageContainer.querySelector('.image')
        const imageUrl = imageElement?.getAttribute('src');
        const formattedImageUrl = imageUrl?.split('&')[0];
        const baseImageParameter = imageUrl?.split('&')[1];
        headerImage.updateHeaderImage(`${formattedImageUrl}&${baseImageParameter}`);

    }

    updateFocus();
}

app.appendChild(modal.render());


