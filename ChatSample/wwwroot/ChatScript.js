document.addEventListener('DOMContentLoaded', function () {

    var messageInput = document.getElementById('message');

    // Get the user name and store it to prepend to messages.
    var name = prompt('Enter your name:', '');
    // Set initial focus to message input box.
    messageInput.focus();

    // Start the connection.
    var connection = new signalR.HubConnectionBuilder()
        .withUrl('/chat')
        .build();

    // Create a function that the hub can call to broadcast messages.
    connection.on('broadcastMessage', function (name, message) {
        // Html encode display name and message.
        var encodedName = name;
        var encodedMsg = message;
        // Add the message to the page.
        /*
         liElement.innerHTML = '<strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg;
         document.getElementById('discussion').appendChild(liElement);
      */
        var date = new Date();
        //if (encodedMsg === null || encodedMsg === undefined || encodedMsg === "") { return; }
        /*if ($(".chat textarea.message").attr("placeholder") != "")
        {
        $(".chat textarea.message").attr("placeholder", "");
        }*/

        var html = '<i>' + encodedName + '</i>' +
            '<div>' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + '</div>' +
            '<div>' + encodedMsg + '</div>';
        var liElement = document.createElement('li');
        liElement.innerHTML = html;
        document.getElementById('discussion').appendChild(liElement);
        // Add the message to the page.

        //scroll
        //$(".chat .middle").append($.parseHTML(html));
        //$(".chat").scrollTop($(".chatbox .middle").height());
        console.log(html);
    });

    // Transport fallback functionality is now built into start.
    connection.start()
        .then(function () {
            console.log('connection started');
            document.getElementById('sendmessage').addEventListener('click', function (event) {
                // Call the Send method on the hub.
                connection.invoke('send', name, messageInput.value);

                // Clear text box and reset focus for next comment.
                messageInput.value = '';
                messageInput.focus();
                event.preventDefault();
            });
        })
        .catch(error => {
            console.error(error.message);
        });
});
