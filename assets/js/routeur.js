/*
 * Routeur.js 1.0.1
 * @author Beto Figueiredo
 * https://github.com/betofigueiredo/routeur.js
 * Routeur.js may be freely distributed under the MIT license.
 */

/*
 *
 *
 *
 *
 *
 * Basic functions
 *     Array.prototype.equals
 *     Array.prototype.indexOf
 *     Array.prototype.remove
 *     Add event
 *     Mobile detection
 */
// Array.prototype.equals
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
Array.prototype.equals = function (array) {
    if (!array)
        return false;
    if (this.length != array.length)
        return false;
    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// Array.prototype.indexOf
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}

// Array.prototype.remove
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// Function to handle attachEvent
function addEvent(element, myEvent, fnc) {
    if (element)
        return ((element.attachEvent) ? element.attachEvent('on' + myEvent, fnc) : element.addEventListener(myEvent, fnc, false));
}

// Mobile detection
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

/*
 *
 *
 *
 *
 *
 * Start Routeur.js
 */
function Routeur(allLinks, mobilePages, rootFolder) {
    this._routes = [];
    this._allLinks = allLinks;
    this._rootFolder = (mobilePages) ? rootFolder+'/'+this._getViewsRoute() : rootFolder;
    this.updatePageLinks();
    this.setStateChange();
    // this.navigateFirst();
}

