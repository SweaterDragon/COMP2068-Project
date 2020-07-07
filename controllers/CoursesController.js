// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = 'courses';
const Course = require('../models/course');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
        
    const courses = await Course
    .find()

    res.render(`${viewPath}/index`, {
        pageTitle: 'List of registered swimming courses',
        courses: courses
    });
    
}
catch {
    req.flash('danger', `Something went wrong displaying swimming courses: ${error}`);
    res.redirect('/');
}
};

exports.show = async (req, res) => {
  try {
    const course = await courses.findById(req.params.id);
    
    res.render(`${viewPath}/show`, {
        pageTitle: 'Your course',
        course: course
     });
}
catch {
    req.flash('danger', `Something went wrong displaying your swimming course: ${error}`);
    res.redirect('/');
}
};

exports.new = async (req, res) => {
  try {
    res.render(`${viewPath}/new`, {
        tiers: ["Beginner", "Novice", "Adept", "Expert", "Pro"],
        pageTitle: 'Register for a course'
    });
}
catch {
    req.flash('danger', `Something went wrong displaying the registration form ${error}`);
    res.redirect('/');
}
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    const course = await Course.create({user: user._id, ...req.body});

    req.flash('success', 'Swimming course successfully created');
    res.redirect(`/courses/${course.id}`);
}
catch {
    req.flash('danger', `Something went wrong registering for the swimming course: ${error}`);
    req.session.formData = req.body;
    res.redirect('/courses/new');
}
};

exports.edit = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
        pageTitle: 'Edit your swimming course registration',
        formData: course
    })
}
catch {
    req.flash('danger', `Something went wrong editing the swimming course registration: ${error}`);
    res,redirect('/');
}
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let course = await Course.findById(req.body.id);
    if (!course) throw new Error('Swimming course could not be found');

    const attributes = {user: user._id, ...req.body};
    await Course.validate(attributes);
    await Course.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The course registation was updated successfully');
    res.redirect(`/courses/${req.body.id}`);

}
catch {
    req.flash('danger', `Something went wrong updating the course registration: ${error}`);
    res.redirect(`/courses/${req.body.id}/edit`);
}
};

exports.delete = async (req, res) => {
  try {
    await Course.deleteOne({_id: req.body.id});
    req.flash('success', 'The swimming course was deleted successfully');
    res.redirect(`/course`);
}
catch {
    req.flash('danger', `Something went wrong deleting the swimming course: ${error}`);
}
};