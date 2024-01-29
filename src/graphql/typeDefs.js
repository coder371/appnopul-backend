const { gql } = require('apollo-server-express');
const additionsSchema = require('./resolvers/additions.resolvers/schema');
const productsSchema = require('./resolvers/products.resolvers/schema');
const categoriesSchema = require('./resolvers/categories.resolvers/schema');
const appsSchema = require('./resolvers/apps.resolvers/schema');
const usersSchema = require('./resolvers/users.resolvers/schema');
const addressesSchema = require('./resolvers/addresses.resolvers/schema');
const couponsSchema = require('./resolvers/coupons.resolvers/schema');
const ordersSchema = require('./resolvers/orders.resolvers/schema');
const profitSchema = require('./resolvers/profit.resolvers/schema');
const branchesSchema = require('./resolvers/branches.resolvers/schema');
const advertisementsSchema = require('./resolvers/advertisements.resolvers/schema');
const analysisSchema = require('./resolvers/analysis.resolvers/schema');
const notesSchema = require('./resolvers/notes.resolvers/schema');
const sizesSchema = require('./resolvers/sizes.resolvers/schema');
const trackingSchema = require('./resolvers/tracking.resolvers/schema');
const typeDefs = gql`

  scalar JSON
  scalar DateTime

  type appResult {
    _id: String!
    logo: String!
    name: String!
    description: String!
    secretKey: String!
    createdAt: DateTime!
  }
  type Category {
    _id: ID!
    title: String!
    icon: String!
    iconUrl: String!
    description: String
    status: String!
    createdAt: String!
    app: ID!
  }
  input CategoryInput {
    _id: ID!
    title: String!
    icon: String!
    iconUrl: String!
    description: String
    status: String!
    createdAt: String!
    app: ID!
  }
  type Product {
    _id: ID!
    title: String!
    description: String!
    category: Category
    color: String
    status: String!
    diabetics: Boolean
    images: [String!]!
    app: ID!
    sizes: [Size]
    createdAt: String!
    imagesUrl: [String!]!
    minPrice: Float
    maxPrice: Float
    mainImage: String!
    additions: [Addition]!
    price: Float
    priceType: String,
    note: ID,
  }
  
  type Addition {
    _id: ID!
    title: String!
    app: ID!
    status: String!
    createdAt: String!
    updatedAt: String!
    iconUrl: String!
    description: String
    options: [AdditionOption]
  }
  type AdditionOption {
    title: String!
    price: Float!
    _id: ID!
    iconUrl: String!
  }

  input AdditionInput {
    _id: ID!
    title: String!
    price: Float!
    category: ID!
    App: ID!
    status: String!
    createdAt: String!
    updatedAt: String!
    iconUrl: String!
  }
  type Size {
    _id: ID
    name: String
    price: Float
  }
  input SizeInput {
    _id: ID!
    name: String!
    price: Float!
  }
  type checkOTP {
    isValid: Boolean!,
  }
  type User {
    _id: ID!,
    fullname: String!,
    avatarUrl: String!,
    token: String!, 
    phoneNumber: String!,
    admin: Boolean!,
    defaultAddress: Address,
  }
  type Admin {
    _id: ID!,
    fullname: String!,
    avatarUrl: String!,
    token: String!, 
    phoneNumber: String!,
    admin: Boolean!,
    role: String,
    app: String
  }
  input UserInput {
    _id: ID!,
    fullname: String!,
    avatarUrl: String!,
    token: String!, 
    phoneNumber: String!,
    admin: Boolean!,
    defaultAddress: AddressInput,
  }
  type Address {
    _id: ID,
    title: String,
    details: String,
    location: Location, 
    isDefault: Boolean,
  }
  input AddressInput {
    _id: ID,
    title: String!,
    details: String!,
    location: LocationInput!, 
    isDefault: Boolean!,
  }
  type Location {
    coordinates: [Float],
    type: String,
  }
  input LocationInput {
    coordinates: [Float],
    type: String,
  }
  type Branch {
    _id: ID!,
    title: String!,
    address: String!,
    location: Location!
  }

  input BranchInput {
    _id: ID!,
    title: String!,
    address: String!,
    location: LocationInput!
  }
  type DeliveryCost {
    distance: String!,
    cost: String!,
    address: ID!, 
    delivery: Boolean!,
    nearestBranch: Branch,
  }
  input DeliveryCostInput {
    distance: String!,
    cost: String!,
    address: ID!, 
    delivery: Boolean!,
    nearestBranch: BranchInput,
  }
  type Coupon {
    code: String!,
    target: String!,
    isActive: Boolean!,
    expiryDate: DateTime
    createdAt: DateTime!,
    order: CouponOrder ,
    delivery: CouponDelivery,
    products: [CouponProducts],
  }
  input CouponInput {
    code: String!,
    target: String!,
    isActive: Boolean!,
    expiryDate: DateTime!
    createdAt: DateTime!,
    order: CouponOrderInput ,
    delivery: CouponDeliveryInput,
    products: [CouponProductsInput],
  }
  type CouponDelivery {
    couponType: String,
    fixed: Float,
    percentage: Int,
  }
  input CouponDeliveryInput {
    couponType: String,
    fixed: Float,
    percentage: Int,
  }
  type CouponOrder {
    couponType: String,
    fixed: Float,
    percentage: Int,
  }
  input CouponOrderInput {
    couponType: String,
    fixed: Float,
    percentage: Int,
  }
  type CouponProducts {
    couponType: String,
    product: ID,
    fixed: Float,
    percentage: Int,
  }
  input CouponProductsInput {
    couponType: String,
    product: ID,
    fixed: Float,
    percentage: Int,
  }


type DeliveryInfo {
  distance: Float!
  cost: Float!
  address: Address!
  nearestBranch: Branch!
}

type OrderDiscount {
  code: String
  totalDiscount: Float,
}
type OrderInfo {
  _id: ID,
  code: String!,
  createdAt: DateTime!,
  productsCost: Float!,
  total: Float!,
  status: String,
  delivery: DeliveryInfo,
  discount: OrderDiscount,
}

type Profit {
  _id: ID!,
  iconUrl: String!,
  points: Int!,
  profit: Float!,
  createdAt: DateTime!,
  coupon: Coupon
}

type Advertisement {
  _id: ID!,
  imageUrl: String!,
  title: String!,
  description: String,
  data: JSON,
  target: String,
  source: String
}


  ${additionsSchema}
  ${appsSchema}
  ${categoriesSchema}
  ${productsSchema} 
  ${usersSchema} 
  ${addressesSchema} 
  ${couponsSchema}
  ${ordersSchema}
  ${ordersSchema}
  ${profitSchema}
  ${branchesSchema}
  ${advertisementsSchema}
  ${analysisSchema}
  ${notesSchema}
  ${sizesSchema}
  ${trackingSchema}
`;
module.exports = typeDefs;
