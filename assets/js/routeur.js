/**
* Routeur.js
* @author Beto Figueiredo <beto@2sidesof1.com>
* https://github.com/betofigueiredo/routeur.js

Hi! I created this project because I needed a navigation that maintains some parts of the page running when the user navigate through the website. The idea here is to use js/jquery to load the pages via ajax.

What we can do with this project:
    - Maintains parts of the page running during navigation (music players, timesheets).
    - Separating mobile and desktop pages dynamic, running under the same domain. For example: at the address 'http://domain.com/products' we can load on desktop the page '/views/desktop/products.php' and on mobile '/views/mobile/products.php'.
    - Create different types of navigations and a better experience on different devices. For example: on mobile we can navigate like apps, using tabs and maintaining the content loaded, but normal on desktop, loading the full page.
    - Dealing with modal on mobile. Changing the url address so if the user press the 'back' button it only closes the modal, not changing the page.

Requires:
    - Jquery
    - History.js

Improvements:
    - Use only Javascript.
    - 404 pages.

*/

/**
* History.js jQuery Adapter
* @author Benjamin Arthur Lupton <contact@balupton.com>
* @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
* @license New BSD License <http://creativecommons.org/licenses/BSD/>
*/
var History = window.History;

/* mobile detect */
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

/* set different routes for mobile and desktop */
if (jQuery.browser.mobile === true) {
    var rootroute = '/views/mobile';
} else {
    var rootroute = '/views/desktop';
}

/* define all routes */
window.routes = [
    {
        hash: '/index',
        maxsize: 1000,
        url: '/',
        gets: '',
        aditional: '',
        path: rootroute+'/index.php'
    },
    {
        hash: '/new/product',
        maxsize: 1000,
        url: '/new/product/',
        gets: '',
        aditional: '',
        path: rootroute+'/new-product.php'
    },
    {
        hash: '/products',
        maxsize: 10,
        url: '/products/',
        gets: '',
        aditional: '',
        path: rootroute+'/products.php'
    },
    {
        hash: '/products/',
        maxsize: 1000,
        url: '/products/$get/',
        gets: '1',
        aditional: '',
        path: rootroute+'/products-view.php'
    },
    {
        hash: '/products/',
        maxsize: 1000,
        url: '/products/$get/sizes/',
        gets: '1',
        aditional: '/sizes/',
        path: rootroute+'/products-sizes.php'
    },
    {
        hash: '/home',
        maxsize: 1000,
        url: '/home/',
        gets: '',
        aditional: '',
        path: rootroute+'/home.php'
    },
    {
        hash: '/',
        maxsize: 1000,
        url: '/$get/',
        gets: '1',
        aditional: '',
        path: rootroute+'/profile.php'
    }
];

/* function that analyse and set the routes */
function navigationGo(hrefGet) {
    /* get paths and urls */
    var originalHref = hrefGet;
    /* url size */
    var ohSize = originalHref.length;
    /* sort array */
    // routes.sort(function(a, b) {
    //     return b.hash.length - a.hash.length;
    // });
    /* check index */
    var hrefSize = originalHref.length;
    if (hrefSize <= 1) { var originalHref = '/index'; }
    /* search */
    var hrefphp = '';
    var iSSearchCheck = 0;
    for (var iSSearch = 0; iSSearch <= routes.length-1; iSSearch++) {
        /* find hash */
        if (originalHref.indexOf(routes[iSSearch]['hash']) !== -1) {
            /* aditional */
            if (routes[iSSearch]['aditional'] != '' && routes[iSSearch]['aditional'] != '0') {
                /* aditional found */
                if (originalHref.indexOf(routes[iSSearch]['aditional']) !== -1) {
                    /* check max size */
                    if (ohSize <= routes[iSSearch]['maxsize']) {
                        /* gets */
                        if (routes[iSSearch]['gets'] != '' && routes[iSSearch]['gets'] != '0') {
                            // *check if has / on the end of the original href
                            var lastCharOriginalHref = originalHref.slice(-1);
                            if (lastCharOriginalHref != '/') { originalHref += '/'; }
                            // *check if has the same number of /
                            var splitArrayUrl = routes[iSSearch]['url'].split('/');
                            var splitOriginalHref = originalHref.split('/');
                            var iGetAdds = 1;
                            var hrefphp = routes[iSSearch]['path'];
                            for (var iGet = 0; iGet <= splitArrayUrl.length-1; iGet++) {
                                if (splitArrayUrl[iGet] == '$get' && iGetAdds == 1) {
                                    hrefphp += '?g'+iGetAdds+'='+splitOriginalHref[iGet];
                                    iGetAdds++;
                                }
                                else if (splitArrayUrl[iGet] == '$get' && iGetAdds >= 2) {
                                    hrefphp += '&g'+iGetAdds+'='+splitOriginalHref[iGet];
                                    iGetAdds++;
                                }
                            }
                            /* search */
                            if (originalHref.indexOf('?') !== -1) {
                                var splitSearchOriginalHref = originalHref.split('?');
                                hrefphp += '&'+splitSearchOriginalHref[1];
                            }
                        } else {
                            var hrefphp = routes[iSSearch]['path'];
                            /* search */
                            if (originalHref.indexOf('?') !== -1) {
                                var splitSearchOriginalHref = originalHref.split('?');
                                hrefphp += '?'+splitSearchOriginalHref[1];
                            }
                        }
                        break;
                    }
                }
            }
            /* no aditional */
            else {
                /* check max size */
                if (ohSize <= routes[iSSearch]['maxsize']) {
                    /* gets */
                    if (routes[iSSearch]['gets'] != '' && routes[iSSearch]['gets'] != '0') {
                        // *check if has / on the end of the original href
                        var lastCharOriginalHref = originalHref.slice(-1);
                        if (lastCharOriginalHref != '/') { originalHref += '/'; }
                        // *check if has the same number of /
                        var splitArrayUrl = routes[iSSearch]['url'].split('/');
                        var splitOriginalHref = originalHref.split('/');
                        var iGetAdds = 1;
                        var hrefphp = routes[iSSearch]['path'];
                        for (var iGet = 0; iGet <= splitArrayUrl.length-1; iGet++) {
                            if (splitArrayUrl[iGet] == '$get' && iGetAdds == 1) {
                                hrefphp += '?g'+iGetAdds+'='+splitOriginalHref[iGet];
                                iGetAdds++;
                            }
                            else if (splitArrayUrl[iGet] == '$get' && iGetAdds >= 2) {
                                hrefphp += '&g'+iGetAdds+'='+splitOriginalHref[iGet];
                                iGetAdds++;
                            }
                        }
                        /* search */
                        if (originalHref.indexOf('?') !== -1) {
                            var splitSearchOriginalHref = originalHref.split('?');
                            hrefphp += '&'+splitSearchOriginalHref[1];
                        }
                    } else {
                        var hrefphp = routes[iSSearch]['path'];
                        /* search */
                        if (originalHref.indexOf('?') !== -1) {
                            var splitSearchOriginalHref = originalHref.split('?');
                            hrefphp += '?'+splitSearchOriginalHref[1];
                        }
                    }
                    break;
                }
            }
        }
    }
    return hrefphp;
}

