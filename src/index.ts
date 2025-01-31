import Collections from './components/Collections';
import { fetchData } from './api';

import './styles.css';

const app = document.getElementById('app') as HTMLElement;

fetchData().then((data) => {
    const collections = new Collections(data.components);
    app.appendChild(collections.render());
});
