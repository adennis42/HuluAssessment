import axios, { AxiosResponse } from 'axios';
const API_URL = 'https://d1q0vy0v52gyjr.cloudfront.net/hub.json';

export async function fetchData(): Promise<any> {
    try {
        const response = await axios.get(API_URL);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }

        return await response.data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const responsesArray: any[] = [];
export async function fetchAllData(urls: string[]) {
    try {
        const requests = urls.map(async (url) => {
            const response = await axios.get(url);
            if (response.status != 200) {
                throw new Error(`Failed to fetch data from url ${url}`);
            }

            responsesArray.push(response.data);
        });

        await Promise.all(requests);

        return responsesArray;
    } catch (error) {
        console.error('Problem resolving all URLs ', error)
    }
}