import emailjs from 'emailjs-com';



const sendEmail = async (order, email, name) => {
    try{
        
        const itemNames = order.cart.map(item => ` ${item.brand} ${item.name} X ${item.quantity}`)
        const emailMessage = `Your purchased items are : \n ${itemNames.join(' ,')}`
        const emailObj = {to_name : name , reply_to : 'no.reply@gmail.com', send_to : email, orderTotal : order.total, message : emailMessage, order_id : order._id }
        const result = await emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, emailObj, process.env.EMAIL_USERID )
        
    }catch(error){
        console.log(error.text)
        console.log('error from email is', error)
    };

}

export default sendEmail