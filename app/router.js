const router = require('koa-router')();

const RecordManagement = require('./controller/recordManagement.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/string', async (ctx, next) => {
  ctx.body = {
    data: 'koa2 string'
  }
});

router.get('/list', RecordManagement.list);
router.post('/delete/:id', RecordManagement.destroy);
router.post('/update/:id', RecordManagement.update);
router.post('/add', RecordManagement.create);

module.exports = router