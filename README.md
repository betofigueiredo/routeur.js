# Routeur.js
A simple client-side Javascript/jQuery router.

I created this project because I needed a navigation that maintains some parts of the page running when the user navigate through the website. The idea here is to use js/jquery to load the pages via ajax.

It was created without any planning, the features were emerging according to the needs of each project, so the code is not finished.

## What can be done with this project
- Maintains parts of the page running during navigation (music players, timesheets).
- Separating mobile and desktop pages dynamic, running under the same domain. For example: at the address __http://domain.com/products__ we can load on desktop the page __/views/desktop/products.php__ and on mobile __/views/mobile/products.php__.
- Create different types of navigations and a better experience on different devices. For example: on mobile we can navigate like apps, using tabs and maintaining the content loaded, but normal on desktop, loading the full page.

## Usage
Init the router

```javascript
var router = new Routeur(allLinks = true, mobilePages = true, rootFolder = 'views');
```
__mobilePages__ set __true__ is to create different pages for desktop and mobile.
__rootFolder__ is where the pages are located.

Set the *routes*
```javascript
router.add({ url:'product/{id}/{tab}', phpFile: 'product-tab.php'});
router.add({ url:'product/{id}', phpFile: 'product.php'});
router.add({ url:'categories', phpFile: 'categories.php'});
router.add({ url:'list', phpFile: 'list.php'});
router.add({ url:'/', phpFile: 'index.php'});
router.add({ url:'*', phpFile: 'profile.php'});
```
The last item, __*__ uses __id__ as parameter. The page used in the example, __profile.php__, will be loading like __profile.php?id={url_typed}__

Start navigation
```javascript
router.run();
```

## .htaccess
Remember to point all pages to __index.php__ or to the default page you use.

## Requires
- jQuery
- History.js

## Similar projects
- https://github.com/bytecipher/grapnel
- https://github.com/krasimir/navigo

