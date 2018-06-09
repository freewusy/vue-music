export function addClass(el, classname) {
  if (hasClass(el, classname)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(classname)
  el.className = newClass.join(' ')
}

export function hasClass(el, classname) {
  let reg = new RegExp('(^|\\s)' + classname + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}