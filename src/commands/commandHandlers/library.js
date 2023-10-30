const library = async (interaction) => {
  interaction.reply({
    content:
      'Visit our library at: [Pitchlabs Library](https://www.pitchlabs.org/library)',
    ephemeral: true,
  });
};

export default library;
