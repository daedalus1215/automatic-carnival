db.auth('admin-user', 'admin-password')

db.tasks.insertOne({
    date: Date.now(),
    description: 'Notes description',
    conreactId: 0,
    time: [{ date: Date.now(), time: 0 }],
    tags: [{ name: 'DDD', description: 'Domain Driven Design' }]
});

db.tags.insertOne({
    name: 'DDD',
    description: 'Domain Driven Design'
});

db.tags.insertOne({
    name: 'Clean Architecture',
    description: 'Uncle Bob related tag for clean architecture'
});

db.tags.insertOne({
    name: 'Unit Testing',
    description: 'Unit Testing in general'
});

db.tags.insertOne({
    name: 'Architecture',
    description: 'Architecture in general'
});

db.tags.insertOne({
    name: 'Microservices',
    description: 'Related to Microservices'
});

db.tags.insertOne({
    name: 'React Timer App',
    description: 'Related to the React Timer App'
});

db.tags.insertOne({
    name: 'Udemy Course',
    description: 'udemy course '
});

db.tags.insertOne({
    name: 'Blockchain',
    description: 'Udemy course'
});

// PROJECTS
db.projects.insertOne({
    id: 0,
    name: "React Apps",
});

db.projects.insertOne({
    id: 1,
    name: "Apache Spark",
});

db.projects.insertOne({
    id: 2,
    name: "shell script course",
});

db.projects.insertOne({
    id: 3,
    name: "vim course"
});

db.projects.insertOne({
    id: 4,
    name: "Conference talks"
});

db.projects.insertOne({
    id: 5,
    name: "Reading"
});

db.projects.insertOne({
    id: 6,
    name: "Disney Reservation"
});

db.projects.insertOne({
    id: 7,
    name: "Bills"
});

db.projects.insertOne({
    id: 8,
    name: "Farzins lumber effort"
});

db.projects.insertOne({
    id: 9,
    name: "Politics"
});

db.projects.insertOne({
    id: 10,
    name: "Articles and Emails"
});

db.projects.insertOne({
    id: 11,
    name: "Udemy Course Work"
});

db.projects.insertOne({
    id: 12,
    name: "Crypto Currency Stuff"
});

db.projects.insertOne({
    id: 13,
    name: "Udemy Amazon Services Course"
});

db.projects.insertOne({
    id: 14,
    name: "Journal"
});
