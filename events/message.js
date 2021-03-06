const customschema = require('../schemas/custom-commands');

module.exports = (client, message) => {
    async function yup() {
     if (message.author.bot || message.channel.type === 'dm') return;
    const prefix = client.config.discord.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (cmd) cmd.execute(client, message, args)
    const data = await customschema.findOne({ Guild: message.guild.id, Command: command});
    if(data) message.channel.send(data.Response)
}   
    yup()
};