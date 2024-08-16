import nodemailer from 'nodemailer';

export default async function handler({req, res}:any) {
  if (req.method === 'POST') {
    const {
      name,
      email,
      phone,
      description,
      propertyType,
      transactionType,
      price,
      area,
      location,
      numberOfRooms,
    } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', // Replace with your SMTP server
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com', // Your email address
        pass: 'your-email-password', // Your email password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'recipient@example.com', // List of recipients
      subject: 'New Property Offer Submission',
      text: `
        New property offer submitted:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Location: ${location}
        Property Type: ${propertyType}
        Transaction Type: ${transactionType}
        Price: ${price} zł
        Area: ${area} m²
        Number of Rooms: ${numberOfRooms}
        Description: ${description}
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Oferta została wyslana pomyślnie!' });
    } catch (error) {
      console.error('Błąd podczas wysyłania e-maila:', error);
      res.status(500).json({ message: 'Błąd podczas wysyłania e-maila!' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}``