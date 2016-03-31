# Routeur.js
A simple client-side Javascript/JQuery router.

I created this project because I needed a navigation that maintains some parts of the page running when the user navigate through the website. The idea here is to use js/jquery to load the pages via ajax.

It was created without any planning, the features were emerging according to the needs of each project, so the code is kinda messed up.

## What can be done with this project
- Maintains parts of the page running during navigation (music players, timesheets).
- Separating mobile and desktop pages dynamic, running under the same domain. For example: at the address __http://domain.com/products__ we can load on desktop the page __/views/desktop/products.php__ and on mobile __/views/mobile/products.php__.
- Create different types of navigations and a better experience on different devices. For example: on mobile we can navigate like apps, using tabs and maintaining the content loaded, but normal on desktop, loading the full page.

## Usage
Set a route inside the array *routes*
```javascript
{
    /* hash to search */
    hash: '/products',
    /* maxsize is used to differs urls like /products/ from /products/shirt-21 */
    maxsize: 10,
    /* full url */
    url: '/products/',
    /* parameters */
    gets: '',
    /* for bigger urls that have more params, like /user/{id-user}/photos */
    aditional: '',
    /* file to load via ajax */
    path: rootroute+'/products.php'
},
```
```javascript
{
    /* hash to search */
    hash: '/products/',
    /* maxsize is used to differs urls like /products/ from /products/shirt-21 */
    maxsize: 1000,
    /* full url */
    url: '/products/$get/',
    /* parameters */
    gets: '1',
    /* for bigger urls that have more params, like /user/{id-user}/photos */
    aditional: '',
    /* file to load via ajax */
    path: rootroute+'/products-view.php'
}
```

It's optional but you can load different pages for mobile and desktop:

```javascript
if (mobile === true) {
    var rootroute = '/views/mobile';
} else {
    var rootroute = '/views/desktop';
}
```

## Requires
- Jquery
- History.js

## Similar projects
- https://github.com/bytecipher/grapnel
- https://github.com/krasimir/navigo

## Comments

I put this project here because I want opinions about it. It was a small project that got bigger, but I think someone probably already did something like this. If it already exists it's problably better than mine. :smile:

Is there a better way to do that? Single page applications, like React?

I used JQuery to buy time but the goal is to use only Javascript. And I'm thinking for months about using regex for checking urls, but I don't have the time right now to rebuild all this.

Thanks
