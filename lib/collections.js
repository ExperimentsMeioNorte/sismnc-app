//conexão
Meteor.remote = DDP.connect("http://admin.sistemameionorte.com.br:3002"); // em producao
//Meteor.remote = DDP.connect("http://localhost:3000"); // em desenvolvimento

//collection
User = new Mongo.Collection('user', Meteor.remote);
Program = new Mongo.Collection('program', Meteor.remote);
Category = new Mongo.Collection('category', Meteor.remote);
Content = new Mongo.Collection('content', Meteor.remote);
Answer = new Mongo.Collection('answer', Meteor.remote);
Poll = new Mongo.Collection('poll', Meteor.remote);
PollUser = new Mongo.Collection('polluser', Meteor.remote);
Vehicle = new Mongo.Collection('vehicle', Meteor.remote);

//configurações automatizadas
collectionsName = {
    User: 'user',
    Program: 'program',
    Category: 'category',
    Content: 'content',
    Answer: 'answer',
    Poll: 'poll',
    PollUser: 'polluser',
    Vehicle: 'vehicle'
};

collections = {
    User: User,
    Program: Program,
    Category: Category,
    Content: Content,
    Answer: Answer,
    Poll: Poll,
    PollUser: PollUser,
    Vehicle: Vehicle
};
