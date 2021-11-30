import { isGithubPR, getNotionLink } from './modules/github';

if (isGithubPR()) {
  const notionLink = getNotionLink()

  if (notionLink) {
    alert(`Welcome! I\'m your favorite bot. There is your notion link: ${notionLink}`)
  }
}
