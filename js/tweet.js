var cb = new Codebird;
cb.setConsumerKey("jtlS31wC95Xli3CZMO4OidTH1", "iCy6evhz0lGnOjNMCTnkxN5y9Cuh86ndyGpkIAX23HPIFCEdr3");

cb.setToken("74636828-qW06kurl1F2AtM2x23izzSCWWNUggpWkzjA2aqeJP", "zsZR0CiT8PWkhOdSrXaVDRSVOWo4JuxOhjOmL2IkFz36o"); // see above

cb.__call(
    "statuses_homeTimeline",
    {},
    function (reply) {
        console.log(reply);
    }
);
