package com.aide

// ADD THESE IMPORT STATEMENTS AT THE TOP
import android.os.Bundle
import android.content.ComponentName
import android.content.pm.PackageManager

import android.content.Intent 
//import android.os.Bundle 

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {


  override fun getMainComponentName(): String = "Aide"

  override fun onCreate(savedInstanceState: android.os.Bundle?) {
    
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
    //super.onCreate(savedInstanceState) 
    super.onCreate(null) // for navigation extention
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}