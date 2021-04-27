/**
 * sticky-header js lib
 * @ Fabio Fumis
 */
;(function() {
  document.addEventListener("DOMContentLoaded", function(){
    function initializeStickyHeader()
    {
      var elSticky = document.querySelector('.it-header-sticky');

      if (!!elSticky) {
        
        //check the DOM is ready (when template is loaded in a dynamic frame) 
        var state = document.readyState;
        if(state !== 'complete') 
        {
          console.log("reinit sticky bar");
          setTimeout(initializeStickyHeader,2000);
          return;
        }

        var isHidden = function isHidden(el) {
          var hidden = false;

          if (el) {
            var style = window.getComputedStyle(el);
            hidden = style.display === 'none' || style.visibility === 'hidden';
          }

          return hidden;
        };

        var elToggler = document.querySelector('.custom-navbar-toggler');
        var isDesktop = isHidden(elToggler);
        var isSticky = false;
        var scrollToGap = 0;
        var runCheckSticky = undefined;

        var initSticky = function initSticky(isDesktop) {
          var elSlim = document.querySelector('.it-header-slim-wrapper');
          var elCenter = document.querySelector('.it-header-center-wrapper');
          var elNavbar = document.querySelector('.it-header-navbar-wrapper');
          var navbarHeight = elNavbar && elNavbar.offsetHeight || 0;
          var slimHeight = elSlim && elSlim.offsetHeight || 0;
          var navOffsetTop = slimHeight;

          if (isDesktop && navbarHeight) {
            navOffsetTop = slimHeight + elCenter ? elCenter.offsetHeight : 0;
          }

          var toggleClonedElement = function toggleClonedElement(isDesktop, toAdd, callback) {
            if (toAdd === void 0) {
              toAdd = true;
            }

            if (isDesktop) {
              var target = document.querySelector('.menu-wrapper');

              if (toAdd) {
                var elBrand = document.querySelector('.it-brand-wrapper');
                var elSearch = document.querySelector('.it-search-wrapper');
                var elUser = document.querySelector('.it-user-wrapper');
                var clonedBrand = elBrand ? elBrand.cloneNode(true) : null;
                var clonedSearch = elSearch ? elSearch.cloneNode(true) : null;
                var clonedUser = elUser ? elUser.cloneNode(true) : null;
                if (clonedBrand) target.insertBefore(clonedBrand, target.childNodes[0]).classList.add('cloned');
                if (clonedSearch) target.appendChild(clonedSearch).classList.add('cloned');
                if (clonedUser) target.appendChild(clonedUser).classList.add('cloned').remove('show');
              } else {
                var clonedItems = document.getElementsByClassName('cloned');
                clonedItems && Array.from(clonedItems).forEach(function (item) {
                  item.parentElement.removeChild(item);
                });

                if (typeof callback === 'function') {
                  callback();
                }
              }
            }

            if (toAdd) {
              elSticky.nextElementSibling.style.paddingTop = navbarHeight + (isDesktop ? navOffsetTop - scrollToGap : navbarHeight - scrollToGap) + 'px';
            } else {
              elSticky.nextElementSibling.style.paddingTop = 0 + 'px';
            }
          };

          var toggleOn = function toggleOn() {
            isSticky = true;
            elSticky.classList.add('is-sticky');
            toggleClonedElement(isDesktop, true);
          };

          var toggleOff = function toggleOff() {
            isSticky = false;
            elSticky.classList.remove('is-sticky');
            toggleClonedElement(isDesktop, false);
          };

          runCheckSticky = function runCheckSticky() {
            var nbh = navbarHeight;

            if (window.scrollY + scrollToGap >= navOffsetTop && !isSticky) {
              toggleOn();
              if (nbh !== navbarHeight) scrollToGap = navbarHeight - nbh;
            } else if (window.scrollY + scrollToGap < navOffsetTop && isSticky) {
              toggleOff();
            }
          };

          window.addEventListener('scroll', runCheckSticky);
          runCheckSticky();
        };

        initSticky(isDesktop);
      }
    }

    //first call of the function to initialize sticky header (when template is loaded in a dynamic frame)
    initializeStickyHeader();
  });
})()
