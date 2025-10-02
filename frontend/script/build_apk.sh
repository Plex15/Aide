#!/bin/bash

#frontent="/app"


echo "--- Building APK inside container (might be slow due to native change) ---"

cd /app/android
./gradlew assembleDebug

# Check for successful build
if [ $? -ne 0 ]; then
    echo "ERROR: Gradlew build failed."
    exit 1
fi

echo "Build successful. APK path: android/app/build/outputs/apk/debug/app-debug.apk"

echo "--- Installing APK on Host via adb ---"


adb install -r /app/android/app/build/outputs/apk/debug/app-debug.apk

# **ADVANCED (Requires a separate host-side runner or SSH):**
# If you are using a tool like VS Code remote or have SSH setup, you can automate this.
# Example: ssh user@host "adb install -r /path/to/project/android/app/build/outputs/apk/debug/app-debug.apk"

# --- 3. (Optional) Run the app on the host ---
# Once installed, you can try to start the app from the container, but often easier 
# to just click the app icon on the emulator.
# Example: adb shell am start -n com.yourpackagename/com.yourpackagename.MainActivity