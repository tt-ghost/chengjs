// import { random } from '@chengjs/utils'
import { version } from '../package.json'

export default class Designer {
  public version: string
  public styleId: string
  public trackings: { el: Element }[]
  public pane: Element
  public bodyListener: (e: Event) => void

  constructor() {
    this.version = version
    this.styleId = 'cj-tracking-designer'
    this.trackings = []
    this.pane = this.createPane()
    this.bodyListener = (e: any) => {
      console.log(e.target)
      e.preventDefault()
      e.stopPropagation()
      const hasTarget = !!this.trackings.filter(({ el }) => el === e.target)
        .length
      if (!hasTarget) this.trackings.push({ el: e.target })
      this.refreshPane()
    }
    this.init()
  }

  init() {
    this.initStyle()
    this.initEvent()
  }

  initStyle() {
    if (document.getElementById(this.styleId)) return

    const el = document.createElement('style')
    el.setAttribute('id', this.styleId)
    const style =
      '*{outline: 1px solid rgba(0,0,0,.1)}' +
      '*:hover{outline: 1px solid rgba(0,0,0,.3)}' +
      '*:focus{outline: 1px solid rgba(0,0,200,.3)}' +
      '#cj-tracking-pane{position: fixed;right:0;bottom:0;width: 200px;min-height: 300px;' +
      'background-color: rgba(255,255,255,.6);padding: 16px;}' +
      '#cj-tracking-pane .cj-tracking-pane-item{margin: 8px 0;background-color: rgba(255,255,255,.8)}'
    el.innerText = style
    document.head.appendChild(el)
  }

  initEvent() {
    document.body.addEventListener('click', this.bodyListener, true)
  }

  createPane() {
    const pane = document.createElement('div')
    pane.setAttribute('id', 'cj-tracking-pane')
    document.body.append(pane)
    return pane
  }

  refreshPane() {
    this.pane.innerHTML = this.trackings
      .map(({ el }) => {
        let text = '#' + (el.getAttribute('id') || '')
        text = text === '#' ? Array.from(el.classList).join('.') : '匿名'
        return `<div class='cj-tracking-pane-item'>${text}</div>`
      })
      .join('')
  }
  destroy() {
    document.body.removeChild(document.getElementById(this.styleId))
    document.body.removeEventListener('click', this.bodyListener, true)
  }
}
