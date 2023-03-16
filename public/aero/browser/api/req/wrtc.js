if ($aero.config.flags.wrtc) {
	RTCPeerConnection = new Proxy(RTCPeerConnection, {
		construct(target, args) {
			let [config] = args;

			// Backup
			const iceServersBak = config.iceServers;

			if (config.iceServers && $aero.config.wrtcBackends.ice.length > 0) {
				config.iceServers = customIceServers;
				args[0] = config;
			}

			const ret = new target(...args);

			ret._iceServers = iceServersBak;

			return ret;
		},
		get: (_target, prop) =>
			$aero.escape("iceServers").test(prop)
				? `_${prop}`
				: Reflect.get(...arguments),
		set: (_target, prop, value) => {
			$aero.escape("iceServers").test(prop)
				? (target[`_${prop}`] = value)
				: Reflect.set(...arguments);
		},
	});
}
