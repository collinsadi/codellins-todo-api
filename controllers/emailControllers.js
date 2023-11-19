const nodemailer = require("nodemailer")



const sendEmail = (email,subject,html)=>{

    try{

    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: "",
            pass:""
        }
    })
        
        const mailOptions = {

            from: "",
            to: email,
            subject: subject,
            html: html
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){

                console.log("error", error)
                return false
            }else{

                console.log("Mail Sent Sucessfully", info)
                return true
            }

        })

    


    }catch(error){

        console.log(error)
    }




}


module.exports = sendEmail
