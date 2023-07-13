const express = require("express")
const router = express.Router()

const { validateApi, tokenvalidation } = require("../authentication/ApiAuth")
const {createTodo, editTodo,pinTodo,archiveTodo,getUncompletedTodo,getSingleTodo,completeTodo,completedTodo,archivedTodo} = require("../controllers/todoControllers")

router.post("/todo/new", validateApi, tokenvalidation,createTodo )
router.post("/todo/edit/:id", validateApi, tokenvalidation,editTodo )
router.post("/todo/pin/:id", validateApi, tokenvalidation,pinTodo)
router.post("/todo/archive/:id", validateApi, tokenvalidation,archiveTodo)
router.post("/todo/completed/:id", validateApi, tokenvalidation,completeTodo)
router.get("/todo/find/uncompleted", validateApi, tokenvalidation,getUncompletedTodo)
router.get("/todo/find/completed", validateApi, tokenvalidation,completedTodo)
router.get("/todo/find/archived", validateApi, tokenvalidation,archivedTodo)
router.get("/todo/find/:id", validateApi, tokenvalidation,getSingleTodo)







module.exports = router