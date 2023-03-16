// Only supported on chromium
// https://w3c.github.io/reporting/#dom-reportingobserver-reportingobserver
if ("ReportingObserver" in window) {
	async function rewriteReports(reports) {
		for (let report of reports) {
			// https://w3c.github.io/reporting/#serialize-reports
			const json = report.toJSON();
			report.toJSON = () => ({
				...json,
				url: $aero.afterPrefix(json.url),
			});

			if (report instanceof CSPViolationReportBody) {
				// Urls
				CSPViolationReportBody.blockedURL = $aero.afterPrefix(
					CSPViolationReportBody.blockedURL
				);
				CSPViolationReportBody.referrer = $aero.afterPrefix(
					CSPViolationReportBody.referrer
				);
				CSPViolationReportBody.sourceFile = $aero.afterPrefix(
					CSPViolationReportBody.sourceFile
				);

				// Don't reveal the rewritten script
				const resp = await fetch(CSPViolationReportBody.sourceFile);
				CSPViolationReportBody.sample = (await resp.text()).slice(
					0,
					resp.length
				);
			}

			// Error location
			report.sourceFile = $aero.afterPrefix(report.sourceFile);
			// TODO: Get the column number from the line in the original script (through .lineNumber)
			report.columnNumber = null;
		}
		return reports;
	}

	ReportingObserver = new Proxy(ReportingObserver, {
		construct(_that, args) {
			const [callback] = args;

			args[1] = async reports => {
				reports = await rewriteReports(reports);

				callback(...arguments);
			};

			const ret = Reflect.construct(...arguments);

			ret.takeRecords = async () => rewriteReports(ret.takeRecords());
		},
	});
}
