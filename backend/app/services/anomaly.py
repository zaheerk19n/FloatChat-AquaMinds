import numpy as np
from scipy import stats

def detect_anomalies(values, z_thresh=3.0):
    arr = np.array(values, dtype=float)
    if len(arr) < 3:
        return []
    zscores = np.abs(stats.zscore(arr, nan_policy='omit'))
    return np.where(zscores > z_thresh)[0].tolist()
