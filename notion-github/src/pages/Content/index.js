import { printLine } from './modules/print';
import { isGithubPR, getNotionLink } from './modules/github';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

if (isGithubPR()) {
  const notionLink = getNotionLink()

  if (notionLink) {
    alert(`Welcome! I\'m your favorite bot. There is your notion link: ${notionLink}`)
  }
}
