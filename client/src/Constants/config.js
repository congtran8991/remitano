const dev = process.env.NODE_ENV !== "production";
const host = dev ? "http://localhost:4000" : "http://localhost:4000";
const config = {
	api_domain: `${host}/api`,
	file_domain: host,
	host,
};
export default config;