/* FIRST LOAD */
loadingBarIniciate();
var hrefPHPreturn = navigationGo(window.location.pathname);
/* ajax call*/
$.ajax({
    type: 'GET',
    url: hrefPHPreturn,
    cache: false,
    error: function(data) {
        errorLoading404();
    },
    success: function(data) {
        $('#main').html(data);
        loadingBarEnd();
        getPageTitle();
    }
});

/* CLICK LINKS */
$(document).on('click', 'a', function(evt) {
    var confirmLink = $(this).attr('data-link');
    if (confirmLink == 'no') {
        // prevent the navigation - for a tags that open menus, for example
        evt.preventDefault();
    }
    else if (confirmLink == 'blank') {
        // for links that open in others tabs
    }
    else if (confirmLink == 'lightbox') {
        // the idea here was to create a modal that, when it opens, changes the url address
        // this is for mobile pages, a modal can take the whole screen and the user can use the 'back' button to close it
        // changing the url address prevent them to go back, in this case it only closes the modal
        // *obs: I made this very quickly, it sucks. But I did not have the time to improve
        evt.preventDefault();
        $('body').attr('data-lightbox', '2');
        var thisHref = $(this).attr('href');
        var hrefPHPreturn = navigationGo(thisHref);
        History.pushState(null, null, thisHref);
    }
    else {
        // navigation ok - go
        evt.preventDefault();
        $('body').attr('data-state', '1');
        loadingBarIniciate();
        var thisHref = $(this).attr('href');
        var hrefPHPreturn = navigationGo(thisHref);
        $.ajax({
            type: 'GET',
            url: hrefPHPreturn,
            cache: false,
            error: function(data) {
                errorLoading404();
            },
            success: function(data) {
                $('#main').html(data);
                loadingBarEnd();
                $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
                History.pushState(null, null, thisHref);
                getPageTitle();
            }
        });
    }
});

/* NAV FORWARD AND BACKWARD */
$(window).on('statechange', function(evt) {
    evt.preventDefault();
    var isItClick = $('body').attr('data-state');
    var isItLightbox = $('body').attr('data-lightbox');
    if (isItClick == '1') {
        $('body').attr('data-state', '0');
        getPageTitle();
    } else {
        if (isItLightbox == '2') {
            $('body').attr('data-lightbox', '1');
        }
        else if (isItLightbox == '1') {
            $('body').removeClass('is-reveal-open').attr('data-lightbox', '');
            $('#modal').hide();/* this is the modal I use */
        }
        else {
            loadingBarIniciate();
            var State = History.getState();
            var hrefPHPreturn = navigationGo(window.location.pathname);
            $.ajax({
                type: 'GET',
                url: hrefPHPreturn,
                cache: false,
                error: function(data) {
                    errorLoading404();
                },
                success: function(data) {
                    $('#main').html(data);
                    loadingBarEnd();
                    $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
                    $('body').attr('data-state', '0');
                    getPageTitle();
                }
            });
        }
    }
});

/* starts loading */
function loadingBarIniciate() {
    $('#loading').show();
}

/* end loading */
function loadingBarEnd() {
    $('#loading').hide();
}

/* change page title - I get the title from a div element in this case */
function getPageTitle() {
    if ($('#content-title-data').length) {
        var titleLocation = $('#content-title-data').attr('data-location');
        document.title = titleLocation+' | Project Name';
    } else {
        document.title = 'Project Name';
    }
}

/* error loading handle */
function errorLoading404() {
    console.log('error loading');
}
