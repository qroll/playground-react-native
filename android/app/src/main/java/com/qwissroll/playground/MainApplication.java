package com.qwissroll.playground;

import android.app.Application;
import android.util.Log;

import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.security.ProviderInstaller;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;

import com.facebook.react.ReactApplication;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSecureKeyStorePackage(),
            new RNGestureHandlerPackage(),
            new RNProviderInstallerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
//    try {
//      Log.i("MainApplication", "Installing GMS provider");
//      ProviderInstaller.installIfNeeded(this);
//    } catch (GooglePlayServicesRepairableException e) {
//      Log.e("MainApplication", "ProviderInstaller failed: Play Services is not installed, up-to-date, or enabled", e);
//      GoogleApiAvailability.getInstance().showErrorNotification(this, e.getConnectionStatusCode());
//    }
//    catch (GooglePlayServicesNotAvailableException e) {
//      Log.e("MainApplication", "ProviderInstaller failed: Play Services is not available", e);
//    } catch (Exception e) {
//      Log.e("MainApplication", "Unexpected error in installing Provider", e);
//    }
    SoLoader.init(this, /* native exopackage */ false);
  }
}
