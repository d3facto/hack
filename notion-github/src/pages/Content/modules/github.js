export function isGithubPR() {
  const url = window.location.href

  const regex = /https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/pull\/[0-9]+/
  return url.match(regex)
}

export function getNotionLink() {
  if (!isGithubPR()) {
    return undefined
  }

  const firstComment = document.getElementsByClassName("timeline-comment")[0]
  const body = firstComment.getElementsByClassName("comment-body")[0]
  const link = body.textContent.split(" ").find(s => s.startsWith("https://www.notion.so/getdefacto"))
  return link
}
