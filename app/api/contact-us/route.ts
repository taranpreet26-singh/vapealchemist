import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_HOST,
        pass:process.env.APP_PASSWORD
    }
})
export async function POST(req: NextRequest) {
    try {
        const {formData:{firstName,lastName,phone,email,subject,houseAddress,content},totalAmount,localStorageString} = await req.json()
        if (!firstName || !lastName || !subject || !email || !houseAddress || !content || !localStorageString || !phone) {
            return NextResponse.json({
                msg:"Please ensure all form fields are filled out."
            })
        }
        const cartItems = JSON.parse(localStorageString || "[]");
        if(cartItems.length === 0){
            return NextResponse.json({
                msg:"No data in cart"
            })
        }
         const emailHTML = `
      <div style="font-family: Arial, sans-serif; background: #111; color: #fff; padding: 20px; border-radius: 8px;">
        <h2 style="color: white; text-align: center;">New Order Summary</h2>
        
        <h3 style="margin-top: 20px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td><strong>First Name:</strong></td><td>${firstName}</td></tr>
          <tr><td><strong>Last Name:</strong></td><td>${lastName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
          <tr><td><strong>Address:</strong></td><td>${houseAddress}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${content}</td></tr>
        </table>

        <h3>Cart Items</h3>
        ${cartItems
          .map(
            (item: any) => `
          <div style="border: 1px solid #333; border-radius: 6px; padding: 10px; margin-bottom: 10px; background: #1a1a1a;">
            <div style="display: flex; align-items: center;">
              <img src="${item.img}" alt="${item.name}" width="50" height="50" style="border-radius: 4px; margin-right: 10px;" />
              <div>
                <p style="margin: 0; font-weight: bold;">${item.name}</p>
                <p style="margin: 0; font-size: 12px; color: #bbb;">$${item.price}</p>
              </div>
            </div>
            <div style="margin-top: 10px; font-size: 12px; color: #ccc;">
              <p>Discount: ${item.discount}%</p>
              <p>After Discount: $${(
                item.price -
                item.price * (item.discount / 100)
              ).toFixed(2)}</p>
              <p>Quantity: ${item.count}</p>
              <p><strong>Total: $${(
                item.count *
                (item.price - item.price * (item.discount / 100))
              ).toFixed(2)}</strong></p>
            </div>
          </div>
        `
          )
          .join("")}

        <h3 style="margin-top: 20px;">Total Order Amount</h3>
        <p style="font-size: 18px; font-weight: bold; color: #ffcc00;">$${totalAmount.toFixed(
          2
        )}</p>
      </div>
    `;

    const info = await transporter.sendMail({
        from:process.env.EMAIL_HOST,
        to:process.env.EMAIL_HOST,
        subject:`${new Date().toLocaleString()}-${subject}`,
        html:emailHTML
    })        
    if(info.messageId){
        return NextResponse.json({
            msg:"Email Sent",
            status:200
        })
    }else{
        return NextResponse.json({
            msg:"Some Error Comes & Email Not Sent",
            status:402
        })
    }
    } catch (error) {
    }
}