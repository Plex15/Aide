package com.aide

import com.facebook.react.ReactActivity
import android.os.Bundle


class FullScreenNotifee : ReactActivity() { 
    

    override fun getMainComponentName(): String? {
        // This MUST match the name registered in your index.js (e.g., AppRegistry.registerComponent('FullScreenInterface', ...))
        return "FullScreenInterface" 
    }
    
}