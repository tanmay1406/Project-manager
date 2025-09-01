import Mailgen from "mailgen";
import nodemailer from "nodemailer"
//sending the email
const sendEmail=async(options)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task manager",
            link:""
        }
    })
    
const mailTextual=mailGenerator.generatePlaintext(options.mailgenContent)
const mailhtml=mailGenerator.generate(options.mailgenContent)
//this is the actual part that sends the mail 
const transporter=nodemailer.createTransport({
    host:process.env.MAILTRAP_SMTP_HOST,
    port:process.env.MAILTRAP_SMTP_PORT,
    auth:{
        user:MAILTRAP_SMTP_USER,
        pass:MAILTRAP_SMTP_PASS,
    }
})

const mail={
    from:"tanmy14605@gmail.com",
    to:options.email,
    subject:options.subject,
    text:mailTextual,
    html:mailhtml,

}
try {
    await transporter.sendMail(mail)
} catch (error) {
    console.error("Email service broke down , make sure your credentials are corrert")
    console.error("Error: ",error)
}

}

//generate the mail

const emailVerificationMailgenContent=(username,verificationURL)=>{
    return {
        body:{
            name:username,
            intro:"Welcome to aur App",
        },
        actions:{
            instructions:"To verify your email please click the following button",
            button:{
                color:"#22BC66",
                text:"Verify your email",
                Link:verificationURL
            },
        },
        outro:"Need help, or have questions? Just reply to this email",
    }
}

const forgotPasswordMailgenContent=(username,passwordResetURL)=>{
    return {
        body:{
            name:username,
            intro:"We got a request to reset your password",
        },
        actions:{
            instructions:"To rest your password please click the link bellow",
            button:{
                color:"#22BC66",
                text:"Reset password",
                Link:passwordResetURL
            },
        },
        outro:"Need help, or have questions? Just reply to this email",
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}