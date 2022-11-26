const db = require('./db');

const getUsers = (req, res) => {
    let sql = "select * from users";
    const sqlValues = [];

    if(req.query.language != null && req.query.city != null) {
        sql = "select * from users where language = ? and city = ?";
        sqlValues.push(req.query.language, req.query.city);
    } else if (req.query.language != null) {
        sql = "select * from users where language = ?";
        sqlValues.push(req.query.language);
    } else if (req.query.city != null) {
        sql = "select * from users where city = ?";
        sqlValues.push(req.query.city);
    }
    db.query(sql, sqlValues).then(([user]) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    db.query("select* from users where id = ?", [id]).then(([user]) => {
        if(user.length != 0) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
        
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
    });
}

const createUser = (req, res) => {
    const {firstname, lastname, email, city, language} = req.body;
    db.query("insert into users (firstname, lastname, email, city, language) values (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language]).then(([user]) => {
        res.location(`/api/users/${user.insertId}`).sendStatus(201);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
    });
};

const modifyUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {firstname, lastname, email, city, language} = req.body;
    db.query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?", [firstname, lastname, email, city, language, id]).then(([result]) => {
        if(result.affectedRows === 0) {
            res.status(404).send("User not found");
        } else {
            res.sendStatus(204);
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    db.query("delete from users where id = ?", [id]).then(([result]) => {
        if(result.affectedRows === 0) {
            res.status(404).send("User not found");
        } else {
            res.sendStatus(204);
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    modifyUser,
    deleteUser
};