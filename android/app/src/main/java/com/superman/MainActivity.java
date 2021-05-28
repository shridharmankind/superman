package com.superman;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Superman";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, true); // <- second parameter is true, to hide StatusBar
    super.onCreate(savedInstanceState);
    hideNavigationBar();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
        hideNavigationBar();
    }
  }

  private void hideNavigationBar() {
    getWindow().getDecorView().setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
  }
}
