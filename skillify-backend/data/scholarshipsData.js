const scholarships = [
  {
    id: 1,
    name: "Merit Scholarship for Engineering Students",
    amount: "₹50,000 per year",
    deadline: "2024-12-15",
    eligibility: "Students with 90%+ in 12th standard",
    stream: "Engineering"
  },
  {
    id: 2,
    name: "Science Stream Excellence Award",
    amount: "₹30,000 per year",
    deadline: "2024-12-20",
    eligibility: "Students pursuing Science with 85%+ marks",
    stream: "Science"
  },
  {
    id: 3,
    name: "Commerce Merit Scholarship",
    amount: "₹25,000 per year",
    deadline: "2024-12-10",
    eligibility: "Commerce students with 80%+ in 12th",
    stream: "Commerce"
  },
  {
    id: 4,
    name: "Arts and Humanities Grant",
    amount: "₹20,000 per year",
    deadline: "2024-12-25",
    eligibility: "Arts students with creative portfolio",
    stream: "Arts"
  },
  {
    id: 5,
    name: "Girls in STEM Scholarship",
    amount: "₹40,000 per year",
    deadline: "2024-12-30",
    eligibility: "Female students pursuing Engineering/Science",
    stream: "Engineering"
  },
  {
    id: 6,
    name: "First Generation Student Support",
    amount: "₹35,000 per year",
    deadline: "2024-12-18",
    eligibility: "First in family to attend college",
    stream: "All Streams"
  }
];

async function getAllScholarships() { return scholarships; }
async function addScholarship(scholarship) { scholarships.push(scholarship); return scholarship; }
async function updateScholarship(id, update) {
  const idx = scholarships.findIndex(s => s.id == id);
  if (idx === -1) return null;
  scholarships[idx] = { ...scholarships[idx], ...update };
  return scholarships[idx];
}
async function deleteScholarship(id) {
  const idx = scholarships.findIndex(s => s.id == id);
  if (idx === -1) return null;
  return scholarships.splice(idx, 1)[0];
}

module.exports = { getAllScholarships, addScholarship, updateScholarship, deleteScholarship }; 