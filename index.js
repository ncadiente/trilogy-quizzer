const { ApolloServer, gql } = require('apollo-server');

let quizzes = [
  {
    id: 1,
    name: 'Lettuce know the difference',
    author: 'LaVar Ball',
    questions: [2,3,4]
  }
];


let questions = [
  {
    id: 2,
    text: "Lettuce begin, select all correct answers below",
    image: '/assets/lettuce.jpeg',
    type: 'multipleRadio',
    choices: [
      "let can change it's value but const cannot",
      'let and const are block scoped.',
      'const must be declared and initialized',
      'let and const cannot be accessed before declaration'
    ],
    answer: 5
  },
  {
    id: 3,
    text: "What is the value output of the console.log below?",
    image: "/assets/trilogyQuestion2.png",
    type: 'text',
    choices: null,
    answer: 6
  },
  {
    id: 4,
    text: "The following statement will run with no errors",
    image: "/assets/trilogyQuestion3.png",
    type: 'trueFalse',
    choices: [0,1],
    answer: 7
  }
]

let answers = [
  {
    id: 5,
    answer: [0,1,2,3]
  },
  {
    id: 6,
    answer: [8]
  },
  {
    id: 7,
    answer: [0]
  }
]


let users = [
  {
    id: 8,
    name: 'George Constanza',
    avatar: '/assets/George-Costanza.jpg'
  }
]

let scores = [
  {
    id: 9,
    user: 8,
    quiz: 1,
    responses: [],
    score: 3
  }
]

const typeDefs = gql`

  type Quiz {
    id: ID,
    name: String,
    author: String,
    questions: [Question]
  }

  type Question {
    id: ID,
    text: String,
    image: String,
    type: String
    choices: [String]
    answer: ID
  }

  type Answer {
    id: ID,
    answer: [Int]
  }

  type User {
    id: ID,
    name: String,
    avatar: String
  }

  type Query {
    quizzes: [Quiz],
    questions: [Question],
    answers: [Answer],
    users: [User]
  }
`;

const resolvers = {
  Query: {
    quizzes: () => quizzes,
    questions: () => questions,
    answers: () => answers,
    users: () => users
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});