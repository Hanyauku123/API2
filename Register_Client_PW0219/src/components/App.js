import React from "react"
import RegisterForm from './RegisterForm'
import RegisterTable from './RegisterTable'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            student_list:[],
            id_counter:0
        }
    }

    fetchData(){
        fetch("http://localhost:3500/register")
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            this.setState({
                student_list: data
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    handleSubmit(student){
        student.datetime = new Date();

        const init ={
            method: "POST",
            headers:{
                "Content-type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                carnet: student.carnet,
                schedule: student.schedule,
                isLate: student.isLate
            })
        };

        fetch("http://localhost:3500/register/", init)
            .then(response=>{
                return response.jason()
            }).then(data=>{
                this.fetchData();
                console.log(data)
            }).catch(e=>{
                console.log(e);
            });


        let buffer_list = this.state.student_list.slice();
        this.setState({
            student_list: buffer_list.concat([student]),
            id_counter: this.state.id_counter + 1,
        })
    }

    handleDelete(student){
        let index = this.state.student_list.find(value=>{
            return value._id === student._id;
        });

        const init ={
            method: "DELETE",
            headers:{
                "Content-type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                _id: index._id
            })
        };


        fetch("http://localhost:3500/register", init)
        .then(response=>{
            return response.json();
        }).then(data=>{
            this.fetchData();
            console.log(data);
        }).catch(error=>{
            console.log(error);
        })
    }
    
    render(){
        return (
            <div className="container" style={{"marginTop":2+"em", "marginBottom":2+"em"}}>
                <RegisterForm 
                    onSubmit = {(student)=>{
                        this.handleSubmit(student);
                    }}
                />
                <RegisterTable 
                    list={this.state.student_list}
                    onDelete={(student)=>this.handleDelete(student)}
                    />
            </div>
        );
    }
}

export default App;