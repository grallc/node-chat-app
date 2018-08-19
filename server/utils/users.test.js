const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    //  Create some users
    users.users = [{
      id: '1',
      name: 'Corentin',
      room: 'nodeCon'
    }, {
      id: '2',
      name: 'Malo',
      room: 'nodeCon'
    }, {
      id: '3',
      name: 'Briac',
      room: 'netflixCon'
    }];
  });

  // Test user creation - Should return an user because it does exist
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Tugdual',
      room: 'maprCon' // Tugdual, who works at MapR :)
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]); // Test if created user = manually created user
  });

  // Test user deletion - Should return an user because it does exist
  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  // Test user deletion - Should not return an user because it doesn't exist
  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).not.toBeTruthy();
    expect(users.users.length).toBe(3);
  });

  // Test user finding - Should return an user because it does exist
  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  // Test user finding - Should not return an user because it doesn't exist
  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).not.toBeTruthy();
  });

  // Test users retrieving - users should be "Corentin" and "Malo"
  it('should return names for nodeCon', () => {
    var userList = users.getUserList('nodeCon');

    expect(userList).toEqual(['Corentin', 'Malo']);
  });

  // Test users retrieving - user should be "Briac"
  it('should return names for netflixCon', () => {
    var userList = users.getUserList('netflixCon');

    expect(userList).toEqual(['Briac']);
  });
});
