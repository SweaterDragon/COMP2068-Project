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
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
        
    const courses = await Course
    .find()

    res.render(`${viewPath}/index`, {
        pageTitle: 'List of courses',
        courses: courses
    });
    
}
catch {
    req.flash('danger', `Something went wrong displaying courses: ${error}`);
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
    req.flash('danger', `Something went wrong displaying your course: ${error}`);
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

};

exports.edit = async (req, res) => {

};

exports.update = async (req, res) => {

};

exports.delete = async (req, res) => {

};