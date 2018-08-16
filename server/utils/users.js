// The User object
class Users {
  constructor () {
    // All users
    this.users = [];
  }

  //  Add an user from its name and room
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user); // Add it into the userlist
    return user;
  }

  // Remove an user from its id
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id); // Find the user in userlist
    }

    return user;
  }

  // Find an user from its id
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  // Find all users who are in a room
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray; // Return their name, into an array
  }
  
  // Return if the username exists in the room
  isUserOnline(name, room) {
    return this.getUserList(room).includes(name);
  }


}

module.exports = {Users};