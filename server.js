const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000


// const bossMonster = require('./api/monsters')
const monsters = require('./api/monsters')


app.use(cors())
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.options('*', cors());

app.get('/', (request, response) => {
	response.json({
		info: 'Node.js, Express, and Postgres API'
	})
})

app.get('/monsters', monsters.getMonsters)
app.post('/monster', monsters.createMonster)
app.delete('/monster/:id', monsters.deleteMonster)

app.get('/encounters', monsters.getEncounters)
app.get('/encounters/:id', monsters.getEncounterById)

// Normal Monster
// app.get('/normalMonsters', normalMonster.getNormalMonsters)
// app.post('/normalMonster', normalMonster.createNormalMonster)
// app.delete('/normalMonster/:id', normalMonster.deleteUser)

// // Boss Monster
// app.get('/bossMonsters', bossMonster.getBossMonsters)
// app.post('/normalMonster', bossMonster.createBossMonster)
// app.delete('/bossMonster/:id', bossMonster.deleteUser)
// app.get('/users/:id', db.getUserById)
// app.put('/users/:id', db.updateUser)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})