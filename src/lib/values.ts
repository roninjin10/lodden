export function values(obj: Object) {
  return Object
    .keys(obj)
    .map(key => (obj as any)[key])
}