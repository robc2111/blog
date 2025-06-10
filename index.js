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

app.get('/', (req, res) => {
  const dataPath = path.join(__dirname, 'data/posts.json');
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const mainPost = posts[0];
  const relatedPosts = posts.filter(post =>
    post.id !== mainPost.id &&
    post.tags?.some(tag => mainPost.tags?.includes(tag))
  );

  res.render('index.ejs', { posts, mainPost, relatedPosts });
});

app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const dataPath = path.join(__dirname, 'data/posts.json');
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const mainPost = posts.find(post => post.id === postId);

  const relatedPosts = posts.filter(post =>
    post.id !== mainPost.id &&
    post.tags?.some(tag => mainPost.tags?.includes(tag))
  );

  // You can choose either 'index.ejs' or 'post.ejs' here depending on your layout
  res.render('index.ejs', { posts, mainPost, relatedPosts });
});


app.get('/about', (req, res) => {
  const dataPath = path.join(__dirname, 'data/posts.json');
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.render('about.ejs', { posts});
}
);
app.get('/contact', (req, res) => {
  const dataPath = path.join(__dirname, 'data/posts.json');
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  res.render('contact.ejs', { posts });
});


app.post('/submit', (req, res) => {
    console.log('Form submitted:', req.body);
}
);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});