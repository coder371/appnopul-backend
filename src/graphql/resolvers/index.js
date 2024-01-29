const lodash = require('lodash');
const additionsResolvers = require('./additions.resolvers')
const productsResolvers = require('./products.resolvers')
const categoriesResolvers = require('./categories.resolvers')
const advertisementsResolvers = require('./advertisements.resolvers')
const appsResolvers = require('./apps.resolvers')
const usersResolvers = require('./users.resolvers')
const addressesResolvers = require('./addresses.resolvers')
const couponsResolvers = require('./coupons.resolvers')
const ordersResolvers = require('./orders.resolvers')
const profitResolvers = require('./profit.resolvers')
const branchesResolvers = require('./branches.resolvers')
const analysisResolvers = require('./analysis.resolvers')
const notesResolvers = require('./notes.resolvers')
const sizesResolvers = require('./sizes.resolvers')
const trackingResolvers = require('./tracking.resolvers')
const resolvers = lodash.merge(additionsResolvers, productsResolvers, categoriesResolvers, appsResolvers, usersResolvers, addressesResolvers, couponsResolvers, ordersResolvers, profitResolvers, branchesResolvers, advertisementsResolvers, analysisResolvers, notesResolvers, sizesResolvers, trackingResolvers)
console.log(resolvers);
module.exports = resolvers;