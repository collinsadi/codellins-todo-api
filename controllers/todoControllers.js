const Todo = require("../models/todoModel")


const createTodo = async (request, response) => {

    const owner = request.user._id

    const { title, description,body, priority } = request.body
    

    try {
        
        if(!title){

            response.status(422).json({status:"error", message:"Todo is Mising a Title"})
            return
        }
        if (!body) {
            response.status(422).json({status:"error", message:"Todo does not have a Content"})
            return
        }

        const todo = await Todo.create({title,description,body,priority,owner})

        response.status(201).json({status:"success",todo})


    } catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
    
}

const editTodo = async (request, response) => {
    
    const id = request.params.id
     const owner = request.user._id
    

     const { title, description,body, priority } = request.body
    
    try {
    
        const todo = await Todo.findById(id)
        
        if(!todo){
            response.status(404).json({status:"error", message:"Todo Not Found"})
            return
        }


        if(todo.owner != owner){

            response.status(401).json({status:"error", messsage:"Not Your Todo"})
            return
        }

        const toedit = await Todo.findByIdAndUpdate(id,request.body)

        response.status(200).json({status:"success", message:"Todo Edited Sucessfully"})

    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
}

const pinTodo = async (request, response) => {
    const id = request.params.id
    const owner = request.user._id
    const action = request.body.action

    try {
        

        if(action === "pin"){

            try {
                
                const todo = await Todo.findById(id)

                if (!todo) {
                    
                    response.status(404).json({status:'error', message:"Todo Not Found"})
                    return
                }

                const alreadyPinnedTodo = await Todo.find({ owner, pinned: true })
                
                if (alreadyPinnedTodo.length === 5) {
                    
                    response.status(401).json({status:"error", message:"You can only Pin 5 Todos"})
                    return
                }

                todo.pinned = true

                await todo.save()

                response.status(201).json({status:"success",message:"Todo Pinned"})





            } catch (error) {
                response.status(400).json({status:"error", message:"an Error Occured"})
                console.log(error)
            }

            return

        }


        if(action === "unpin"){

            try {
                
                const todo = await Todo.findById(id)

                if (!todo) {
                    
                    response.status(404).json({status:'error', message:"Todo Not Found"})
                    return
                }


                todo.pinned = false

                await todo.save()

                response.status(201).json({status:"success",message:"Todo Unpinned"})





            } catch (error) {
                response.status(400).json({status:"error", message:"an Error Occured"})
                console.log(error)
            }

            return

        }

    
        response.status(422).json({status:"error", message:"Action Type not Recognized"})
     

    } catch (error) {
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
}

const archiveTodo = async (request, response) => {
    const id = request.params.id
    const action = request.body.action

    try{

    if(action === "archive"){

        try {
            
            const todo = await Todo.findById(id)
            
            if (!todo) {
                response.status(404).json({status:"error", message:"Todo Not Found"})
                return
            }

            todo.archived = true
            await todo.save()

            response.status(201).json({status:"success", message:"Todo Archived"})

        }catch(error){

            response.status(400).json({status:"error", message:"an Error Occured"})
        }

        return;

    }
    if(action === "unarchive"){

        try {
            
            const todo = await Todo.findById(id)
            
            if (!todo) {
                response.status(404).json({status:"error", message:"Todo Not Found"})
                return
            }

            todo.archived = false
            await todo.save()

            response.status(201).json({status:"success", message:"Todo Unarchived"})

        }catch(error){

            response.status(400).json({status:"error", message:"an Error Occured"})
        }

        return;

    }

       response.status(422).json({status:"error", message:"Action Type not Recognized"})

    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
}

const completeTodo = async (request, response) => {
    const id = request.params.id
    const action = request.body.action

    try{

        
    if(action === "completed"){

        try {
            
            const todo = await Todo.findById(id)
            
            if (!todo) {
                response.status(404).json({status:"error", message:"Todo Not Found"})
                return
            }

            todo.completed = true
            await todo.save()

            response.status(201).json({status:"success", message:"Todo Marked as Completed"})

        }catch(error){

            response.status(400).json({status:"error", message:"an Error Occured"})
        }

        return;

    }
    if(action === "uncompleted"){

        try {
            
            const todo = await Todo.findById(id)
            
            if (!todo) {
                response.status(404).json({status:"error", message:"Todo Not Found"})
                return
            }

            todo.completed = false
            await todo.save()

            response.status(201).json({status:"success", message:"Todo Marked as Uncompleted"})

        }catch(error){

            response.status(400).json({status:"error", message:"an Error Occured"})
        }

        return;

    }

     response.status(422).json({status:"error", message:"Action Type not Recognized"})

    } catch (error) {
        
        response.status(500).json({status:"error",message:"Internal Server Error"})
        console.log(error)
    }
}

const getSingleTodo = async (request, response) => {
    const id = request.params.id
    
    try{

          const todo = await Todo.findById(id).select("-owner")
            
            if (!todo) {
                response.status(404).json({status:"error", message:"Todo Not Found"})
                return
            }
        
        response.status(200).json({status:"success",todo})



    }catch(error){
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }
}

const getUncompletedTodo = async (request, response) => {
    const owner = request.user._id

    try{

        const Todos = await Todo.find({owner,completed:false}).select("-owner").sort({createdAt:-1})
        
        response.status(200).json({status:"success",Todos })

    } catch (error) {
        
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}
const completedTodo = async (request, response) => {
    const owner = request.user._id

    try{

        const Todos = await Todo.find({owner,completed:true}).select("-owner").sort({createdAt:-1})
        
        response.status(200).json({status:"success",Todos })

    } catch (error) {
        
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}
const archivedTodo = async (request, response) => {
    const owner = request.user._id

    try{

        const Todos = await Todo.find({owner,archived:true}).select("-owner").sort({createdAt:-1})
        
        response.status(200).json({status:"success",Todos })

    } catch (error) {
        
        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}


module.exports = {createTodo, editTodo,pinTodo,archiveTodo,getUncompletedTodo,getSingleTodo,completeTodo,completedTodo,archivedTodo}