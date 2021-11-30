export function createLabel(text) {
  const span = document.createElement('span')
  span.classList.add('Label')
  span.innerText = text

  return span
}

export function createButton(text, onClick) {
  const btn = document.createElement('button')
  btn.classList.add('btn-small')
  btn.classList.add('btn')
  btn.innerText = text
  btn.addEventListener('click', onClick)

  return btn
}

/*
<span aria-label="You are a member of the d3facto organization." data-view-component="true" class="Label tooltipped tooltipped-multiline tooltipped-s ml-2">
  Member
</span>
*/
