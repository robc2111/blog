import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function loadPosts() {
  const dataPath = path.join(__dirname, 'data/posts.json');
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

app.get('/', (req, res) => {
  const posts = loadPosts();
  const mainPost = posts[0];
  const relatedPosts = posts.filter(post =>
    post.id !== mainPost.id && post.tags?.some(tag => mainPost.tags?.includes(tag))
  );
  res.render('index.ejs', { posts, mainPost, relatedPosts });
});

app.get('/posts/:id', (req, res) => {
  const posts = loadPosts();
  const postId = parseInt(req.params.id);
  const mainPost = posts.find(post => post.id === postId);
  if (!mainPost) return res.status(404).send('Post not found');

  const relatedPosts = posts.filter(post =>
    post.id !== mainPost.id && post.tags?.some(tag => mainPost.tags?.includes(tag))
  );

  res.render('index.ejs', { posts, mainPost, relatedPosts });
});

app.get('/about', (req, res) => {
  const posts = loadPosts();
  res.render('about.ejs', { posts });
});

app.get('/contact', (req, res) => {
  const posts = loadPosts();
  res.render('contact.ejs', { posts });
});

app.post('/submit', (req, res) => {
  console.log('Form submitted:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});