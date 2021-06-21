import copy from '../'

(function() {
  const btn: HTMLElement = document.getElementById('copy')
  const txt = document.getElementById('textarea') as HTMLTextAreaElement

  btn.addEventListener('click', e => {
    copy(txt.value)
  })
})()
