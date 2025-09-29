const posts = [];

async function getAllPosts() { return posts; }
async function addPost(question) { const post = { id: posts.length+1, question }; posts.push(post); return post; }
async function updatePost(id, update) {
  const idx = posts.findIndex(p => p.id == id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...update };
  return posts[idx];
}
async function deletePost(id) {
  const idx = posts.findIndex(p => p.id == id);
  if (idx === -1) return null;
  return posts.splice(idx, 1)[0];
}

module.exports = { getAllPosts, addPost, updatePost, deletePost }; 