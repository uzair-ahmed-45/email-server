import axios from 'axios';

// Test the email API endpoint
async function testEmailAPI() {
  try {
    const testData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Message",
      message: "This is a test message from the portfolio contact form."
    };

    console.log('Sending test email...');
    const response = await axios.post('http://localhost:3000/send-email', testData);
    
    console.log('✅ Email sent successfully!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Error sending email:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testEmailAPI();
}
