Object.prototype.forEach = function(callback) {
  if (typeof this === "object")
    for (const key in this)
      if (Object.hasOwnProperty.call(this, key))
        callback(this[key])
  else if (typeof this === "array") 
    for (const ite of this) callback(this[ite])
}

// https://stackoverflow.com/a/3540295/17512911
const isMobile = () => /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))
let ToClipboard = str => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
} 
function zoom(onWheelElement, zoomElement = onWheelElement) {
  let currentScale = 1
  onWheelElement.onwheel = (event) => {
    const delta = event.deltaY * -0.01
    const nextScale = (currentScale + delta) > 1 ? currentScale + delta : 1
    currentScale = nextScale
    zoomElement.style.transform = `scale(${nextScale})`
  }
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
      var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, "");
      elem.href = url + (url.indexOf("?") >= 0 ? "&" : "?") + "_cacheOverride=" + (new Date().valueOf());
    }
    parent.appendChild(elem);
  }
}

let inv = localStorage.inv_code ?? ""
document.addEventListener("DOMContentLoaded", () => {
  function makeTitleBar() {
    document.getElementById("navbar").innerHTML = `<nav><div>
      <a href="/"><div><svg width="34" height="34" viewBox="0 0 22 22">
        <path d="M11.1903 7.802C11.1903 8.426 11.1003 9.092 10.9203 9.8C10.7403 10.496 10.4883 11.192 10.1643 11.888C9.84032 12.572 9.43832 13.232 8.95832 13.868C8.49032 14.492 7.95632 15.044 7.35632 15.524C6.75632 15.992 6.09632 16.37 5.37632 16.658C4.66832 16.946 3.91232 17.09 3.10832 17.09C2.94032 17.09 2.77232 17.078 2.60432 17.054C2.43632 17.042 2.26832 17.024 2.10032 17C2.42432 15.344 2.74232 13.73 3.05432 12.158C3.17432 11.498 3.30032 10.814 3.43232 10.106C3.56432 9.386 3.69032 8.678 3.81032 7.982C3.93032 7.286 4.04432 6.62 4.15232 5.984C4.27232 5.348 4.36832 4.772 4.44032 4.256C4.95632 4.16 5.47832 4.07 6.00632 3.986C6.53432 3.902 7.07432 3.86 7.62632 3.86C8.27432 3.86 8.82032 3.962 9.26432 4.166C9.72032 4.37 10.0863 4.652 10.3623 5.012C10.6503 5.372 10.8603 5.792 10.9923 6.272C11.1243 6.752 11.1903 7.262 11.1903 7.802ZM6.94232 6.398C6.81032 7.106 6.67232 7.784 6.52832 8.432C6.38432 9.08 6.24032 9.734 6.09632 10.394C5.95232 11.054 5.80832 11.744 5.66432 12.464C5.52032 13.184 5.38232 13.97 5.25032 14.822C5.53832 14.63 5.81432 14.372 6.07832 14.048C6.35432 13.712 6.61232 13.328 6.85232 12.896C7.09232 12.464 7.30832 12.008 7.50032 11.528C7.70432 11.048 7.87832 10.58 8.02232 10.124C8.16632 9.668 8.27432 9.242 8.34632 8.846C8.43032 8.45 8.47232 8.108 8.47232 7.82C8.47232 7.376 8.34632 7.028 8.09432 6.776C7.85432 6.524 7.47032 6.398 6.94232 6.398ZM10.0456 17.018C10.3696 15.422 10.6816 13.862 10.9816 12.338C11.0896 11.69 11.2096 11.018 11.3416 10.322C11.4736 9.614 11.5936 8.918 11.7016 8.234C11.8216 7.538 11.9296 6.872 12.0256 6.236C12.1336 5.588 12.2176 5 12.2776 4.472C12.9616 4.256 13.6996 4.1 14.4916 4.004C15.2836 3.896 16.0696 3.842 16.8496 3.842C17.3176 3.842 17.7016 3.896 18.0016 4.004C18.3136 4.112 18.5536 4.268 18.7216 4.472C18.9016 4.664 19.0276 4.892 19.0996 5.156C19.1716 5.42 19.2076 5.714 19.2076 6.038C19.2076 6.518 19.1236 6.992 18.9556 7.46C18.7876 7.916 18.5596 8.354 18.2716 8.774C17.9956 9.182 17.6716 9.56 17.2996 9.908C16.9396 10.244 16.5496 10.52 16.1296 10.736C16.3456 11.216 16.5736 11.744 16.8136 12.32C17.0656 12.884 17.2996 13.424 17.5156 13.94C17.7556 14.54 18.0016 15.14 18.2536 15.74L15.4636 16.712C15.2236 15.944 15.0076 15.224 14.8156 14.552C14.7316 14.276 14.6476 13.994 14.5636 13.706C14.4796 13.406 14.4016 13.124 14.3296 12.86C14.2576 12.596 14.1976 12.362 14.1496 12.158C14.1016 11.942 14.0716 11.768 14.0596 11.636L13.8256 11.708C13.7536 12.092 13.6636 12.542 13.5556 13.058C13.4596 13.574 13.3696 14.072 13.2856 14.552C13.1776 15.116 13.0696 15.686 12.9616 16.262L10.0456 17.018ZM14.2756 9.206C14.5036 9.182 14.7796 9.086 15.1036 8.918C15.4396 8.75 15.7576 8.552 16.0576 8.324C16.3576 8.084 16.6156 7.838 16.8316 7.586C17.0476 7.334 17.1556 7.112 17.1556 6.92C17.1556 6.788 17.1136 6.686 17.0296 6.614C16.9456 6.53 16.8256 6.47 16.6696 6.434C16.5256 6.386 16.3636 6.356 16.1836 6.344C16.0036 6.332 15.8176 6.326 15.6256 6.326C15.4936 6.326 15.3556 6.332 15.2116 6.344C15.0796 6.344 14.9596 6.344 14.8516 6.344L14.2756 9.206Z" fill="currentcolor"></path>
      </svg></div></a>
      </div>
      <div>
        <div></div>
        <div><a href="/download/">Download</a></div>
        <div><a href="/plugins/">Plugins</a></div>
        <div><a href="/themes/">Themes</a></div>
        <div><a href="/features/">Features</a></div>
        <div><a href="${inv}">Server</a></div>
        <div></div>
      </div>
    </nav>`
  }
  makeTitleBar()
  if (!inv) fetch("https://discord.com/api/guilds/864267123694370836/widget.json", { cache: "force-cache" }).then(e => e.json()).then(e => {
    inv = e.instant_invite 
    localStorage.inv_code = e.instant_invite 
    makeTitleBar()
  })
  //
  location.host !== "127.0.0.1:5500" ? null : refreshCSS()
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
  function openModal(content) {
    const modalOutmost = document.createElement("div")
    modalOutmost.id = "modal"
    modalOutmost.onclick = ({ target }) => {
      if (target === modalOutmost) modalOutmost.remove()
    }
    modalOutmost.appendChild(content)
    document.body.appendChild(modalOutmost)
    return modalOutmost
  }
  document.body.oncontextmenu = _ => _.preventDefault()
  for (const img of document.getElementsByTagName("img")) {
    makeContextMenu(img, [
      {
        type: "item",
        name: "Copy Image URL",
        action: () => ToClipboard(img.src)
      }
    ])
    img.onclick = () => {
      if (isMobile()) return open(img.src)
      const clone = img.cloneNode(true)
      const wrap = document.createElement("div")
      wrap.id = "image-modal-wrap"
      wrap.appendChild(clone)
      wrap.style.width = "90vw"
      wrap.style.height = "auto"
      zoom(openModal(wrap), clone)
    }
  }
  for (const a of document.getElementsByTagName("a")) {
    if (!a.href) return
    makeContextMenu(a, [
      {
        type: "item",
        name: "Open URL",
        action: () => open(a.href)
      },
      {
        type: "item",
        name: "Copy URL",
        action: () => ToClipboard(a.href)
      }
    ])
  }
  document.body.addEventListener("click", remove)
})
