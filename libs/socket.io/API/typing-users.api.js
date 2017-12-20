//IMPORTED HELPERS
const helpers = { ...require('../helpers/typing-users.helpers') };

module.exports = (socket, rooms, Messages) => {
    socket.on('beginTyping', async () => {
        if(rooms[socket.currentChat]) {
            let typingUsers = rooms[socket.currentChat].typingUsers;

            helpers.addInTyping(typingUsers, socket.user._id);
            Messages.in(socket.currentChat).emit('typingUsers',
                await helpers.getUsernamesOfTypingUsers(typingUsers));
        }
    });

    socket.on('finishTyping', async () => {
        if(rooms[socket.currentChat]) {
            const typingUsers = rooms[socket.currentChat].typingUsers;

            helpers.removeFromTyping(typingUsers, socket.user._id);
            Messages.in(socket.currentChat).emit('typingUsers',
                await helpers.getUsernamesOfTypingUsers(typingUsers));
        }
    });

    socket.on('typingUsers', async () => {
        if(rooms[socket.currentChat]) {
            Messages.in(socket.currentChat).emit('typingUsers',
                await helpers.getUsernamesOfTypingUsers(rooms[socket.currentChat].typingUsers));
        }

    });
};