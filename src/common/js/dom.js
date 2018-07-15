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

// browser css3 hack
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let styleHack = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }

  for (let key in styleHack) {
    if (elementStyle[styleHack[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function hackStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}