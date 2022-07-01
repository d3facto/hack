'use strict';

console.log('FOO')

document.addEventListener('DOMContentLoaded', () => {
  console.log('FOO')
  createOverlay()
})

function getSiren() {
  return document.getElementById('identite-siren')
}

function createOverlay() {  
  const sirenElem = document.getElementById('identite-siren')
  const siren = sirenElem.textContent.replaceAll(/\s+/g, '')  
  const iframe = createiFrame(siren)  
  document.body.appendChild(iframe)
}

function createiFrame(siren) {
  let baseUrl = chrome.runtime.getURL('iframe.html')
  let iframe = document.createElement('iframe')
  iframe.id = 'defacto-widget'
  
  iframe.style.width = '100%'
  iframe.style.height = '100%'

  iframe.src = `https://d3facto.github.io/hack/?siren=${siren}`

  return iframe
}

