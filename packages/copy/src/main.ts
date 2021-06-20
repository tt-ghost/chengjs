
export default function copy <T>(str: string) {
  const input = document.createElement('textArea') as HTMLTextAreaElement

  input.setAttribute('style', 'position: absolute;z-index: -1;height: 0;width: 0;')
  document.body.appendChild(input)
  input.value = str
  input.select()

  const isCopied: boolean = document.execCommand('copy', false, null)

  return new Promise<any>((resolve, reject) => {
    isCopied ? resolve(str) : reject(new Error('error'))
    document.body.removeChild(input)
  })
}

