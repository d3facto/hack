import { isGithubPR, getNotionLink, addStatusToPRBody } from './modules/github';

if (isGithubPR()) {
  const notionLink = getNotionLink()

  if (notionLink) {
    addStatusToPRBody()
  }
}
