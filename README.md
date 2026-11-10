## Bun Native Messaging host

### Compile to native executable 

```shell
BUN_OPTIONS="--useJIT=false" bun compile --minify --compile --aot --no-compile-function-source \
--aot-log-type-mismatches --trim --explain=missed-optimizations --explain=allocations \
--compile-jit-policy=10000 --no-compile-autoload-dotenv --no-compile-autoload-bunfig \
--bytecode --outfile=./nm_bun nm_bun.ts
```

# Installation and usage on Chrome and Chromium

1. Navigate to `chrome://extensions`.
2. Toggle `Developer mode`.
3. Click `Load unpacked`.
4. Select `native-messaging-bun` folder.
5. Note the generated extension ID.
6. Open `nm_bun.json` in a text editor, set `"path"` to absolute path of `nm_bun.js` or `nm_bun.ts` or `nm_bun` and `chrome-extension://<ID>/` using ID from 5 in `"allowed_origins"` array. 
7. Copy the file to Chrome or Chromium configuration folder, e.g., Chromium on \*nix `~/.config/chromium/NativeMessagingHosts`; Chrome dev channel on \*nix `~/.config/google-chrome-unstable/NativeMessagingHosts`.
8. Make sure `bun` executable and `nm_bun.js`, `nm_bun.ts` are executable.
9. To test click `service worker` link in panel of unpacked extension which is DevTools for `background.js` in MV3 `ServiceWorker`, observe echo'ed message from Bun Native Messaging host. To disconnect run `port.disconnect()`.

The Native Messaging host echoes back the message passed. 

For differences between OS and browser implementations see [Chrome incompatibilities](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities#native_messaging).

# License
Do What the Fuck You Want to Public License [WTFPLv2](http://www.wtfpl.net/about/)
