const express = require('express');
const app = express();

app.use(express.json());

var generes = [
	{id: 1, genere: "Action"},
	{id: 2, genere: "Romance"},
	{id: 3, genere: "Horror"},

	];

// --------------------- GET METHODS --------------------------
app.get('/', (req, res) => {
	res.send("Welcome to Vidly Movie API!");
});

app.get('/api', (req, res) => {
	res.send(generes);
});

app.get('/api/genere/:genere', (req, res) => {
	const genere = generes.find(g => g.genere === req.body.genere);

	if(!genere) return res.status(404).send('Invalid genere!');

	res.send(genere);
});

app.get('/api/id/:id', (req, res) => {
	const genere = generes.find(g => g.id === parseInt(req.params.id));
	if(!genere) return res.status(404).send('Invalid gerere id!');
	res.send(genere);
});

// --------------------- POST METHODS --------------------------
app.post('/api', (req, res) => {
	const genere = {id: generes.length + 1, genere: req.body.genere};
	generes.push(genere);
	res.send(genere);
	console.log(generes.length);
});

// ----------------------- PUT METHODS ----------------------------

app.put('/api/id/:id', (req, res) => {
	let genere = generes.find(g => g.id === parseInt(req.params.id));
	if(!genere) return res.status(404).send("Cannot find genere with given ID");
	genere.genere = req.body.genere;
	res.send(genere);
});

// --------------------- DELETE METHODS --------------------------
app.delete('/api/id/:id', (req, res) => {
	const genere = generes.find(g => g.id === parseInt(req.params.id));
	if(!genere) return res.status(404).send("Cannot not delete genere with given ID.");
	const index = generes.indexOf(genere);
	generes.splice(index, 1);
	res.send(genere);
	console.log(generes.length);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));