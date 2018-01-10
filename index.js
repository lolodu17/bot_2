var Discord = require("discord.js");
var bot = new Discord.Client();
var prefix = "/"
const fs = require("fs")

bot.on("ready", function () {
	console.log("Bot connecté");
});


bot.on('message', msg => {
  if (msg.content.startsWith('/invite')) {
        msg.channel.send({embed: {
            color: 0x98FB98,
            author: {
                name: "Vous souhaitez m'inviter sur votre serveur ?",
                description: "Vous trouverez le lien ci-dessous",
            },
            fields: [{
                    name: 'Lien :',
                    value: "https://discordapp.com/oauth2/authorize?client_id=400376181876195329&scope=bot&permissions=2146958591",
                },
            ],
        }});
}
})

bot.on('message', message => {
  if (message.content === '/pp') {
    message.reply(message.author.avatarURL);
  }
});


bot.on("message", msg => {
  if (msg.content.startsWith('/game')) {
    if (msg.author.id !== "316993284566417418") {
      return msg.channel.sendMessage("Vous n'avez pas l'autorisation de faire cette commande :x:")
    }
    bot.user.setGame("Besoin d'aide ? - /help", "https://www.twitch.tv/beedywoolmako")
  }
});



bot.on('message', message => {
   if (message.content.startsWith("/8ball")) {
var commande = [":8ball: | 🔴 Je ne pense pas, " + message.author.username,":8ball: | 🔴 Surement pas, " + message.author.username,":8ball: | 🔴 Non, " + message.author.username,":8ball: | 🔵 Je pense que oui, " + message.author.username,":8ball: | 🔵 Surement, " + message.author.username,":8ball: | 🔵 Oui, " + message.author.username,":8ball: | ⚫️ Aucune idée, " + message.author.username,":8ball: | ⚫️ Je n'ai aucun moyen de savoir, " + message.author.username]
     message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
}
})



bot.on('message', message => {
   if (message.content.startsWith("/roll")) {
var commande = [":control_knobs: | Vous etes tombé sur le numero: 1",":control_knobs: | Vous etes tombé sur le numero: 2",":control_knobs: | Vous etes tombé sur le numero: 3",":control_knobs: | Vous etes tombé sur le numero: 4",":control_knobs: | Vous etes tombé sur le numero: 5",":control_knobs: | Vous etes tombé sur le numero: 6",":control_knobs: | Vous etes tombé sur le numero: 7",":control_knobs: | Vous etes tombé sur le numero: 8",":control_knobs: | Vous etes tombé sur le numero: 9",":control_knobs: | Vous etes tombé sur le numero: 10"]
     message.channel.send(`${(commande[Math.floor(Math.random() * commande.length)])}`)
}
});


bot.on('message',message => {
	if (message.content === "/salut")
message.channel.send(":wave: | Bonjour, " + message.author.username, {
 tts: true
})
});

bot.on("message", msg => {
  if (msg.content.startsWith('/status')) {
    if (msg.author.id !== "316993284566417418") {
      return msg.channel.sendMessage("Vous n'avez pas l'autorisation de faire cette commande :x:")
    }
    bot.user.setStatus("dnd")
  }
});

bot.on("message", message => {
 if (message.content == "/say") {
        if (!message.member.roles.some(r=>["TheVoid admin"].includes(r.name)) ) return message.reply("Désolé mais tu n'as pas la permission de faire cela : tu as besoin du grade : **TheVoid admin** :x:");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }
});
	  
bot.on("message", message => {
    if (message.content === "/help") {
            const embed = new Discord.RichEmbed()
                .setDescription(":question: | **Liste des commandes de TheVoid!**")
                .setColor(0xFA8072)
                .addField("/invite","Vous donne le lien pour m'inviter sur votre serveur.")
	        .addField("/roll","Vous donne un nombre aléatoire en 1 et 10.")
		.addField("/8ball","Répond aléatoirement a une question.")
		.addField("/pp","Vous donne votre photo de profil.")
	    	.addField("/stats","Donne les statistiques du bot.")
	    	.addField("/si","Vous montre les informations du serveur.")
	    	.addField("Bienvenue","Elle est automatique et envoie un message de bienvenue en messages privés au nouvel arrivant.")
	    	.setFooter("TheVoid codé par BeedyWool avec l'aide de Splating, hébergé par Heroku.")
	    	

            message.channel.send({embed})

        };
});

let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));

bot.on("message", message => {
if(message.content.startsWith("prefix")) return;
if(message.author.bot) return;
if(!points[message.author.id]) points[message.author.id] = {points: 0, level: 0};
let userData = points[message.author.id];
userData.points++;
let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
if(curLevel > userData.level) {
userData.level = curLevel;
message.reply(`Vous êtes désormais au niveau **${curLevel}**!`);
}
if(message.content.startsWith("/level")) {
message.reply(`Voici vos statistiques : Niveau - ${userData.level}, Points - ${userData.points}`);
}
fs.writeFile('./points.json', JSON.stringify(points), (err) => {if(err) console.error(err)});
});




bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send(":wave: | Je te souhaite la bienvenue sur ce serveur ! Si tu as des questions sur moi utilise la commande : **/help**, tu peux aussi rejoindre mon serveur :Discord: avec la commande **/invite** pour plus dinformations, " + member.displayName)
  }).catch(console.error)
})

bot.login(process.env.TOKEN)
