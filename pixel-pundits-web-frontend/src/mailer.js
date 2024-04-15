import emailjs from '@emailjs/browser';



export async function sendOfferEmail(toEmail, toName, fromName, message) {

    emailjs.init({
        publicKey: "Hgv2WcbniiREKe--c"
    })


    const templateParams = {
        to_name: toName,
        from_name: fromName,
        to_email: toEmail,
        message: message
    }

    //sends the email
    await emailjs.send("contact_service", "template_az3ptgc", templateParams);

}

export async function sendConfirmationEmail(toEmail, toName, fromName, message) {

    emailjs.init({
        publicKey: "Hgv2WcbniiREKe--c"
    })

    const templateParams = {
        to_name: toName,
        from_name: fromName,
        to_email: toEmail,
        message: message
    }

    await emailjs.send("contact_service", "template_u4wp8xf", templateParams);
}