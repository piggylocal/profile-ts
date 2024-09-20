import axios from 'axios';

async function getIP(): Promise<string | null> {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {getIP};