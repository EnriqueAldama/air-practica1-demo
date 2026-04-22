(function () {
    const PAGE = {
        login: "index.html",
        terms: "mockup_terminos.html",
        routes: "mockup_rutas.html",
        volunteer: "mockup_voluntario.html",
        report: "mockup_reporte.html",
        tracking: "mockup_seguimiento.html",
        emergency: "mockup_emergencia.html",
        security: "mockup_seguridad.html",
        profile: "mockup_perfil.html",
        trustedContact: "mockup_contacto_confianza.html"
    };

    const BACK_TARGET = {
        "mockup_rutas.html": PAGE.routes,
        "mockup_voluntario.html": PAGE.routes,
        "mockup_reporte.html": PAGE.routes,
        "mockup_seguimiento.html": PAGE.routes,
        "mockup_emergencia.html": PAGE.tracking,
        "mockup_seguridad.html": PAGE.routes,
        "mockup_perfil.html": PAGE.routes,
        "mockup_contacto_confianza.html": PAGE.profile,
        "mockup_terminos.html": PAGE.login
    };

    function currentPage() {
        const path = window.location.pathname || "";
        return decodeURIComponent(path.split("/").pop() || PAGE.login);
    }

    function navigate(page) {
        if (!page) {
            return;
        }
        window.location.href = page;
    }

    function injectSharedStyles() {
        if (document.getElementById("demo-flow-style")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "demo-flow-style";
        style.textContent = [
            ".demo-toast-wrap {",
            "  position: fixed;",
            "  left: 50%;",
            "  bottom: 22px;",
            "  transform: translateX(-50%);",
            "  z-index: 9999;",
            "  width: min(92vw, 380px);",
            "  display: flex;",
            "  flex-direction: column;",
            "  gap: 8px;",
            "  pointer-events: none;",
            "}",
            ".demo-toast {",
            "  background: rgba(17, 24, 39, 0.93);",
            "  color: #fff;",
            "  border-radius: 10px;",
            "  padding: 10px 12px;",
            "  font: 600 13px/1.35 'Inter', sans-serif;",
            "  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);",
            "  opacity: 0;",
            "  transform: translateY(8px);",
            "  transition: opacity 0.25s ease, transform 0.25s ease;",
            "}",
            ".demo-toast.show {",
            "  opacity: 1;",
            "  transform: translateY(0);",
            "}",
            ".demo-toast.ok { border-left: 4px solid #10b981; }",
            ".demo-toast.warn { border-left: 4px solid #cb0017; }",
            ".clickable { cursor: pointer; }",
            ".no-pulse .toggle-dot { animation: none !important; }",
            ".toggle-switch.is-off { background: #d1d5db !important; }",
            ".toggle-switch.is-off::after { left: 3px; right: auto; }",
            ".demo-focus:focus-visible,",
            "button:focus-visible,",
            "input:focus-visible,",
            "textarea:focus-visible,",
            "[role='button']:focus-visible {",
            "  outline: 2px solid #cb0017;",
            "  outline-offset: 2px;",
            "}",
            "@media (prefers-reduced-motion: reduce) {",
            "  .toggle-dot { animation: none !important; }",
            "  .timer-circle { animation: none !important; }",
            "  .phone-frame { animation: none !important; }",
            "}"
        ].join("\n");

        document.head.appendChild(style);
    }

    function toast(message, tone) {
        let wrap = document.querySelector(".demo-toast-wrap");
        if (!wrap) {
            wrap = document.createElement("div");
            wrap.className = "demo-toast-wrap";
            document.body.appendChild(wrap);
        }

        const node = document.createElement("div");
        node.className = "demo-toast " + (tone || "ok");
        node.textContent = message;
        wrap.appendChild(node);

        requestAnimationFrame(function () {
            node.classList.add("show");
        });

        window.setTimeout(function () {
            node.classList.remove("show");
            window.setTimeout(function () {
                node.remove();
            }, 260);
        }, 2000);
    }

    function bindBottomNav(pageName) {
        const navItems = document.querySelectorAll(".bottom-nav .nav-item");
        if (!navItems.length) {
            return;
        }

        const mapByLabel = {
            "mapa": PAGE.routes,
            "voy contigo": PAGE.volunteer,
            "reportar": PAGE.report,
            "perfil": PAGE.profile
        };

        navItems.forEach(function (item) {
            const labelNode = item.querySelector("span");
            const label = labelNode ? labelNode.textContent.trim().toLowerCase() : "";
            const target = mapByLabel[label];
            if (!target) {
                return;
            }

            item.classList.add("clickable");
            item.addEventListener("click", function () {
                navigate(target);
            });

            const isActive = (pageName === target) || (pageName === PAGE.tracking && target === PAGE.routes);
            if (isActive) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    function bindBack(pageName) {
        document.querySelectorAll(".header-back").forEach(function (btn) {
            btn.classList.add("clickable");
            btn.addEventListener("click", function () {
                const explicit = btn.getAttribute("data-back");
                const target = explicit || BACK_TARGET[pageName] || PAGE.routes;
                navigate(target);
            });
        });
    }

    function bindLanguageSwitcher() {
        document.querySelectorAll(".lang-selector").forEach(function (node) {
            node.classList.add("clickable");
            node.addEventListener("click", function () {
                if (node.tagName === "SPAN" && node.textContent.trim() === "ES") {
                    node.textContent = "EN";
                    toast("Idioma de demo cambiado a EN", "ok");
                    return;
                }
                if (node.tagName === "SPAN" && node.textContent.trim() === "EN") {
                    node.textContent = "ES";
                    toast("Idioma de demo cambiado a ES", "ok");
                    return;
                }

                const active = node.querySelector(".active");
                if (active) {
                    active.classList.remove("active");
                    const sibling = active.nextElementSibling || node.firstElementChild;
                    if (sibling) {
                        sibling.classList.add("active");
                        toast("Idioma de demo actualizado", "ok");
                    }
                }
            });
        });
    }

    function bindToggles() {
        document.querySelectorAll(".toggle-switch").forEach(function (toggle) {
            toggle.classList.add("clickable");
            toggle.addEventListener("click", function () {
                toggle.classList.toggle("is-off");
            });
        });
    }

    function bindSosButtons() {
        document.querySelectorAll(".sos-button").forEach(function (btn) {
            btn.classList.add("clickable");
            btn.addEventListener("click", function () {
                localStorage.setItem("sendaLastScreen", currentPage());
                navigate(PAGE.emergency);
            });
        });
    }

    function bindGenericDataNavigation() {
        document.querySelectorAll("[data-demo-nav]").forEach(function (node) {
            const target = node.getAttribute("data-demo-nav");
            node.classList.add("clickable");
            node.addEventListener("click", function (event) {
                if (node.tagName === "A") {
                    event.preventDefault();
                }
                navigate(target);
            });
        });
    }

    function bindRoutesPage() {
        const startBtn = document.querySelector(".route-actions .btn-start");
        if (!startBtn) {
            return;
        }

        startBtn.addEventListener("click", function () {
            const voyContigoEnabled = !document.querySelector(".voy-contigo-toggle .toggle-switch")?.classList.contains("is-off");
            const hasTrusted = localStorage.getItem("sendaContactConfigured") === "true";

            if (voyContigoEnabled && !hasTrusted) {
                toast("Configura tu contacto de confianza para usar Voy Contigo.", "warn");
                window.setTimeout(function () {
                    navigate(PAGE.trustedContact);
                }, 450);
                return;
            }

            navigate(PAGE.tracking);
        });
    }

    function bindVolunteerPage() {
        document.querySelectorAll(".request-accept").forEach(function (btn) {
            btn.addEventListener("click", function () {
                const card = btn.closest(".request-card");
                const name = card?.querySelector(".request-name")?.textContent?.trim() || "la solicitud";
                toast("Has aceptado a " + name + ". Iniciando seguimiento.", "ok");
                window.setTimeout(function () {
                    navigate(PAGE.tracking);
                }, 500);
            });
        });

        document.querySelectorAll(".request-meeting").forEach(function (btn) {
            btn.addEventListener("click", function () {
                toast("Punto de encuentro sugerido en el mapa.", "ok");
            });
        });
    }

    function bindReportPage() {
        const categories = document.querySelectorAll(".category-item");
        categories.forEach(function (item) {
            item.classList.add("clickable");
            item.addEventListener("click", function () {
                categories.forEach(function (it) {
                    it.classList.remove("selected");
                });
                item.classList.add("selected");
            });
        });

        const sendBtn = document.querySelector(".btn-start");
        if (!sendBtn) {
            return;
        }

        sendBtn.addEventListener("click", function () {
            toast("Reporte enviado correctamente. Gracias por avisar.", "ok");
            window.setTimeout(function () {
                navigate(PAGE.routes);
            }, 700);
        });
    }

    function bindEmergencyPage() {
        const okBtn = document.querySelector(".btn-safe");
        if (okBtn) {
            okBtn.addEventListener("click", function () {
                toast("Confirmación recibida. Retomando seguimiento.", "ok");
                window.setTimeout(function () {
                    navigate(PAGE.tracking);
                }, 500);
            });
        }

        const escalateBtn = document.querySelector(".btn-cancel");
        if (escalateBtn) {
            escalateBtn.addEventListener("click", function () {
                toast("Alerta SOS enviada a seguridad del campus.", "warn");
                window.setTimeout(function () {
                    navigate(PAGE.security);
                }, 600);
            });
        }

        if (okBtn || escalateBtn) {
            var countDownDate = new Date().getTime() + 30 * 1000; // 30 seconds from now
            var x = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = seconds;

                // If the count down is finished, Navigate to SOS alert page
                if (distance < 0) {
                    toast("Alerta SOS enviada a seguridad del campus.", "warn");
                    window.setTimeout(function () {
                        navigate("mockup_seguridad.html");
                    }, 600);
                    clearInterval(x);
                }
            }, 500);
        }
    }

    function bindSecurityPage() {
        const goBtn = document.querySelector(".btn-primary");
        if (goBtn) {
            goBtn.addEventListener("click", function () {
                toast("Unidad asignada y en camino.", "ok");
                window.setTimeout(function () {
                    navigate(PAGE.routes);
                }, 700);
            });
        }

        const forwardBtn = document.querySelector(".btn-secondary");
        if (forwardBtn) {
            forwardBtn.addEventListener("click", function () {
                toast("Escalado externo registrado (demo).", "ok");
            });
        }
    }

    function bindTrackingPage() {
        const finishBtn = document.getElementById("finishRouteBtn");
        if (finishBtn) {
            finishBtn.addEventListener("click", function () {
                toast("Trayecto finalizado con exito.", "ok");
                window.setTimeout(function () {
                    navigate(PAGE.routes);
                }, 600);
            });
        }

        const rerouteBtn = document.getElementById("changeRouteBtn");
        if (rerouteBtn) {
            rerouteBtn.addEventListener("click", function () {
                navigate(PAGE.routes);
            });
        }

        const prealertBtn = document.getElementById("openPrealertBtn");
        if (prealertBtn) {
            prealertBtn.addEventListener("click", function () {
                navigate(PAGE.emergency);
            });
        }
    }

    function bindTermsPage() {
        const accept = document.getElementById("acceptTermsBtn");
        const reject = document.getElementById("rejectTermsBtn");
        const check = document.getElementById("termsCheck");

        if (accept) {
            accept.addEventListener("click", function () {
                if (!check || !check.checked) {
                    toast("Debes aceptar los terminos para continuar.", "warn");
                    return;
                }
                localStorage.setItem("sendaTermsAccepted", "true");
                toast("Terminos aceptados. Bienvenido a SENDA.", "ok");
                window.setTimeout(function () {
                    navigate(PAGE.routes);
                }, 500);
            });
        }

        if (reject) {
            reject.addEventListener("click", function () {
                localStorage.removeItem("sendaTermsAccepted");
                navigate(PAGE.login);
            });
        }
    }

    function bindProfilePage() {
        const saveBtn = document.getElementById("saveProfileBtn");
        const contactBtn = document.getElementById("manageContactBtn");
        const contactPhone = document.getElementById("trustedPhone");

        if (saveBtn) {
            saveBtn.addEventListener("click", function () {
                const hasPhone = !!(contactPhone && contactPhone.value.trim());
                localStorage.setItem("sendaContactConfigured", hasPhone ? "true" : "false");
                toast("Perfil actualizado para la demo.", "ok");
            });
        }

        if (contactBtn) {
            contactBtn.addEventListener("click", function () {
                navigate(PAGE.trustedContact);
            });
        }
    }

    function bindTrustedContactPage() {
        const saveBtn = document.getElementById("saveTrustedBtn");
        const nameInput = document.getElementById("contactName");
        const phoneInput = document.getElementById("contactPhone");

        if (!saveBtn) {
            return;
        }

        saveBtn.addEventListener("click", function () {
            const hasName = !!nameInput?.value.trim();
            const hasPhone = !!phoneInput?.value.trim();

            if (!hasName || !hasPhone) {
                toast("Completa nombre y telefono del contacto.", "warn");
                return;
            }

            localStorage.setItem("sendaContactName", nameInput.value.trim());
            localStorage.setItem("sendaContactPhone", phoneInput.value.trim());
            localStorage.setItem("sendaContactConfigured", "true");
            toast("Contacto de confianza guardado.", "ok");
            window.setTimeout(function () {
                navigate(PAGE.profile);
            }, 550);
        });
    }

    function hydrateTrustedContactFields(pageName) {
        const savedName = localStorage.getItem("sendaContactName") || "";
        const savedPhone = localStorage.getItem("sendaContactPhone") || "";

        if (pageName === PAGE.profile) {
            const profilePhone = document.getElementById("trustedPhone");
            if (profilePhone && !profilePhone.value) {
                profilePhone.value = savedPhone;
            }
        }

        if (pageName === PAGE.trustedContact) {
            const nameInput = document.getElementById("contactName");
            const phoneInput = document.getElementById("contactPhone");
            if (nameInput && !nameInput.value) {
                nameInput.value = savedName;
            }
            if (phoneInput && !phoneInput.value) {
                phoneInput.value = savedPhone;
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const pageName = currentPage();

        injectSharedStyles();
        bindBottomNav(pageName);
        bindBack(pageName);
        bindLanguageSwitcher();
        bindToggles();
        bindSosButtons();
        bindGenericDataNavigation();

        hydrateTrustedContactFields(pageName);

        if (pageName === PAGE.routes) {
            bindRoutesPage();
        }
        if (pageName === PAGE.volunteer) {
            bindVolunteerPage();
        }
        if (pageName === PAGE.report) {
            bindReportPage();
        }
        if (pageName === PAGE.emergency) {
            bindEmergencyPage();
        }
        if (pageName === PAGE.security) {
            bindSecurityPage();
        }
        if (pageName === PAGE.tracking) {
            bindTrackingPage();
        }
        if (pageName === PAGE.terms) {
            bindTermsPage();
        }
        if (pageName === PAGE.profile) {
            bindProfilePage();
        }
        if (pageName === PAGE.trustedContact) {
            bindTrustedContactPage();
        }
    });
})();
