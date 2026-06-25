//Otp generat and verify during login to authenticate user details...

//Not configure yet in auth controller but the logic is written here if require and need we will configure and make some changes in that.

const nodemailer = require('nodemailer');

//check if email is configured

const isEmailConfigured=process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'our_16char_gmail_app_password'

// Read Gmail transporter (only if configured)

let transporter =null
if(isEmailConfigured) {
    transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
}



//OTP Email HTML template

function buildOTPHTML(name,otp){
    return `  <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;background:#07080F;padding:32px;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
    <div style="text-align:center;margin-bottom:24px">
      <div style="display:inline-block;background:linear-gradient(135deg,#F0B429,#FFD166);border-radius:10px;padding:10px 20px">
        <span style="font-size:1.4rem;font-weight:900;color:#07080F">Personal-Finance-Manager</span>
      </div>
    </div>
    <h2 style="color:#F1F5F9;font-size:1.4rem;margin-bottom:8px">Hello, ${name || 'there'}! </h2>
    <p style="color:#94A3B8;line-height:1.6">Your one-time password for Personal-Finance_manager is:</p>
    <div style="text-align:center;margin:24px 0">
      <span style="font-size:2.5rem;font-weight:800;letter-spacing:12px;color:#F0B429;background:rgba(240,180,41,0.1);padding:16px 24px;border-radius:12px;border:1px solid rgba(240,180,41,0.2);display:inline-block">${otp}</span>
    </div>
    <p style="color:#475569;font-size:0.85rem;text-align:center">This OTP is valid for <strong style="color:#94A3B8">10 minutes</strong>. Don't share it with anyone.</p>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0"/>
    <p style="color:#475569;font-size:0.78rem;text-align:center">PFM- your stress free finance manger and  profide comprehensive solution.<br/>India's most caring your personaal finance management platform.</p>
  </div>`
}

//Send funntion

const sendOTPEmail = async (to, name, otp) => {
  // ── DEV MODE: always log OTP to console ──
  console.log('\n' + '═'.repeat(50))
  console.log('📧  OTP EMAIL (DEV MODE)')
  console.log('═'.repeat(50))
  console.log(`  To   : ${to}`)
  console.log(`  Name : ${name}`)
  console.log(`  OTP  : \x1b[33m${otp}\x1b[0m  ← use this to verify`)
  console.log('═'.repeat(50) + '\n')

//If Gmail is configured, also send real email
  if (isEmailConfigured && transporter) {
    try {
      await transporter.sendMail({
        from: `"DRS Career" <${process.env.EMAIL_USER}>`,
        to,
        subject: `${otp} — Your DRS Career OTP`,
        html: buildOTPHtml(name, otp),
      })
      console.log(`Email sent to ${to}`)
    } catch (err) {
      console.warn(`Email send failed (using console OTP above): ${err.message}`)
      // Don't throw — the OTP is already logged above, flow continues
    }
  } else {
    console.log('  Email not configured — set EMAIL_PASS in .env to enable real emails')
    console.log('   Follow: https://myaccount.google.com/apppasswords\n')
  }
}
module.exports = { sendOTPEmail }
