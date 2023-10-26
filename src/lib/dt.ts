import { DateTime } from 'luxon';

export function utcIso(isoString: string, zone: string) {
	const dt = DateTime.fromISO(isoString, { zone });
	return dt.toUTC().toISO();
}

export function iso_to_local(time_string: string, zone: string) {
	const dt = DateTime.fromISO(time_string, { zone });
	return dt.toFormat('t');
}
