var router = new Routeur(allLinks = true, mobilePages = false, rootFolder = 'views');

router.add({ url:'produto/{id}', phpFile: 'produto.php'});
router.add({ url:'produtos', phpFile: 'produtos.php'});
router.add({ url:'categorias', phpFile: 'categorias.php'});
router.add({ url:'/', phpFile: 'index.php'});
router.add({ url:'*', phpFile: 'profile.php'});

router.run();