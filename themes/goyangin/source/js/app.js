document.addEventListener('DOMContentLoaded', function () {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target
        var $target = document.getElementById(target)
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')

      })
    })
  }
})

function handleShare (network, permalink) {
  const getStrWindowFeatures = function (width, height) {
    return 'width= ' + width
      + ',height= ' + height
      + ',location= no,'
      + 'toolbar= no,'
      + 'status= no,'
      + 'directories= no,'
      + 'menubar= no,'
      + 'scrollbars= yes,'
      + 'resizable= no,'
      + 'centerscreen= yes,'
      + 'chrome= yes,'
      + 'top= 200,'
      + 'left= 400'
  }
  switch (network) {
    case 'facebook':
      window.open(
        'https://www.facebook.com/sharer.php?u=' + permalink,
        '',
        getStrWindowFeatures(550, 400)
      )
      break
    case 'twitter':
      window.open(
        'https://twitter.com/intent/tweet?url=' + permalink,
        '',
        getStrWindowFeatures(550, 400)
      )
      break
    case 'linkedIn':
      window.open(
        'https://www.linkedin.com/sharing/share-offsite/?url=' + permalink,
        '',
        getStrWindowFeatures(750, 600)
      )
      break
    default:
      break
  }
}
