const dbInterface = require('./atlas-interface.js');
const res = require('express/lib/response');

async function getBy(model, filter, parameters) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), parameters.values, parameters.limit);
    
    return result;
}

async function getSettore(model, filter, parameters, settore) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), 'valori' , parameters.limit);

    for (e in result) {
        var tmp = {
            _id: result[e]._id,
            valore: []
        };
        for (v in result[e].valori) {
            var intmp = {semestre:result[e].valori[v].semestre};
            if (result[e].valori[v][settore]) {
                intmp[settore] = result[e].valori[v][settore];
            }
            tmp.valore[v] = intmp;
        }
        result[e] = tmp;
    }
    
    return result;
}

async function getTipo(model, filter, parameters, settore, tipo) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), 'valori' , parameters.limit);

    for (e in result) {
        var tmp = {
            _id: result[e]._id,
            valore: []
        };

        for (v in result[e].valori) {
            var intmp = {semestre:result[e].valori[v].semestre};
            if (result[e].valori[v][settore]) {
                intmp[tipo] = result[e].valori[v][settore][tipo];
            }
            tmp.valore[v] = intmp;
        }
        result[e] = tmp;
    }
    
    return result;
}

async function userGetStatus(_id, User) {
    return User
		.findById(_id)
		// what it sends back (if the user with the id=${id} exists)
		.select("_id, idPayment")	
		.then(function (data, err) {
			// if the user with the id=${id} exists
			if(data)    return data
            else        return err
		})
		.catch(function () {
			// if the user with the id=${id} does not exist
			return `The ID ${_id} does not exist`
		});
}

async function registerNewUser(_email, _password, _createdIn, Utente) {
    return Utente.findOne({email:_email}).then((user) => {
		if(user)
			return { email: ' A user with this email address has already registered '}
		else {
			if(checkIfEmailInString(_email)) {
				const newUser = new Utente({
					email: _email,
					password: _password,
					createdIn: _createdIn,
					idPayment: ''
				})
				newUser.save()
				return { user: newUser }
			} 
			else {
				return { email: ' The format for the email address is wrong ' }
			}
		}
	})
}

async function changePassword(_email, _oldPassword, _newPassword, Utente) {
    return Utente.findOne({email:_email}).then((user) => {
        if(!user)
            return { email: ' No user with that email address is registered '}
        else {
            if(user.password == _oldPassword) {
                user.password = _newPassword
                user.save()
                return { user: user }
            } else  
                return { password: ' The old password does not match the one on the database '}
        }
    })
}

function checkIfEmailInString(text) {
	// eslint-disable-next-line
	var re =
	  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(text);
}

//Exports ---------------------------------------------
module.exports = {getBy,getSettore,getTipo,userGetStatus,registerNewUser};
