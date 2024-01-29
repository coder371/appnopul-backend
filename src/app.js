var express = require('express');
const { CategoriesModel, AppsModel , ProductsModel, AdditionsModel, AddressesModel, BranchModel, CouponsModel, ProfitModel, AdvertisementsModel, NotesModel, productSizeModel } = require('./models');
const {createSecretKey} = require('./utilities/helpers/encryption');
var app = express();
require('./config/database')
require('./middlewares/index.moiddleware')(app, express);
const { faker } = require('@faker-js/faker');
const { additionsStatus, CRUDStatus } = require('./config/constants');
const {hashPassword} = require('./utilities/helpers/encryption');
const { BranchSchema } = require('./models/schemas');

// const secretKey = createSecretKey();
// console.log(secretKey)

// CategoriesModel.create({
//     title: "حلويات",
//     icon: '1682823710405-654206878-361258303.png',
//     App: "647f155a48dea8c1384339fc"
// })

// const newapp = new AppsModel({
//     name: 'drinkslab',
//     description: 'Drinks lab for Drinks',
//     logo: '1682823710405-654206878-361258303.png',
//     secretKey: secretKey,
// });
// newapp.save().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

// ProductsModel.create({
//     title: 'منتج جديد',
//     description: 'هو كعكة طبخت بين صحنين أو صفيحتين حارين تسمى صفائح الوَفْل. الوَفْل له شبكة متميّزة كما يظهر وذلك نتيجة لوجود الحواجزِ المرفوعة على صفائح الوَفْل',
//     images: [
//         '1682823710405-654206878-361258303.png',
//         '1682823710405-654206878-361258303.png',
//         '1682823710405-654206878-361258303.png'
//     ],
//     additions: ['64d0fb89478f98eeedb0e2f2','64d0fbe9832849b30b2f59d1','64d0fc41372e9bd44e224dc0'],
//     app: '647f3156e30113797c7af1e3',
//     category: '647f24eae314a851c6233c88',
//     diabetics: true,
//     sizes:[{
//       name:'صغير',
//       price: 12.5
//     }],
//     color: '#000000'
// })

// إنشاء بيانات عشوائية
// const createRandomAddition = async () => {
//     const randomTitle = faker.random.words();
//     const randomCategory = "647f24b9231a0cccb26a79de";
//     const randomApp = "647f3156e30113797c7af1e3";
//     const randomStatus = additionsStatus.AVAILABLE;
//     const randomCreatedAt = faker.date.recent();
  
//     const addition = new AdditionsModel({
//       title: "مكسرات",
//       category: randomCategory,
//       App: randomApp,
//       status: randomStatus,
//       createdAt: randomCreatedAt
//     });
  
//     await addition.save();
//   };
  
//   // استدعاء الدالة لإنشاء بيانات عشوائية
//   createRandomAddition();  
  
  
    // AddressesModel.create({
    //     title: 'البيت القديم',
    //     details: '٧ شارع ابو حنيفة النعمان',
    //     latitude: 31.2107879,
    //     longitude: 30.0021104,
    //     user: '64bbfcb8a040f143e3089818',
    //     app: '647f3156e30113797c7af1e3',
    // })

    // BranchModel.create({
    //     title: "فرع القدس",
    //     address: "عنوان المكان بالتفصيل الممل",
    //     app: '647f3156e30113797c7af1e3',
    //     phoneNumbers: [
    //         '01094144292',
    //         '01021142308'
    //     ],
    //     location: {
    //         coordinates: [
    //             29.929722156375647,
    //             30.873237652183807
    //         ]
    //     }
    // })

// AppsModel.findOne({_id: '647f3156e30113797c7af1e3'}).then((result) => {

//     result.delivery.maxDistance = 50
//     result.delivery.pricing = [
//         {distance: 10, price: 50},
//         {distance: 30, price: 150},
//         {distance: 80, price: 200}
//     ]
//     result.delivery.kilometerPrice = 100,
//     result.save();
// })
// function getDateAfterOneMonth(currentDate) {
//     const date = new Date(currentDate);
//     date.setMonth(date.getMonth() + 1);
//     return date;
//   }

// CouponsModel.create({
//     code: 'DES1235',
//     target: 'PRODUCTS',
//     products: [{
//         couponType: 'FIXED',
//         product: '64b1c4d040365f6d096002bf',
//         fixed: '10.5',
//     }],
//     isActive: true,
//     expiryDate: getDateAfterOneMonth(new Date()),
// });

// ProfitModel.create({
//   app: "647f3156e30113797c7af1e3",
//   icon: 'RoyalPancake.png',
//   points: 1250,
//   profit: 1250,
// })

// AdditionsModel.create({
//   title: 'شيكولاتات',
//   icon: 'RoyalPancake.png',
//   status: CRUDStatus.AVAILABLE,
//   app: '647f3156e30113797c7af1e3',
//   options: [{
//     title: 'شيكولاتة بيضاء',
//     price: 10,
//     icon: 'RoyalPancake.png',
//     status: CRUDStatus.AVAILABLE,
//   },{
//     title: 'شيكولاتة سوداء',
//     price: 10,
//     icon: 'RoyalPancake.png',
//     status: CRUDStatus.AVAILABLE,
//   },{
//     title: 'شيكولاتة خضراء',
//     price: 10,
//     icon: 'RoyalPancake.png',
//     status: CRUDStatus.AVAILABLE,
//   }],
// })

// AdvertisementsModel.create({
//   description:"test",
//   title: 'اعلان',
//   image: '12345.jpeg',
//   target: 'URL',
//   app:'647f3156e30113797c7af1e3',
// })


// NotesModel.create({
//     text: 'نص هنا يقوم بتوضيح ايجابي',
//     icon: 'RoyalPancake.png',
//     type:'SUCCESS',
//     app: '647f3156e30113797c7af1e3'
// })

// productSizeModel.create({
//     title: 'جامبو',
//     app: '647f3156e30113797c7af1e3',
// })

// AppsModel.findById("647f3156e30113797c7af1e3").then((res) => {

//     console.log("🚀 ~ file: app.js:181 ~ app:", res)
// })
module.exports = app;
