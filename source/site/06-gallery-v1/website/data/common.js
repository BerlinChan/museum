function printTitle () {
  if (subTitle == '' || null) {document.write('<title>' + WEB_TITLE + '</title>')} else {document.write('<title>' + WEB_TITLE + '--' + subTitle + '</title>')}
}//End pringTitle()

function printMainMenu () {
  var OutputStr = '<table border="0"><tr>'
  var i = 0
  while (i < menuDB.length) {
    if (menuDB[i].indexOf('.') == -1) {
      OutputStr += '<td class="table_MainMenuLayer">'//css style
      OutputStr += '<a href=\'javascript:printSubMenu(' + i + ')\'>'
      if (menuDB[i + 1] == '') {OutputStr += menuDB[i]} else {OutputStr += '<img border="0" src=\'' + menuDB[i + 1] + '\' alt=\'' + menuDB[i] + '\'>'}
      OutputStr += '</a></td>'
    }//end if
    i += 3
  }//end while
  OutputStr += '</tr></table>'
  document.all.MainMenuLayer.innerHTML = OutputStr
  return
}//End printMainMenu()

function printSubMenu (i) {
  if (i != menuDB.length - 3) {
    var maindot = 0
    while (menuDB[i].charAt(maindot) == '.') {maindot += 1}
    var subpointer = i
    var subdot = 0
    while (menuDB[i + 3].charAt(subdot) == '.') {subdot += 1}
    if (subdot > maindot) {
      var OutputStr = '<TABLE border="0">'
      while ((subdot != maindot) && (subpointer != menuDB.length - 3)) {
        subpointer += 3
        subdot = 0
        while (menuDB[subpointer].charAt(subdot) == '.') {subdot += 1}
        if (subdot == maindot + 1) {
          OutputStr += '<TR><td class="table_SubMenuLayer">'//css style
          OutputStr += '<a href=\'javascript:printSubMenu(' + subpointer + ')\'>'
          OutputStr += menuDB[subpointer].substring(subdot, menuDB[subpointer].length)
          OutputStr += '</a></td></TR>'
        }
      }//end while
      OutputStr += '</TABLE>'
      document.all.SubMenuLayer.innerHTML = OutputStr
      //document.all.DebugLayer.innerText = "M:"+maindot+" "+"S:"+subdot+" "+"I:"+i//test
      return
    }//end if
  }//end if
  document.all.MainPageFrame.src = 'photo.htm' + '?DBpath=' + menuDB[i + 2] + '&counter=0'
  //openID=window.open("photo.htm"+"?DBpath="+menuDB[i+2]+"&counter=0","缩略图和照片窗口","width=790,height=500,left=0,top=0,toolbar=no,location=yes,directories=no,status=yes,menubar=no,scrollbar=no,resizable=no,copyhistory=yes")
  //openID=window.open("photo.htm"+"?DBpath="+menuDB[i+2]+"&counter=0","缩略图和照片窗口","width=790,height=570,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbar=Auto,resizable=no,copyhistory=yes")
  //window.openID.focus()
  //document.all.DebugLayer.innerText = "M:"+maindot+" "+"S:"+subdot+" "+"I:"+i//test
  return
}//end printSubMenu()

function printThumbs () {
  var OutputStr = '<TABLE border="0" cellpadding="10">'
  for (var i = 0; i < THUMBS_ROWS; i++) {
    OutputStr += '<TR>'
    for (var j = 0; j < THUMBS_COLUMNS; j++) {
      if (imagePtr * 2 < imageDB.length) {
        OutputStr += '<TD align="middle">'
        OutputStr += '<a href=\'javascript:printPhoto(' + imagePtr + ')\'>'
        OutputStr += '<img class="Thumbs" border="0" src=\''//css style
        OutputStr += DBpath.replace('data.js', 'thumb/thumb_' + imageDB[imagePtr * 2])
        OutputStr += '\' alt=\''
        OutputStr += imageDB[imagePtr * 2 + 1]
        OutputStr += '\'></a>'
        OutputStr += '</TD>'
        imagePtr += 1
      }
    }
    OutputStr += '</TR>'
  }
  OutputStr += '</TABLE>'
  document.all.ImageLayer.innerHTML = OutputStr
  printThumbsControlButton(THUMBS_COLUMNS * THUMBS_ROWS)
  //document.all.DebugLayer.innerText = isFirstPlay//test
  return
}//end printThumbs()

