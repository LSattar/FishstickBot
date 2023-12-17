const { schedule } = require('node-cron');
const {Client, IntentsBitField, underscore} = require('discord.js','node-cron');
const cron = require('node-cron');

//bot token is stored in a text file named token.txt
const fs = require('fs');
const filePath = 'token.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) { // error handler
    console.error('Error reading the file:', err);
    process.exit(1);
  }

  client.login(data);

});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

//sends message to console when bot is online, schedule is initialized
client.on('ready',(c) => { 
    let today = new Date;
    console.log(`${c.user.tag} is online`);
    console.log(today.toLocaleTimeString());
    cron.schedule('6 21 * * * ', function(){
        client.channels.fetch('954189961274478675')
        .then(channel => {
            channel.send('It\'s closing time, exactly 9:06');
        })
    }); 
})

//potential replies to any invalid commands
const phrases = [
    '*stares in fishly confusion*',
    '*mimes driving*',
    '*burbles*',
    '*offers you a sloppy, wet high five*',
    '*heart shaped bubbles*',
    '*wiggles*',
    '*stares happily*',
    '*poses heroically*',
    '*bubbles anxiously*',
    '*burbles curiously*',
    '*sizes you up*'
]

//commands to the bot will all begin with ?
client.on('messageCreate', (message) => {
    if(message.content.charAt(0) === '?'){
        console.log(message.content);
    //tells user when closing time is
    if(message.content.toLowerCase() === '?closingtime'){
        message.reply('Closing time\'s exactly 9:06');
    }
    //tells user the current time
    else if(message.content.toLowerCase() === '?time'){
        let time = new Date;
        message.reply('Hi, '+ message.author.username + '! It is '+ time.toLocaleTimeString());
    }
    //informs users what commands are available
    else if(message.content.toLowerCase() === '?help'){
        message.reply('Hi, ' + message.author.username + ' my current commands are \'?closingtime\' and \'?time\'');
    }
    //will select a random phrase for any invalid command
    else{
        num = Math.floor(Math.random()*11);
        console.log(num);
        message.reply(phrases[num]);
    }
    }
})

