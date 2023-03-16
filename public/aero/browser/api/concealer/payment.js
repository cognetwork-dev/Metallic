// Only supported on Chromium
if ("PaymentRequest" in window) {
	PaymentRequest = new Proxy(PaymentRequest, {
		construct(_target, _prop, args) {
			let [methods] = args;

			args[0] = methods.map(method => $aero.rewriteSrc(method));

			return Reflect.construct(...arguments);
		},
	});

	if ($aero.config.flags.legacy && "MerchantValidationEvent" in window)
		MerchantValidationEvent = new Proxy(PaymentRequestEvent, {
			get(_that, prop) {
				const ret = Reflect.get(...arguments);

				if (prop === "validationURL") return $aero.afterPrefix(ret);

				return Reflect.get(...arguments);
			},
		});

	// https://w3c.github.io/payment-handler/#dom-paymentrequestevent-toporigin
}