function printThumbsControlButton (step) {
  var OutputStr = '<TABLE border="0"><tr>'
  //home
  OutputStr += '<td>'
  OutputStr += '<A href=\'photo.htm?DBpath=' + DBpath + '&counter=0\'>'
  OutputStr += '<IMG name="home-button" src="image/ctrlButton/home-button.gif" border="0" alt="返回缩略图目录首页"></A></td>'
  //play
  OutputStr += '<td>'
  OutputStr += '<A href=\'javascript:slideShowControl(' + counter + ')\'>'
  OutputStr += '<IMG name="play/stop-button" src="image/ctrlButton/play-button.gif" border="0" alt="开始播放幻灯片"></A></td>'
  //previous
  if (counter != 0) {
    OutputStr += '<td>'
    OutputStr += '<A href=\'photo.htm?DBpath=' + DBpath + '&counter=' + (imagePtr > step * 2 ? imagePtr - step * 2 : 0) + '\'>'
    OutputStr += '<IMG name="previous-button" src="image/ctrlButton/previous-button.gif" border="0" alt="上一页"></A></td>'
  }
  //next
  if (imagePtr * 2 < imageDB.length) {
    OutputStr += '<td>'
    OutputStr += '<A href=\'photo.htm?DBpath=' + DBpath + '&counter=' + imagePtr + '\'>'
    OutputStr += '<IMG name="next-button" src="image/ctrlButton/next-button.gif" border="0" alt="下一页"></A></td>'
  }

  OutputStr += '</tr></TABLE>'
  document.all.ControlLayer.innerHTML = OutputStr
  //document.all.DebugLayer.innerText = imagePtr+" "+imageDB.length+" "+step//test
  return
}//End printThumbsControlButton(step)

function printPhoto (thisPhoto) {
  if (isFirstPlay == true) {
    var OutputStr = '<TABLE border="0"><TR><TD align="center">'
    OutputStr += '<DIV class="PhotoScroller">'//css
    OutputStr += '<IMG border="0" name="photo" class="Blend">'//css
    OutputStr += '</DIV>'
    OutputStr += '<DIV id="photoIntroduce"></DIV>'
    OutputStr += '</TD></TR></TABLE>'
    document.all.ImageLayer.innerHTML = OutputStr
    isFirstPlay = false
  }
  //淡入淡出
  // document.photo.filters.BlendTrans.Apply()
  document.photo.src = window.location.search.replace('?','').split('&').filter(function(item){return /DBpath=/.test(item)})[0].split('=')[1].replace('data.js',imageDB[thisPhoto * 2]);
  document.photo.alt = document.photo.src
  // document.photo.filters.BlendTrans.Play()
  document.all.photoIntroduce.innerText = imageDB[thisPhoto * 2 + 1]
  printPhotoControlButton(thisPhoto)
  return
}//End printPhoto(thisPhoto)

function printPhotoControlButton (thisPhoto) {
  var OutputStr = '<TABLE border="0"><tr>'
  //home
  OutputStr += '<td>'
  OutputStr += '<A href=\'' + window.location.href + '\'>'
  OutputStr += '<IMG name="home-button" src="image/ctrlButton/home-button.gif" border="0" alt="返回缩略图目录首页"></A></td>'
  //play/stop
  OutputStr += '<td>'
  OutputStr += '<A href=\'javascript:slideShowControl(' + (thisPhoto + 1) + ')\'>'
  if (isPlaying == false) {OutputStr += '<IMG name="play/stop-button" src="image/ctrlButton/play-button.gif" border="0" alt="开始播放幻灯片">'} else {OutputStr += '<IMG name="play/stop-button" src="image/ctrlButton/stop-button.gif" border="0" alt="停止播放幻灯片">'}
  OutputStr += '</A></td>'
  //previous
  if (thisPhoto - 1 >= 0) {
    var previous = thisPhoto - 1
    OutputStr += '<td>'
    OutputStr += '<A href=\'javascript:printPhoto(' + previous + ')\'>'
    OutputStr += '<IMG name="previous-button" src="image/ctrlButton/previous-button.gif" border="0" alt="上一页"></A></td>'
  }
  //next
  if (thisPhoto * 2 + 2 < imageDB.length) {
    var next = thisPhoto + 1
    OutputStr += '<td>'
    OutputStr += '<A href=\'javascript:printPhoto(' + next + ')\'>'
    OutputStr += '<IMG name="next-button" src="image/ctrlButton/next-button.gif" border="0" alt="下一页"></A></td>'
  }

  OutputStr += '</tr></TABLE>'
  document.all.ControlLayer.innerHTML = OutputStr
  //document.all.DebugLayer.innerText = imagePtr+" "+imageDB.length+" "+step//test
  return
}//End printPhotoControlButton(thisPhoto)

function slideShowControl (start) {//控制幻灯片的播放和停止，更改播放、停止按钮
  if (isPlaying == true) {
    isPlaying = false
    document.images['play/stop-button'].src = 'image/ctrlButton/play-button.gif'
    document.images['play/stop-button'].alt = '开始播放幻灯片'
    clearTimeout(timeoutID)
  } else {
    isPlaying = true
    slideShowPtr = start
    document.images['play/stop-button'].src = 'image/ctrlButton/stop-button.gif'
    document.images['play/stop-button'].alt = '停止播放幻灯片'
    timeoutID = setInterval('slideShow()', TIMEOUT)
  }
}//End slideShowControl(start)

function slideShow () {
  if (slideShowPtr * 2 >= imageDB.length) {slideShowPtr = 0}
  printPhoto(slideShowPtr)
  slideShowPtr += 1
  //document.all.DebugLayer.innerText = slideShowPtr//test
}//End slideShow()
