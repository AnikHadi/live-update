import User from "@/models/user.model.js"; // Adjust the path as necessary

const MongooseAdapter = (client) => {
  return {
    async createUser(profile) {
      const user = new User(profile);
      await user.save();
      return user;
    },
    async getUser(id) {
      return await User.findById(id);
    },
    // Implement other required methods...
  };
};
