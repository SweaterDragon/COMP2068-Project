const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/CoursesController');

function auth (req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('danger', 'You need to login first.');
      return res.redirect('/login');
    }
    next();
}

module.exports = router => {
    router.get('/courses', auth, index);
    router.get('/courses/new', auth, _new);
    router.get('/courses/:id/edit', auth, edit);
    router.get('/courses/:id', auth, show);
    router.post('/courses', auth, create);
    router.post('/courses/update', auth, update);
    router.post('/courses/delete', auth, _delete);
  };
