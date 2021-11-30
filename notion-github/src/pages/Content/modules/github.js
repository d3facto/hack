import { getPageId, getPageStatus, updatePageStatus } from './notion'
import { createLabel, createButton } from './domutils'

export function isGithubPR() {
  const url = window.location.href

  const regex = /https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/pull\/[0-9]+/
  return url.match(regex)
}

function getPRElement() {
  const firstComment = document.getElementsByClassName("timeline-comment")[0]
  const body = firstComment.getElementsByClassName("comment-body")[0]
  return body
}

export function getNotionLink() {
  const body = getPRElement()
  const link = body.textContent.split(" ").find(s => s.startsWith("https://www.notion.so/getdefacto"))
  return link
}

export async function addStatusToPRBody() {
  const notionLink = getNotionLink()
  const notionPageId = '9e88279c33a14f788a8cba31397f3232' // getPageId(notionLink)
  const status = await getPageStatus(notionPageId)

  const prBody = getPRElement()

  const statusLabel = createLabel(status)

  const btn = createButton('Change to inprogress', () => {
    updatePageStatus(notionPageId, '2').then(() => {
      getPageStatus(notionPageId).then((status) => {
        statusLabel.innerText = status
      })
    })
  })

  prBody.insertBefore(document.createElement('p'), prBody.firstChild)
  prBody.insertBefore(btn, prBody.firstChild)
  prBody.insertBefore(document.createElement('p'), prBody.firstChild)
  prBody.insertBefore(statusLabel, prBody.firstChild)
}
