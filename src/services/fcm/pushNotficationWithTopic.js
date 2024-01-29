const { ApolloError } = require("apollo-server-express");
const admin = require("firebase-admin");
const path = require('path');

module.exports = async ({app, title, body, imageUrl = undefined, topic = "ALL"}) => {
    // التحقق من وجود مفتاح خدمة حساب Firebase
    if (!app.serviceAccountKey) {
        throw new ApolloError("لم يتم تهئية الاشعارات بشكل صحيح");
    }
    // تكوين الرسالة
    const message = {
        notification: {
            title,
            body,
            imageUrl
        },
        android: {
            notification: {
                imageUrl,
            },
        },
        apns: {
            payload: {
                aps: {
                    'mutable-content': 1,
                },
                mediaUrl:imageUrl,
                mediaType: "image" 
            },
            fcmOptions: {
                // image: imageUrl,
                analyticsLabel: "test",
                imageUrl,
            },
        },
        webpush: {
            headers: {
                image: imageUrl,
            },
        },
        topic,
    };
    try {
        // قراءة ملف مفتاح الخدمة
        const filePath = path.resolve(__dirname, '../../files/firebaseAdminsSdk/' + app.serviceAccountKey);
        const serviceAccount = require(filePath);

        // تكوين Firebase
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        // إرسال الرسالة
        await admin.messaging().send(message);
        admin.app().delete();
    } catch (error) {
        console.error("حدث خطأ أثناء إرسال الإشعار:", error);
        throw new ApolloError("حدث خطأ أثناء إرسال الإشعار");
    }
};