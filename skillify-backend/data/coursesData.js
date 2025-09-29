const courses = [];

async function getAllCourses() { return courses; }
async function addCourse(course) { courses.push(course); return course; }
async function updateCourse(id, update) {
  const idx = courses.findIndex(c => c.id == id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...update };
  return courses[idx];
}
async function deleteCourse(id) {
  const idx = courses.findIndex(c => c.id == id);
  if (idx === -1) return null;
  return courses.splice(idx, 1)[0];
}

module.exports = { getAllCourses, addCourse, updateCourse, deleteCourse }; 