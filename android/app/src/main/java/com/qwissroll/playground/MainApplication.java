package com.qwissroll.playground;

import android.app.Application;
import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Context;
import android.os.Environment;
import android.util.Log;

import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.security.ProviderInstaller;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;

import com.facebook.react.ReactApplication;
import com.artirigo.fileprovider.RNFileProviderPackage;
import cc.rocwang.aescrypto.AesCryptoPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.chirag.RNMail.RNMail;
import com.RNFetchBlob.RNFetchBlobPackage;
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
            new RNFileProviderPackage(),
            new AesCryptoPackage(),
            new RNFirebasePackage(),
            new RNMail(),
            new RNFetchBlobPackage(),
            new RNSecureKeyStorePackage(),
            new RNGestureHandlerPackage(),
            new RNProviderInstallerPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
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

   JobScheduler jobScheduler =
           (JobScheduler) getSystemService(Context.JOB_SCHEDULER_SERVICE);
   jobScheduler.schedule(new JobInfo.Builder(591314444,
           new ComponentName(this, PlaygroundService.class))
           .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
           .setMinimumLatency(1000 * 60 * 1)
           .build());

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
