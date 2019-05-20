const Pool = require('pg').Pool
const pool = new Pool({
	connectionString: 'postgres://xynimuhc:GfoJ1wv9OQgNrMk2pj4hJGabL3SjCMZB@manny.db.elephantsql.com:5432/xynimuhc'
})
const getNormalMonsters = (request, response) => {
	pool.query('SELECT * FROM normalMonsters ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}



const getUserById = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}



const createNormalMonster = (request, response) => {
	const {
		name,
		currenthitpoints,
		maxhitpoints
	} = request.body

	console.log("name: ", name)
	console.log("current: ", currenthitpoints)
	console.log("max: ", maxhitpoints)

	pool.query('INSERT INTO normalMonsters (name, currenthitpoints, maxhitpoints) VALUES ($1, $2, $3)', [name, currenthitpoints, maxhitpoints], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Normal monster added with ID: ${results.insertId}`)
	})
}



const updateUser = (request, response) => {
	const id = parseInt(request.params.id)
	const {
		name,
		email
	} = request.body

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User modified with ID: ${id}`)
		}
	)
}



const deleteUser = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User deleted with ID: ${id}`)
	})
}



module.exports = {
	getNormalMonsters,
	getUserById,
	createNormalMonster,
	updateUser,
	deleteUser,
}