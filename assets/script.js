let ToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
} 
function refreshCSS() {
  var sheets = [].slice.call(document.getElementsByTagName("link"));
  var head = document.getElementsByTagName("head")[0];
  for (var i = 0; i < sheets.length; ++i) {
    var elem = sheets[i];
    var parent = elem.parentElement || head;
    parent.removeChild(elem);
    var rel = elem.rel;
    if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
      var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
      elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
    }
    parent.appendChild(elem);
  }
}
setTimeout(() => {
  refreshCSS()
  //
  document.scrollingElement = document.getElementById("content")
  //
  let menu
  function remove() {
    menu?.remove?.()
    menu = null
  }
  function makeContextMenu(Element, menuItems) {
    if (!Element) return console.error("Element is null")
    if (!menuItems || !Array.isArray(menuItems)) return console.error("menuItems is null or isnt a array")
    Element.oncontextmenu = (e) => {
      e.preventDefault()
      remove()
      menu = document.createElement("div")
      let left = `${((innerWidth - 200) <= e.x) ? e.x - 200 : e.x}px`
      Object.assign(menu.style, {
        top: e.clientY + "px",
        left: left,
        position: "fixed",
      })
      menu.id = "context-menu"
      document.body.appendChild(menu)
      menu.appendChild(document.createElement("div"))
      for (const menuItem of menuItems) {
        let toAppend
        if (menuItem.type == "separator") {
          toAppend = document.createElement("div")
          toAppend.className = "context-menu-separator"
        }
        else if (menuItem.type == "item") {
          toAppend = document.createElement("div")
          let el = document.createElement("div")
          el.innerText = menuItem.name
          el.className = "context-menu-item-label"
          toAppend.appendChild(el)
          toAppend.onclick = (r) => menuItem.action(r, e)
          toAppend.className = "context-menu-item"
        }
        toAppend.role = menuItem.type
        menu.childNodes[0].appendChild(toAppend)
      }
    }
  }
  window.makeContextMenu = makeContextMenu
  document.body.oncontextmenu = _ => _.preventDefault()
  for (const img of document.getElementsByTagName("img")) {
    makeContextMenu(img, [{
      type: "item",
      name: "Copy Image URL",
      action: (_, { target }) => {
        ToClipboard(target.src)
      }
    }])
  }
  for (const a of document.getElementsByTagName("a")) {
    makeContextMenu(a, [
      {
        type: "item",
        name: "Open URL",
        action: (_, { path }) => {
          open(path.find(p => p.tagName === "A").href)
        }
      },
      {
        type: "item",
        name: "Copy URL",
        action: (_, { path }) => {
          ToClipboard(path.find(p => p.tagName === "A").href)
        }
      }
    ])
  }
  document.body.addEventListener("click", remove)
})