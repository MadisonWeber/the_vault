import emailjs from 'emailjs-com';



const sendEmail = async (order) => {

    try{

        const itemNames = order.cart.map(item => `${item.quantity} ${item.brand} ${item.name}`)
        const emailMessage = `Your purchased items are : \n ${itemNames.join(' ,')}`
        const emailObj = {to_name : order.user.name, reply_to : 'no.reply@gmail.com', send_to : order.user.email, orderTotal : order.total, message : emailMessage }

        const result = await emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, emailObj, process.env.EMAIL_USERID )
        console.log('email result is', result)
    }catch(error){
        console.log(error.text)
    };

}

export default sendEmail