/* Partytown 0.0.24 - MIT builder.io */
!function(win, doc, nav, libPath, sandbox, scripts, timeout) {
    function loadSandbox(msgType) {
        if (!sandbox) {
            (sandbox = doc.createElement("iframe")).dataset.partytown = "sandbox";
            sandbox.setAttribute("style", "display:block;width:0;height:0;border:0;visibility:hidden");
            sandbox.setAttribute("aria-hidden", "true");
            sandbox.src = libPath + "partytown-sandbox-" + msgType + ".html?" + Date.now();
            doc.body.appendChild(sandbox);
        }
    }
    function fallback(i, script) {
        console.warn("Partytown script fallback");
        clearTimeout(timeout);
        sandbox = 1;
        for (i = 0; i < scripts.length; i++) {
            (script = doc.createElement("script")).innerHTML = scripts[i].innerHTML;
            doc.body.appendChild(script);
        }
    }
    function ready() {
        libPath = (win.partytown || {}).lib || "/~partytown/";
        libPath += "debug/";
        scripts = doc.querySelectorAll('script[type="text/partytown"]');
        if (top !== win) {
            top.dispatchEvent(new CustomEvent("pt1", {
                detail: win
            }));
        } else if (scripts.length) {
            timeout = setTimeout(fallback, 6e4);
            doc.addEventListener("pt0", (function() {
                clearTimeout(timeout);
            }));
            let useAtomics = win.crossOriginIsolated;
            useAtomics && (useAtomics = !window.location.search.includes("forceServiceWorker"));
            if (useAtomics) {
                loadSandbox("atomics");
            } else if ("serviceWorker" in nav) {
                const isolatedQuery = win.crossOriginIsolated ? "?isolated" : "";
                nav.serviceWorker.register(libPath + "partytown-sw.js" + isolatedQuery, {
                    scope: libPath
                }).then((function(swRegistration) {
                    swRegistration.active ? loadSandbox("sw") : swRegistration.installing ? swRegistration.installing.addEventListener("statechange", (function(ev) {
                        "activated" === ev.target.state && loadSandbox("sw");
                    })) : console.warn(swRegistration);
                }), (function(e) {
                    console.error(e);
                }));
            } else {
                fallback();
            }
        }
    }
    "complete" === doc.readyState ? ready() : window.addEventListener("load", ready);
}(window, document, navigator);
