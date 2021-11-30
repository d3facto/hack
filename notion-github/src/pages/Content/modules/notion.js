import axios from 'axios'
import secrets from '../../../.secrets.dev.js'
// const databaseId = '69255561-4bd1-4c39-b2c0-2a13da1a1eac';

const CLIENT_SECRET = secrets.CLIENT_SECRET
export async function listStastus(databaseId) {
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

export async function getPage(databaseId, githubLink) {
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

export function extractPage(pages, link) {
  return pages.find(page => page.properties.git && page.properties.git.url === link)
}

export async function getPageStatus(pageId) {
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


export async function updatePageStatus(pageId, statusId) {
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

export function getPageId(url) {
  const index = url.lastIndexOf('-') + 1
  return url.substring(index)
}
