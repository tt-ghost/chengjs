
export async function copy(text: string):Promise<void> {
  if(typeof window === 'undefined') return

  const readPromise = await navigator.permissions
    .query({
      name: 'clipboard-read'
    } as any)
  const writePromise = await navigator.permissions
    .query({
      name: 'clipboard-write'
    } as any)
  const [readPerm, writePerm] = await Promise.all([readPromise, writePromise])

  if (
    (['granted', 'prompt'].indexOf(readPerm.state) > -1)
    || (['granted', 'prompt'].indexOf(writePerm.state) > -1)
  ) {
    await navigator.clipboard.writeText(text)
  } else {
    await Promise.reject('请授权剪切板')
  }
}
