
const prod = {
    PORT: 8080,
    MONGO_URL: {
        connectionString: "mongodb://localhost:27017/RuleEngine",
        collection: "Rules",
        user: "",
        password: ""
    },

};

const config = prod;

module.exports = {
    ...config
};