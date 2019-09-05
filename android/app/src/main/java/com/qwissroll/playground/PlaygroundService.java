package com.qwissroll.playground;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;

public class PlaygroundService extends JobService {

    @Override
    public boolean onStartJob(final JobParameters params) {
        Log.i("PlaygroundService", ">>>> Job running");
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String id = FirebaseInstanceId.getInstance().getId();
                    Log.i("PlaygroundService", ">>>> id " + id);
                    FirebaseInstanceId.getInstance().deleteInstanceId();
                    Log.i("PlaygroundService", ">>>> Job done");
                } catch (Exception e) {
                    Log.e("PlaygroundService", ">>>> Error in job", e);
                }
                jobFinished(params, false);
            }
        }).start();
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters params) {
        return false;
    }

}
