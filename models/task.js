const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: String, title: 'Name', required: true},
    creator: {type: String, title: 'Creator'},
    completed:{type: Boolean, title: 'Completed'},
    dueDate: {type: String, title: 'Due Date', required: true},
    description: {type: String, title: 'Description'}, 
    subTask: [{
        name: {type: String, title: 'Name'},
        description: {type: String, title: 'Description'},
        completed:{type: Boolean, title: 'Completed'}
    }]
})

module.exports = mongoose.model('Task', taskSchema);