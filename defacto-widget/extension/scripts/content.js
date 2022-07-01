'use strict';

console.log('FOO')
const containerId = 'github-chat-container'
const boxId = 'github-chat-box'

document.addEventListener('DOMContentLoaded', () => {
  console.log('FOO')
  createOverlay()
})

function createOverlay() {  
  const iframe = createiFrame()
  headerElem = document.body.getElementById('header')
  document.body.appendChild(iframe)
}

function createiFrame() {
  let baseUrl = chrome.runtime.getURL('iframe.html')
  // baseUrl = encodeURIComponent(baseUrl)
  let iframe = document.createElement('iframe')
  iframe.id = 'github-chat-box-iframe-wrapper'
  
  iframe.style.width = '100%'
  iframe.style.height = '100%'

  iframe.src = `${baseUrl}`

  return iframe
}

