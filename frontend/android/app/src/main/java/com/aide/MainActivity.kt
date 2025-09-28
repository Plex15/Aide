package com.aide

// ADD THESE IMPORT STATEMENTS AT THE TOP
import android.os.Bundle
import android.content.ComponentName
import android.content.pm.PackageManager
import com.baekgol.reactnativealarmmanager.util.BootReceiver // Import BootReceiver from the library

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Aide"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // THIS IS THE CORRECTED KOTLIN CODE BLOCK
  override fun onCreate(savedInstanceState: Bundle?) {
    // It's important to call super.onCreate first, but in some RN versions, it must come AFTER the delegate is created.
    // The default template calls it in the delegate, so we call super.onCreate(null) to avoid state restoration issues.
    super.onCreate(null) 

    val receiver = ComponentName(this, BootReceiver::class.java)
    val packageManager: PackageManager = this.packageManager

    packageManager.setComponentEnabledSetting(
      receiver,
      PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
      PackageManager.DONT_KILL_APP
    )
  }
}