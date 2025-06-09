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
  res.render('index.ejs', { posts, relatedPosts: posts });
});

app.get('/posts/:id', (req, res) => {
  const dataPath = path.join(__dirname, 'data/posts.json');
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) return res.status(404).send('Post not found');

  res.render('index.ejs', { posts, mainPost: post, relatedPosts: posts });
});

app.post('/submit', (req, res) => {
    console.log('Form submitted:', req.body);
}
);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});