**StickerKita Web page**



Created stickerkita-web at C:\\Users\\harit\\stickerkita-web



**To run the dev web**



C:\\Users\\harit>cd stickerkita-web

C:\\Users\\harit\\stickerkita-web>npm run dev



**Invoice Generation**

Stage 1:

~~Customer fills form → WhatsApp message generated~~



Stage 2:

~~Customer fills form → saved to Supabase~~



Stage 3:

Saved order → invoice PDF generated



Stage 4:

Admin dashboard → view orders + download invoice



Stage 5:

Export monthly orders to Excel



~~1. Add FAQ section~~

~~2. Add Terms \& Process section~~

3\. Add pricing guide section

4\. Improve product cards with real images

5\. Improve order form

6\. Connect design code to order page

~~7. Then move to Supabase database~~

8\. Then invoice PDF generation

**Use the server-side service role method because:**



No customer login needed

Your order form remains simple

Database is safer from public direct inserts

You can validate orders in your API route

You can later add spam protection / captcha / admin dashboard

