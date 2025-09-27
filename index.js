import express from "express";
import { Resend } from 'resend';
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Format the email message
        const formattedMessage = `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Use a verified domain
            to: "uzairahmed45994@gmail.com",
            subject: `Portfolio Contact: ${subject}`,
            html: formattedMessage,
            replyTo: email
        });

        if (error) {
            console.error("Resend error:", error);
            return res.status(500).json({ error: "Failed to send email" });
        }

        return res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
