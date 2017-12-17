"use strict";

const  User = require('../../models/user/user.model');
const fs = require('fs');

module.exports = function () {



	return {
		usersByArray: 	usersByArray,
		deleteUser: 	deleteUser,
		updateUser: 	updateUser,
		customFind: 	customFind,

        getUsers: 		getUsers,
		addUser: 		addUser,
		logIn: 			logIn,

        getUserByToken: getUserByToken,
        getUserById: require('./methods/getUserById.method'),
        getUserByCustomField : require('./methods/getUserByCustomField.method'),
        leaveChat: require('./methods/leaveChat.method'),
        setAvatar: require('./methods/setAvatar.method')

	};

};

const addUser = async request => {

    try {
        const result = await User.addUser(request.body);
        return result;
    }
    catch (error) {
        return {error};
    }

};

const getUsers = request => {

    return new Promise((resolve, reject) => {
        User.getUsers(request.params.id, null)
            .then(resolve, reject);
    });
};



const getUserByToken = token => {

    return new Promise((resolve, reject) => {
        User.getUserByToken(token)
            .then(resolve, reject);
    });
};

const deleteUser = (request) => {

    return new Promise((resolve, reject) => {
        User.deleteUser(request.params.id)
            .then(resolve, reject);
    });
};

const logIn = (request) => {

    return new Promise((resolve, reject) => {
        User.authorize(request.body.data, request.body.password)
            .then(resolve, reject);
    });
};


const updateUser = async obj => {
    const updateObj = {};
    updateObj[obj.field] = obj.value;

     const updatedUser = await User.updateUser(
         {  _id: obj.user },
         { $set: updateObj }
     );

    if(updatedUser.error){
        return updatedUser;
    }
    else {
        return await User.getUserById(obj.user);
    }
};

const customFind = (token, searchObj) => {

    return new Promise (function (resolve, reject) {

        User.customFind(token, searchObj)
            .then(resolve, reject);

    });

};

const usersByArray = (request) => {

	return new Promise((resolve, reject) => {

        User.getUsers(null, request.body)
            .then(resolve, reject);

	});

};

