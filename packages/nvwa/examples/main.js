import { compier } from '../lib/main'

const genEl = document.getElementById('gen')
const sourceEl = document.getElementById('source')
const astEl = document.getElementById('ast')

genEl.addEventListener('click', e => {
    const source = sourceEl.value;
    const ast = compier(source)
    const code = JSON.stringify(ast, null, 2)

    astEl.innerHTML = `<b>${code}</b>`
})