import emailjs from 'emailjs-com';



const emailSelf = async (emailObj) => {
    try{
        const result = await emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_SELF_TEMPLATE_ID, emailObj, process.env.EMAIL_USERID )
    }catch(error){
        console.log(error.text)
        console.log('error from email is', error)
    };

}

export default emailSelf