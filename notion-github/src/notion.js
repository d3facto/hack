
const axios = require('axios');
const secrets = require('../.secrets.dev.js') 
const databaseId = '69255561-4bd1-4c39-b2c0-2a13da1a1eac';

// async listStatus() -> List[status]
// async getDatabaseRecord() -> List[Page {id, status, name, git?})]
// async getPage(id) -> Page
// async updatePageStatus(id, status) -> Page

const CLIENT_SECRET = secrets.CLIENT_SECRET
async function listStastus(databaseId) {
    const url = `https://api.notion.com/v1/databases/${databaseId}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${CLIENT_SECRET}`,
            "Notion-Version": "2021-05-13",
        },
    });
    const { properties = [] } = response.data;
    return properties.Status.select.options;
}

async function getPage(databaseId, githubLink) {
    const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
    const response = await axios.post(url, {}, {
        headers: {
            Authorization: `Bearer ${CLIENT_SECRET}`,
            "Notion-Version": "2021-08-16",
            "Content-Type": "application/json"
        }
    });
    const { results = [] } = response.data;
    console.log(results);
    const page = extractPage(results, githubLink);
    return page;
}

function extractPage(pages,link) {
    return pages.find(page => page.properties.git && page.properties.git.url === link)
}

async function getPageStatus(pageId) {
    const url = `https://api.notion.com/v1/pages/${pageId}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${CLIENT_SECRET}`,
            "Notion-Version": "2021-08-16",
            "Content-Type": "application/json"
        }
    });
    const { properties } = response.data;
    return properties.Status.select.name;
} 


async function updatePageStatus(pageId, statusId) {
    const url = `https://api.notion.com/v1/pages/${pageId}`;
    const response = await axios.patch(url, {
        properties: {
            Status: {
                select: {
                    id: statusId
                }
            }
        }
    }, {
        headers: {
            Authorization: `Bearer ${CLIENT_SECRET}`,
            "Notion-Version": "2021-08-16",
            "Content-Type": "application/json"
        }
    });
    return response.data;
} 


listStastus(databaseId).then((data) => {
    console.log(data);
}).catch(error => console.log(error));
getPage(databaseId, null).then((data) => {
    console.log(data);
}).catch(error => console.log(error));
getPageStatus('a5c7feda4e084f0c82365bc0281b6797').then(data => console.log(data));
updatePageStatus('a5c7feda4e084f0c82365bc0281b6797', '2').then(data => console.log(data));