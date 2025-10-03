# RentEngine Application Submission Commands

## 🚀 Submit Your Application

### **Option 1: cURL Command**
```bash
curl https://app.rentengine.io/api/public/v1/careers/apply \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Michael Kaminski",
    "email": "michael@michael-kaminski.io",
    "phoneNumber": "4045419010",
    "githubUrl": "https://github.com/MAKaminski",
    "linkedinUrl": "https://www.linkedin.com/in/makaminski",
    "portfolioUrl": "https://michael-kaminski.io",
    "resumeUrl": "https://docs.google.com/document/d/1Cp4sREvlL69ExgCFA1NBUAljyD_JeI7c/edit?usp=sharing&ouid=111688004260369651305&rtpof=true&sd=true",
    "cvUrl": "https://docs.google.com/document/d/1OqvshPDnGfQE-zPrrpYppN0tDk413Xwu8_GylwPynEU/edit?usp=sharing",
    "desiredSalary": "180000",
    "desiredStartDate": "2025-11-01",
    "coverLetter": "Dear Hiring Team at RentEngine,\n\nI am excited to apply for the Senior Software Engineer role. My background combines deep finance and SaaS leadership with full-stack coding expertise, making me uniquely positioned to deliver at the intersection of product and engineering. Over 15 years, I have built and scaled financial technology systems (GreenSky, Momnt, Superior Contracting) while also coding full-stack in modern frameworks like React, NextJS, Python, Node, and Postgres/Supabase.\n\nWhat draws me to RentEngine is the mission of transforming leasing teams workflows with a smart CRM and seamless automation. Having built systems that handle mission-critical financial data, I understand the importance of building A-grade products on A+ timelines, then iterating them to excellence. I thrive in ambiguous, high-intensity environments where ownership and accountability drive outcomes.\n\nI would welcome the opportunity to bring my engineering expertise, finance background, and customer-first mindset to RentEngine.\n\nBest regards,\nMichael Kaminski",
    "additionalInfo": "Full-stack engineer with SaaS, fintech, and services experience. Skilled in React, NextJS, Supabase, Python, and AWS. Passionate about product reliability and user experience."
  }'
```

### **Option 2: Python Script**
Create a file called `submit.py`:
```python
import requests

payload = {
    "name": "Michael Kaminski",
    "email": "michael@michael-kaminski.io",
    "phoneNumber": "4045419010",
    "githubUrl": "https://github.com/MAKaminski",
    "linkedinUrl": "https://www.linkedin.com/in/makaminski",
    "portfolioUrl": "https://michael-kaminski.io",
    "resumeUrl": "https://docs.google.com/document/d/1Cp4sREvlL69ExgCFA1NBUAljyD_JeI7c/edit?usp=sharing&ouid=111688004260369651305&rtpof=true&sd=true",
    "cvUrl": "https://docs.google.com/document/d/1OqvshPDnGfQE-zPrrpYppN0tDk413Xwu8_GylwPynEU/edit?usp=sharing",
    "desiredSalary": "180000",
    "desiredStartDate": "2025-11-01",
    "coverLetter": "Dear Hiring Team at RentEngine,\n\nI am excited to apply for the Senior Software Engineer role. My background combines deep finance and SaaS leadership with full-stack coding expertise, making me uniquely positioned to deliver at the intersection of product and engineering. Over 15 years, I have built and scaled financial technology systems (GreenSky, Momnt, Superior Contracting) while also coding full-stack in modern frameworks like React, NextJS, Python, Node, and Postgres/Supabase.\n\nWhat draws me to RentEngine is the mission of transforming leasing teams workflows with a smart CRM and seamless automation. Having built systems that handle mission-critical financial data, I understand the importance of building A-grade products on A+ timelines, then iterating them to excellence. I thrive in ambiguous, high-intensity environments where ownership and accountability drive outcomes.\n\nI would welcome the opportunity to bring my engineering expertise, finance background, and customer-first mindset to RentEngine.\n\nBest regards,\nMichael Kaminski",
    "additionalInfo": "Full-stack engineer with SaaS, fintech, and services experience. Skilled in React, NextJS, Supabase, Python, and AWS. Passionate about product reliability and user experience."
}

response = requests.post(
    "https://app.rentengine.io/api/public/v1/careers/apply",
    json=payload,
    timeout=10
)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.json()}")
```

Then run:
```bash
python submit.py
```

### **Option 3: Node.js Script**
Create a file called `submit.js`:
```javascript
const https = require('https');

const payload = JSON.stringify({
    "name": "Michael Kaminski",
    "email": "michael@michael-kaminski.io",
    "phoneNumber": "4045419010",
    "githubUrl": "https://github.com/MAKaminski",
    "linkedinUrl": "https://www.linkedin.com/in/makaminski",
    "portfolioUrl": "https://michael-kaminski.io",
    "resumeUrl": "https://docs.google.com/document/d/1Cp4sREvlL69ExgCFA1NBUAljyD_JeI7c/edit?usp=sharing&ouid=111688004260369651305&rtpof=true&sd=true",
    "cvUrl": "https://docs.google.com/document/d/1OqvshPDnGfQE-zPrrpYppN0tDk413Xwu8_GylwPynEU/edit?usp=sharing",
    "desiredSalary": "180000",
    "desiredStartDate": "2025-11-01",
    "coverLetter": "Dear Hiring Team at RentEngine,\n\nI am excited to apply for the Senior Software Engineer role. My background combines deep finance and SaaS leadership with full-stack coding expertise, making me uniquely positioned to deliver at the intersection of product and engineering. Over 15 years, I have built and scaled financial technology systems (GreenSky, Momnt, Superior Contracting) while also coding full-stack in modern frameworks like React, NextJS, Python, Node, and Postgres/Supabase.\n\nWhat draws me to RentEngine is the mission of transforming leasing teams workflows with a smart CRM and seamless automation. Having built systems that handle mission-critical financial data, I understand the importance of building A-grade products on A+ timelines, then iterating them to excellence. I thrive in ambiguous, high-intensity environments where ownership and accountability drive outcomes.\n\nI would welcome the opportunity to bring my engineering expertise, finance background, and customer-first mindset to RentEngine.\n\nBest regards,\nMichael Kaminski",
    "additionalInfo": "Full-stack engineer with SaaS, fintech, and services experience. Skilled in React, NextJS, Supabase, Python, and AWS. Passionate about product reliability and user experience."
});

const options = {
    hostname: 'app.rentengine.io',
    port: 443,
    path: '/api/public/v1/careers/apply',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(payload);
req.end();
```

Then run:
```bash
node submit.js
```

## 📝 What to Expect

**Success Response (200):**
```json
{
  "success": true,
  "message": "Job application submitted successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error details"]
}
```

## 🎯 Quick Copy-Paste

**Easiest option - just copy and paste the cURL command above into your terminal!**

