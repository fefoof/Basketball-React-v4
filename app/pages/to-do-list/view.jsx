const React = require('react');
const { Route } = require('react-router-dom');
const ToDoList = require('../../components/TaskC/to-do-list');
const TaskDetail = require ('../../components/TaskC/task-details');
const NewTask = require ('../../components/TaskC/new-task');
const Players = require('../../components/Player/players');
const PlayerDetail = require ('../../components/Player/player-details');
const NewPlayer = require ('../../components/Player/new-player');

class ToDoListPage extends React.Component {
    render() {
        console.log("todolist");
        const { tasks } = this.props.initialState;
        const { players } = this.props.initialState;    
        return (
            <React.Fragment>
                <Route
                    path="/to-do-list/task/:id"
                    render={(props) => <TaskDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/to-do-list"
                    render={(props) => <ToDoList {...props} tasks={tasks}/>}
                />
                <Route
                    exact
                    path="/to-do-list/new"
                    render={(props) => <NewTask {...props} tasks={tasks}/>}
                />
                <Route
                    path="/players/:id"
                    render={(props) => <PlayerDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/players"
                    render={(props) => <Players {...props} players={players}/>}
                />
                <Route
                    exact
                    path="/players/new"
                    render={(props) => <NewPlayer {...props} players={players}/>}
                />                
            </React.Fragment>
        );
    }
};

module.exports = ToDoListPage;
