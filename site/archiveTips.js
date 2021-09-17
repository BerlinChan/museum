function insertArchiveTips (postUrl, info) {
  var tipsElement = document.createElement('div')
  var closeButton = document.createElement('span')
  tipsElement.setAttribute('style', 'padding:2px 0 2px 12px;position:absolute;top:0;left:0;width:100%;opacity:.6;background-color:#fffabf;box-sizing:border-box;color:#333;font-size:12px;')
  closeButton.setAttribute('style', 'font-size:16px;cursor:pointer;')
  tipsElement.innerHTML = ' 这是一个存档旧站，请见来自<a href="https://museum.berlinchan.com' + postUrl + '" style="text-decoration:none;color:#333;font-size:12px;font-weight:bold;">旧站博物馆的说明</a>。'
    + (info ? info : '')
  closeButton.innerText = '×'
  closeButton.addEventListener('click', function (e) {
    tipsElement.remove()
  })
  tipsElement.prepend(closeButton)
  document.querySelector('body').prepend(tipsElement)
}
