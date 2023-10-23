const banMember = async (member, reason) => {
  try {
    await member.ban({ reason });
  } catch (error) {
    console.error(`Error while trying to ban ${member.user.username}`, error);
  }
};

export default banMember;
