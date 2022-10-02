interface FileSelectOption {
  multiple?: boolean
  type?: string
}

export class FileSelect {
  public multiple: boolean
  public type: string
  public el: HTMLInputElement

  constructor(opt: FileSelectOption) {
    const { multiple, type } = opt || {}
    this.multiple = multiple
    this.type = type
    this.el = this.createElement()
  }

  select() {
    this.el.click()
  }

  url() {
    const files = this.el.files
    if (files.length === 1) {
      return URL.createObjectURL(files[0])
    }
    return
  }

  preview() {
    if (this.type.startsWith('image/')) {
      window.open(this.url())
    }
  }

  createElement(): HTMLInputElement {
    const file = document.createElement('input')
    const body = document.body
    file.setAttribute('type', 'file')
    file.setAttribute('style', 'display:none')
    if (this.multiple) {
      file.setAttribute('multiple', 'true')
    }
    body.appendChild(file)

    return file
  }
}
