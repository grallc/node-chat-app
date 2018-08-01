var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Bob';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('text', text);

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Bob';
        var latitude = '51.507268';
        var longitude = '-0.165730';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('url', url);

    });
});