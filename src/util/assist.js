const isColor = function (value) {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value)
}

const isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

const pageScroll = (function () {
  const fn = function (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  let islock = false

  return {
    lock(el) {
      if (islock) return
      islock = true;
      (el || document).addEventListener('touchmove', fn)
    },
    unlock(el) {
      islock = false;
      (el || document).removeEventListener('touchmove', fn)
    }
  }
})()

const getScrollview = function (el) {
  let currentNode = el
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

const preventScroll = (function () {
  return {
    lock(el) {
      isIOS && addClass(el || document.body, 'g-fix-ios-prevent-scroll')
    },
    unlock(el) {
      isIOS && removeClass(el || document.body, 'g-fix-ios-prevent-scroll')
    }
  }
})()

const hasClass = function (elem, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0 || !elem) return false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

const addClass = function (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
  }
}

const removeClass = function (ele, cls) {
  if (hasClass(ele, cls)) {
    let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}

const getRect = (el) => {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  }
  else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export { isColor, addClass, removeClass, getScrollview, isIOS, preventScroll, pageScroll, getRect }
