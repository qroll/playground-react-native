package com.qwissroll.playground;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.security.ProviderInstaller;

public class RNProviderInstaller extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;

    private static String TAG = "RNProviderInstaller";
    private static String ERROR_NO_PLAY_SERVICES = "Play Services is not available";
    private static String ERROR_PLAY_SERVICES_NOT_INSTALLED = "Play Services is not installed, up-to-date, or enabled";
    private static String ERROR_UNEXPECTED = "Unexpected error in installing Provider";

    public RNProviderInstaller(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNProviderInstaller";
    }

    @ReactMethod
    public void updateSecurityProvider(Promise promise) {
        try {
            ProviderInstaller.installIfNeeded(mReactContext);

            WritableMap map = Arguments.createMap();
            map.putString("result", "ProviderInstaller updated");

            promise.resolve(map);
        } catch (GooglePlayServicesRepairableException e) {
            Log.e(TAG, "ProviderInstaller failed: " + ERROR_PLAY_SERVICES_NOT_INSTALLED, e);
            GoogleApiAvailability.getInstance().showErrorNotification(mReactContext, e.getConnectionStatusCode());
            promise.reject(ERROR_PLAY_SERVICES_NOT_INSTALLED, e);
        } catch (GooglePlayServicesNotAvailableException e) {
            Log.e(TAG, "ProviderInstaller failed: " + ERROR_NO_PLAY_SERVICES, e);
            promise.reject(ERROR_NO_PLAY_SERVICES, e);
        } catch (Exception e) {
            Log.e(TAG, ERROR_UNEXPECTED, e);
            promise.reject(ERROR_UNEXPECTED, e);
        }
    }

}