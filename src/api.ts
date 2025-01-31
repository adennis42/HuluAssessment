import axios from 'axios';

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