import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  projectId: "pinterview-448e1",
  clientEmail: "firebase-adminsdk-fbsvc@pinterview-448e1.iam.gserviceaccount.com",
  privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAklpSsSFm9MW3
7r3NysD+OxKYUs7pn0FS1gk4401Ckft9Dj2/64lqKYtLVtXO7N2QnHZve+5LMZPM
CeXMGZXM5YEV6bbbIckSV3q2Of3Ipt3WhHZGchwMu03KIZ+2w3CQYjYIB2kcd1cg
urFThN/j4LFCpu+VbR0bpBTVX/Q+/GYYVy24zoAtEjm+sNOh8ILVxdkSVt+SPMhP
0awjhRiWkM3ON7mHrZVhn2UaMAQj1t5GKmhI6lhz11Xf/0d5W3VtJhaSXB/AjE3R
0Nds7FVLbcl6vmyHGGVe1kJQzZ6/vwv+kmKlcvF9gAYcuYojlvEQgrvBUsOskobU
5+Hp8kg/AgMBAAECggEAM7y+TpwvTLFzk3yteuY/3q3xS4Jn++VhEAfYN3P+NGXz
KsCSP4dhBmg999JPJEaIKouW2FH0Dji2LCn2ltTC5ec9PK1rhsk3c9mT6vR+phOK
41D4U+nhdlw2RJmvBtPQYMI6IQMYruCzRGRUMwuueVNLXIxsLvm/ScdWH5Olk+wU
ogEZ6AZkB+4hl0aw09RKS6DV0EFc0a9x2K0/cBlDQUTtEx5gQ0fbWmPCtdO5bDn5
IIybW+gZSSKYSd/o13zB1F0qWnivm8wZOJuVjhCbTFG1knl5cSX4W1oIvukYjoKv
6qhme//Y0gjxAFc2nrqiU0WznQjje3j5crxiBxXh0QKBgQD75PZvLpk8CUMFkr9c
mWPQve6aARQLHKKt223yKe5nxRor+axBbeo+yP7PiEx+8fx8m2tIkkTxgElqKVzJ
aR1/umnmeWahua8X47hfuM1Gv23ZWpRSaaTbM+kVjPdWq7ex8cIMH/A5rJFfFw+F
OrMLcLoo0uTzFSB9XH+AXfYFUQKBgQDDtd1GO6IzZKyHAM70XIxnMCQqyoZmaTmo
Hbv0z2+4aEEz4F+KXe+WKINufLEDuS3AcrV4nRJ5Dn9TDxTZC1r7l5NqqN4zASWs
j2WeKGOw/r5UxzwCIXkDgBlZ2h7ps83qXJnFIz4CE75cGOOhrhyQHOS3Ypcgu+c9
NmbmxxxQjwKBgGij9/+98uguzMnO6XH1QrLfg/Q0CHiJP8dLhYP5CVHQXovwHy/b
EllctAXQkD6YFhRJmCrAoKVWbqkMX8BHy3pZHU8iFZGPin45Gkmhgp0mPuLxLvaB
bnulN+m88q7tjNT+ImdZCTlcR9Ohx8/Hz8Mr5Bm7amLU3vdU6p6P6fjRAoGBAIi+
ZogvHIrqOb3ua6vDinqC4ZJghX3C4f08IVrRIY9okL5NdJP6RG/XiNXHG+utFHGV
9IP8w65/2ajQLdHlJEIMS31H1lEu6QLkAq16LQW7SIN13dDjUGmItK3aQKUr86Ff
6DUdBbNv1h8FaO9L9zseZRRZN50wjUZw3385+eezAoGBAO9fuC2RSOpRT74+nqsg
Pn9nzSNCZgRQwBS6UO/W/pz9yEDCCcoT1z2t5xBXLZoddzZKhKP+FYGwMrlfjmL4
waYGE6mRyaLSpmTENvxVIT8KC5+13X8gpumB0TR9LNuswcH8QybZBGvEbMKRq/QS
H9szoNx/GdETdAW0MNKO/CTX`
};

const initFirebaseAdmin = () => {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        // Pastikan replace literal \n dengan karakter newline
        privateKey: firebaseAdminConfig.privateKey.replace(/\\n/g, '\n'),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
};

export const { auth, db } = initFirebaseAdmin();
