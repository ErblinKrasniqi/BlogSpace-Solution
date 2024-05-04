const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Post {
    _id: ID!
    title: String!
    description: String!
    imageUrl:String!
    creator: User
    createdAt:String!
    updatedAt:String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    message: String
    posts: [Post]
}

type AuthData {
    token: String!
    userName: String!
    role: String!
    userId: String!
    message: String
}

input UserInputData {
    email: String!
    name: String!
    password: String!
}

input PostInputData {
    title: String!
    description: String!
}

type RootQuery{
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
   createUser(userInput: UserInputData): User!
   createPost(postInput: PostInputData): Post!
}

schema {
    query:RootQuery
    mutation: RootMutation
}

`);
