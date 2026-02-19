# Master Facebook Integration Guide 🚀

This is the ultimate, simplified guide for your CRM. Follow these steps exactly, one by one.

### Phase 1: Preparation (Already Done ✅)
1.  **Facebook Page**: You have "Sswebtech1".
2.  **Lead Form**: You have a form ID `1598845307985118`.
3.  **App**: You have a Facebook App created.

### Phase 2: The "Key" (Access Token)
*Tokens expire quickly. If the CRM says "Login Failed," you need a new one.*

1.  Go to the **[Graph API Explorer](https://developers.facebook.com/tools/explorer/)**.
2.  Select your **App** (top right).
3.  Click **"Get Token"** -> **"Get Page Access Token"**.
4.  A popup will appear. Select your page (**Sswebtech1**) and click Done.
5.  **Important**: Copy the long code that looks like `EAAi...`.
6.  Go to your CRM settings or send the code to me to update your server.

### Phase 3: The "Pipe" (Webhook)
*This tells Facebook where to send leads instantly.*

1.  **URL**: `https://ss-crm-test-123.loca.lt/api/webhooks/facebook`
2.  **Password**: If it asks for a "Tunnel Password," use `157.50.74.113`.
3.  **Setup**: Go to your Facebook App -> **Webhooks** -> **Page**.
    *   Set **Callback URL** to the link above.
    *   Set **Verify Token** to `my_verification_token`.
    *   Click **Verify and Save**.
4.  **Subscribe**: Find `leadgen` and subscribe your page to it.

### Phase 4: Using the CRM (Your Daily Work)
1.  Log into your CRM: `http://localhost:5173`.
2.  Go to the **Leads** page.
3.  Click the blue **"Sync Facebook"** button.
4.  **Boom!** Your leads appear in the list.

---

### 💡 Pro Tip:
If the "Sync" fails, it almost always means your **Access Token** (The Key) has expired. Just repeat **Phase 2** to get a fresh one!
