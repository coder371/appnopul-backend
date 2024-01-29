const { ApolloError } = require("apollo-server-express");
const admin = require("firebase-admin");
const path = require('path');

module.exports = async ({app, title, body, imageUrl = undefined, token = undefined, data = undefined}) => {
    // التحقق من وجود مفتاح خدمة حساب Firebase
    if (!app.serviceAccountKey) {
        throw new ApolloError("لم يتم تهئية الإشعارات بشكل صحيح");
    }

    // تكوين الرسالة
    const message = {
        notification: {
            title,
            body,
        },
        android: {
            notification: {},
        },
        apns: {
            payload: {
                aps: {
                    'mutable-content': 1,
                },
            },
            fcmOptions: {
                analyticsLabel: "test",
            },
        },
        webpush: {
            headers:{}
        },
        token,
    };
    console.log("🚀 ~ file: pushNotficationWithToken.js:33 ~ module.exports= ~ message:", message)

    if(data){
        message.data = data
    }

    // إضافة imageUrl إذا تم تمريرها
    if (imageUrl) {
        message.notification.imageUrl = imageUrl;
        message.android.notification.imageUrl = imageUrl;
        message.apns.payload.mediaUrl = imageUrl;
        message.apns.fcmOptions.imageUrl = imageUrl;
        message.webpush.headers.image = imageUrl;
    }

    console.log("🚀 ~ file: pushNotficationWithToken.js:43 ~ module.exports= ~ message:", message)

    try {
        // قراءة ملف مفتاح الخدمة
        const filePath = path.resolve(__dirname, '../../files/firebaseAdminsSdk/' + app.serviceAccountKey);
        const serviceAccount = require(filePath);

        // تكوين Firebase
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        // إرسال الرسالة
        await admin.messaging().send(message).then(() => {
            admin.app().delete();
        }).catch((err) => {
            admin.app().delete();
        });
    } catch (error) {
        if(error.errorInfo.code === 'messaging/registration-token-not-registered'){
            console.warn("مستخدم غير مسجل دخول:");
        }else {
            console.warn("حدث خطأ أثناء إرسال الإشعار:", error);
            return new ApolloError("حدث خطأ أثناء إرسال الإشعار");
        }
    }
};