(function() {

    'use strict';

    var History = window.History;

    Routeur.prototype = {

        add: function add() {
            var routeUrl = (arguments[0]['url'] == '/') ? this._cleanBars('index') : this._cleanBars(arguments[0]['url']),
                routePath = arguments[0]['phpFile'];

            // Split route pieces and add to parameters array
            var parametersArray = [],
                routePieces = routeUrl.split('/'),
                paramRoutePiece,
                paramName,
                nPieces = 0,
                parametersCharOnUrl = '?';
            for (var i = 0, len = routePieces.length-1; i <= len; i++) {
                if (routePieces[i].indexOf('{') !== -1) {
                    paramRoutePiece = routePieces[i].replace(/\{.*?\}/g, '{param}');

                    // Get name of the parameter
                    paramName = routePieces[i].substring(1, routePieces[i].length-1);
                    routePath = routePath+''+parametersCharOnUrl+''+paramName+'={param}';
                    parametersCharOnUrl = '&';
                } else {
                    paramRoutePiece = routePieces[i];
                }
                parametersArray.push(paramRoutePiece);
            }

            this._routes.push({ parameters: parametersArray, url: routeUrl, path: '/'+this._rootFolder+'/'+routePath });
            return this;

        },

        navigate: function navigate(route, url, isStateChange) {
            var self = this;

            document.body.setAttribute('data-state', '1');
            this._initLoading();
            $.ajax({
                type: 'GET',
                url: route,
                cache: false,
                error: function(data) {
                    self._errorLoading404();
                },
                success: function(data) {
                    if (isStateChange === false) {
                        $('#main').html(data);
                        self._endLoading();
                        $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
                        History.pushState(null, null, url);
                        self.updatePageLinks();
                    } else {
                        $('#main').html(data);
                        self._endLoading();
                        $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
                        $('body').attr('data-state', '0');
                        self.updatePageLinks();
                    }
                }
            });
        },

        _match: function _match(url, isStateChange) {
            var self = this,
                routes = this._routes,
                href = (url == '/' || url == '') ? this._cleanBars('index') : this._cleanBars(url),
                hrefParameters = [],
                hrefPieces = href.split('/'),
                profile = 0;

            for (var i = 0, len = hrefPieces.length-1; i <= len; i++) {
                hrefParameters.push(hrefPieces[i]);
            }

            for (var i = 0, len = routes.length-1; i <= len; i++) {
                // Handle *
                if (routes[i]['url'] == '*') {
                    profile = i;
                }

                // Select url's that has the same number of itens
                if (hrefParameters.length == routes[i]['parameters'].length) {
                    var routeNewParameters = routes[i]['parameters'].slice(),
                        urlNewParameters = hrefParameters.slice(),
                        keysToRemove = [];

                    // Loop through all parameters and remove id
                    for (var i2 = 0, len2 = routes[i]['parameters'].length-1; i2 <= len2; i2++) {
                        if (routes[i]['parameters'][i2] == '{param}') {
                            keysToRemove.push(i2);
                        }
                    }

                    // Sort keys to remove and loop
                    keysToRemove.sort(function(a, b){return b-a});
                    for (var i3 = 0, len3 = keysToRemove.length-1; i3 <= len3; i3++) {
                        routeNewParameters.splice(keysToRemove[i3], 1);
                        urlNewParameters.splice(keysToRemove[i3], 1);
                    }

                    // Match basic url itens
                    var routeFileBuild = '';
                    if (routeNewParameters.equals(urlNewParameters)) {
                        routeFileBuild = routes[i]['path'];
                        for (var i4 = 0, len4 = routes[i]['parameters'].length-1; i4 <= len4; i4++) {
                            if (routes[i]['parameters'][i4] == '{param}') {
                                routeFileBuild = routeFileBuild.replace(/{param}/, hrefParameters[i4]);
                            }
                        }
                        self.navigate(routeFileBuild, url, isStateChange);
                        break;
                    }

                    // *
                    if (profile != 0) {
                        routeFileBuild = routes[profile]['path']+'?id='+href;
                        self.navigate(routeFileBuild, url, isStateChange);
                    }
                }
            }
        },

        _cleanBars: function _cleanBars(url) {
            if (url.charAt(0) == '/') 
                url = url.substring(1, url.length);
            if (url.charAt(url.length-1) == '/') 
                url = url.substring(0, url.length-1);
            return url;
        },

        _getViewsRoute: function _getViewsRoute() {
            if (jQuery.browser.mobile === true)
                return 'mobile';
            else
                return 'desktop';
        },

        setStateChange: function setStateChange() {
            var self = this;
            History.Adapter.bind(window, 'statechange', function(e) { 
                e.preventDefault();
                var isItClick = document.body.getAttribute('data-state'),
                    isItLightbox = document.body.getAttribute('data-lightbox');

                if (isItClick == '1') {
                    document.body.setAttribute('data-state', '0');
                } else {
                    if (isItLightbox == '2') {
                        document.body.setAttribute('data-lightbox', '1');
                    }
                    else if (isItLightbox == '1') {
                        $('body').removeClass('is-reveal-open').attr('data-lightbox', '');
                        $('#modal').hide();/* this is the modal I use */
                    }
                    else {
                        var locationPathname = window.location.pathname;
                        self._match(locationPathname, true);
                    }
                }
            });


        },

        // Add click event to all <a> tags
        updatePageLinks: function updatePageLinks() {
            var self = this;
            this._findLinks().forEach(function (link) {
                if (!link.hasListenerAttached) {
                    addEvent(link, 'click', function(e) {
                        link.hasListenerAttached = true;
                        var this__href = link.getAttribute('href');
                        var confirmLink = link.getAttribute('data-link');

                        // Prevent the navigation - for a tags that open menus, for example
                        if (confirmLink == 'no') {
                            e.preventDefault();
                        }
                        // For links that open in others tabs
                        else if (confirmLink == 'blank') {
                            // 
                        }
                        // Lightbox
                        else if (confirmLink == 'lightbox') {
                            // the idea here was to create a modal that, when it opens, changes the url address
                            // this is for mobile pages, a modal can take the whole screen and the user can use the 'back' button to close it
                            // changing the url address prevent them to go back, in this case it only closes the modal
                            // *obs: I made this very quickly, it sucks. But I did not have the time to improve
                            e.preventDefault();

                            // $('body').attr('data-lightbox', '2');
                            // var thisHref = $(this).attr('href');
                            // var hrefPHPreturn = navigationGo(thisHref);
                            // History.pushState(null, null, thisHref);
                        }
                        // for links that open in others tabs
                        else {
                            e.preventDefault();
                            self._match(this__href, false);
                        }

                    });
                }
            });
        },

        _findLinks: function _findLinks() {
            return [].slice.call(document.getElementsByTagName('a'));
        },

        _initLoading: function _initLoading() {
            console.log('_initLoading');
        },

        _endLoading: function _endLoading() {
            console.log('_endLoading');
        },

        _errorLoading404: function _errorLoading404() {
            console.log('404');
        },

        // First page load
        run: function run() {
            var locationPathname = window.location.pathname;
            this._match(locationPathname, true);
        }

    }

}).call(Routeur.prototype);
