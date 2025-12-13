// Native fetch is available in Node 18+
// const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api/auth';
const ME_URL = 'http://localhost:3001/api/me';
const EMAIL = `test_${Date.now()}@example.com`;
const PASSWORD = 'password123';
const NAME = 'Test User';

async function verify() {
  try {
    // 1. Signup
    console.log('1. Signing up...');
    const signupRes = await fetch(`${BASE_URL}/sign-up/email`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD, name: NAME }),
    });

    if (!signupRes.ok) {
      const txt = await signupRes.text();
      console.error('Signup failed:', signupRes.status, txt);
      process.exit(1);
    }
    const signupData = await signupRes.json();
    console.log('Signup success:', signupData.user?.email);

    // Capture cookies
    const cookies = signupRes.headers.get('set-cookie');
    if (!cookies) {
      console.error('No cookies received after signup');
      process.exit(1);
    }
    console.log('Session cookie received');

    // 2. Check Session (api/me)
    console.log('2. Checking session...');
    const meRes = await fetch(ME_URL, {
      headers: { Cookie: cookies },
    });
    const meData = await meRes.json();
    
    if (meData.user?.email === EMAIL) {
      console.log('Session verification SUCCESS');
    } else {
      console.error('Session verification FAILED. User mismatch or null.', meData);
      process.exit(1);
    }

    // 3. Logout
    console.log('3. Logging out...');
    const logoutRes = await fetch(`${BASE_URL}/sign-out`, {
      method: 'POST',
      headers: { 
          'Cookie': cookies,
          'Origin': 'http://localhost:5173'
      },
    });
    
    if (!logoutRes.ok) {
       const txt = await logoutRes.text();
       console.error('Logout failed:', logoutRes.status, txt);
       process.exit(1);
    }
    
    // 4. Verify logged out
    console.log('4. Verifying logout...');
    const finalMeRes = await fetch(ME_URL, {
        headers: { Cookie: cookies } // Sending old cookie to ensure it's invalidated (backend should ignore/reject)
    });
    const finalMeData = await finalMeRes.json();
    if (finalMeData.user === null) {
        console.log('Logout verification SUCCESS');
        process.exit(0);
    } else {
        console.error('Logout verification FAILED. User still visible.', finalMeData);
        process.exit(1);
    }

  } catch (err) {
    console.error('Verification script error:', err);
    process.exit(1);
  }
}

verify();
