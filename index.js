import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;  

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
}
);

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.send('Form submitted successfully!');
}
);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});