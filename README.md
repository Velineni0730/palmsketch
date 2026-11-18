# PalmSketch APK download page

1. Build the APK from the PalmSketch project (see its README: `npx eas-cli build -p android --profile preview`).
2. Download the .apk, rename it to `palmsketch.apk`, and put it in the `apk` folder here.
3. Install Node.js if you do not have it, open a terminal in this folder and run:

       node server.js

4. The terminal prints two addresses:
   - On this computer: http://localhost:8080
   - On your tablet: http://<your-computer-ip>:8080  (tablet and computer on the same Wi-Fi)
5. Open the tablet address in the tablet's browser, tap Download APK, install it.

Note: `localhost` only works on the computer itself. The tablet needs the Wi-Fi address.
If the tablet cannot connect, allow Node.js through the computer's firewall, or use another port: `PORT=9000 node server.js`.
