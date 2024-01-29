const { ApolloError } = require("apollo-server-express");
const { cdn } = require("../../../../config/constants");
const { pushNotficationWithTopic } = require("../../../../services/fcm");

module.exports = async (_, { title, body, image, topic }, { app, user }) => {
    const imageUrl = image ? cdn + '/o/100/' + image : undefined;

    try {
        pushNotficationWithTopic({app, title, imageUrl, body, topic : "ALL"})
    }catch(e) {
        console.error("حدث خطأ أثناء إرسال الإشعار:", error);
        throw new ApolloError("حدث خطأ أثناء إرسال الإشعار");
    }

};
